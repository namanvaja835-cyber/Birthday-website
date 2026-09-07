/**
 * ====================================================================
 * ROMANTIC BIRTHDAY SURPRISE - MAIN SCRIPT
 * MULTI-PAGE EXPERIENCE WITH BESPOKE THEMES PER PAGE
 * ====================================================================
 */

let currentActivePage = "home";

document.addEventListener("DOMContentLoaded", () => {
  initPageNavigation();
  initPersonalizedContent();
  initLetterTypewriter();
  initScrapbookGallery();
  initReasonsSection();
  initTimelineSection();
  initCountdown();
  initFloatingParticles();
  initAudioPlayer();
  initCakeAndWish();
  initEasterEgg();
  initClickHeartEffects();
});

// ====================================================================
// 1. MULTI-PAGE & MULTI-THEME NAVIGATION ENGINE
// ====================================================================
const VALID_PAGES = ["home", "letter", "memories", "reasons", "story", "countdown", "wish"];

function initPageNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileToggle = document.getElementById("navMobileToggle");
  const navMenu = document.getElementById("navMenu");

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-open");
    });
  }

  // Handle all click triggers with [data-page] attribute
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-page]");
    if (trigger) {
      e.preventDefault();
      const targetPage = trigger.getAttribute("data-page");
      if (VALID_PAGES.includes(targetPage)) {
        navigateToPage(targetPage);
      }
    }
  });

  // Handle browser back/forward buttons (hashchange)
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "");
    if (VALID_PAGES.includes(hash)) {
      switchToPage(hash);
    }
  });

  // Initial page on load
  const initialHash = window.location.hash.replace("#", "");
  if (VALID_PAGES.includes(initialHash)) {
    switchToPage(initialHash);
  } else {
    switchToPage("home");
  }
}

function navigateToPage(pageId) {
  if (window.location.hash !== `#${pageId}`) {
    window.location.hash = pageId;
  } else {
    switchToPage(pageId);
  }
}

