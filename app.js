/* Retro ROMp Public — app logic. Static only. No ROMs, no Vimm's fetching.
   EmulatorJS 4.2.3 is loaded on demand from cdn.emulatorjs.org. */
"use strict";
const $ = s => document.querySelector(s);
const ACCEPTED = [".zip",".smc",".sfc",".nes",".md",".bin",".sms",".z64",".n64",".v64",".pce",".sgx",".a26",".a78",".a52",".lnx",".7z"];
const IGNORED = [".nfo","desktop.ini"];
const CORE_BY_SYSTEM = {SNES:"snes9x",NES:"fceumm",Genesis:"genesis_plus_gx",MasterSystem:"smsplus",N64:"mupen64plus_next",PlayStation:"pcsx_rearmed",PCEngine:"mednafen_pce",NeoGeo:"fbneo",Arcade:"fbneo",Atari:"stella2014",ROMHacks:"snes9x"};
const SYSTEM_LABEL = {}; SYSTEMS.forEach(s=>SYSTEM_LABEL[s.id]=s.short);
const FOLDER_BY_SYSTEM = {}; SYSTEMS.forEach(s=>FOLDER_BY_SYSTEM[s.id]=s.folder);

/* ---------- search: any-order words + numbers <-> roman numerals ---------- */
const ROMAN = [["10","x"],["9","ix"],["8","viii"],["7","vii"],["6","vi"],["5","v"],["4","iv"],["3","iii"],["2","ii"],["1","i"]];
function romanToNum(w){const map={i:1,v:5,x:10,l:50,c:100,d:500,m:1000};let n=0,prev=0;for(const ch of w.toLowerCase()){const v=map[ch]||0;n+=v<prev?-v:v;prev=v}return n||null}
function expandTokens(str){
  const out=new Set();
  String(str).toLowerCase().replace(/[^a-z0-9]+/g," ").split(" ").filter(Boolean).forEach(t=>{
    out.add(t);
    if(/^\d+$/.test(t)){const r=ROMAN.find(([n])=>n===String(parseInt(t,10)));if(r)out.add(r[1]);}
    else if(/^[ivx]+$/.test(t)){const n=romanToNum(t);if(n)out.add(String(n));}
  });
  return out;
}
function matchesQuery(title, q){
  if(!q.trim()) return true;
  const qt=q.trim().toLowerCase().split(/\s+/);
  const hay=expandTokens(title);
  return qt.every(tok=>{
    if(hay.has(tok)) return true;
    if(/^\d+$/.test(tok)){const r=ROMAN.find(([n])=>n===String(parseInt(tok,10)));return r&&hay.has(r[1]);}
    if(/^[ivx]+$/.test(tok)){const n=romanToNum(tok);return n&&hay.has(String(n));}
    return [...hay].some(h=>h.includes(tok));
  });
}
function initials(title){return title.replace(/[^A-Za-z0-9 ]/g,"").split(" ").filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase()||"?"}
function coverUrl(title, systemId){
  const folder=FOLDER_BY_SYSTEM[systemId]||"Nintendo - Super Nintendo Entertainment System";
  // Libretro Thumbnails on GitHub, Named_Boxarts. (USA) suffix is the common naming.
  return "https://raw.githubusercontent.com/libretro-thumbnails/libretro-thumbnails/master/Named_Boxarts/"
    + encodeURIComponent(folder)+"/"+encodeURIComponent(title+" (USA).png");
}
function vimmUrl(vimmSystem, title){
  return VIMM_BASE+"&system="+encodeURIComponent(vimmSystem)+"&q="+encodeURIComponent(title);
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.remove("hidden");setTimeout(()=>t.classList.add("hidden"),2600);}

