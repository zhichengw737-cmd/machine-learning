const dataset = {
  cat1: { 
    img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", 
    label: "cat",
    c1: { top: "10%", left: "21%", size: "75px" },
    c2: { top: "50%", left: "54%", size: "75px" }
  },
  cat2: { 
    img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6", 
    label: "cat",
    c1: { top: "15%", left: "34%", size: "75px" },
    c2: { top: "20%", left: "62%", size: "75px" }
  },
  cat3: { 
    img: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e", 
    label: "cat",
    c1: { top: "34%", left: "41%", size: "75px" },
    c2: { top: "15%", left: "20%", size: "75px" }
  },
  dog1: { 
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d", 
    label: "dog",
    c1: { top: "33%", left: "34%", size: "95px" },
    c2: { top: "54%", left: "50%", size: "170px" }
  },
  dog2: { 
    img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a", 
    label: "dog",
    c1: { top: "40%", left: "44%", size: "110px" },
    c2: { top: "40%", left: "67%", size: "130px" }
  },
  dog3: { 
    img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=60", 
    label: "dog",
    c1: { top: "45%", left: "25%", size: "120px" },
    c2: { top: "35%", left: "47%", size: "140px" }
  },
  shiba1: {
    img: "https://images.unsplash.com/photo-1578133507770-a35cc3c786e6?q=80&w=1470&auto=format&fit=crop",
    label: "unknown",
    c1: { top: "20%", left: "60%", size: "75px" },
    c2: { top: "30%", left: "45%", size: "60px" }
  },
  bird1: {
    img: "https://images.unsplash.com/photo-1444464666168-49d633b86797",
    label: "unknown",
    c1: { top: "0%", left: "0%", size: "0px" },
    c2: { top: "0%", left: "0%", size: "0px" }
  }
};

// ================= LOCALIZATION SYSTEM =================
let currentLang = "en";

