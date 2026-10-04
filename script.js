/**
 * CYBERPAW 2026 - Official Furry Convention Website Script
 * Layout & interactive mechanics inspired by baishouyuan.cn
 * Includes: 3D Carousel, Lightbox Image Zoom, Schedule Tabs, Live Countdown
 */

// Target Date for Convention Opening (Oct 14, 2026 09:00:00)
const CON_START_DATE = new Date('2026-10-14T09:00:00').getTime();

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initTopNavbar();
  initCarousel();
  initScheduleTabs();
  initBackToTop();
  initKeyboardListeners();
});

/* ========================================================
   COUNTDOWN TIMER
   ======================================================== */
function initCountdown() {
  const cdText = document.getElementById('hero-cd-text');

  function update() {
    const now = new Date().getTime();
    const distance = CON_START_DATE - now;

    if (distance <= 0) {
      if (cdText) cdText.textContent = '盛会已盛大开幕！';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (cdText) {
      cdText.textContent = `${days} 天 ${hours} 小时`;
    }
  }

  update();
  setInterval(update, 60000); // Update every minute
}

/* ========================================================
   TOP NAVBAR SCROLL & MOBILE TOGGLE
   ======================================================== */
function initTopNavbar() {
  const topNav = document.getElementById('top-navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('menu');
  const menuLinks = document.querySelectorAll('.menu_item_a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      topNav.classList.add('scrolled');
    } else {
      topNav.classList.remove('scrolled');
    }
  });

  if (mobileToggle && menu) {
    mobileToggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });
  }
}

/* ========================================================
   3D CAROUSEL (BAISHOUYUAN STYLE WITH LEFT/RIGHT ARROWS)
   ======================================================== */
let currentSlide = 0;
let carouselTimer = null;
let carouselItems = [];
let carouselDots = [];

function initCarousel() {
  carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
  carouselDots = Array.from(document.querySelectorAll('.carousel-dots .dot'));

  if (!carouselItems.length) return;

  updateCarouselClasses();

  // Auto rotate carousel every 4.5 seconds
  startCarouselAutoPlay();

  const container = document.querySelector('.carousel-container');
  if (container) {
    container.addEventListener('mouseenter', stopCarouselAutoPlay);
    container.addEventListener('mouseleave', startCarouselAutoPlay);
  }
}

function updateCarouselClasses() {
  const total = carouselItems.length;

  carouselItems.forEach((item, index) => {
    item.classList.remove('active', 'prev', 'next', 'hidden');

    if (index === currentSlide) {
      item.classList.add('active');
    } else if (index === (currentSlide - 1 + total) % total) {
      item.classList.add('prev');
    } else if (index === (currentSlide + 1) % total) {
      item.classList.add('next');
    } else {
      item.classList.add('hidden');
    }
  });

  carouselDots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % carouselItems.length;
  updateCarouselClasses();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
  updateCarouselClasses();
}

function goToSlide(index) {
  if (index >= 0 && index < carouselItems.length) {
    currentSlide = index;
    updateCarouselClasses();
  }
}

function startCarouselAutoPlay() {
  stopCarouselAutoPlay();
  carouselTimer = setInterval(nextSlide, 4500);
}

function stopCarouselAutoPlay() {
  if (carouselTimer) {
    clearInterval(carouselTimer);
    carouselTimer = null;
  }
}

/* ========================================================
   BAISHOUYUAN LIGHTBOX IMAGE ENLARGE (.large_image)
   ======================================================== */
function expandImage(element) {
  const img = element.querySelector('img');
  if (!img) return;

  const largeImageModal = document.getElementById('large_image');
  const largeImageImg = document.getElementById('large_image_img');

  if (largeImageModal && largeImageImg) {
    largeImageImg.src = img.src;
    largeImageModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }
}

function closeLargeImage() {
  const largeImageModal = document.getElementById('large_image');
  if (largeImageModal) {
    largeImageModal.classList.remove('show');
    document.body.style.overflow = ''; // Unlock scroll
  }
}

function initKeyboardListeners() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLargeImage();
      closeContactModal();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
}

/* ========================================================
   SCHEDULE TABS
   ======================================================== */
function initScheduleTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.schedule-day-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetDay = btn.getAttribute('data-day');

      // Update button active states
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel visibility
      panels.forEach(panel => {
        if (panel.id === `panel-${targetDay}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* ========================================================
   BACK TO TOP
   ======================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ========================================================
   SOCIAL MATRIX & COMMUNITY MODALS
   ======================================================== */
function openSocialLink(platform) {
  if (platform === 'bilibili') {
    window.open('https://space.bilibili.com', '_blank');
  } else if (platform === 'douyin') {
    showToast('抖音搜索关注：@CyberPaw极客兽聚 🎬');
  } else if (platform === 'wikifur') {
    window.open('https://zh.wikifur.com', '_blank');
  } else {
    openContactModal();
  }
}

function openNewsDetail(newsId) {
  if (newsId === 1) {
    showToast('📰 CyberPaw 2026 一宣完整动态已同步至官方社群与B站！');
  } else if (newsId === 2) {
    showToast('🎤 舞台走秀与红毯巡游报名通道可在官方群向管理报名！');
  } else if (newsId === 3) {
    showToast('📄 《知情同意书》电子版已上传至群文件，欢迎下载！');
  }
}

function openContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) modal.classList.add('show');
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) modal.classList.remove('show');
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`已复制群号：${text} 到剪贴板！`);
  }).catch(() => {
    showToast(`群号为：${text}`);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast-notify');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Close modal when clicking on backdrop
window.addEventListener('click', (e) => {
  const contactModal = document.getElementById('contact-modal');
  if (e.target === contactModal) {
    closeContactModal();
  }
});