/* ---------- IndexedDB: On This Device ---------- */
const DB_NAME="retro-romp-public", STORE="roms";
let deviceFiles=[]; // {id,name,system,core,size,blob}
function db(){return new Promise((res,rej)=>{const r=indexedDB.open(DB_NAME,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE,{keyPath:"id"});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
async function dbPut(rec){const d=await db();return new Promise((res,rej)=>{const tx=d.transaction(STORE,"readwrite");tx.objectStore(STORE).put(rec);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});}
async function dbAll(){const d=await db();return new Promise((res,rej)=>{const q=d.transaction(STORE,"readonly").objectStore(STORE).getAll();q.onsuccess=()=>res(q.result||[]);q.onerror=()=>rej(q.error);});}
async function dbClear(){const d=await db();return new Promise((res,rej)=>{const tx=d.transaction(STORE,"readwrite");tx.objectStore(STORE).clear();tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});}
async function refreshDevice(){
  try{deviceFiles=await dbAll();}catch(e){deviceFiles=[];}
  renderDevice(); renderFeatured(); // Play buttons appear only after a file is on device
}
function extOf(name){const i=name.lastIndexOf(".");return i>=0?name.slice(i).toLowerCase():"";}
function systemForFile(name){
  const e=extOf(name);
  if([".smc",".sfc"].includes(e))return "SNES";
  if(e===".nes")return "NES";
  if([".md",".bin"].includes(e))return "Genesis";
  if(e===".sms")return "MasterSystem";
  if([".z64",".n64",".v64"].includes(e))return "N64";
  if([".pce",".sgx"].includes(e))return "PCEngine";
  if(e===".a26")return "Atari";
  if(e===".a78")return "Atari";
  if(e===".a52")return "Atari";
  if(e===".lnx")return "Atari";
  return "SNES"; // .zip / .7z: system is chosen from the featured title when played, else SNES default; user can still play via On This Device (core guessed at play time)
}
function coreForFile(rec){
  const e=extOf(rec.name);
  if(e===".a26")return "stella2014";
  if(e===".a78")return "prosystem";
  if(e===".a52")return "a5200";
  if(e===".lnx")return "handy";
  if(rec.system==="N64"&&/x-men.*street fighter/i.test(rec.name))return "parallel_n64";
  return CORE_BY_SYSTEM[rec.system]||"snes9x";
}
function titleFromFilename(name){
  return name.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ").replace(/\s*\(.*?\)\s*/g," ").trim()||name;
}
function deviceMatchFor(title){
  const words=expandTokens(title);
  return deviceFiles.find(f=>{
    const fn=expandTokens(titleFromFilename(f.name));
    let hit=0; words.forEach(w=>{if(fn.has(w))hit++;});
    return hit>=Math.min(words.size,2) && hit/words.size>=0.6;
  });
}

/* ---------- cards ---------- */
function artHtml(title, systemId){
  const init=initials(title);
  return `<div class="art"><img loading="lazy" alt="" src="${coverUrl(title,systemId)}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span class="initials" style="display:none">${init}</span></div>`;
}
function featuredCard(g){
  const owned=deviceMatchFor(g.title);
  const sys=SYSTEM_LABEL[g.system]||g.system;
  return `<article class="card gamecard" data-title="${g.title.replace(/"/g,"&quot;")}">
    ${artHtml(g.title,g.system)}
    <div class="body"><h3>${g.title}</h3><div class="meta">${sys}${g.hack?' &middot; <span class="tag hack">Fan-made hack</span>':""}</div>
    ${g.hackNote?`<p class="small">${g.hackNote}</p>`:""}</div>
    <div class="actions">
      ${owned?`<button class="btn green" data-play-featured="${g.title.replace(/"/g,"&quot;")}" data-system="${g.system}">▶ Play</button>`:""}
      <a class="btn dark" href="${DRIVE_URL}" target="_blank" rel="noopener">⬇ Download from Drive</a>
    </div></article>`;
}
function renderFeatured(){
  const q=$("#globalSearch").value||"";
  const list=FEATURED.filter(g=>matchesQuery(g.title,q));
  $("#featuredGrid").innerHTML=list.map(featuredCard).join("");
  $("#noResults").classList.toggle("hidden",list.length>0);
  $("#featuredCount").textContent=list.length+(q?" matching":"")+" featured";
  document.querySelectorAll("[data-play-featured]").forEach(b=>b.addEventListener("click",()=>{
    const rec=deviceMatchFor(b.dataset.playFeatured); if(rec) playRom(rec);
  }));
}
function renderSystems(){
  $("#systemsGrid").innerHTML=SYSTEMS.map(s=>{
    const n=FEATURED.filter(g=>g.system===s.id).length;
    return `<article class="card" data-system-card="${s.id}" tabindex="0" role="button" aria-label="${s.name}">
      <div class="art"><span class="initials" style="font-size:52px">${s.emoji}</span><span class="countchip">${n} featured</span></div>
      <div class="body"><h3>${s.name}</h3><div class="meta">${s.short} &middot; tap to browse</div></div></article>`;
  }).join("");
  document.querySelectorAll("[data-system-card]").forEach(c=>{
    const open=()=>openSection(c.dataset.systemCard);
    c.addEventListener("click",open);
    c.addEventListener("keydown",e=>{if(e.key==="Enter")open();});
  });
}
function openSection(id){
  const s=SYSTEMS.find(x=>x.id===id); if(!s)return;
  $("#systemsGrid").classList.add("hidden");
  $("#sectionView").classList.remove("hidden");
  $("#sectionEmoji").textContent=s.emoji;
  $("#sectionTitle").textContent=s.name;
  $("#sectionDesc").textContent=s.desc;
  const list=FEATURED.filter(g=>g.system===id);
  $("#sectionCount").textContent=list.length+" featured games";
  $("#sectionGames").innerHTML=list.map(featuredCard).join("");
  document.querySelectorAll("#sectionGames [data-play-featured]").forEach(b=>b.addEventListener("click",()=>{
    const rec=deviceMatchFor(b.dataset.playFeatured); if(rec) playRom(rec);
  }));
  $("#sectionView").scrollIntoView({behavior:"smooth"});
}
function closeSection(){$("#sectionView").classList.add("hidden");$("#systemsGrid").classList.remove("hidden");}
function renderDevice(){
  const el=$("#deviceList");
  if(!deviceFiles.length){el.innerHTML=`<p class="note">No games on this device yet. Download one from Drive or Vimm&rsquo;s, then load it here.</p>`;return;}
  el.innerHTML=`<ul class="filelist">`+deviceFiles.map((f,i)=>`<li><b>${f.name}</b><span class="meta">${SYSTEM_LABEL[f.system]||f.system} &middot; ${(f.size/1048576).toFixed(1)} MB &middot; stored on this device</span><button class="btn green" data-play-device="${i}">▶ Play</button></li>`).join("")+`</ul>`;
  document.querySelectorAll("[data-play-device]").forEach(b=>b.addEventListener("click",()=>playRom(deviceFiles[+b.dataset.playDevice])));
}

/* ---------- file loading ---------- */
async function addFiles(files){
  let added=0, ignored=0;
  for(const file of files){
    const low=file.name.toLowerCase();
    if(IGNORED.some(x=>low.endsWith(x))||low==="desktop.ini"){ignored++;continue;}
    if(!ACCEPTED.some(x=>low.endsWith(x))){ignored++;continue;}
    const system=systemForFile(file.name);
    const rec={id:file.name+"|"+file.size+"|"+system, name:file.name, system, size:file.size, blob:file};
    try{await dbPut(rec);added++;}catch(e){toast("Could not save "+file.name+" — browser storage may be full.");}
  }
  await refreshDevice();
  if(added) toast(added+" file"+(added>1?"s":"")+" saved on this device. Green Play buttons are now available.");
  else if(ignored) toast("No accepted ROM files in that selection. Accepted: "+ACCEPTED.join(" "));
}

/* ---------- Vimm's Vault ---------- */
let vimmTab="SNES";
function renderVimmTabs(){
  $("#vimmTabs").innerHTML=VIMM_SYSTEMS.map(s=>{
    const n=s.vimm?(VIMM[s.id]||[]).length:0;
    return `<button class="tab ${s.id===vimmTab?"active":""}" data-vimm-tab="${s.id}" type="button">${s.label}${s.vimm?` (${n} bundled)`:""}</button>`;
  }).join("");
  document.querySelectorAll("[data-vimm-tab]").forEach(b=>b.addEventListener("click",()=>{vimmTab=b.dataset.vimmTab;$("#vimmSearch").value="";renderVimmTabs();renderVimm();}));
}
function renderVimm(){
  const sys=VIMM_SYSTEMS.find(s=>s.id===vimmTab);
  const grid=$("#vimmGrid"), empty=$("#vimmEmpty"), count=$("#vimmCount");
  if(!sys.vimm){
    grid.innerHTML=""; count.textContent="";
    empty.classList.remove("hidden");
    empty.innerHTML=`<h3>${sys.noVault}</h3><p style="margin:0">Vimm's Lair has no ${sys.label} vault, so there is no catalog or link to list here. For Neo Geo and Arcade games, use the <a href="${DRIVE_URL}" target="_blank" rel="noopener">shared Drive folder</a> instead, then load the downloaded file above.</p>`;
    return;
  }
  empty.classList.add("hidden");
  const q=$("#vimmSearch").value||"";
  const all=VIMM[vimmTab]||[];
  const list=all.filter(t=>matchesQuery(t,q));
  count.textContent=`${list.length} of ${all.length} bundled in this tab${q?` matching “${q}”`:""} — the bundled catalog is a selection, not the whole vault.${sys.note?" "+sys.note:""}`;
  grid.innerHTML=list.map(t=>`<article class="card gamecard">
    ${artHtml(t, vimmTab==="TurboGrafx-16"?"PCEngine":vimmTab==="MasterSystem"?"MasterSystem":vimmTab)}
    <div class="body"><h3>${t}</h3><div class="meta">${sys.label}</div></div>
    <div class="actions"><a class="btn violet" href="${vimmUrl(sys.vimm,t)}" target="_blank" rel="noopener">Vimm's page ↗</a>
    <button class="btn dark" data-add-rom type="button">Add the ROM</button></div></article>`).join("")||`<p class="note">No games in this catalog match that search. Try “Search all of Vimm's” above.</p>`;
  document.querySelectorAll("[data-add-rom]").forEach(b=>b.addEventListener("click",()=>{
    $("#device").scrollIntoView({behavior:"smooth"}); $("#fileInput").click();
  }));
}

