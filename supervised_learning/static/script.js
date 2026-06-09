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
  const tooltipText = element.querySelector('.tooltip-text').textContent;
  document.getElementById('activeItemLabel').textContent = `Selected: ${tooltipText}`;
  
  showInput();
}

function showInput() {
  const imgEl = document.getElementById("image");
  imgEl.src = dataset[selectedValue].img;
  hideFeatureCircles();
  prediction.innerHTML = "📡 <i>Awaiting data scan instructions...</i>";
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
  catRank.textContent = memory.cat >= 3 ? "🥇 CAT LEVEL: MAX RANK" : `🌱 CAT LEVEL: ${memory.cat}/3 XP`;
  dogRank.textContent = memory.dog >= 3 ? "🥇 DOG LEVEL: MAX RANK" : `🌱 DOG LEVEL: ${memory.dog}/3 XP`;

  catBar.style.width = `${Math.min((memory.cat / 3) * 100, 100)}%`;
  dogBar.style.width = `${Math.min((memory.dog / 3) * 100, 100)}%`;

  document.getElementById("catLoot").style.display = categoryDiscovered.cat ? "block" : "none";
  document.getElementById("dogLoot").style.display = categoryDiscovered.dog ? "block" : "none";

  const quest = document.getElementById("questText");
  const questBox = document.getElementById("questBox");
  
  if (memory.cat >= 3 && memory.dog >= 3) {
    questBox.classList.add("quest-completed-shine");
    quest.innerHTML = "<b class='quest-title-pop'>⭐ QUEST COMPLETED!</b> The parameter weights are harmonized perfectly! Now you can try the boss data slots if you dare...";
    
    if (!questCelebrated) {
      questCelebrated = true;
      setTimeout(() => {
        playSound('victory');
        spawnConfetti();
      }, 300);
    }
  } else {
    questBox.classList.remove("quest-completed-shine");
    quest.textContent = "Collect enough sample points to level up both standard matrices to Master Rank!";
  }
  updateButtons();
}

function triggerTrain() {
  const key = selectedValue;
  if (trainedSamples[key]) { 
    return logTerminal("⚠️ File coordinate layer has already been completely mined!", "error"); 
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
  logTerminal(`Assigning manual instruction label: [${item.label.toUpperCase()}]`, "teacher");

  if (!categoryDiscovered[item.label]) {
    categoryDiscovered[item.label] = true;
    memory[item.label]++;
  } else if (memory[item.label] < 3) {
    memory[item.label]++;
  }

  playSound('harvest');
  popFloatingXp(item.label === 'cat' ? 'rowCat' : 'rowDog');
  logTerminal(`📦 Extracted features added to the local inventory database.`, "learning");
  
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

  logTerminal("🤖 Scanning bounding coordinates for local contrast variations...", "observation");

  if (key === "shiba1") {
    if (!fullyTrained) return logTerminal("🔒 Boss instance locked! Max out both base inventory grids first.", "error");
    catProb = Math.floor(Math.random() * 14) + 47; dogProb = 100 - catProb;
  } else if (key === "bird1") {
    if (!fullyTrained) return logTerminal("🔒 Boss instance locked! Max out both base inventory grids first.", "error");
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

  const result = dogProb > catProb ? "DOG" : "CAT";
  const score = Math.max(catProb, dogProb);

  playSound('test');
  prediction.innerHTML = `🎯 Calculated Output: <b style="color:#fbbf24;">${result} Slot</b> (Probability Weight: ${score}%)`;

  logTerminal(`📊 Cat Weights Probability: ${catProb}% | Dog Weights Probability: ${dogProb}%`, "info");

  if (key === "shiba1") {
    logTerminal("🚨 WARNING PARADOX: Sharp triangle structures AND extended snout slopes found simultaneously inside one data slot!", "error");
    displayFeatureCircles(item);
  } else if (key === "bird1") {
    logTerminal("🚨 CRITICAL ZERO-MATCH: No known snout profiles or whisker channels mapped! Vector pathways out of bounds!", "error");
    hideFeatureCircles();
  } else if ((item.label === "cat" && memory.cat > 0) || (item.label === "dog" && memory.dog > 0)) {
    logTerminal(`✨ Probability highlights localized pattern matches over target image frames.`, "observation");
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
  prediction.textContent = "Awaiting vector maps...";
  document.getElementById("logTerminal").innerHTML = "🔄 Database storage wiped completely. Loop restarted!";
  
  document.querySelectorAll('.grid-item').forEach(item => item.classList.remove('active'));
  const firstItem = document.querySelector('.grid-item');
  firstItem.classList.add('active');
  selectedValue = "cat1";
  document.getElementById('activeItemLabel').textContent = "Selected: Map File: Tabby Cat A";

  hideFeatureCircles();
  updateUI();
  showInput();
}

showInput();
