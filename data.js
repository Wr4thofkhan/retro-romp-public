/* Retro ROMp Public — data. No ROM files, no download URLs for games.
   Every Download button opens the real shared Drive folder; every Vimm's
   link is a link to vimm.net (target _blank). Nothing here fetches Vimm's. */
const DRIVE_URL = "https://drive.google.com/drive/folders/1winQ_bLs3MbU_NFDQerKHrX3TDzC3ZEI";
const VIMM_BASE = "https://vimm.net/vault/?p=list";

const SYSTEMS = [
  {id:"SNES", name:"Super Nintendo", short:"SNES", emoji:"🟣", folder:"Nintendo - Super Nintendo Entertainment System", desc:"16-bit Nintendo classics — Mario, Zelda, Metroid, Chrono Trigger."},
  {id:"NES", name:"Nintendo Entertainment System", short:"NES", emoji:"🔴", folder:"Nintendo - Nintendo Entertainment System", desc:"8-bit Nintendo — the games that started it all."},
  {id:"Genesis", name:"Sega Genesis", short:"Genesis", emoji:"🔵", folder:"Sega - Mega Drive - Genesis", desc:"Sega's 16-bit blast processing era — Sonic, Streets of Rage, Contra."},
  {id:"N64", name:"Nintendo 64", short:"N64", emoji:"🟢", folder:"Nintendo - Nintendo 64", desc:"3D Nintendo — Mario 64, Ocarina of Time, GoldenEye. Up to 120s to start."},
  {id:"PlayStation", name:"PlayStation", short:"PS1", emoji:"⚫", folder:"Sony - PlayStation", desc:"Sony's first PlayStation — Final Fantasy VII, Metal Gear Solid, Tekken 3."},
  {id:"Arcade", name:"Arcade", short:"Arcade", emoji:"🕹️", folder:"SNK - Neo Geo", desc:"Coin-op greats — beat-'em-ups, shoot-'em-ups and classics. Played with the FBNeo core."},
  {id:"MasterSystem", name:"Sega Master System", short:"Master System", emoji:"🟡", folder:"Sega - Master System - Mark III", desc:"Sega's 8-bit system — Alex Kidd, Phantasy Star, Wonder Boy."},
  {id:"PCEngine", name:"PC Engine / TurboGrafx-16", short:"PC Engine", emoji:"🟠", folder:"NEC - PC Engine - TurboGrafx 16", desc:"NEC's PC Engine / TurboGrafx-16, plus SuperGrafx. Cartridge games need no BIOS."},
  {id:"NeoGeo", name:"Neo Geo", short:"Neo Geo", emoji:"⚪", folder:"SNK - Neo Geo", desc:"SNK's arcade-at-home system. Games need the neogeo.zip BIOS file alongside them."},
  {id:"Atari", name:"Atari", short:"Atari", emoji:"👾", folder:"Atari - 2600", desc:"Atari 2600 / 7800 / 5200 / Lynx. Core is resolved per file at play time."},
  {id:"ROMHacks", name:"ROM Hacks", short:"ROM Hacks", emoji:"✨", folder:"Nintendo - Super Nintendo Entertainment System", desc:"Fan-made hacks — clearly labelled as fan-made, not official games."}
];

/* Featured library: 59 games. SNES 8, NES 8, Genesis 8, N64 6, PlayStation 6,
   Arcade 8, Master System 4, PC Engine 4, Neo Geo 3, Atari 2, ROM Hacks 2. */
