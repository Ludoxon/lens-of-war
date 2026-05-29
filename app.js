(function() {
  'use strict';

  // Global speed multiplier — 1.25 = 25% faster than base
  var GAME_SPEED = 1.25;

  // ==================== AGE DATA (original game stats, XP reduced ~30%) ====================
  var AGES = [
    {
      name: 'Stone Age', index: 0, xpToNext: 717,
      baseColor: '#6B4226', roofColor: '#8B6914',
      playerColors: ['#8B6914', '#A0522D', '#6B8E23'],
      enemyColors: ['#8B3A14', '#A03A2D', '#8E6B23'],
      units: [
        { name: 'Club Man', cost: 15, hp: 55, meleeDmg: 16, rangedDmg: 0, meleeRange: 20, rangedRange: 0,
          speed: 0.8, attackCooldown: 800, projectileSpeed: 0, width: 10, height: 22,
          xpReward: 12, goldReward: 20, buildTime: 1000 },
        { name: 'Slingshot', cost: 25, hp: 42, meleeDmg: 10, rangedDmg: 8, meleeRange: 20, rangedRange: 60,
          speed: 0.6, attackCooldown: 1200, projectileSpeed: 4, width: 9, height: 20,
          xpReward: 18, goldReward: 33, buildTime: 1000 },
        { name: 'Dino Rider', cost: 100, hp: 160, meleeDmg: 40, rangedDmg: 0, meleeRange: 28, rangedRange: 0,
          speed: 0.45, attackCooldown: 900, projectileSpeed: 0, width: 16, height: 28,
          xpReward: 50, goldReward: 130, buildTime: 3000 }
      ],
      turrets: [
        { name: 'Rock Sling', cost: 100, damage: 6, range: 210, cooldown: 750, color: '#696969', projColor: '#808080' },
        { name: 'Egg Auto', cost: 200, damage: 3, range: 180, cooldown: 450, color: '#7A7A5A', projColor: '#AAAA80' },
        { name: 'Prim. Cat.', cost: 500, damage: 13, range: 240, cooldown: 1750, color: '#5A4A3A', projColor: '#AA9070' }
      ],
      slotCost: 1000,
      special: { name: 'Meteor', cooldown: 45000, damage: 139, radius: 250, color: '#FF4500' }
    },
    {
      name: 'Medieval', index: 1, xpToNext: 1434,
      baseColor: '#4A4A5A', roofColor: '#5A5A6A',
      playerColors: ['#4169E1', '#228B22', '#B8860B'],
      enemyColors: ['#E14169', '#8B6B22', '#B86B0B'],
      units: [
        { name: 'Swordsman', cost: 50, hp: 100, meleeDmg: 32, rangedDmg: 0, meleeRange: 20, rangedRange: 0,
          speed: 0.65, attackCooldown: 700, projectileSpeed: 0, width: 12, height: 24,
          xpReward: 25, goldReward: 65, buildTime: 2000 },
        { name: 'Archer', cost: 75, hp: 80, meleeDmg: 20, rangedDmg: 9, meleeRange: 20, rangedRange: 80,
          speed: 0.55, attackCooldown: 1000, projectileSpeed: 5, width: 10, height: 22,
          xpReward: 35, goldReward: 98, buildTime: 1000 },
        { name: 'Knight', cost: 500, hp: 300, meleeDmg: 60, rangedDmg: 0, meleeRange: 36, rangedRange: 0,
          speed: 0.4, attackCooldown: 800, projectileSpeed: 0, width: 18, height: 30,
          xpReward: 120, goldReward: 650, buildTime: 3000 }
      ],
      turrets: [
        { name: 'Catapult', cost: 500, damage: 21, range: 240, cooldown: 1750, color: '#708090', projColor: '#B0B0B0' },
        { name: 'Fire Cat.', cost: 750, damage: 25, range: 240, cooldown: 1750, color: '#8B4513', projColor: '#FF6633' },
        { name: 'War Cat.', cost: 1200, damage: 33, range: 260, cooldown: 1800, color: '#5A4A3A', projColor: '#AA8866' }
      ],
      slotCost: 1000,
      special: { name: 'Arrows', cooldown: 40000, damage: 173, radius: 300, color: '#C0C0C0' }
    },
    {
      name: 'Renaissance', index: 2, xpToNext: 2868,
      baseColor: '#5A4A3A', roofColor: '#7A6A5A',
      playerColors: ['#CD853F', '#8B0000', '#DAA520'],
      enemyColors: ['#CD5F3F', '#8B4500', '#DA6B20'],
      units: [
        { name: 'Dueller', cost: 200, hp: 200, meleeDmg: 79, rangedDmg: 0, meleeRange: 25, rangedRange: 0,
          speed: 0.7, attackCooldown: 650, projectileSpeed: 0, width: 12, height: 24,
          xpReward: 60, goldReward: 260, buildTime: 3000 },
        { name: 'Musketeer', cost: 400, hp: 160, meleeDmg: 40, rangedDmg: 20, meleeRange: 25, rangedRange: 80,
          speed: 0.55, attackCooldown: 900, projectileSpeed: 6, width: 11, height: 23,
          xpReward: 90, goldReward: 520, buildTime: 3000 },
        { name: 'Cannoneer', cost: 1000, hp: 600, meleeDmg: 80, rangedDmg: 55, meleeRange: 25, rangedRange: 120,
          speed: 0.35, attackCooldown: 1500, projectileSpeed: 5, width: 16, height: 26,
          xpReward: 200, goldReward: 1300, buildTime: 5000 }
      ],
      turrets: [
        { name: 'Sm. Cannon', cost: 1500, damage: 16, range: 300, cooldown: 1750, color: '#5A5A5A', projColor: '#888888' },
        { name: 'Lg. Cannon', cost: 3000, damage: 37, range: 300, cooldown: 1750, color: '#4A4A4A', projColor: '#999999' },
        { name: 'Explosive', cost: 6000, damage: 52, range: 300, cooldown: 1750, color: '#3A3A3A', projColor: '#FF4400' }
      ],
      slotCost: 1000,
      special: { name: 'Barrage', cooldown: 45000, damage: 208, radius: 300, color: '#CD853F' }
    },
    {
      name: 'Modern', index: 3, xpToNext: 5736,
      baseColor: '#3A4A3A', roofColor: '#4A5A4A',
      playerColors: ['#556B2F', '#2E8B57', '#696969'],
      enemyColors: ['#6B2F2F', '#8B572E', '#696950'],
      units: [
        { name: 'Infantry', cost: 1500, hp: 350, meleeDmg: 100, rangedDmg: 0, meleeRange: 25, rangedRange: 0,
          speed: 0.8, attackCooldown: 600, projectileSpeed: 0, width: 12, height: 24,
          xpReward: 300, goldReward: 1950, buildTime: 3000 },
        { name: 'Rifleman', cost: 2000, hp: 300, meleeDmg: 60, rangedDmg: 30, meleeRange: 25, rangedRange: 80,
          speed: 0.6, attackCooldown: 800, projectileSpeed: 7, width: 11, height: 23,
          xpReward: 450, goldReward: 2600, buildTime: 3000 },
        { name: 'Tank', cost: 7000, hp: 1200, meleeDmg: 300, rangedDmg: 0, meleeRange: 60, rangedRange: 0,
          speed: 0.28, attackCooldown: 1200, projectileSpeed: 0, width: 22, height: 18,
          xpReward: 1500, goldReward: 9100, buildTime: 8000 }
      ],
      turrets: [
        { name: 'MG Turret', cost: 7000, damage: 37, range: 300, cooldown: 1200, color: '#4A5A4A', projColor: '#FFFF00' },
        { name: 'Rocket', cost: 9000, damage: 52, range: 300, cooldown: 1500, color: '#5A5A4A', projColor: '#FF8800' },
        { name: 'Double MG', cost: 14000, damage: 37, range: 300, cooldown: 850, color: '#3A4A3A', projColor: '#FFFF44' }
      ],
      slotCost: 1000,
      special: { name: 'Artillery', cooldown: 40000, damage: 347, radius: 350, color: '#FF8800' }
    },
    {
      name: 'Future', index: 4, xpToNext: Infinity,
      baseColor: '#2A4A6A', roofColor: '#3A5A7A',
      playerColors: ['#00FFFF', '#FF00FF', '#00FF88'],
      enemyColors: ['#FF6600', '#FF3333', '#FFAA00'],
      units: [
        { name: "God's Blade", cost: 5000, hp: 1000, meleeDmg: 250, rangedDmg: 0, meleeRange: 28, rangedRange: 0,
          speed: 0.9, attackCooldown: 500, projectileSpeed: 0, width: 13, height: 26,
          xpReward: 1200, goldReward: 6500, buildTime: 3000 },
        { name: 'Blaster', cost: 6000, hp: 800, meleeDmg: 130, rangedDmg: 80, meleeRange: 28, rangedRange: 80,
          speed: 0.65, attackCooldown: 700, projectileSpeed: 8, width: 12, height: 24,
          xpReward: 1500, goldReward: 7800, buildTime: 3000 },
        { name: 'War Machine', cost: 20000, hp: 3000, meleeDmg: 600, rangedDmg: 0, meleeRange: 60, rangedRange: 0,
          speed: 0.35, attackCooldown: 1000, projectileSpeed: 0, width: 24, height: 30,
          xpReward: 5000, goldReward: 26000, buildTime: 8000 }
      ],
      turrets: [
        { name: 'Titanium', cost: 24000, damage: 52, range: 240, cooldown: 1200, color: '#4488AA', projColor: '#00FFFF' },
        { name: 'Laser', cost: 40000, damage: 21, range: 300, cooldown: 450, color: '#00AA66', projColor: '#00FF88' },
        { name: 'Ion Ray', cost: 100000, damage: 31, range: 480, cooldown: 450, color: '#6644AA', projColor: '#AA88FF' }
      ],
      slotCost: 1000,
      special: { name: 'God Blast', cooldown: 35000, damage: 578, radius: 300, color: '#00FFFF' }
    }
  ];

  var DIFFICULTIES = {
    normal: { label: 'Easy', enemyHPMult: 0.8, enemyDmgMult: 1.0, enemySpawnMult: 0.8, enemyEvolveRate: 1.0, enemyStartDelay: 2500, desc: 'A relaxed experience' },
    hard: { label: 'Normal', enemyHPMult: 1.0, enemyDmgMult: 1.0, enemySpawnMult: 0.6, enemyEvolveRate: 1.4, enemyStartDelay: 1500, desc: 'A balanced challenge' },
    impossible: { label: 'Hard', enemyHPMult: 1.0, enemyDmgMult: 1.0, enemySpawnMult: 0.45, enemyEvolveRate: 2.0, enemyStartDelay: 800, desc: 'Only the best survive' }
  };

  var STORAGE_KEY = 'mdg_lensofwar';

  var BASE_HP = 1000;
  var BASE_HP_EVOLVE_BONUS = 500;
  var STARTING_GOLD = 150;
  var PASSIVE_GOLD_BASE = 2;
  var UNIT_CAP = 20;
  var MAX_QUEUE = 5;
  var GROUND_Y = 440;
  var PLAYER_BASE_X = 50;
  var ENEMY_BASE_X = 550;

  var nextId = 1, ctx = null, animFrameId = null, totalUnitsSpawned = 0;
  var turretMenuOpen = false;

  var game = {
    running: false, paused: false, lastTime: 0, elapsed: 0,
    difficulty: 'normal', diffConfig: DIFFICULTIES.normal,
    currentScreen: 'title-screen', screenHistory: [],
    player: { baseHP: BASE_HP, baseMaxHP: BASE_HP, gold: STARTING_GOLD, xp: 0, age: 0,
      turretSlots: 1, turrets: [null, null], specialCooldownEnd: 0, units: [], buildQueue: [] },
    enemy: { baseHP: BASE_HP, baseMaxHP: BASE_HP, gold: 0, xp: 0, age: 0,
      turretSlots: 1, turrets: [null, null], units: [],
      ai: { nextSpawnTime: 3000, spawnInterval: 3500, aggression: 0.3, evolveXP: 0, nextSpecialTime: 60000 } },
    projectiles: [], effects: [], specialStrikes: [], hudDirty: true
  };

  var screens = {};
  function collectScreens() { document.querySelectorAll('.screen').forEach(function(s) { if (s.id) screens[s.id] = s; }); }
  function navigateTo(screenId, opts) {
    opts = opts || {};
    if (opts.addToHistory !== false && game.currentScreen) game.screenHistory.push(game.currentScreen);
    Object.values(screens).forEach(function(s) { s.classList.add('hidden'); });
    if (screens[screenId]) { screens[screenId].classList.remove('hidden'); game.currentScreen = screenId; onScreenEnter(screenId); }
  }

  // ==================== AUDIO ====================
  var audioCtx = null, sfxGain = null;
  var musicBuffer = null, musicSource = null, musicGain = null, musicMuted = false, sfxMuted = false;
  var musicFallback = null;
  var MUSIC_VOL = 0.12;
  function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    sfxGain = audioCtx.createGain(); sfxGain.gain.value = sfxMuted ? 0 : 0.25; sfxGain.connect(audioCtx.destination);
    musicGain = audioCtx.createGain(); musicGain.gain.value = musicMuted ? 0 : MUSIC_VOL; musicGain.connect(audioCtx.destination);
    fetch('crossing-the-chasm.mp3').then(function(r){return r.arrayBuffer();}).then(function(buf){return audioCtx.decodeAudioData(buf);}).then(function(decoded){musicBuffer=decoded;}).catch(function(){
      musicFallback = new Audio('crossing-the-chasm.mp3');
      musicFallback.loop = true;
      musicFallback.volume = musicMuted ? 0 : MUSIC_VOL;
    });
  }
  function loadAudioPrefs() {
    try {
      musicMuted = localStorage.getItem('mdg_lensofwar_music') === '0';
      sfxMuted = localStorage.getItem('mdg_lensofwar_sfx') === '0';
    } catch (e) { /* ignore */ }
    var mb = document.getElementById('title-music');
    var sb = document.getElementById('title-sfx');
    if (mb) mb.textContent = musicMuted ? 'Music: OFF' : 'Music: ON';
    if (sb) sb.textContent = sfxMuted ? 'Sound: OFF' : 'Sound: ON';
  }
  function toggleMusic() {
    musicMuted = !musicMuted;
    if (musicGain) musicGain.gain.value = musicMuted ? 0 : MUSIC_VOL;
    if (musicFallback) musicFallback.volume = musicMuted ? 0 : MUSIC_VOL;
    var mb = document.getElementById('title-music');
    if (mb) mb.textContent = musicMuted ? 'Music: OFF' : 'Music: ON';
    try { localStorage.setItem('mdg_lensofwar_music', musicMuted ? '0' : '1'); } catch (e) { /* ignore */ }
  }
  function toggleSfx() {
    sfxMuted = !sfxMuted;
    if (sfxGain) sfxGain.gain.value = sfxMuted ? 0 : 0.25;
    var sb = document.getElementById('title-sfx');
    if (sb) sb.textContent = sfxMuted ? 'Sound: OFF' : 'Sound: ON';
    try { localStorage.setItem('mdg_lensofwar_sfx', sfxMuted ? '0' : '1'); } catch (e) { /* ignore */ }
  }
  function playSound(name) {
    if (!audioCtx || audioCtx.state === 'suspended') return;
    var t = audioCtx.currentTime; var osc, gain;
    switch (name) {
      case 'hit': osc=audioCtx.createOscillator();gain=audioCtx.createGain();osc.type='square';osc.frequency.setValueAtTime(200,t);osc.frequency.exponentialRampToValueAtTime(80,t+0.08);gain.gain.setValueAtTime(0.2,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.1);osc.connect(gain);gain.connect(sfxGain);osc.start(t);osc.stop(t+0.1);break;
      case 'death': osc=audioCtx.createOscillator();gain=audioCtx.createGain();osc.type='sawtooth';osc.frequency.setValueAtTime(400,t);osc.frequency.exponentialRampToValueAtTime(50,t+0.3);gain.gain.setValueAtTime(0.15,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.35);osc.connect(gain);gain.connect(sfxGain);osc.start(t);osc.stop(t+0.35);break;
      case 'spawn': osc=audioCtx.createOscillator();gain=audioCtx.createGain();osc.type='sine';osc.frequency.setValueAtTime(300,t);osc.frequency.exponentialRampToValueAtTime(600,t+0.1);gain.gain.setValueAtTime(0.15,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.15);osc.connect(gain);gain.connect(sfxGain);osc.start(t);osc.stop(t+0.15);break;
      case 'evolve': [262,330,392,523].forEach(function(f,i){var o=audioCtx.createOscillator();var g=audioCtx.createGain();o.type='sine';o.frequency.value=f;var s=t+i*0.12;g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(0.2,s+0.05);g.gain.exponentialRampToValueAtTime(0.001,s+0.4);o.connect(g);g.connect(sfxGain);o.start(s);o.stop(s+0.4);});break;
      case 'special': osc=audioCtx.createOscillator();gain=audioCtx.createGain();osc.type='sawtooth';osc.frequency.setValueAtTime(100,t);osc.frequency.exponentialRampToValueAtTime(800,t+0.5);osc.frequency.exponentialRampToValueAtTime(100,t+1.0);gain.gain.setValueAtTime(0.2,t);gain.gain.linearRampToValueAtTime(0.2,t+0.8);gain.gain.exponentialRampToValueAtTime(0.001,t+1.2);osc.connect(gain);gain.connect(sfxGain);osc.start(t);osc.stop(t+1.2);break;
      case 'nav': osc=audioCtx.createOscillator();gain=audioCtx.createGain();osc.type='sine';osc.frequency.value=800;gain.gain.setValueAtTime(0.08,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.04);osc.connect(gain);gain.connect(sfxGain);osc.start(t);osc.stop(t+0.04);break;
      case 'error': osc=audioCtx.createOscillator();gain=audioCtx.createGain();osc.type='square';osc.frequency.value=100;gain.gain.setValueAtTime(0.12,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.2);osc.connect(gain);gain.connect(sfxGain);osc.start(t);osc.stop(t+0.2);break;
      case 'basehit': osc=audioCtx.createOscillator();gain=audioCtx.createGain();osc.type='square';osc.frequency.value=60;gain.gain.setValueAtTime(0.2,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.15);osc.connect(gain);gain.connect(sfxGain);osc.start(t);osc.stop(t+0.15);break;
      case 'heal': [392,523,659].forEach(function(f,i){var o=audioCtx.createOscillator();var g=audioCtx.createGain();o.type='sine';o.frequency.value=f;var s=t+i*0.15;g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(0.15,s+0.05);g.gain.exponentialRampToValueAtTime(0.001,s+0.5);o.connect(g);g.connect(sfxGain);o.start(s);o.stop(s+0.5);});break;
      case 'coin': osc=audioCtx.createOscillator();gain=audioCtx.createGain();osc.type='sine';osc.frequency.setValueAtTime(1200,t);osc.frequency.exponentialRampToValueAtTime(1800,t+0.06);gain.gain.setValueAtTime(0.1,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.12);osc.connect(gain);gain.connect(sfxGain);osc.start(t);osc.stop(t+0.12);break;
    }
  }
  var musicStartOffset = 0, musicStartedAt = 0;
  var musicRetry=null;
  function startMusic(){
    if(musicRetry){clearInterval(musicRetry);musicRetry=null;}
    if(!audioCtx){initAudio();if(audioCtx&&audioCtx.state==='suspended')audioCtx.resume();}
    if(musicFallback){stopMusic();musicFallback.currentTime=0;musicFallback.play().catch(function(){});return;}
    if(!musicBuffer){musicRetry=setInterval(function(){if(musicBuffer||musicFallback){clearInterval(musicRetry);musicRetry=null;startMusic();}},200);return;}
    stopMusic();musicSource=audioCtx.createBufferSource();musicSource.buffer=musicBuffer;musicSource.loop=true;musicSource.connect(musicGain);musicStartOffset=0;musicStartedAt=audioCtx.currentTime;musicSource.start(0);
  }
  function pauseMusic(){
    if(musicFallback){musicFallback.pause();return;}
    if(!musicSource)return;musicStartOffset+=(audioCtx.currentTime-musicStartedAt);try{musicSource.stop();}catch(e){}musicSource=null;
  }
  function resumeMusic(){
    if(musicFallback){musicFallback.play().catch(function(){});return;}
    if(!audioCtx||!musicBuffer||musicSource)return;musicSource=audioCtx.createBufferSource();musicSource.buffer=musicBuffer;musicSource.loop=true;musicSource.connect(musicGain);musicStartedAt=audioCtx.currentTime;musicSource.start(0,musicStartOffset%musicBuffer.duration);
  }
  function stopMusic(){
    if(musicFallback){musicFallback.pause();musicFallback.currentTime=0;return;}
    if(!musicSource)return;try{musicSource.stop();}catch(e){}musicSource=null;musicStartOffset=0;
  }

  // ==================== PERSISTENCE ====================
  function loadStats() { try { var d = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); return { wins: d.wins || 0, losses: d.losses || 0, bestTime: d.bestTime || Infinity, bestAge: d.bestAge || 0 }; } catch (e) { return { wins: 0, losses: 0, bestTime: Infinity, bestAge: 0 }; } }
  function saveStats(won) { try { var d = loadStats(); if (won) { d.wins++; d.bestTime = Math.min(d.bestTime, game.elapsed); } else { d.losses++; } d.bestAge = Math.max(d.bestAge, game.player.age); localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch (e) { /* ignore */ } }

  // ==================== UNIT CREATION ====================
  function createUnit(template, owner, x, ageIndex, colorIndex) {
    var hpMult = owner === 'enemy' ? game.diffConfig.enemyHPMult : 1.0;
    var dmgMult = owner === 'enemy' ? game.diffConfig.enemyDmgMult : 1.0;
    var hp = Math.floor(template.hp * hpMult);
    return {
      id: nextId++, name: template.name, owner: owner, x: x,
      hp: hp, maxHP: hp,
      meleeDmg: Math.floor(template.meleeDmg * dmgMult), rangedDmg: Math.floor(template.rangedDmg * dmgMult),
      meleeRange: template.meleeRange, rangedRange: template.rangedRange,
      speed: template.speed, attackCooldown: template.attackCooldown, lastAttackTime: -9999,
      width: template.width, height: template.height,
      color: AGES[ageIndex].playerColors[colorIndex], enemyColor: AGES[ageIndex].enemyColors[colorIndex],
      xpReward: template.xpReward, goldReward: template.goldReward,
      state: 'walking', deathTime: 0, projectileSpeed: template.projectileSpeed || 0,
      direction: owner === 'player' ? 1 : -1, isHeavy: colorIndex === 2
    };
  }

  function updateBuildQueue(dt) {
    var q = game.player.buildQueue; if (q.length === 0) return;
    q[0].remaining -= dt;
    if (q[0].remaining <= 0) {
      var item = q.shift();
      if (game.player.units.length < UNIT_CAP) { game.player.units.push(createUnit(item.template, 'player', PLAYER_BASE_X + 10, item.ageIndex, item.colorIndex)); playSound('spawn'); }
      game.hudDirty = true;
    }
  }

  // ==================== GAME LOOP (with GAME_SPEED multiplier) ====================
  function startGameLoop(){game.running=true;game.lastTime=performance.now();animFrameId=requestAnimationFrame(tick);}
  function stopGameLoop(){game.running=false;if(animFrameId){cancelAnimationFrame(animFrameId);animFrameId=null;}}
  function tick(now){if(!game.running)return;var dt=Math.min(now-game.lastTime,33.33)*GAME_SPEED;game.lastTime=now;if(!game.paused){game.elapsed+=dt;update(dt);}render();animFrameId=requestAnimationFrame(tick);}
  function update(dt){var dtScale=dt/16.67;updateBuildQueue(dt);updateUnits(dtScale);updateProjectiles(dtScale);updateTurrets();updateSpecialStrikes();updateEnemyAI();updatePassiveGold(dt);if(turretMenuOpen)updateTurretMenu();updateEffects();checkWinLose();}

  var lastGoldTick=0;
  function updatePassiveGold(dt){lastGoldTick+=dt;if(lastGoldTick>=1000){game.player.gold+=PASSIVE_GOLD_BASE+game.player.age;lastGoldTick-=1000;game.hudDirty=true;}}

  // ==================== UNITS (dual damage) ====================
  function updateUnits(dtScale) {
    updateUnitList(game.player.units, game.enemy.units, dtScale, 'player');
    updateUnitList(game.enemy.units, game.player.units, dtScale, 'enemy');
    for (var i = game.player.units.length - 1; i >= 0; i--) if (game.player.units[i].state === 'dead') game.player.units.splice(i, 1);
    for (var j = game.enemy.units.length - 1; j >= 0; j--) if (game.enemy.units[j].state === 'dead') game.enemy.units.splice(j, 1);
  }

  function updateUnitList(units, enemies, dtScale, owner) {
    var targetBaseX = owner === 'player' ? ENEMY_BASE_X : PLAYER_BASE_X;
    for (var i = 0; i < units.length; i++) {
      var u = units[i];
      if (u.state === 'dying') { if (game.elapsed - u.deathTime > 400) u.state = 'dead'; continue; }
      if (u.state === 'dead') continue;
      var target = null, targetDist = Infinity;
      for (var j = 0; j < enemies.length; j++) {
        var e = enemies[j]; if (e.state === 'dying' || e.state === 'dead') continue;
        var dist = Math.abs(u.x - e.x); if (dist < targetDist) { targetDist = dist; target = e; }
      }
      var distToBase = Math.abs(u.x - targetBaseX);

      if (target && targetDist <= u.meleeRange) {
        u.state = 'fighting';
        if (game.elapsed - u.lastAttackTime >= u.attackCooldown) { u.lastAttackTime = game.elapsed; applyDamage(u.meleeDmg, target, owner); }
      } else if (target && u.rangedDmg > 0 && targetDist <= u.rangedRange) {
        u.state = 'fighting';
        if (game.elapsed - u.lastAttackTime >= u.attackCooldown) { u.lastAttackTime = game.elapsed; spawnProjectile(u, target.x, GROUND_Y - target.height / 2, u.rangedDmg); }
      } else if (distToBase <= u.meleeRange + 20) {
        u.state = 'fighting';
        if (game.elapsed - u.lastAttackTime >= u.attackCooldown) { u.lastAttackTime = game.elapsed; attackBase(u.meleeDmg, owner); }
      } else {
        u.state = 'walking'; var blocked = false;
        for (var k = 0; k < units.length; k++) {
          if (k === i || units[k].state === 'dying' || units[k].state === 'dead') continue;
          var ahead = (u.direction === 1) ? (units[k].x > u.x && units[k].x - u.x < u.width + 4) : (units[k].x < u.x && u.x - units[k].x < u.width + 4);
          if (ahead) { blocked = true; break; }
        }
        if (!blocked) u.x += u.speed * u.direction * dtScale;
      }
    }
  }

  function applyDamage(damage, target, attackerOwner) {
    target.hp -= damage; spawnEffect('hit', target.x, GROUND_Y - target.height); playSound('hit');
    if (target.hp <= 0) killUnit(target, attackerOwner);
  }
  function killUnit(unit, killerOwner) {
    unit.state = 'dying'; unit.deathTime = game.elapsed; playSound('death');
    if (killerOwner === 'player') { game.player.gold += unit.goldReward; game.player.xp += unit.xpReward; spawnEffect('goldpop', unit.x, GROUND_Y - unit.height - 8, { amount: unit.goldReward }); playSound('coin'); }
    else { game.enemy.ai.evolveXP += unit.xpReward; }
    if (unit.owner === 'player') game.player.xp += Math.floor(unit.xpReward * 0.1);
    game.hudDirty = true;
  }
  function attackBase(damage, unitOwner) {
    var side = unitOwner === 'player' ? game.enemy : game.player;
    side.baseHP -= damage; if (side.baseHP < 0) side.baseHP = 0;
    spawnEffect('hit', unitOwner === 'player' ? ENEMY_BASE_X : PLAYER_BASE_X, GROUND_Y - 30); playSound('basehit'); game.hudDirty = true;
  }

  // ==================== PROJECTILES ====================
  function spawnProjectile(unit, targetX, targetY, damage) {
    var startY = GROUND_Y - unit.height / 2, dx = targetX - unit.x, dy = targetY - startY, dist = Math.sqrt(dx*dx+dy*dy)||1;
    var spd = unit.projectileSpeed || 4;
    game.projectiles.push({x:unit.x,y:startY,vx:(dx/dist)*spd,vy:(dy/dist)*spd,damage:damage,owner:unit.owner,color:unit.owner==='player'?'#FFFF00':'#FF8800',life:0});
  }
  function updateProjectiles(dtScale) {
    for (var i = game.projectiles.length - 1; i >= 0; i--) {
      var p = game.projectiles[i]; p.x += p.vx * dtScale; p.y += p.vy * dtScale; p.life += dtScale;
      if (p.x < 0 || p.x > 600 || p.y < 0 || p.y > GROUND_Y + 10 || p.life > 120) { game.projectiles.splice(i, 1); continue; }
      var targets = p.owner === 'player' ? game.enemy.units : game.player.units; var hit = false;
      for (var j = 0; j < targets.length; j++) {
        var t = targets[j]; if (t.state === 'dying' || t.state === 'dead') continue;
        if (Math.abs(p.x - t.x) < t.width + 4 && p.y > GROUND_Y - t.height - 4 && p.y < GROUND_Y + 4) {
          t.hp -= p.damage; spawnEffect('hit', p.x, p.y); playSound('hit'); if (t.hp <= 0) killUnit(t, p.owner); hit = true; break;
        }
      }
      if (!hit) { var baseX = p.owner === 'player' ? ENEMY_BASE_X : PLAYER_BASE_X;
        if (Math.abs(p.x - baseX) < 35 && p.y > GROUND_Y - 70) { var side = p.owner === 'player' ? game.enemy : game.player; side.baseHP -= p.damage; if (side.baseHP < 0) side.baseHP = 0; spawnEffect('hit', p.x, p.y); playSound('basehit'); game.hudDirty = true; hit = true; }
      }
      if (hit) game.projectiles.splice(i, 1);
    }
  }

  // ==================== TURRETS ====================
  function getTurretX(owner, slotIdx) { var baseX = owner === 'player' ? PLAYER_BASE_X : ENEMY_BASE_X; return baseX + (owner === 'player' ? 1 : -1) * (15 + slotIdx * 18); }
  function updateTurrets() { fireTurretsForSide('player', game.player, game.enemy.units); fireTurretsForSide('enemy', game.enemy, game.player.units); }
  function fireTurretsForSide(owner, side, targets) {
    var baseX = owner === 'player' ? PLAYER_BASE_X : ENEMY_BASE_X;
    for (var s = 0; s < side.turretSlots; s++) {
      var turret = side.turrets[s]; if (!turret) continue;
      var tDef = AGES[turret.age].turrets[turret.tier], tx = getTurretX(owner, s), ty = GROUND_Y - 52;
      var best = null, bestBaseDist = Infinity;
      for (var i = 0; i < targets.length; i++) { var u = targets[i]; if (u.state === 'dying' || u.state === 'dead') continue; var dT = Math.abs(u.x - tx), dB = Math.abs(u.x - baseX); if (dT <= tDef.range && dB < bestBaseDist) { bestBaseDist = dB; best = u; } }
      if (best) { turret.targetX = best.x; turret.targetY = GROUND_Y - best.height / 2; } else { turret.targetX = tx + (owner === 'player' ? 100 : -100); turret.targetY = ty; }
      if (best && game.elapsed - turret.lastFired >= tDef.cooldown) {
        turret.lastFired = game.elapsed; var dx = best.x - tx, dy = (GROUND_Y - best.height / 2) - ty, dist = Math.sqrt(dx*dx+dy*dy)||1;
        game.projectiles.push({x:tx,y:ty,vx:(dx/dist)*5.5,vy:(dy/dist)*5.5,damage:tDef.damage,owner:owner,color:tDef.projColor,life:0});
      }
    }
  }

  // ==================== TURRET MENU ====================
  function getWeakestTurretSlot(side){var w=-1,wAge=99,wTier=99;for(var s=0;s<side.turretSlots;s++){if(!side.turrets[s])continue;var ta=side.turrets[s].age,tt=side.turrets[s].tier;if(ta<wAge||(ta===wAge&&tt<wTier)){wAge=ta;wTier=tt;w=s;}}return w;}
  function canBuyTurretTier(side,tier){for(var s=0;s<side.turretSlots;s++)if(!side.turrets[s])return true;for(var t=0;t<side.turretSlots;t++){if(!side.turrets[t])continue;if(side.turrets[t].age<side.age)return true;if(side.turrets[t].tier<tier)return true;}return false;}
  function buyTurret(side,tier){for(var s=0;s<side.turretSlots;s++)if(!side.turrets[s]){side.turrets[s]={tier:tier,age:side.age,lastFired:0,targetX:0,targetY:0};return;}var w=getWeakestTurretSlot(side);if(w>=0)side.turrets[w]={tier:tier,age:side.age,lastFired:0,targetX:0,targetY:0};}
  function openTurretMenu(){turretMenuOpen=true;document.getElementById('turret-overlay').classList.remove('hidden');updateTurretMenu();var b=document.querySelector('#turret-overlay .turret-opt');if(b)b.focus();}
  function closeTurretMenu(){turretMenuOpen=false;document.getElementById('turret-overlay').classList.add('hidden');var b=document.querySelectorAll('#hud-bottom .action-btn');if(b.length)b[3].focus();}
  function updateTurretMenu(){var pAge=AGES[game.player.age],side=game.player;var parts=[];for(var s=0;s<2;s++){var l='Slot '+(s+1)+': ';if(s>=side.turretSlots)l+='locked';else if(!side.turrets[s])l+='empty';else l+=AGES[side.turrets[s].age].turrets[side.turrets[s].tier].name;parts.push(l);}document.getElementById('turret-status').textContent=parts.join('  |  ');for(var tier=0;tier<3;tier++){var tDef=pAge.turrets[tier];document.getElementById('topt-'+tier+'-name').textContent=tDef.name;document.getElementById('topt-'+tier+'-cost').textContent=tDef.cost+'g';document.getElementById('topt-'+tier).classList.toggle('cannot-afford',!canBuyTurretTier(side,tier)||side.gold<tDef.cost);}document.getElementById('topt-slot-cost').textContent=pAge.slotCost+'g';document.getElementById('topt-slot').classList.toggle('cannot-afford',side.turretSlots>=2||side.gold<pAge.slotCost);var hasTurrets=false;for(var si=0;si<side.turretSlots;si++)if(side.turrets[si])hasTurrets=true;var sellEl=document.getElementById('topt-sell');if(hasTurrets){var wk=getWeakestTurretSlot(side);var sellVal=wk>=0?Math.floor(AGES[side.turrets[wk].age].turrets[side.turrets[wk].tier].cost*0.5):0;document.getElementById('topt-sell-cost').textContent='+'+sellVal+'g';}else document.getElementById('topt-sell-cost').textContent='--';sellEl.classList.toggle('cannot-afford',!hasTurrets);}
  function handleTurretMenuAction(a){var pAge=AGES[game.player.age];if(a==='back'){closeTurretMenu();return;}if(a==='sell'){var w=getWeakestTurretSlot(game.player);if(w>=0){var sellAge=game.player.turrets[w].age;var sellTier=game.player.turrets[w].tier;var refund=Math.floor(AGES[sellAge].turrets[sellTier].cost*0.5);game.player.gold+=refund;game.player.turrets[w]=null;playSound('coin');spawnEffect('goldpop',PLAYER_BASE_X,GROUND_Y-60,{amount:refund});}else playSound('error');}else if(a==='slot'){if(game.player.turretSlots<2&&game.player.gold>=pAge.slotCost){game.player.gold-=pAge.slotCost;game.player.turretSlots=2;playSound('spawn');}else playSound('error');}else{var tier=parseInt(a),tDef=pAge.turrets[tier];if(canBuyTurretTier(game.player,tier)&&game.player.gold>=tDef.cost){game.player.gold-=tDef.cost;buyTurret(game.player,tier);playSound('spawn');}else playSound('error');}game.hudDirty=true;updateTurretMenu();}

  // ==================== ENEMY AI ====================
  function updateEnemyAI() {
    var ai = game.enemy.ai, dc = game.diffConfig;
    ai.aggression = Math.min(1.0, 0.3 + game.elapsed / 300000);
    ai.spawnInterval = Math.max(4000, 6500 - game.elapsed / 220) * dc.enemySpawnMult;
    if (game.elapsed >= ai.nextSpawnTime && game.enemy.units.length < UNIT_CAP) {
      var ageData = AGES[game.enemy.age], roll = Math.random();
      var idx = roll < 0.6 - ai.aggression * 0.08 ? 0 : roll < 0.94 - ai.aggression * 0.04 ? 1 : 2;
      game.enemy.units.push(createUnit(ageData.units[idx], 'enemy', ENEMY_BASE_X - 10, game.enemy.age, idx));
      ai.nextSpawnTime = game.elapsed + ai.spawnInterval * (0.7 + Math.random() * 0.5);
    }
    var evolveThreshold = AGES[game.enemy.age].xpToNext / dc.enemyEvolveRate;
    if (game.enemy.age < AGES.length - 1 && ai.evolveXP >= evolveThreshold) {
      game.enemy.age++; ai.evolveXP = 0; game.enemy.baseMaxHP += BASE_HP_EVOLVE_BONUS;
      game.enemy.baseHP = Math.min(game.enemy.baseHP + BASE_HP_EVOLVE_BONUS, game.enemy.baseMaxHP);
      game.enemy.turretSlots = 1; game.enemy.turrets = [null, null];
      spawnEffect('evolve', ENEMY_BASE_X, GROUND_Y - 40); game.hudDirty = true;
    }
    if (game.elapsed > 20000) {
      for (var s = 0; s < game.enemy.turretSlots; s++) if (!game.enemy.turrets[s]) { game.enemy.turrets[s] = {tier:0,age:game.enemy.age,lastFired:0,targetX:0,targetY:0}; break; }
      if (game.elapsed % 45000 < 100) for (var t = 0; t < game.enemy.turretSlots; t++) if (game.enemy.turrets[t] && game.enemy.turrets[t].tier < 2) { game.enemy.turrets[t].tier++; break; }
      if (game.enemy.turretSlots < 2 && game.elapsed > 100000) game.enemy.turretSlots = 2;
    }
  }

  // ==================== SPECIAL ATTACKS ====================
  function fireSpecial(targetX) {
    var spec = AGES[game.player.age].special;
    if (spec.isHeal) {
      for (var i = 0; i < game.player.units.length; i++) { var u = game.player.units[i]; if (u.state !== 'dying' && u.state !== 'dead') u.hp = Math.min(u.maxHP, u.hp + spec.healAmount); }
      spawnEffect('heal', PLAYER_BASE_X + 100, GROUND_Y - 60); playSound('heal');
    } else {
      var num = 6 + Math.floor(Math.random() * 5), dmg = Math.floor(spec.damage / num * 1.3); playSound('special');
      for (var s = 0; s < num; s++) { var delay = (s / num) * 3000 + Math.random() * (3000 / num); var sx = Math.max(80, Math.min(520, targetX + (Math.random() - 0.5) * spec.radius));
        game.specialStrikes.push({time:game.elapsed+delay,x:sx,damage:dmg,radius:30+Math.random()*20,color:spec.color,age:game.player.age,owner:'player'}); }
    }
  }
  function fireEnemySpecial(targetX) {
    var spec = AGES[game.enemy.age].special;
    var num = 6 + Math.floor(Math.random() * 5), dmg = Math.floor(spec.damage / num * 1.3); playSound('special');
    for (var s = 0; s < num; s++) { var delay = (s / num) * 3000 + Math.random() * (3000 / num); var sx = Math.max(80, Math.min(520, targetX + (Math.random() - 0.5) * spec.radius));
      game.specialStrikes.push({time:game.elapsed+delay,x:sx,damage:dmg,radius:30+Math.random()*20,color:spec.color,age:game.enemy.age,owner:'enemy'}); }
  }
  function updateSpecialStrikes() {
    for (var i = game.specialStrikes.length - 1; i >= 0; i--) { var st = game.specialStrikes[i];
      if (game.elapsed >= st.time) { game.specialStrikes.splice(i, 1);
        var targets = st.owner === 'enemy' ? game.player.units : game.enemy.units;
        var killerOwner = st.owner === 'enemy' ? 'enemy' : 'player';
        for (var j = 0; j < targets.length; j++) { var t = targets[j]; if (t.state === 'dying' || t.state === 'dead') continue; if (Math.abs(t.x - st.x) <= st.radius) { t.hp -= st.damage; if (t.hp <= 0) killUnit(t, killerOwner); } }
        spawnEffect('strike', st.x, GROUND_Y - 5, {color:st.color,age:st.age}); playSound('hit'); } }
  }
  function findCluster(units){if(units.length===0)return null;if(units.length===1)return units[0].x;var bx=units[0].x,bc=0;for(var i=0;i<units.length;i++){if(units[i].state==='dying')continue;var c=0;for(var j=0;j<units.length;j++)if(units[j].state!=='dying'&&Math.abs(units[i].x-units[j].x)<=80)c++;if(c>bc){bc=c;bx=units[i].x;}}return bx;}

  // ==================== EFFECTS ====================
  function spawnEffect(type,x,y,extra){var dur=type==='hit'?200:type==='evolve'?1200:type==='heal'?1500:type==='special'?3500:type==='strike'?500:type==='goldpop'?1200:300;game.effects.push({type:type,x:x,y:y,startTime:game.elapsed,duration:dur,extra:extra||{}});}
  function updateEffects(){for(var i=game.effects.length-1;i>=0;i--)if(game.elapsed-game.effects[i].startTime>=game.effects[i].duration)game.effects.splice(i,1);}

  function checkWinLose(){if(game.enemy.baseHP<=0)endGame('win');else if(game.player.baseHP<=0)endGame('lose');}
  function endGame(result){stopGameLoop();stopMusic();saveStats(result==='win');document.getElementById('result-title').textContent=result==='win'?'VICTORY!':'DEFEAT';document.getElementById('result-title').style.color=result==='win'?'#00FF88':'#FF4466';document.getElementById('result-time').textContent=formatTime(game.elapsed);document.getElementById('result-age').textContent=AGES[game.player.age].name;document.getElementById('result-units').textContent=totalUnitsSpawned;playSound(result==='win'?'evolve':'death');navigateTo('result-screen',{addToHistory:false});}
  function formatTime(ms){var s=Math.floor(ms/1000);var m=Math.floor(s/60);s%=60;return m+':'+(s<10?'0':'')+s;}

  // ==================== RENDER ====================
  function render(){if(!ctx)return;ctx.clearRect(0,0,600,600);ctx.save();ctx.translate(300,300);ctx.scale(1.18,1.18);ctx.translate(-300,-370);drawBackground();drawBases();drawTurretsOnBase();drawUnits();drawProjectiles();drawEffects();ctx.restore();updateHUD();}

  function drawBackground() {
    var bgAge = Math.max(game.player.age, game.enemy.age);
    var t = game.elapsed / 1000;
    var sky=[['#0a0a1a','#0f1a0f'],['#0a0a1a','#14142a'],['#0f0a0a','#1a1410'],['#0a0a0f','#0f1a0f'],['#0a0a1a','#0a1a2a']];
    var gnd=['#1a1a0a','#1a1a10','#1a1610','#141a14','#0a1a1a'];
    var grad=ctx.createLinearGradient(0,48,0,GROUND_Y);grad.addColorStop(0,sky[bgAge][0]);grad.addColorStop(1,sky[bgAge][1]);
    ctx.fillStyle=grad;ctx.fillRect(0,48,600,GROUND_Y-48);ctx.fillStyle=gnd[bgAge];ctx.fillRect(0,GROUND_Y,600,180);
    ctx.strokeStyle='#2a3a1a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,GROUND_Y);ctx.lineTo(600,GROUND_Y);ctx.stroke();
    ctx.save();
    // Clouds (all ages)
    drawClouds(t, bgAge);
    // Age-specific scenery
    switch(bgAge) {
      case 0: drawStoneAgeBG(t); break;
      case 1: drawMedievalBG(t); break;
      case 2: drawRenaissanceBG(t); break;
      case 3: drawModernBG(t); break;
      case 4: drawFutureBG(t); break;
    }
    ctx.restore();
  }
  function drawClouds(t, age) {
    var cc=['#1a2a2a','#1a2a3a','#2a2020','#1a2a1a','#1a2a3a'][age];
    ctx.fillStyle=cc;
    for(var i=0;i<5;i++){
      ctx.globalAlpha=0.1+i*0.02;
      var cx=((t*(5+i*2.5)+i*140)%780)-80;
      var cy=80+i*35+Math.sin(t*0.2+i*1.7)*8;
      var w=35+i*10;
      ctx.beginPath();ctx.arc(cx,cy,w*0.28,0,Math.PI*2);ctx.arc(cx+w*0.25,cy-w*0.12,w*0.32,0,Math.PI*2);ctx.arc(cx+w*0.55,cy,w*0.25,0,Math.PI*2);ctx.fill();
    }
  }
  function drawBird(x,y,sz){ctx.beginPath();ctx.moveTo(x-sz,y+sz*0.4);ctx.quadraticCurveTo(x-sz*0.3,y-sz*0.5,x,y);ctx.quadraticCurveTo(x+sz*0.3,y-sz*0.5,x+sz,y+sz*0.4);ctx.stroke();}
  function drawBirds(t,count){ctx.strokeStyle='#3a3a2a';ctx.lineWidth=1.5;ctx.globalAlpha=0.25;for(var i=0;i<count;i++){var bx=((t*(30+i*12)+i*200)%750)-50;var by=100+i*50+Math.sin(t*2+i*3)*6;drawBird(bx,by,5+i);}}
  function drawMountains(baseY,color,peaks,height){ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-10,baseY);for(var i=0;i<peaks.length;i++){var x=peaks[i][0],h=peaks[i][1]*height;ctx.lineTo(x,baseY-h);}ctx.lineTo(610,baseY);ctx.closePath();ctx.fill();}
  function drawPineTree(x,gy,sz,c){ctx.fillStyle='#1a1008';ctx.fillRect(x-1,gy-sz*0.4,2,sz*0.4);ctx.fillStyle=c;for(var i=0;i<3;i++){var w=sz*(0.6-i*0.15),ty=gy-sz*0.3-i*sz*0.35;ctx.beginPath();ctx.moveTo(x-w,ty+sz*0.3);ctx.lineTo(x,ty);ctx.lineTo(x+w,ty+sz*0.3);ctx.closePath();ctx.fill();}}
  function drawStoneAgeBG(t){
    ctx.globalAlpha=0.1;drawMountains(340,'#14240a',[[0,0.3],[80,0.7],[180,0.5],[260,0.9],[340,0.4],[440,0.8],[520,0.6],[600,0.3]],180);
    ctx.globalAlpha=0.15;drawMountains(370,'#1a2a0a',[[0,0.2],[100,0.5],[200,0.7],[300,0.3],[400,0.6],[500,0.4],[600,0.2]],120);
    // Snow caps
    ctx.globalAlpha=0.08;ctx.fillStyle='#4a5a4a';
    ctx.beginPath();ctx.moveTo(240,340-0.9*180);ctx.lineTo(260,340-0.9*180+20);ctx.lineTo(280,340-0.9*180);ctx.fill();
    ctx.beginPath();ctx.moveTo(420,340-0.8*180);ctx.lineTo(440,340-0.8*180+16);ctx.lineTo(460,340-0.8*180);ctx.fill();
    // Trees along ground
    ctx.globalAlpha=0.2;
    var treePositions=[110,170,230,310,370,430,490];
    for(var i=0;i<treePositions.length;i++){drawPineTree(treePositions[i],GROUND_Y,12+((i*7)%6),'#1a3a1a');}
    // Rocks
    ctx.fillStyle='#2a2a1a';ctx.globalAlpha=0.2;
    ctx.beginPath();ctx.arc(200,GROUND_Y-4,8,0,Math.PI,true);ctx.fill();
    ctx.beginPath();ctx.arc(400,GROUND_Y-3,6,0,Math.PI,true);ctx.fill();
    // Birds
    drawBirds(t,3);
  }
  function drawMedievalBG(t){
    // Rolling green hills
    ctx.globalAlpha=0.12;ctx.fillStyle='#142a14';
    ctx.beginPath();ctx.moveTo(0,380);
    for(var i=0;i<=600;i+=30)ctx.lineTo(i,340+Math.sin(i*0.012)*30+Math.sin(i*0.025)*15);
    ctx.lineTo(600,GROUND_Y);ctx.lineTo(0,GROUND_Y);ctx.fill();
    // Distant castles
    ctx.globalAlpha=0.15;ctx.fillStyle='#2a2a3a';
    ctx.fillRect(130,260,30,80);ctx.fillRect(140,240,10,20);
    for(var i=0;i<3;i++)ctx.fillRect(131+i*10,254,6,6);
    ctx.fillRect(430,280,25,60);ctx.fillRect(438,265,9,15);
    for(var i=0;i<2;i++)ctx.fillRect(432+i*10,274,6,6);
    // Windmill
    ctx.globalAlpha=0.18;ctx.fillStyle='#2a2a2a';
    ctx.fillRect(285,310,10,30);
    ctx.save();ctx.translate(290,310);ctx.rotate(t*0.5);
    ctx.fillStyle='#3a3a3a';
    for(var i=0;i<4;i++){ctx.save();ctx.rotate(i*Math.PI/2);ctx.fillRect(-2,0,4,20);ctx.restore();}
    ctx.restore();
    // Trees
    ctx.globalAlpha=0.2;
    drawPineTree(180,GROUND_Y,12,'#142a14');drawPineTree(350,GROUND_Y,10,'#142a14');drawPineTree(480,GROUND_Y,14,'#142a14');
    // Birds
    drawBirds(t,2);
  }
  function drawRenaissanceBG(t){
    // City skyline
    ctx.globalAlpha=0.12;ctx.fillStyle='#2a1a1a';
    var blds=[[100,55],[130,40],[160,65],[200,45],[240,70],[280,35],[330,80],[370,50],[410,60],[450,40],[490,50],[530,35]];
    for(var i=0;i<blds.length;i++){var bx=blds[i][0],bh=blds[i][1];ctx.fillRect(bx-8,GROUND_Y-bh,16,bh);}
    // Church dome
    ctx.globalAlpha=0.15;ctx.fillStyle='#2a2020';
    ctx.fillRect(290,GROUND_Y-90,20,90);
    ctx.beginPath();ctx.arc(300,GROUND_Y-90,14,Math.PI,0);ctx.fill();
    ctx.fillRect(298,GROUND_Y-110,4,20);
    // Second dome
    ctx.fillRect(180,GROUND_Y-70,16,70);
    ctx.beginPath();ctx.arc(188,GROUND_Y-70,10,Math.PI,0);ctx.fill();
    // Sailing ship
    ctx.globalAlpha=0.12;
    var shipX=((t*15+100)%750)-50;
    ctx.fillStyle='#3a2a1a';
    ctx.fillRect(shipX-12,370,24,8);
    ctx.fillRect(shipX-1,340,2,30);
    ctx.fillStyle='#3a3a2a';
    ctx.beginPath();ctx.moveTo(shipX+1,345);ctx.lineTo(shipX+14,360);ctx.lineTo(shipX+1,365);ctx.fill();
    // Birds
    drawBirds(t,2);
  }
  function drawModernBG(t){
    // Dense city skyline
    ctx.globalAlpha=0.12;ctx.fillStyle='#1a1a2a';
    var blds=[[90,90],[110,60],[130,110],[155,70],[175,130],[200,80],[225,100],[250,60],[275,140],[300,90],[325,70],[350,120],[375,80],[400,95],[425,60],[450,110],[475,75],[500,85],[525,50]];
    for(var i=0;i<blds.length;i++){var bx=blds[i][0],bh=blds[i][1];ctx.fillRect(bx-7,GROUND_Y-bh,14,bh);
    // Windows
    ctx.fillStyle='#2a2a3a';for(var r=0;r<Math.floor(bh/14);r++){ctx.fillRect(bx-4,GROUND_Y-bh+5+r*14,3,5);ctx.fillRect(bx+1,GROUND_Y-bh+5+r*14,3,5);}ctx.fillStyle='#1a1a2a';}
    // Antenna tower
    ctx.globalAlpha=0.15;ctx.fillStyle='#2a2a2a';
    ctx.fillRect(298,GROUND_Y-160,4,160);
    ctx.fillRect(290,GROUND_Y-145,20,4);
    ctx.fillRect(293,GROUND_Y-130,14,3);
    ctx.fillStyle='#FF2222';ctx.globalAlpha=0.2+Math.sin(t*3)*0.1;
    ctx.beginPath();ctx.arc(300,GROUND_Y-160,3,0,Math.PI*2);ctx.fill();
    // Plane
    ctx.globalAlpha=0.15;
    var planeX=((t*25)%800)-80;
    var planeY=100+Math.sin(t*0.3)*15;
    ctx.fillStyle='#3a3a3a';
    ctx.fillRect(planeX-15,planeY,30,4);
    ctx.fillRect(planeX-3,planeY-6,6,12);
    ctx.beginPath();ctx.moveTo(planeX-15,planeY);ctx.lineTo(planeX-20,planeY-5);ctx.lineTo(planeX-15,planeY+4);ctx.fill();
    // Second plane (opposite direction, higher)
    var p2x=700-((t*18+300)%800);
    ctx.fillRect(p2x-12,140,24,3);
    ctx.fillRect(p2x-2,134,4,9);
  }
  function drawFutureBG(t){
    // Futuristic spires
    ctx.globalAlpha=0.1;
    var spires=[[120,140,'#00AAAA'],[200,100,'#00AA66'],[280,170,'#6644AA'],[360,120,'#0088FF'],[440,150,'#AA44FF'],[520,90,'#00FFAA']];
    for(var i=0;i<spires.length;i++){var sx=spires[i][0],sh=spires[i][1],sc=spires[i][2];
    ctx.fillStyle=sc;ctx.beginPath();ctx.moveTo(sx-4,GROUND_Y);ctx.lineTo(sx,GROUND_Y-sh);ctx.lineTo(sx+4,GROUND_Y);ctx.closePath();ctx.fill();
    ctx.fillRect(sx-1,GROUND_Y-sh,2,sh);}
    // Hovering platforms
    ctx.globalAlpha=0.12;
    for(var i=0;i<3;i++){var px=150+i*160,py=200+Math.sin(t*0.6+i*2)*20;
    ctx.fillStyle='#1a3a4a';ctx.fillRect(px-18,py,36,4);
    ctx.fillStyle='#00FFFF';ctx.globalAlpha=0.06;ctx.fillRect(px-14,py+4,28,60);ctx.globalAlpha=0.12;}
    // Energy ring
    ctx.strokeStyle='#00FFFF';ctx.lineWidth=1;ctx.globalAlpha=0.08+Math.sin(t*1.5)*0.04;
    ctx.beginPath();ctx.arc(300,250,80+Math.sin(t)*10,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.arc(300,250,50+Math.cos(t*1.3)*8,0,Math.PI*2);ctx.stroke();
    // Flying vehicle
    ctx.globalAlpha=0.15;
    var vx=((t*35)%800)-80,vy=120+Math.sin(t*0.8)*20;
    ctx.fillStyle='#00CCCC';
    ctx.beginPath();ctx.moveTo(vx+16,vy);ctx.lineTo(vx-10,vy-4);ctx.lineTo(vx-10,vy+4);ctx.closePath();ctx.fill();
    ctx.fillStyle='#00FFFF';ctx.globalAlpha=0.1;ctx.fillRect(vx-14,vy-1,4,2);
  }

  function drawBases(){drawBase('player',PLAYER_BASE_X,game.player.age);drawBase('enemy',ENEMY_BASE_X,game.enemy.age);}
  function drawBase(owner,bx,ai){var age=AGES[ai],bW=60,bH=60,x=bx-bW/2,y=GROUND_Y-bH;ctx.fillStyle=age.baseColor;ctx.fillRect(x,y,bW,bH);ctx.fillStyle=age.roofColor;switch(ai){case 0:ctx.beginPath();ctx.moveTo(x-5,y);ctx.lineTo(bx,y-25);ctx.lineTo(x+bW+5,y);ctx.closePath();ctx.fill();break;case 1:for(var i=0;i<4;i++)ctx.fillRect(x+i*16+1,y-10,10,10);break;case 2:ctx.fillRect(x-3,y-8,bW+6,8);ctx.fillStyle='#DAA520';ctx.fillRect(bx-4,y-6,8,4);break;case 3:ctx.fillRect(x-5,y,bW+10,8);ctx.fillStyle='#555';ctx.fillRect(x+5,y+10,8,8);ctx.fillRect(x+bW-13,y+10,8,8);break;case 4:ctx.beginPath();ctx.arc(bx,y,30,Math.PI,0);ctx.fill();ctx.fillStyle='#00FFFF';ctx.globalAlpha=0.3;ctx.beginPath();ctx.arc(bx,y,24,Math.PI,0);ctx.fill();ctx.globalAlpha=1.0;break;}ctx.fillStyle='#0a0a0f';ctx.fillRect(owner==='player'?x+bW-14:x+4,y+bH-22,10,22);ctx.fillStyle=owner==='player'?'#00d4ff':'#ff4466';ctx.fillRect(bx-1,y-35,2,35);var fd=owner==='player'?1:-1;ctx.beginPath();ctx.moveTo(bx+fd,y-35);ctx.lineTo(bx+fd+fd*14,y-30);ctx.lineTo(bx+fd,y-25);ctx.closePath();ctx.fill();}

  function drawTurretsOnBase(){drawSideTurrets('player',game.player);drawSideTurrets('enemy',game.enemy);}
  function drawSideTurrets(owner,side){for(var s=0;s<side.turretSlots;s++){var turret=side.turrets[s];if(!turret)continue;var tDef=AGES[turret.age].turrets[turret.tier],tx=getTurretX(owner,s),ty=GROUND_Y-52,tier=turret.tier;var ax=turret.targetX||(tx+(owner==='player'?100:-100)),ay=turret.targetY||ty,angle=Math.atan2(ay-ty,ax-tx);ctx.save();ctx.fillStyle=tDef.color;if(tier===0)ctx.fillRect(tx-5,ty+4,10,10);else if(tier===1)ctx.fillRect(tx-6,ty+2,12,12);else{ctx.fillRect(tx-7,ty,14,14);ctx.fillStyle='#FFFFFF';ctx.globalAlpha=0.25;ctx.fillRect(tx-7,ty,14,4);ctx.globalAlpha=1.0;ctx.fillStyle=tDef.color;}var bLen=12+tier*5,bW=2+tier;ctx.translate(tx,ty+4);ctx.rotate(angle);ctx.fillRect(0,-bW/2,bLen,bW);if(tier===2){ctx.fillRect(0,-bW/2-2,bLen*0.7,2);ctx.fillRect(0,bW/2,bLen*0.7,2);}ctx.restore();}}

  function drawUnits(){var all=game.player.units.concat(game.enemy.units);for(var i=0;i<all.length;i++)drawUnit(all[i]);}
  function drawUnit(u){if(u.state==='dead')return;ctx.save();if(u.state==='dying')ctx.globalAlpha=Math.max(0,1.0-(game.elapsed-u.deathTime)/400);var walkBob=u.state==='walking'?Math.sin(game.elapsed*0.008*u.speed)*2:0;var x=u.x,y=GROUND_Y-u.height+walkBob,c=u.owner==='player'?u.color:u.enemyColor;ctx.fillStyle=c;if(u.isHeavy){ctx.fillRect(x-u.width/2-1,y+2,u.width+2,u.height-2);ctx.strokeStyle='#FFFFFF';ctx.lineWidth=1;ctx.strokeRect(x-u.width/2-1,y+2,u.width+2,u.height-2);}else ctx.fillRect(x-u.width/2,y+4,u.width,u.height-4);ctx.beginPath();ctx.arc(x,y+2,u.isHeavy?6:4,0,Math.PI*2);ctx.fill();if(u.rangedDmg>0){ctx.strokeStyle='#AAAAAA';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x+u.direction*6,y+12,5,-Math.PI/3*u.direction,Math.PI/3*u.direction);ctx.stroke();}else{ctx.strokeStyle='#CCCCCC';ctx.lineWidth=u.isHeavy?2.5:1.5;ctx.beginPath();ctx.moveTo(x+u.direction*u.width/2,y+12);ctx.lineTo(x+u.direction*(u.width/2+(u.isHeavy?12:8)),y+8);ctx.stroke();}if(u.hp<u.maxHP&&u.state!=='dying'){var bw=u.width+6;ctx.fillStyle='#333333';ctx.fillRect(x-bw/2,y-5,bw,3);ctx.fillStyle=u.hp/u.maxHP>0.3?'#00FF88':'#FF4466';ctx.fillRect(x-bw/2,y-5,bw*(u.hp/u.maxHP),3);}ctx.restore();}
  function drawProjectiles(){for(var i=0;i<game.projectiles.length;i++){var p=game.projectiles[i];ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill();}}

  function drawEffects(){for(var i=0;i<game.effects.length;i++){var e=game.effects[i],prog=(game.elapsed-e.startTime)/e.duration;ctx.save();ctx.globalAlpha=Math.max(0,1.0-prog);switch(e.type){case'hit':ctx.strokeStyle='#FFFFFF';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(e.x,e.y,4+prog*10,0,Math.PI*2);ctx.stroke();break;case'evolve':ctx.strokeStyle='#FFD700';ctx.lineWidth=3;ctx.beginPath();ctx.arc(e.x,e.y,prog*70,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#FFD700';for(var p=0;p<8;p++){var ang=(p/8)*Math.PI*2+prog*3,d=prog*50;ctx.beginPath();ctx.arc(e.x+Math.cos(ang)*d,e.y+Math.sin(ang)*d,2,0,Math.PI*2);ctx.fill();}break;case'heal':ctx.fillStyle='#00FF88';ctx.globalAlpha=(1-prog)*0.3;ctx.fillRect(0,GROUND_Y-80,600,80);ctx.globalAlpha=(1-prog)*0.8;for(var h=0;h<6;h++){ctx.font='bold 18px sans-serif';ctx.fillText('+',50+h*100,GROUND_Y-20-prog*60);}break;case'strike':var sc2=e.extra.color||'#FF4500';ctx.fillStyle=sc2;ctx.globalAlpha=(1-prog)*0.8;ctx.beginPath();ctx.arc(e.x,e.y,8+prog*18,0,Math.PI*2);ctx.fill();ctx.fillStyle='#FFFFFF';ctx.globalAlpha=(1-prog)*0.5;ctx.beginPath();ctx.arc(e.x,e.y,4+prog*6,0,Math.PI*2);ctx.fill();if(prog<0.3){ctx.strokeStyle=sc2;ctx.lineWidth=2;ctx.globalAlpha=(0.3-prog)*3;ctx.beginPath();ctx.moveTo(e.x+(Math.random()-0.5)*4,e.y-60*(1-prog/0.3));ctx.lineTo(e.x,e.y);ctx.stroke();}break;case'goldpop':ctx.fillStyle='#FFD700';ctx.font='bold 14px sans-serif';ctx.globalAlpha=Math.max(0,1.0-prog*1.2);ctx.fillText('+'+(e.extra.amount||0)+'g',e.x-15,e.y-prog*35);break;case'special':var spc=e.extra.color||'#FF4500',sai=e.extra.age||0;ctx.fillStyle=spc;if(sai===0||sai===1){for(var m=0;m<8;m++){var mx=e.x-80+m*22+Math.sin(m*1.5)*10,my=prog*(GROUND_Y+20)+m*20-40;if(my>GROUND_Y)continue;if(sai===0){ctx.beginPath();ctx.arc(mx,my,5,0,Math.PI*2);ctx.fill();}else{ctx.strokeStyle=spc;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(mx,my);ctx.lineTo(mx+3,my+14);ctx.stroke();}}}else if(sai===3){for(var a=0;a<5;a++){var ax2=e.x-60+a*30,dl=a*0.15,ap=Math.max(0,prog-dl)/(1-dl);if(ap<=0||ap>=1)continue;ctx.globalAlpha=(1-ap)*0.8;ctx.beginPath();ctx.arc(ax2,GROUND_Y-10,ap*25,0,Math.PI*2);ctx.fill();}}else{ctx.globalAlpha=(1-prog)*0.7;ctx.fillRect(e.x-10,48,20,GROUND_Y-48);ctx.fillStyle='#FFFFFF';ctx.globalAlpha=(1-prog)*0.5;ctx.fillRect(e.x-4,48,8,GROUND_Y-48);}break;}ctx.restore();}}

  // ==================== HUD ====================
  function updateHUD(){
    var pAge=AGES[game.player.age];
    document.getElementById('hud-gold-value').textContent=Math.floor(game.player.gold);
    document.getElementById('hud-age').textContent=pAge.name+(game.difficulty!=='normal'?' ['+game.diffConfig.label+']':'');
    var xpPct=pAge.xpToNext===Infinity?100:Math.min(100,(game.player.xp/pAge.xpToNext)*100);
    document.getElementById('hud-xp-fill').style.width=xpPct+'%';
    document.getElementById('player-hp-fill').style.width=Math.max(0,(game.player.baseHP/game.player.baseMaxHP)*100)+'%';
    document.getElementById('enemy-hp-fill').style.width=Math.max(0,(game.enemy.baseHP/game.enemy.baseMaxHP)*100)+'%';
    document.getElementById('player-hp-label').textContent=Math.max(0,Math.ceil(game.player.baseHP));
    document.getElementById('enemy-hp-label').textContent=Math.max(0,Math.ceil(game.enemy.baseHP));
    var qLen=game.player.buildQueue.length;
    for(var i=0;i<3;i++){var u=pAge.units[i];document.getElementById('action-'+i+'-name').textContent=u.name;var btn=document.getElementById('action-'+i);if(qLen>=MAX_QUEUE){document.getElementById('action-'+i+'-cost').textContent='Full';btn.classList.add('cannot-afford');}else{document.getElementById('action-'+i+'-cost').textContent=u.cost+'g';btn.classList.toggle('cannot-afford',game.player.gold<u.cost);}btn.classList.remove('on-cooldown');}
    var tC=0;for(var ts=0;ts<game.player.turretSlots;ts++)if(game.player.turrets[ts])tC++;
    document.getElementById('action-turret-name').textContent='Turrets';document.getElementById('action-turret-cost').textContent=tC>0?tC+'/'+game.player.turretSlots:'Menu';document.getElementById('action-turret').classList.remove('cannot-afford');
    var spec=pAge.special;document.getElementById('action-special-name').textContent=spec.name;
    var onCD=game.elapsed<game.player.specialCooldownEnd;
    if(onCD){document.getElementById('action-special-cost').textContent=Math.ceil((game.player.specialCooldownEnd-game.elapsed)/1000)+'s';document.getElementById('action-special').classList.add('on-cooldown');}
    else{document.getElementById('action-special-cost').textContent='Ready';document.getElementById('action-special').classList.remove('on-cooldown');}
    document.getElementById('action-special').classList.remove('cannot-afford');
    var canEv=game.player.age<AGES.length-1&&game.player.xp>=pAge.xpToNext,eBtn=document.getElementById('action-evolve');
    if(game.player.age>=AGES.length-1){document.getElementById('action-evolve-cost').textContent='MAX';eBtn.classList.add('cannot-afford');eBtn.classList.remove('evolve-ready');}
    else if(canEv){document.getElementById('action-evolve-cost').textContent='GO!';eBtn.classList.remove('cannot-afford');eBtn.classList.add('evolve-ready');}
    else{var xpN=pAge.xpToNext-game.player.xp;document.getElementById('action-evolve-cost').textContent=xpN>9999?Math.floor(xpN/1000)+'k':Math.floor(xpN)+'xp';eBtn.classList.add('cannot-afford');eBtn.classList.remove('evolve-ready');}
    if(game.player.buildQueue.length>0){var q=game.player.buildQueue;ctx.save();ctx.fillStyle='rgba(10,10,15,0.9)';ctx.fillRect(0,GROUND_Y+60,210,20);ctx.fillStyle='#FFFFFF';ctx.font='bold 14px sans-serif';var pct=1.0-(q[0].remaining/q[0].totalTime);ctx.fillText('Build: '+q[0].template.name+' ('+q.length+'/'+MAX_QUEUE+')',6,GROUND_Y+74);ctx.fillStyle='#333';ctx.fillRect(160,GROUND_Y+64,44,10);ctx.fillStyle='#00d4ff';ctx.fillRect(160,GROUND_Y+64,44*pct,10);ctx.restore();}
  }

  // ==================== ACTIONS ====================
  function executeAction(action){
    var pAge=AGES[game.player.age];
    if(action.startsWith('spawn-')){var idx=parseInt(action.split('-')[1]),tmpl=pAge.units[idx];if(game.player.buildQueue.length>=MAX_QUEUE){playSound('error');return;}if(game.player.gold>=tmpl.cost){game.player.gold-=tmpl.cost;game.player.buildQueue.push({template:tmpl,ageIndex:game.player.age,colorIndex:idx,remaining:tmpl.buildTime,totalTime:tmpl.buildTime});totalUnitsSpawned++;playSound('nav');}else playSound('error');}
    else if(action==='turret')openTurretMenu();
    else if(action==='special'){if(game.elapsed>=game.player.specialCooldownEnd){var tx=findCluster(game.enemy.units);if(tx===null)tx=350;fireSpecial(pAge.special.isHeal?0:tx);game.player.specialCooldownEnd=game.elapsed+pAge.special.cooldown;}else playSound('error');}
    else if(action==='evolve'){if(game.player.age<AGES.length-1&&game.player.xp>=pAge.xpToNext){game.player.age++;game.player.xp=0;game.player.baseMaxHP+=BASE_HP_EVOLVE_BONUS;game.player.baseHP=Math.min(game.player.baseHP+BASE_HP_EVOLVE_BONUS,game.player.baseMaxHP);spawnEffect('evolve',PLAYER_BASE_X,GROUND_Y-40);playSound('evolve');}else playSound('error');}
    game.hudDirty=true;
  }

  // ==================== EVENT HANDLING ====================
  function setupEvents(){document.addEventListener('keydown',function(e){switch(game.currentScreen){case'title-screen':initAudio();if(audioCtx&&audioCtx.state==='suspended')audioCtx.resume();handleTitleInput(e);e.preventDefault();break;case'difficulty-screen':initAudio();if(audioCtx&&audioCtx.state==='suspended')audioCtx.resume();handleDifficultyInput(e);break;case'game-screen':if(game.paused)handlePauseInput(e);else if(turretMenuOpen)handleTurretMenuInput(e);else handleGameInput(e);break;case'result-screen':if(e.key==='Enter'){navigateTo('title-screen',{addToHistory:false});e.preventDefault();}break;}});}
  function handleTitleInput(e){var btns=document.querySelectorAll('#title-screen .title-btn');var focused=document.activeElement;var idx=Array.from(btns).indexOf(focused);switch(e.key){case'ArrowUp':case'ArrowLeft':if(idx<=0)idx=btns.length-1;else idx--;btns[idx].focus();playSound('nav');break;case'ArrowDown':case'ArrowRight':if(idx>=btns.length-1)idx=0;else idx++;btns[idx].focus();playSound('nav');break;case'Enter':if(focused&&focused.dataset.title==='music')toggleMusic();else if(focused&&focused.dataset.title==='sfx')toggleSfx();else{navigateTo('difficulty-screen',{addToHistory:false});}break;}}
  function handleDifficultyInput(e){var btns=document.querySelectorAll('#difficulty-screen .diff-btn'),focused=document.activeElement,idx=Array.from(btns).indexOf(focused);var descs={normal:'A relaxed experience',hard:'A balanced challenge',impossible:'Only the best survive'};switch(e.key){case'ArrowUp':case'ArrowLeft':if(idx<=0)idx=btns.length-1;else idx--;btns[idx].focus();playSound('nav');document.getElementById('diff-desc').textContent=descs[btns[idx].dataset.difficulty]||'';e.preventDefault();break;case'ArrowDown':case'ArrowRight':if(idx>=btns.length-1)idx=0;else idx++;btns[idx].focus();playSound('nav');document.getElementById('diff-desc').textContent=descs[btns[idx].dataset.difficulty]||'';e.preventDefault();break;case'Enter':if(focused&&focused.dataset.difficulty){game.difficulty=focused.dataset.difficulty;game.diffConfig=DIFFICULTIES[game.difficulty];navigateTo('game-screen',{addToHistory:false});}e.preventDefault();break;case'Escape':navigateTo('title-screen',{addToHistory:false});e.preventDefault();break;}}
  function handleGameInput(e){var btns=document.querySelectorAll('#hud-bottom .action-btn'),focused=document.activeElement,idx=Array.from(btns).indexOf(focused);switch(e.key){case'ArrowLeft':if(idx<=0)idx=btns.length-1;else idx--;btns[idx].focus();playSound('nav');e.preventDefault();break;case'ArrowRight':if(idx>=btns.length-1)idx=0;else idx++;btns[idx].focus();playSound('nav');e.preventDefault();break;case'Enter':if(focused&&focused.dataset.action)executeAction(focused.dataset.action);e.preventDefault();break;case'Escape':togglePause();e.preventDefault();break;case'ArrowUp':case'ArrowDown':e.preventDefault();break;}game.hudDirty=true;}
  function handleTurretMenuInput(e){var btns=document.querySelectorAll('#turret-overlay .turret-opt');var focused=document.activeElement;var idx=Array.from(btns).indexOf(focused);if(idx<0)idx=0;var row=Math.floor(idx/3);var col=idx%3;switch(e.key){case'ArrowLeft':col=col<=0?2:col-1;btns[row*3+col].focus();playSound('nav');e.preventDefault();break;case'ArrowRight':col=col>=2?0:col+1;btns[row*3+col].focus();playSound('nav');e.preventDefault();break;case'ArrowUp':row=row<=0?1:row-1;btns[row*3+col].focus();playSound('nav');e.preventDefault();break;case'ArrowDown':row=row>=1?0:row+1;btns[row*3+col].focus();playSound('nav');e.preventDefault();break;case'Enter':if(focused&&focused.dataset.turret)handleTurretMenuAction(focused.dataset.turret);e.preventDefault();break;case'Escape':closeTurretMenu();e.preventDefault();break;}}
  function handlePauseInput(e){var btns=document.querySelectorAll('#pause-overlay .pause-btn'),focused=document.activeElement,idx=Array.from(btns).indexOf(focused);switch(e.key){case'ArrowUp':case'ArrowLeft':if(idx<=0)idx=btns.length-1;else idx--;btns[idx].focus();e.preventDefault();break;case'ArrowDown':case'ArrowRight':if(idx>=btns.length-1)idx=0;else idx++;btns[idx].focus();e.preventDefault();break;case'Enter':if(focused&&focused.dataset.action==='resume')togglePause();else if(focused&&focused.dataset.action==='quit'){togglePause();stopGameLoop();stopMusic();navigateTo('title-screen',{addToHistory:false});}e.preventDefault();break;case'Escape':togglePause();e.preventDefault();break;}}
  function togglePause(){game.paused=!game.paused;var ov=document.getElementById('pause-overlay');if(game.paused){pauseMusic();ov.classList.remove('hidden');ov.querySelector('.pause-btn').focus();}else{resumeMusic();ov.classList.add('hidden');var b=document.querySelectorAll('#hud-bottom .action-btn');if(b.length)b[0].focus();}}

  function onScreenEnter(sid){switch(sid){case'title-screen':stopGameLoop();stopMusic();loadAudioPrefs();var st=loadStats();var sub=document.querySelector('.title-sub');if(sub&&(st.wins||st.losses))sub.textContent='Wins: '+st.wins+' | Losses: '+st.losses+(st.bestTime<Infinity?' | Best: '+formatTime(st.bestTime):'');var startBtn=document.getElementById('title-start');if(startBtn)startBtn.focus();break;case'difficulty-screen':var fb=document.querySelector('#difficulty-screen .diff-btn');if(fb){fb.focus();document.getElementById('diff-desc').textContent='A relaxed experience';}var sr=loadStats(),rec=document.getElementById('diff-record');if(rec&&(sr.wins||sr.losses))rec.textContent='Record: '+sr.wins+'W / '+sr.losses+'L';else if(rec)rec.textContent='';break;case'game-screen':resetGameState();startGameLoop();startMusic();var b=document.querySelectorAll('#hud-bottom .action-btn');if(b.length)setTimeout(function(){b[0].focus();},100);break;}}
  function resetGameState(){nextId=1;totalUnitsSpawned=0;lastGoldTick=0;turretMenuOpen=false;game.elapsed=0;game.paused=false;game.projectiles=[];game.effects=[];game.specialStrikes=[];game.player.baseHP=BASE_HP;game.player.baseMaxHP=BASE_HP;game.player.gold=STARTING_GOLD;game.player.xp=0;game.player.age=0;game.player.turretSlots=1;game.player.turrets=[null,null];game.player.specialCooldownEnd=0;game.player.units=[];game.player.buildQueue=[];game.enemy.baseHP=BASE_HP;game.enemy.baseMaxHP=BASE_HP;game.enemy.gold=0;game.enemy.xp=0;game.enemy.age=0;game.enemy.turretSlots=1;game.enemy.turrets=[null,null];game.enemy.units=[];game.enemy.ai.nextSpawnTime=game.diffConfig.enemyStartDelay;game.enemy.ai.spawnInterval=3500;game.enemy.ai.aggression=0.3;game.enemy.ai.evolveXP=0;game.enemy.ai.nextSpecialTime=60000;game.hudDirty=true;document.getElementById('pause-overlay').classList.add('hidden');document.getElementById('turret-overlay').classList.add('hidden');}

  function init(){collectScreens();var c=document.getElementById('battlefield');if(c)ctx=c.getContext('2d');loadAudioPrefs();setupEvents();document.addEventListener('visibilitychange',function(){if(document.hidden&&game.running&&!game.paused&&game.currentScreen==='game-screen')togglePause();});window.addEventListener('blur', function() {
  if (game.running && !game.paused && game.currentScreen === 'game-screen') {
    togglePause();
  }
});navigateTo('title-screen',{addToHistory:false});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