/* ---------- EmulatorJS player ---------- */
let ejsLoaded=false, watchdog=null, poller=null;
function loadEjs(){
  if(ejsLoaded) return Promise.resolve();
  return new Promise((res,rej)=>{
    const s=document.createElement("script");
    s.src="https://cdn.emulatorjs.org/stable/data/loader.js";
    s.onload=()=>{ejsLoaded=true;res();}; s.onerror=()=>rej(new Error("EmulatorJS loader failed to load"));
    document.body.appendChild(s);
  });
}
function showPlayerError(msg){
  $("#playerErrorText").textContent=msg;
  $("#playerError").classList.remove("hidden");
}
function closePlayer(){
  clearTimeout(watchdog); clearInterval(poller);
  $("#player").classList.add("hidden");
  $("#playerError").classList.add("hidden");
  $("#game").innerHTML="";
  if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});
}
async function playRom(rec){
  const isN64=rec.system==="N64";
  const defaultCore=coreForFile(rec);
  const title=titleFromFilename(rec.name);
  $("#playerTitle").textContent="Playing: "+title+" ("+(SYSTEM_LABEL[rec.system]||rec.system)+")";
  const sel=$("#coreSelect");
  if(isN64){
    sel.innerHTML=`<option value="mupen64plus_next">mupen64plus_next</option><option value="parallel_n64">parallel_n64</option>`;
    sel.value=localStorage.getItem("rrp-core-"+rec.id)||defaultCore;
    sel.disabled=false;
  }else{
    sel.innerHTML=`<option value="${defaultCore}">${defaultCore}</option>`;
    sel.value=defaultCore; sel.disabled=true;
  }
  $("#player").classList.remove("hidden");
  $("#playerError").classList.add("hidden");
  $("#game").innerHTML="<p style='color:#a7aab6;padding:24px'>Loading emulator… N64 games can take up to 120 seconds.</p>";
  const startGame=async(core)=>{
    clearTimeout(watchdog); clearInterval(poller);
    $("#playerError").classList.add("hidden");
    $("#game").innerHTML="";
    try{await loadEjs();}catch(e){showPlayerError("EmulatorJS could not be loaded. Check your connection and try again.");return;}
    const url=URL.createObjectURL(rec.blob);
    window.EJS_player="#game";
    window.EJS_core=core;
    window.EJS_gameUrl=url;
    window.EJS_pathtodata="https://cdn.emulatorjs.org/stable/data/";
    window.EJS_startOnLoaded=true;
    window.EJS_fullscreenOnLoaded=false;
    const s=document.createElement("script");
    s.src="https://cdn.emulatorjs.org/stable/data/loader.js";
    s.onerror=()=>showPlayerError("EmulatorJS could not be loaded. Check your connection and try again.");
    document.body.appendChild(s);
    // Watchdog: a canvas appearing means the emulator started. N64: 120s, others: 45s.
    const limit=isN64?120000:45000, started=Date.now();
    poller=setInterval(()=>{
      if(document.querySelector("#game canvas")){clearInterval(poller);clearTimeout(watchdog);}
      else if(Date.now()-started>limit){clearInterval(poller);showPlayerError("The game did not start within "+(limit/1000)+" seconds (it may have stayed black). Try the other N64 core for N64 games, or re-download the file and load it again.");}
    },2000);
    watchdog=setTimeout(()=>{},limit+1000);
  };
  sel.onchange=()=>{localStorage.setItem("rrp-core-"+rec.id,sel.value);startGame(sel.value);};
  await startGame(sel.value);
}