const translations = {
  en: {
    heroTitle: "🕹️ CRAFTING AI NETWORK",
    heroSub: "Load custom patterns, harvest feature tokens, and level up the model!",
    questTitle: "📜 ACTIVE QUEST:",
    questText: "Collect enough sample points to level up both standard matrices to Master Rank!",
    questComplete: "<b class='quest-title-pop'>⭐ QUEST COMPLETED!</b> The parameter weights are harmonized perfectly! Now you can try the boss data slots if you dare...",
    selectKeyLabel: "🎒 SELECT DATA MAP KEY:",
    activeItemLabel: "Selected: ",
    btnTrain: "🏋️‍♂️ Harvest Data",
    btnTest: "🔬 Boot Test",
    btnReset: "🔄 Wipe",
    langBtn: "🌐 CH",
    skillTreeTitle: "📊 SKILL TREE",
    probArrayTitle: "📡 PROBABILITY ARRAY",
    questLogTitle: "📜 QUEST LOG TERMINAL",
    manualTitle: "📘 CUNNING ADVENTURER'S TRAINING MANUAL",
    researchTitle: "📚 EXTENDED RESEARCH ARCHIVES",
    
    // Tooltips & Dynamic Text
    cat1_tt: "Map File: Tabby Cat A",
    cat2_tt: "Map File: Jumping Cat B",
    cat3_tt: "Map File: Orange Cat C",
    dog1_tt: "Map File: Hound Dog A",
    dog2_tt: "Map File: Puppy Dog B",
    dog3_tt: "Map File: Retriever C",
    shiba1_tt: "⚠️ BOSS: Shiba Paradox",
    bird1_tt: "⚠️ BOSS: Aerial Unknown",
    
    lootCat1: "📐 Vector Ear Triangles",
    lootCat2: "🐱 Linear Whiskers Cluster",
    lootDog1: "🐶 Dropped Flap Ear Texture",
    lootDog2: "👃 Extended Snout Coordinate",
    
    // Guide Cards
    guideH1: "1. Supervised Labels",
    guideP1: "The human teacher builds the answer guide. Supervised math pairs an image array with a designated tag indicator so paths align.",
    guideH2: "2. Feature Coordinates",
    guideP2: "An AI doesn't see characters or animals! It maps numeric clusters of gradient curves, edges, and contrast variations.",
    guideH3: "3. Weighted Outcomes",
    guideP3: "Feeding multiple targets reinforces parameter node tracks. Unlabeled files (like the Shiba Boss) calculate based on conflicting weights!",
    
    // Links
    resH1: "Global Overview",
    resH2: "Academic Papers",
    resH3: "Industry Trends",

    // Terminal/Readouts
    awaitingInstructions: "📡 <i>Awaiting data scan instructions...</i>",
    awaitingMaps: "Awaiting vector maps...",
    alreadyMined: "⚠️ File coordinate layer has already been completely mined!",
    assignLabel: "Assigning manual instruction label: ",
    extractedFeatures: "📦 Extracted features added to the local inventory database.",
    scanningCoords: "🤖 Scanning bounding coordinates for local contrast variations...",
    bossLocked: "🔒 Boss instance locked! Max out both base inventory grids first.",
    calculatedOutput: "🎯 Calculated Output: ",
    slotStr: " Slot",
    probWeight: "Probability Weight",
    shibaWarning: "🚨 WARNING PARADOX: Sharp triangle structures AND extended snout slopes found simultaneously inside one data slot!",
    birdWarning: "🚨 CRITICAL ZERO-MATCH: No known snout profiles or whisker channels mapped! Vector pathways out of bounds!",
    matchSuccess: "✨ Probability highlights localized pattern matches over target image frames.",
    wipeLog: "🔄 Database storage wiped completely. Loop restarted!"
  },
  zh: {
    heroTitle: "🕹️ 打造 AI 網絡",
    heroSub: "載入自定義圖像、收穫特徵代幣，並升級機器模型！",
    questTitle: "📜 當前任務：",
    questText: "收集足夠的樣本數據點，將兩種動物升級至最高級別！",
    questComplete: "<b class='quest-title-pop'>⭐ 任務完成！</b> 參數權重已完美調和！如果您有膽量，現在可以嘗試 Boss 級數據槽了...",
    selectKeyLabel: "🎒 選擇數據地圖金鑰：",
    activeItemLabel: "已選擇：",
    btnTrain: "🏋️‍♂️ 收穫數據",
    btnTest: "🔬 啟動測試",
    btnReset: "🔄 清除",
    langBtn: "🌐 EN",
    skillTreeTitle: "📊 技能樹",
    probArrayTitle: "📡 機率陣列",
    questLogTitle: "📜 任務日誌終端機",
    manualTitle: "📘 狡黠冒險家的訓練手冊",
    researchTitle: "📚 延伸研究檔案館",
    
    cat1_tt: "地圖檔案：斑紋貓 A",
    cat2_tt: "地圖檔案：跳躍貓 B",
    cat3_tt: "地圖檔案：橘貓 C",
    dog1_tt: "地圖檔案：獵犬 A",
    dog2_tt: "地圖檔案：幼犬 B",
    dog3_tt: "地圖檔案：黃金獵犬 C",
    shiba1_tt: "⚠️ BOSS：柴犬悖論",
    bird1_tt: "⚠️ BOSS：未知飛禽",
    
    lootCat1: "📐 向量耳朵三角面",
    lootCat2: "🐱 線性鬍鬚特徵群",
    lootDog1: "🐶 下垂垂耳紋理面",
    lootDog2: "👃 延伸鼻吻部坐標軸",
    
    guideH1: "1. 監督標籤 (Supervised Labels)",
    guideP1: "人類導師負責建立標準答案。監督式數學將影像矩陣與指定的標籤指示器配對，使機器學習的路徑得以校準對齊。",
    guideH2: "2. 特徵坐標 (Feature Coordinates)",
    guideP2: "AI 是看不見角色或動物的！它在後台映射著由梯度曲線、邊緣和對比度變化所組成的數值簇。",
    guideH3: "3. 權重預測 (Weighted Outcomes)",
    guideP3: "餵送多個訓練目標會強化參數節點。未標籤的檔案（例如柴犬 Boss）則會基於相互衝突的權重網絡進行推算！",
    
    resH1: "全局概述",
    resH2: "學術論文",
    resH3: "行業趨勢",

    awaitingInstructions: "📡 <i>等待數據掃描指令...</i>",
    awaitingMaps: "等待向量地圖...",
    alreadyMined: "⚠️ 該檔案的坐標層已被完全挖掘完畢！",
    assignLabel: "分配人工教學標籤：",
    extractedFeatures: "📦 提取的特徵已成功添加至本地庫存資料庫中。",
    scanningCoords: "🤖 正在掃描邊界坐標以尋找區域對比度變化...",
    bossLocked: "🔒 Boss 關卡鎖定中！請先將兩個基礎庫存網格練滿。",
    calculatedOutput: "🎯 計算輸出結果：",
    slotStr: " 型態",
    probWeight: "機率權重",
    shibaWarning: "🚨 悖論警告：在同一個數據槽中同時發現了銳利的三角形結構與延伸的鼻吻部斜率！",
    birdWarning: "🚨 關鍵零匹配：未映射到任何已知的特徵通道！向量路徑超出系統解析邊界！",
    matchSuccess: "✨ 機率分布突顯了目標影像幀上的局部特徵匹配點。",
    wipeLog: "🔄 資料庫存儲已完全清除。循環重新開始！"
  }
};