function switchToPage(pageId) {
  currentActivePage = pageId;

  // Apply Distinct Theme to Body!
  document.body.setAttribute("data-theme", pageId);

  // Hide all pages
  const pages = document.querySelectorAll(".page-view");
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  // Show target page
  const targetEl = document.getElementById(`page-${pageId}`);
  if (targetEl) {
    targetEl.classList.add("active");
  }

  // Update active state in navigation
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    if (link.getAttribute("data-page") === pageId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Close mobile menu if open
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.classList.remove("mobile-open");
  }

  // Scroll to top of the page smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ====================================================================
// 2. INITIALIZE PERSONALIZED CONTENT
// ====================================================================
function initPersonalizedContent() {
  if (typeof CONFIG === "undefined") return;

  // Hero Section
  const heroNameText = document.getElementById("heroNameText");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const heroImg = document.getElementById("heroImg");
  const footerHerName = document.getElementById("footerHerName");

  if (heroNameText) heroNameText.textContent = `${CONFIG.herName} ❤️`;
  if (heroSubtitle) heroSubtitle.textContent = CONFIG.hero.subtitle;
  if (heroImg && CONFIG.hero.heroImage) heroImg.src = CONFIG.hero.heroImage;
  if (footerHerName) footerHerName.textContent = CONFIG.herName;

  // Letter Section
  const letterSalutation = document.getElementById("letterSalutation");
  const letterClosing = document.getElementById("letterClosing");
  const letterSignature = document.getElementById("letterSignature");
  if (letterSalutation) letterSalutation.textContent = CONFIG.letter.salutation;
  if (letterClosing) letterClosing.textContent = CONFIG.letter.closing;
  if (letterSignature) letterSignature.textContent = CONFIG.letter.signature;

  // Final Surprise
  const finalBgImg = document.getElementById("finalBgImg");
  const finalSurpriseText = document.getElementById("finalSurpriseText");
  if (finalBgImg && CONFIG.finalSurprise.bgImage) {
    finalBgImg.src = CONFIG.finalSurprise.bgImage;
  }
  if (finalSurpriseText && CONFIG.finalSurprise.message) {
    finalSurpriseText.innerHTML = CONFIG.finalSurprise.message.replace(/\n/g, "<br>");
  }

  // Secret Easter Egg
  const secretTitle = document.getElementById("secretTitle");
  const secretMessage = document.getElementById("secretMessage");
  if (secretTitle && CONFIG.secretNote) secretTitle.textContent = CONFIG.secretNote.title;
  if (secretMessage && CONFIG.secretNote) secretMessage.textContent = CONFIG.secretNote.message;
}

// ====================================================================
// 3. HEARTFELT LETTER REVEAL & WAX SEAL
// ====================================================================
function initLetterTypewriter() {
  const letterBody = document.getElementById("letterBody");
  if (!letterBody || typeof CONFIG === "undefined") return;

  letterBody.innerHTML = "";
  CONFIG.letter.paragraphs.forEach((pText) => {
    const p = document.createElement("p");
    p.className = "letter-paragraph";
    p.innerHTML = pText.replace(/\n/g, "<br>");
    letterBody.appendChild(p);
  });

  // Wax Seal Interactive Bounce
  const waxSealBtn = document.getElementById("waxSealBtn");
  if (waxSealBtn) {
    waxSealBtn.addEventListener("click", (e) => {
      triggerConfettiBurst(e.clientX, e.clientY);
      createChimeSound();
    });
  }
}

// ====================================================================
// 4. SCRAPBOOK PHOTO GALLERY & LIGHTBOX (Curated 12 Non-Repetitive Photos)
// ====================================================================
let currentFilteredPhotos = [];
let currentLightboxIndex = 0;

function initScrapbookGallery() {
  const grid = document.getElementById("scrapbookGrid");
  if (!grid || typeof CONFIG === "undefined" || !CONFIG.photos) return;

  currentFilteredPhotos = [...CONFIG.photos];
  renderGallery(currentFilteredPhotos);

  // Filter Buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      if (filter === "all") {
        currentFilteredPhotos = [...CONFIG.photos];
      } else {
        currentFilteredPhotos = CONFIG.photos.filter((p) => p.category === filter);
      }
      renderGallery(currentFilteredPhotos);
    });
  });

  // Lightbox Controls
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
  const lightboxNextBtn = document.getElementById("lightboxNextBtn");

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener("click", closeLightbox);
  }
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener("click", () => navigateLightbox(-1));
  }
  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener("click", () => navigateLightbox(1));
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });

  // Mobile Touch Swipe support for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  lightboxModal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxModal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) navigateLightbox(1);
    if (touchEndX > touchStartX + 50) navigateLightbox(-1);
  }, { passive: true });
}