const FEATURED = [
  // SNES 8
  {title:"Super Mario World", system:"SNES"},
  {title:"The Legend of Zelda: A Link to the Past", system:"SNES"},
  {title:"Super Metroid", system:"SNES"},
  {title:"Donkey Kong Country", system:"SNES"},
  {title:"Chrono Trigger", system:"SNES"},
  {title:"Super Mario Kart", system:"SNES"},
  {title:"EarthBound", system:"SNES"},
  {title:"Street Fighter II Turbo", system:"SNES"},
  // NES 8
  {title:"Super Mario Bros.", system:"NES"},
  {title:"Super Mario Bros. 3", system:"NES"},
  {title:"The Legend of Zelda", system:"NES"},
  {title:"Metroid", system:"NES"},
  {title:"Mega Man 2", system:"NES"},
  {title:"Castlevania", system:"NES"},
  {title:"Contra", system:"NES"},
  {title:"Tetris", system:"NES"},
  // Genesis 8
  {title:"Sonic the Hedgehog 2", system:"Genesis"},
  {title:"Sonic the Hedgehog", system:"Genesis"},
  {title:"Streets of Rage 2", system:"Genesis"},
  {title:"Golden Axe", system:"Genesis"},
  {title:"Contra: Hard Corps", system:"Genesis"},
  {title:"Gunstar Heroes", system:"Genesis"},
  {title:"Shinobi III: Return of the Ninja Master", system:"Genesis"},
  {title:"Earthworm Jim", system:"Genesis"},
  // N64 6
  {title:"Super Mario 64", system:"N64"},
  {title:"The Legend of Zelda: Ocarina of Time", system:"N64"},
  {title:"GoldenEye 007", system:"N64"},
  {title:"Mario Kart 64", system:"N64"},
  {title:"Super Smash Bros.", system:"N64"},
  {title:"Banjo-Kazooie", system:"N64"},
  // PlayStation 6
  {title:"Castlevania: Symphony of the Night", system:"PlayStation"},
  {title:"Final Fantasy VII", system:"PlayStation"},
  {title:"Metal Gear Solid", system:"PlayStation"},
  {title:"Gran Turismo", system:"PlayStation"},
  {title:"Tekken 3", system:"PlayStation"},
  {title:"Crash Bandicoot", system:"PlayStation"},
  // Arcade 8
  {title:"Metal Slug X", system:"Arcade"},
  {title:"Street Fighter Alpha 3", system:"Arcade"},
  {title:"Teenage Mutant Ninja Turtles: Turtles in Time", system:"Arcade"},
  {title:"The Simpsons", system:"Arcade"},
  {title:"Sunset Riders", system:"Arcade"},
  {title:"Galaga", system:"Arcade"},
  {title:"Ms. Pac-Man", system:"Arcade"},
  {title:"Alien vs. Predator", system:"Arcade"},
  // Master System 4
  {title:"Alex Kidd in Miracle World", system:"MasterSystem"},
  {title:"Phantasy Star", system:"MasterSystem"},
  {title:"Wonder Boy III: The Dragon's Trap", system:"MasterSystem"},
  {title:"Sonic the Hedgehog", system:"MasterSystem"},
  // PC Engine 4
  {title:"Bonk's Adventure", system:"PCEngine"},
  {title:"Bomberman '93", system:"PCEngine"},
  {title:"Splatterhouse", system:"PCEngine"},
  {title:"R-Type", system:"PCEngine"},
  // Neo Geo 3
  {title:"Garou: Mark of the Wolves", system:"NeoGeo"},
  {title:"The King of Fighters '98", system:"NeoGeo"},
  {title:"Metal Slug", system:"NeoGeo"},
  // Atari 2
  {title:"Asteroids", system:"Atari"},
  {title:"Missile Command", system:"Atari"},
  // ROM Hacks 2 — fan-made, labelled as such in the UI
  {title:"Parallel Worlds", system:"ROMHacks", hack:true, hackNote:"Fan-made hack of The Legend of Zelda: A Link to the Past"},
  {title:"Super Mario World: The Second Reality Project", system:"ROMHacks", hack:true, hackNote:"Fan-made hack of Super Mario World"}
];

/* Vimm's Vault catalogs. Each tab's count = how many entries are bundled
   in that tab (labelled as such in the UI). These are selections, not the
   whole vault. Vimm's system values are the ones used in its vault URLs. */
const VIMM_SYSTEMS = [
  {id:"SNES", label:"SNES", vimm:"SNES", folder:"Nintendo - Super Nintendo Entertainment System", note:"Full SNES vault on Vimm's holds over 4,100 games (verified: 4,147 known media, No-Intro dat 2026-11-20). This tab is a bundled selection — use “Search all of Vimm's” for the rest."},
  {id:"PlayStation", label:"PlayStation", vimm:"PlayStation", folder:"Sony - PlayStation"},
  {id:"NES", label:"NES", vimm:"NES", folder:"Nintendo - Nintendo Entertainment System"},
  {id:"Genesis", label:"Genesis", vimm:"Genesis", folder:"Sega - Mega Drive - Genesis"},
  {id:"MasterSystem", label:"Master System", vimm:"MasterSystem", folder:"Sega - Master System - Mark III"},
  {id:"N64", label:"Nintendo 64", vimm:"Nintendo64", folder:"Nintendo - Nintendo 64"},
  {id:"TurboGrafx-16", label:"TurboGrafx-16", vimm:"TurboGrafx-16", folder:"NEC - PC Engine - TurboGrafx 16", note:"This tab also covers SuperGrafx."},
  {id:"Atari2600", label:"Atari 2600", vimm:"Atari2600", folder:"Atari - 2600"},
  {id:"Atari5200", label:"Atari 5200", vimm:"Atari5200", folder:"Atari - 5200"},
  {id:"Atari7800", label:"Atari 7800", vimm:"Atari7800", folder:"Atari - 7800"},
  {id:"Lynx", label:"Lynx", vimm:"Lynx", folder:"Atari - Lynx"},
  {id:"NeoGeo", label:"Neo Geo", vimm:null, folder:"SNK - Neo Geo", noVault:"Vimm's has no Neo Geo Vault"},
  {id:"Arcade", label:"Arcade", vimm:null, folder:"SNK - Neo Geo", noVault:"Vimm's has no Arcade Vault"}
];