let selectedValue = "cat1";
let memory = { cat: 0, dog: 0 };
let trainedSamples = { cat1:false, cat2:false, cat3:false, dog1:false, dog2:false, dog3:false };
let categoryDiscovered = { cat: false, dog: false };
let questCelebrated = false;

// ================= COZY RETRO SOUND SYNTHESIZER =================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  try {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    
    if (type === 'click') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } 
    else if (type === 'harvest') {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + (index * 0.05));
        
        gain.gain.setValueAtTime(0.04, now + (index * 0.05));
        gain.gain.exponentialRampToValueAtTime(0.005, now + (index * 0.05) + 0.08);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + (index * 0.05));
        osc.stop(now + (index * 0.05) + 0.09);
      });
    } 
    else if (type === 'test') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(587.33, now + 0.08);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.2);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } 
    else if (type === 'wipe') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.3);
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    }
    else if (type === 'victory') {
      const victoryNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
      victoryNotes.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = (index % 2 === 0) ? 'square' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + (index * 0.08));
        
        gain.gain.setValueAtTime(0.06, now + (index * 0.08));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (index * 0.08) + 0.25);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + (index * 0.08));
        osc.stop(now + (index * 0.08) + 0.26);
      });
    }
  } catch (e) {
    console.log("Audio play blocked or unsupported:", e);
  }
}