function renderGallery(photoList) {
  const grid = document.getElementById("scrapbookGrid");
  if (!grid) return;
  grid.innerHTML = "";

  photoList.forEach((photo, index) => {
    const card = document.createElement("div");
    card.className = `polaroid-card ${photo.orientation || "portrait"}`;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View photo: ${photo.caption}`);

    card.innerHTML = `
      <div class="polaroid-tape"></div>
      <div class="polaroid-img-wrapper">
        <img src="${photo.src}" alt="${photo.caption}" class="polaroid-img" loading="lazy">
        <div class="polaroid-heart-tag">❤️</div>
      </div>
      <div class="polaroid-caption">${photo.caption}</div>
    `;

    card.addEventListener("click", () => {
      openLightbox(index);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    grid.appendChild(card);
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  const modal = document.getElementById("lightboxModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function navigateLightbox(direction) {
  if (!currentFilteredPhotos.length) return;
  currentLightboxIndex = (currentLightboxIndex + direction + currentFilteredPhotos.length) % currentFilteredPhotos.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const photo = currentFilteredPhotos[currentLightboxIndex];
  if (!photo) return;

  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");
  const counter = document.getElementById("lightboxCounter");

  if (img) {
    img.src = photo.src;
    img.alt = photo.caption;
  }
  if (caption) caption.textContent = photo.caption;
  if (counter) counter.textContent = `${currentLightboxIndex + 1} / ${currentFilteredPhotos.length}`;
}

// ====================================================================
// 5. REASONS I LOVE YOU SECTION
// ====================================================================
function initReasonsSection() {
  const grid = document.getElementById("reasonsGrid");
  if (!grid || typeof CONFIG === "undefined" || !CONFIG.reasons) return;

  grid.innerHTML = "";
  CONFIG.reasons.forEach((reason) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.innerHTML = `
      <div class="reason-icon-wrapper">${reason.icon || "💖"}</div>
      <h3 class="reason-title">${reason.title}</h3>
      <p class="reason-desc">${reason.desc}</p>
    `;
    grid.appendChild(card);
  });
}

// ====================================================================
// 6. OUR STORY (TIMELINE SECTION)
// ====================================================================
function initTimelineSection() {
  const container = document.getElementById("timelineContainer");
  if (!container || typeof CONFIG === "undefined" || !CONFIG.timeline) return;

  const line = container.querySelector(".timeline-line");
  container.innerHTML = "";
  if (line) container.appendChild(line);

  CONFIG.timeline.forEach((item, index) => {
    const sideClass = index % 2 === 0 ? "left" : "right";
    const itemEl = document.createElement("div");
    itemEl.className = `timeline-item ${sideClass}`;

    const isLandscape = item.photo && (item.photo.includes("photo_06") || item.photo.includes("photo_26") || item.photo.includes("photo_22"));

    itemEl.innerHTML = `
      <div class="timeline-node">❤️</div>
      <div class="timeline-card">
        <span class="timeline-badge">${item.badge}</span>
        <h3 class="timeline-title">${item.title}</h3>
        <div class="timeline-date">${item.date}</div>
        ${item.photo ? `
          <div class="timeline-photo-box ${isLandscape ? "landscape" : ""}" title="Click to view full picture">
            <img src="${item.photo}" alt="${item.title}" class="timeline-photo" loading="lazy">
            <span class="timeline-photo-hint">🔍 Tap to enlarge</span>
          </div>
        ` : ""}
        <p class="timeline-desc">${item.desc}</p>
      </div>
    `;

    const photoBox = itemEl.querySelector(".timeline-photo-box");
    if (photoBox && item.photo) {
      photoBox.addEventListener("click", () => {
        openSingleLightbox(item.photo, `${item.title} — ${item.date}`);
      });
    }

    container.appendChild(itemEl);
  });
}

function openSingleLightbox(src, caption) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const captionEl = document.getElementById("lightboxCaption");
  const counter = document.getElementById("lightboxCounter");

  if (img) {
    img.src = src;
    img.alt = caption;
  }
  if (captionEl) captionEl.textContent = caption;
  if (counter) counter.textContent = "Our Story ❤️";

  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// ====================================================================
// 7. BIRTHDAY COUNTDOWN
// ====================================================================
function initCountdown() {
  if (typeof CONFIG === "undefined" || !CONFIG.birthdayDate) return;

  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMinutes = document.getElementById("cdMinutes");
  const cdSeconds = document.getElementById("cdSeconds");
  const countdownGrid = document.getElementById("countdownGrid");
  const celebrationBanner = document.getElementById("celebrationBanner");
  const countdownSubtitle = document.getElementById("countdownSubtitle");

  function update() {
    const target = new Date(CONFIG.birthdayDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      if (countdownGrid) countdownGrid.style.display = "none";
      if (celebrationBanner) celebrationBanner.classList.add("active");
      if (countdownSubtitle) countdownSubtitle.textContent = "Today is the happiest day of the year!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = String(days).padStart(2, "0");
    if (cdHours) cdHours.textContent = String(hours).padStart(2, "0");
    if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, "0");
    if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// ====================================================================
// 8. FLOATING HEARTS & SPARKLES CANVAS (ADAPTS COLORS TO ACTIVE THEME)
// ====================================================================
function initFloatingParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 20 : 35;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.size = Math.random() * 12 + 6;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.type = Math.random() > 0.4 ? "heart" : "sparkle";
      this.rotation = Math.random() * Math.PI;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.6;
      this.rotation += this.rotSpeed;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      // Theme-Specific Particle Colors!
      let heartColor = "#e07a86";
      let sparkleColor = "#ffd166";

      if (currentActivePage === "letter") {
        heartColor = "#9b111e";
        sparkleColor = "#d4af37";
      } else if (currentActivePage === "memories") {
        heartColor = "#e76f51";
        sparkleColor = "#f4a261";
      } else if (currentActivePage === "reasons") {
        heartColor = "#f472b6";
        sparkleColor = "#c084fc";
      } else if (currentActivePage === "story") {
        heartColor = "#2d6a4f";
        sparkleColor = "#d4af37";
      } else if (currentActivePage === "countdown") {
        heartColor = "#b8860b";
        sparkleColor = "#ffd700";
      } else if (currentActivePage === "wish") {
        heartColor = "#ff4d6d";
        sparkleColor = "#ffd700";
      }

      if (this.type === "heart") {
        ctx.fillStyle = heartColor;
        drawHeart(ctx, 0, 0, this.size);
      } else {
        ctx.fillStyle = sparkleColor;
        drawSparkle(ctx, 0, 0, this.size * 0.6);
      }

      ctx.restore();
    }
  }

  function drawHeart(c, x, y, size) {
    c.beginPath();
    const topCurveHeight = size * 0.3;
    c.moveTo(x, y + topCurveHeight);
    c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
    c.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    c.closePath();
    c.fill();
  }

  function drawSparkle(c, x, y, size) {
    c.beginPath();
    for (let i = 0; i < 4; i++) {
      c.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
      c.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.3), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.3));
    }
    c.closePath();
    c.fill();
  }

  for (let i = 0; i < particleCount; i++) {
    const p = new Particle();
    p.y = Math.random() * height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// ====================================================================
// 9. AUDIO PLAYER (MP3 FILE + WEB AUDIO API CHIMES SYNTHESIZER)
// ====================================================================
let audioCtx = null;
let synthTimer = null;
let isPlaying = false;

function initAudioPlayer() {
  const pill = document.getElementById("musicPlayerPill");
  const audio = document.getElementById("audioElement");
  const musicLabel = document.getElementById("musicLabel");

  if (!pill || !audio) return;

  if (typeof CONFIG !== "undefined" && CONFIG.audioFilePath) {
    audio.src = CONFIG.audioFilePath;
  }

  pill.addEventListener("click", () => {
    if (!isPlaying) {
      startMusic();
    } else {
      stopMusic();
    }
  });

  function startMusic() {
    isPlaying = true;
    pill.classList.add("playing");
    if (musicLabel) musicLabel.textContent = "Playing Melody 🎶";

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {})
        .catch(() => {
          startWebAudioRomanticMelody();
        });
    } else {
      startWebAudioRomanticMelody();
    }
  }

  function stopMusic() {
    isPlaying = false;
    pill.classList.remove("playing");
    if (musicLabel) musicLabel.textContent = "Play Our Song 🎵";

    audio.pause();
    stopWebAudioRomanticMelody();
  }
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function startWebAudioRomanticMelody() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [261.63, 329.63, 392.00, 440.00, 493.88, 523.25, 659.25, 783.99];
  let noteIndex = 0;

  function playNextTone() {
    if (!isPlaying) return;

    const freq = notes[noteIndex % notes.length];
    noteIndex = (noteIndex + 1 + Math.floor(Math.random() * 2)) % notes.length;

    playSoftChimeTone(ctx, freq);

    const delay = 800 + Math.random() * 600;
    synthTimer = setTimeout(playNextTone, delay);
  }

  playNextTone();
}

function stopWebAudioRomanticMelody() {
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
}

function playSoftChimeTone(ctx, freq) {
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.3);
  } catch (err) {}
}

function createChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((f, i) => {
      setTimeout(() => playSoftChimeTone(ctx, f), i * 90);
    });
  } catch (e) {}
}

// ====================================================================
// 10. INTERACTIVE CAKE & WISH SURPRISE
// ====================================================================
function initCakeAndWish() {
  const cakeWrapper = document.getElementById("cakeWrapper");
  const candleFlame = document.getElementById("candleFlame");
  const candleSmoke = document.getElementById("candleSmoke");
  const makeWishBtn = document.getElementById("makeWishBtn");
  const wishModal = document.getElementById("wishModal");
  const closeWishBtn = document.getElementById("closeWishBtn");

  function celebrateWish() {
    if (candleFlame) candleFlame.classList.add("blown-out");
    if (candleSmoke) {
      candleSmoke.classList.add("active");
      setTimeout(() => candleSmoke.classList.remove("active"), 2000);
    }

    createChimeSound();
    launchCelebrationConfetti();

    setTimeout(() => {
      if (wishModal) wishModal.classList.add("active");
    }, 600);
  }

  if (cakeWrapper) {
    cakeWrapper.addEventListener("click", celebrateWish);
  }
  if (makeWishBtn) {
    makeWishBtn.addEventListener("click", celebrateWish);
  }
  if (closeWishBtn && wishModal) {
    closeWishBtn.addEventListener("click", () => {
      wishModal.classList.remove("active");
      setTimeout(() => {
        if (candleFlame) candleFlame.classList.remove("blown-out");
      }, 1000);
    });
  }
}

function launchCelebrationConfetti() {
  if (typeof confetti !== "function") return;

  const count = 200;
  const defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 30,
    startVelocity: 55,
    colors: ["#d6687a", "#ff9eb0", "#ffd700"]
  });
  fire(0.2, {
    spread: 60,
    colors: ["#ffffff", "#fce4ec", "#b24155"]
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ["#ffd700", "#d6687a", "#fffdf9"]
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ["#ff758c", "#ff7eb3"]
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ["#d4af37", "#fcedee"]
  });
}

function triggerConfettiBurst(clientX, clientY) {
  if (typeof confetti !== "function") return;
  const x = clientX ? clientX / window.innerWidth : 0.5;
  const y = clientY ? clientY / window.innerHeight : 0.5;
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { x, y },
    colors: ["#d6687a", "#ffd700", "#ff9eb0"]
  });
}

// ====================================================================
// 11. SECRET EASTER EGG NOTE
// ====================================================================
function initEasterEgg() {
  const eggHeart = document.getElementById("easterEggHeart");
  const secretModal = document.getElementById("secretModal");
  const closeSecretBtn = document.getElementById("closeSecretBtn");

  if (eggHeart && secretModal) {
    eggHeart.addEventListener("click", () => {
      secretModal.classList.add("active");
      createChimeSound();
    });
  }

  if (closeSecretBtn && secretModal) {
    closeSecretBtn.addEventListener("click", () => {
      secretModal.classList.remove("active");
    });
  }

  if (secretModal) {
    secretModal.addEventListener("click", (e) => {
      if (e.target === secretModal) secretModal.classList.remove("active");
    });
  }
}

// ====================================================================
// 12. CLICK PARTICLES
// ====================================================================
function initClickHeartEffects() {
  const heartIcons = ["❤️", "💖", "💕", "✨", "🌸"];

  document.addEventListener("click", (e) => {
    if (e.target.closest("button") || e.target.closest("a") || e.target.closest(".nav-link")) return;

    const heart = document.createElement("span");
    heart.className = "click-heart";
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1100);
  });
}