const VIMM = {
SNES: ["Super Mario World","Super Mario All-Stars","Super Mario Kart","The Legend of Zelda: A Link to the Past","Super Metroid","Donkey Kong Country","Donkey Kong Country 2: Diddy's Kong Quest","Donkey Kong Country 3: Dixie Kong's Double Trouble","Chrono Trigger","EarthBound","Final Fantasy III","Final Fantasy II","Super Mario RPG: Legend of the Seven Stars","Street Fighter II Turbo","Street Fighter Alpha 2","Mega Man X","Mega Man X2","Mega Man X3","Mega Man 7","Castlevania IV","Contra III: The Alien Wars","F-Zero","Star Fox","Star Fox 2","Kirby Super Star","Kirby's Dream Land 3","Yoshi's Island","Pilotwings","Wave Race","Uniracers","ActRaiser","Secret of Mana","Secret of Evermore","Illusion of Gaia","Terranigma","Lufia II: Rise of the Sinistrals","Breath of Fire","Breath of Fire II","Dragon Quest V","Dragon Quest VI","Tales of Phantasia","Star Ocean","Seiken Densetsu 3","Romancing SaGa 3","Live A Live","Front Mission","Ogre Battle: The March of the Black Queen","Tactics Ogre: Let Us Cling Together","SimCity","Harvest Moon","Zombies Ate My Neighbors","Teenage Mutant Ninja Turtles IV: Turtles in Time","The Simpsons: Bart's Nightmare","Aladdin","The Lion King","Mortal Kombat II","Mortal Kombat 3","NBA Jam","NHL '94","Super Punch-Out!!"],
PlayStation: ["Final Fantasy VII","Final Fantasy VIII","Final Fantasy IX","Castlevania: Symphony of the Night","Metal Gear Solid","Gran Turismo","Gran Turismo 2","Tekken 3","Tekken 2","Crash Bandicoot","Crash Bandicoot 2: Cortex Strikes Back","Crash Bandicoot 3: Warped","Spyro the Dragon","Spyro 2: Ripto's Rage","Tomb Raider","Tomb Raider II","Resident Evil","Resident Evil 2","Resident Evil 3: Nemesis","Silent Hill","Chrono Cross","Xenogears","Suikoden II","Suikoden","Legend of Dragoon","Vagrant Story","Parasite Eve","Parasite Eve II","Front Mission 3","Breath of Fire III","Breath of Fire IV","Dragon Quest VII","Wild Arms","Star Ocean: The Second Story","Tales of Destiny","Tony Hawk's Pro Skater 2","Tony Hawk's Pro Skater","Ridge Racer","Wipeout XL","Twisted Metal 2"],
NES: ["Super Mario Bros.","Super Mario Bros. 2","Super Mario Bros. 3","The Legend of Zelda","Zelda II: The Adventure of Link","Metroid","Mega Man","Mega Man 2","Mega Man 3","Mega Man 4","Mega Man 5","Mega Man 6","Castlevania","Castlevania II: Simon's Quest","Castlevania III: Dracula's Curse","Contra","Super Contra","Ninja Gaiden","Ninja Gaiden II: The Dark Sword of Chaos","Ninja Gaiden III: The Ancient Ship of Doom","Double Dragon","Double Dragon II: The Revenge","Double Dragon III: The Sacred Stones","DuckTales","DuckTales 2","Chip 'n Dale Rescue Rangers","Chip 'n Dale Rescue Rangers 2","Tetris","Dr. Mario","Kirby's Adventure","Punch-Out!!","Mike Tyson's Punch-Out!!","Excitebike","Ice Climber","Balloon Fight","Donkey Kong","Donkey Kong Jr.","Donkey Kong 3","Final Fantasy","Dragon Warrior","Dragon Warrior II","Dragon Warrior III","Dragon Warrior IV","Crystalis","StarTropics","StarTropics II: Zoda's Revenge","Kid Icarus","Faxanadu","River City Ransom","Battletoads"],
Genesis: ["Sonic the Hedgehog","Sonic the Hedgehog 2","Sonic the Hedgehog 3","Sonic & Knuckles","Streets of Rage","Streets of Rage 2","Streets of Rage 3","Golden Axe","Golden Axe II","Golden Axe III","Shinobi III: Return of the Ninja Master","Revenge of Shinobi","Gunstar Heroes","Contra: Hard Corps","Earthworm Jim","Earthworm Jim 2","Aladdin","The Lion King","Mortal Kombat II","Mortal Kombat 3","Street Fighter II: Championship Edition","Phantasy Star II","Phantasy Star III: Generations of Doom","Phantasy Star IV: The End of the Millennium","Shining Force","Shining Force II","Shining in the Darkness","Landstalker","Beyond Oasis","Rocket Knight Adventures","Castlevania: Bloodlines","Vectorman","Vectorman 2","Comix Zone","Ristar","Dynamite Headdy","ToeJam & Earl","ToeJam & Earl in Panic on Funkotron","NBA Jam","NHL '94"],
MasterSystem: ["Alex Kidd in Miracle World","Alex Kidd in Shinobi World","Phantasy Star","Wonder Boy III: The Dragon's Trap","Wonder Boy in Monster Land","Sonic the Hedgehog","Sonic the Hedgehog 2","Sonic Chaos","Shinobi","Fantasy Zone","Fantasy Zone II","Out Run","OutRun 3-D","Hang-On","Space Harrier","Double Dragon","R-Type","Golden Axe","Castle of Illusion Starring Mickey Mouse","Land of Illusion Starring Mickey Mouse","Psycho Fox","Golvellius: Valley of Doom","Zillion","Kenseiden","California Games"],
N64: ["Super Mario 64","The Legend of Zelda: Ocarina of Time","The Legend of Zelda: Majora's Mask","GoldenEye 007","Mario Kart 64","Super Smash Bros.","Banjo-Kazooie","Banjo-Tooie","Donkey Kong 64","Diddy Kong Racing","Star Fox 64","F-Zero X","Wave Race 64","1080° Snowboarding","Pilotwings 64","Paper Mario","Pokémon Snap","Pokémon Stadium","Pokémon Stadium 2","Perfect Dark","Jet Force Gemini","Conker's Bad Fur Day","Kirby 64: The Crystal Shards","Yoshi's Story","Mario Party","Mario Party 2","Mario Party 3","Turok: Dinosaur Hunter","Turok 2: Seeds of Evil","Turok 3: Shadow of Oblivion"],
"TurboGrafx-16": ["Bonk's Adventure","Bonk's Revenge","Bonk 3: Bonk's Big Adventure","Bomberman","Bomberman '93","Bomberman '94","Splatterhouse","R-Type","Blazing Lazers","Devil's Crush","Alien Crush","Dungeon Explorer","Legendary Axe","Legendary Axe II","Ninja Spirit","Military Madness","Ys Book I & II","Ys III: Wanderers from Ys","Dracula X: Rondo of Blood","Super Star Soldier"],
Atari2600: ["Asteroids","Missile Command","Space Invaders","Pac-Man","Ms. Pac-Man","Pitfall!","Adventure","Combat","Breakout","Yars' Revenge","River Raid","Demon Attack","Frogger","Centipede","Defender"],
Atari5200: ["Pac-Man","Ms. Pac-Man","Asteroids","Centipede","Defender","Frogger","Moon Patrol","Joust","Berzerk","River Raid"],
Atari7800: ["Asteroids","Centipede","Food Fight","Joust","Pole Position II","Xevious","Ballblazer","Robotron: 2084","Desert Falcon","Ninja Golf"],
Lynx: ["California Games","Blue Lightning","Chip's Challenge","Klax","Todd's Adventures in Slime World","Gates of Zendocon","Warbirds","Electrocop","Rygar","Shadow of the Beast"]
};