/* ---------- wire up ---------- */
$("#backBtn").addEventListener("click",closeSection);
$("#clearSearch").addEventListener("click",()=>{$("#globalSearch").value="";renderFeatured();});
$("#globalSearch").addEventListener("input",renderFeatured);
$("#pickBtn").addEventListener("click",()=>$("#fileInput").click());
$("#fileInput").addEventListener("change",e=>{addFiles([...e.target.files]);e.target.value="";});
const dz=$("#dropzone");
["dragover","dragenter"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add("drag");}));
["dragleave","drop"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove("drag");}));
dz.addEventListener("drop",e=>addFiles([...(e.dataTransfer.files||[])]));
$("#clearDevice").addEventListener("click",async()=>{if(confirm("Remove all downloaded games from this device?")){await dbClear();await refreshDevice();toast("On This Device library cleared.");}});
$("#vimmSearch").addEventListener("input",renderVimm);
$("#vimmSearchAllBtn").addEventListener("click",()=>{
  const q=$("#vimmSearchAll").value.trim();
  window.open(VIMM_BASE+"&q="+encodeURIComponent(q),"_blank","noopener");
});
$("#vimmSearchAll").addEventListener("keydown",e=>{if(e.key==="Enter")$("#vimmSearchAllBtn").click();});
$("#shareBtn").addEventListener("click",async()=>{
  const url=location.href;
  try{await navigator.clipboard.writeText(url);toast("Link copied to clipboard.");}
  catch(e){const ta=document.createElement("textarea");ta.value=url;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");toast("Link copied to clipboard.");}catch(_){toast("Copy this link: "+url);}ta.remove();}
});
$("#playerBack").addEventListener("click",closePlayer);
$("#playerErrorBack").addEventListener("click",closePlayer);
$("#fullscreenBtn").addEventListener("click",()=>{
  const el=$("#player");
  if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});
  else if(el.requestFullscreen) el.requestFullscreen().catch(()=>toast("Full screen is not available in this browser."));
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#player").classList.contains("hidden"))closePlayer();});

renderSystems(); renderFeatured(); renderVimmTabs(); renderVimm(); refreshDevice();