function spawnConfetti() {
  const colors = ['#facc15', '#f43f5e', '#3b82f6', '#10b981', '#a855f7', '#f97316'];
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    
    const size = Math.floor(Math.random() * 6) + 6;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    
    document.body.appendChild(confetti);
    
    const duration = Math.random() * 1.5 + 1.5;
    const horizontalDrift = (Math.random() - 0.5) * 200;
    
    confetti.animate([
      { transform: `translateY(0px) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(105vh) translateX(${horizontalDrift}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      easing: 'ease-out',
      fill: 'forwards'
    });
    
    setTimeout(() => confetti.remove(), duration * 1000);
  }
}

function logTerminal(text, type="info") {
  const box = document.getElementById("logTerminal");
  box.innerHTML += `<div class="log-line ${type}">⚔️ ${text}</div>`;
  box.scrollTop = box.scrollHeight;
}

function selectSlot(element) {
  playSound('click');
  document.querySelectorAll('.grid-item').forEach(item => item.classList.remove('active'));
  element.classList.add('active');
  
  selectedValue = element.getAttribute('data-value');
  const txtKey = element.querySelector('.tooltip-text').getAttribute('data-key');
  const translatedText = translations[currentLang][txtKey];
  document.getElementById('activeItemLabel').textContent = `${translations[currentLang].activeItemLabel}${translatedText}`;
  
  showInput();
}

function showInput() {
  const imgEl = document.getElementById("image");
  imgEl.src = dataset[selectedValue].img;
  hideFeatureCircles();
  prediction.innerHTML = translations[currentLang].awaitingInstructions;
  document.getElementById("logTerminal").innerHTML = "";
  updateButtons();
}

function updateButtons() {
  const key = selectedValue;
  const trainBtn = document.querySelector(".btn-green");
  const testBtn = document.querySelector(".btn-pink");
  const fullyTrained = memory.cat >= 3 && memory.dog >= 3;

  trainBtn.disabled = (key === "shiba1" || key === "bird1");
  testBtn.disabled = ((key === "shiba1" || key === "bird1") && !fullyTrained);
}

function hideFeatureCircles() {
  document.getElementById("circle1").style.display = "none";
  document.getElementById("circle2").style.display = "none";
}

function displayFeatureCircles(item) {
  const c1 = document.getElementById("circle1");
  const c2 = document.getElementById("circle2");
  c1.style.top = item.c1.top; c1.style.left = item.c1.left; c1.style.width = item.c1.size; c1.style.height = item.c1.size;
  c2.style.top = item.c2.top; c2.style.left = item.c2.left; c2.style.width = item.c2.size; c2.style.height = item.c2.size;
  c1.style.display = "block"; c2.style.display = "block";
}

function popFloatingXp(rowId) {
  const container = document.getElementById(rowId);
  const xpSpan = document.createElement("span");
  xpSpan.className = "xp-pop";
  xpSpan.textContent = "+1 XP";
  container.appendChild(xpSpan);
  setTimeout(() => xpSpan.remove(), 800);
}

function updateUI() {
  // Dynamically translate level badges based on rank status
  if (currentLang === "en") {
    catRank.textContent = memory.cat >= 3 ? "🥇 CAT LEVEL: MAX RANK" : `🌱 CAT LEVEL: ${memory.cat}/3 XP`;
    dogRank.textContent = memory.dog >= 3 ? "🥇 DOG LEVEL: MAX RANK" : `🌱 DOG LEVEL: ${memory.dog}/3 XP`;
  } else {
    catRank.textContent = memory.cat >= 3 ? "🥇 貓咪等級：最高等級" : `🌱 貓咪等級：${memory.cat}/3 經驗值`;
    dogRank.textContent = memory.dog >= 3 ? "🥇 小狗等級：最高等級" : `🌱 小狗等級：${memory.dog}/3 經驗值`;
  }

  catBar.style.width = `${Math.min((memory.cat / 3) * 100, 100)}%`;
  dogBar.style.width = `${Math.min((memory.dog / 3) * 100, 100)}%`;

  document.getElementById("catLoot").style.display = categoryDiscovered.cat ? "block" : "none";
  document.getElementById("dogLoot").style.display = categoryDiscovered.dog ? "block" : "none";

  const quest = document.getElementById("questText");
  const questBox = document.getElementById("questBox");
  
  if (memory.cat >= 3 && memory.dog >= 3) {
    questBox.classList.add("quest-completed-shine");
    quest.innerHTML = translations[currentLang].questComplete;
    
    if (!questCelebrated) {
      questCelebrated = true;
      setTimeout(() => {
        playSound('victory');
        spawnConfetti();
      }, 300);
    }
  } else {
    questBox.classList.remove("quest-completed-shine");
    quest.textContent = translations[currentLang].questText;
  }
  updateButtons();
}

function triggerTrain() {
  const key = selectedValue;
  if (trainedSamples[key]) { 
    return logTerminal(translations[currentLang].alreadyMined, "error"); 
  }
  
  const frame = document.getElementById("imageFrame");
  frame.classList.add("scanning");
  setTimeout(() => {
    frame.classList.remove("scanning");
    train();
  }, 1000);
}

function train() {
  const key = selectedValue;
  const item = dataset[key];

  trainedSamples[key] = true;
  
  let localizedLabel = item.label.toUpperCase();
  if (currentLang === "zh") {
    localizedLabel = item.label === "cat" ? "貓咪" : "小狗";
  }
  logTerminal(`${translations[currentLang].assignLabel}[${localizedLabel}]`, "teacher");

  if (!categoryDiscovered[item.label]) {
    categoryDiscovered[item.label] = true;
    memory[item.label]++;
  } else if (memory[item.label] < 3) {
    memory[item.label]++;
  }

  playSound('harvest');
  popFloatingXp(item.label === 'cat' ? 'rowCat' : 'rowDog');
  logTerminal(translations[currentLang].extractedFeatures, "learning");
  
  updateUI();
  displayFeatureCircles(item);
}

function triggerTest() {
  const frame = document.getElementById("imageFrame");
  frame.classList.add("scanning");
  setTimeout(() => {
    frame.classList.remove("scanning");
    test();
  }, 700);
}

function test() {
  const key = selectedValue;
  const item = dataset[key];

  let catProb = 0, dogProb = 0;
  const fullyTrained = memory.cat >= 3 && memory.dog >= 3;

  logTerminal(translations[currentLang].scanningCoords, "observation");

  if (key === "shiba1") {
    if (!fullyTrained) return logTerminal(translations[currentLang].bossLocked, "error");
    catProb = Math.floor(Math.random() * 14) + 47; dogProb = 100 - catProb;
  } else if (key === "bird1") {
    if (!fullyTrained) return logTerminal(translations[currentLang].bossLocked, "error");
    catProb = Math.floor(Math.random() * 30) + 35; dogProb = 100 - catProb;
  } else if (key.startsWith("cat")) {
    if (memory.cat === 0) catProb = Math.floor(Math.random() * 6) + 47;
    else if (memory.cat === 1) catProb = Math.floor(Math.random() * 11) + 58;
    else if (memory.cat === 2) catProb = Math.floor(Math.random() * 11) + 72;
    else catProb = Math.floor(Math.random() * 11) + 88;
    dogProb = 100 - catProb;
  } else {
    if (memory.dog === 0) dogProb = Math.floor(Math.random() * 6) + 47;
    else if (memory.dog === 1) dogProb = Math.floor(Math.random() * 11) + 58;
    else if (memory.dog === 2) dogProb = Math.floor(Math.random() * 11) + 72;
    else dogProb = Math.floor(Math.random() * 11) + 88;
    catProb = 100 - dogProb;
  }

  let result = dogProb > catProb ? "DOG" : "CAT";
  if (currentLang === "zh") {
    result = dogProb > catProb ? "小狗" : "貓咪";
  }
  const score = Math.max(catProb, dogProb);

  playSound('test');
  prediction.innerHTML = `${translations[currentLang].calculatedOutput}<b style="color:#fbbf24;">${result}${translations[currentLang].slotStr}</b> (${translations[currentLang].probWeight}: ${score}%)`;

  if (currentLang === "en") {
    logTerminal(`📊 Cat Weights Probability: ${catProb}% | Dog Weights Probability: ${dogProb}%`, "info");
  } else {
    logTerminal(`📊 貓咪權重機率：${catProb}% | 小狗權重機率：${dogProb}%`, "info");
  }

  if (key === "shiba1") {
    logTerminal(translations[currentLang].shibaWarning, "error");
    displayFeatureCircles(item);
  } else if (key === "bird1") {
    logTerminal(translations[currentLang].birdWarning, "error");
    hideFeatureCircles();
  } else if ((item.label === "cat" && memory.cat > 0) || (item.label === "dog" && memory.dog > 0)) {
    logTerminal(translations[currentLang].matchSuccess, "observation");
    displayFeatureCircles(item);
  } else {
    hideFeatureCircles();
  }
}

function reset() {
  playSound('wipe');
  memory = { cat: 0, dog: 0 };
  trainedSamples = { cat1:false, cat2:false, cat3:false, dog1:false, dog2:false, dog3:false };
  categoryDiscovered = { cat: false, dog: false };
  questCelebrated = false;
  prediction.textContent = translations[currentLang].awaitingMaps;
  document.getElementById("logTerminal").innerHTML = translations[currentLang].wipeLog;
  
  document.querySelectorAll('.grid-item').forEach(item => item.classList.remove('active'));
  const firstItem = document.querySelector('.grid-item');
  firstItem.classList.add('active');
  selectedValue = "cat1";

  const translatedText = translations[currentLang]["cat1_tt"];
  document.getElementById('activeItemLabel').textContent = `${translations[currentLang].activeItemLabel}${translatedText}`;

  hideFeatureCircles();
  updateUI();
  showInput();
}

// ================= NEW LANGUAGE TOGGLE LOGIC =================
function toggleLanguage() {
  playSound('click');
  currentLang = currentLang === "en" ? "zh" : "en";
  applyTranslations();
}

function applyTranslations() {
  const langPack = translations[currentLang];
  
  // 1. Map ID elements
  const textIds = [
    "heroTitle", "heroSub", "questTitle", "selectKeyLabel", 
    "btnTrain", "btnTest", "btnReset", "langBtn", 
    "skillTreeTitle", "probArrayTitle", "questLogTitle", 
    "manualTitle", "researchTitle"
  ];
  textIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = langPack[id];
  });
  
  // 2. Map Elements with data-key attributes (Tooltips, loot, cards)
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (langPack[key]) el.textContent = langPack[key];
  });

  // 3. Update contextual active file string indicator
  const activeItem = document.querySelector('.grid-item.active');
  if (activeItem) {
    const txtKey = activeItem.querySelector('.tooltip-text').getAttribute('data-key');
    document.getElementById('activeItemLabel').textContent = `${langPack.activeItemLabel}${langPack[txtKey]}`;
  }

  updateUI();
}

// Initialize program interface configuration
showInput();
