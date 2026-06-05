// =============================================
// STEPKICK — Product Page Interactions
// =============================================

// --- State ---
let qty = 1;
let cartCount = 0;
let isZoomed = false;
let isWished = false;

const images = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=85",
  "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=700&q=85",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=700&q=85",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700&q=85"
];

// --- Image Gallery ---
function setImage(index, thumbEl) {
  const mainImg = document.getElementById('mainImage');
  const wrap = document.getElementById('mainWrap');

  // Fade transition
  mainImg.style.opacity = '0';
  mainImg.style.transform = 'scale(0.97)';

  setTimeout(() => {
    mainImg.src = images[index];
    mainImg.style.opacity = '1';
    mainImg.style.transform = 'scale(1)';
  }, 180);

  // Reset zoom if active
  if (isZoomed) {
    isZoomed = false;
    wrap.classList.remove('zoomed');
    document.getElementById('zoomLabel').textContent = 'Zoom';
  }

  // Update thumbnail active state
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');

  // Smooth transition on main image
  mainImg.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
}

// --- Zoom ---
function toggleZoom() {
  const wrap = document.getElementById('mainWrap');
  const label = document.getElementById('zoomLabel');

  isZoomed = !isZoomed;
  wrap.classList.toggle('zoomed', isZoomed);
  label.textContent = isZoomed ? 'Zoom out' : 'Zoom';
}

// --- Color Picker ---
function pickColor(el) {
  document.querySelectorAll('.swatch').forEach(s => {
    s.classList.remove('active');
    s.setAttribute('aria-pressed', 'false');
  });
  el.classList.add('active');
  el.setAttribute('aria-pressed', 'true');
  document.getElementById('colorName').textContent = el.dataset.color;
}

// --- Size Picker ---
function pickSize(el) {
  document.querySelectorAll('.size-btn:not(.out-of-stock)').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  el.classList.add('active');
  el.setAttribute('aria-pressed', 'true');
  document.getElementById('sizeName').textContent = el.textContent;
}

// --- Quantity ---
function changeQty(delta) {
  qty = Math.max(1, Math.min(5, qty + delta));
  const display = document.getElementById('qtyDisplay');
  display.textContent = qty;

  // Pulse animation
  display.style.transform = 'scale(1.3)';
  display.style.transition = 'transform 0.15s ease';
  setTimeout(() => {
    display.style.transform = 'scale(1)';
  }, 150);
}

// --- Add to Cart ---
function addToCart() {
  const btn = document.getElementById('cartBtn');
  const txt = document.getElementById('cartBtnText');
  if (btn.classList.contains('adding') || btn.classList.contains('added')) return;

  // Adding state
  btn.classList.add('adding');
  txt.textContent = 'Adding...';

  setTimeout(() => {
    // Added state
    btn.classList.remove('adding');
    btn.classList.add('added');
    txt.textContent = 'Added ✓';

    // Update cart count
    cartCount += qty;
    const countEl = document.getElementById('cartCount');
    countEl.textContent = cartCount;
    countEl.classList.add('visible');

    // Bounce cart icon in nav
    const navBtn = document.querySelector('.cart-nav-btn');
    navBtn.style.transform = 'scale(1.25)';
    navBtn.style.transition = 'transform 0.2s ease';
    setTimeout(() => { navBtn.style.transform = 'scale(1)'; }, 200);

    // Show toast
    showToast(`${qty} item${qty > 1 ? 's' : ''} added to cart!`);

    // Reset button after delay
    setTimeout(() => {
      btn.classList.remove('added');
      txt.textContent = 'Add to Cart';
    }, 2200);
  }, 800);
}

// --- Buy Now ---
function buyNow() {
  showToast('Redirecting to checkout...');
}

// --- Wishlist ---
function toggleWish() {
  isWished = !isWished;
  const btn = document.getElementById('wishBtn');
  const heart = document.getElementById('heartSvg');

  btn.classList.toggle('liked', isWished);

  if (isWished) {
    heart.setAttribute('fill', '#D4537E');
    showToast('Saved to wishlist ♥');
    // Pop animation
    btn.style.transform = 'scale(1.25)';
    btn.style.transition = 'transform 0.18s ease';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
  } else {
    heart.setAttribute('fill', 'none');
    showToast('Removed from wishlist');
  }
}

// --- Toast ---
let toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  toastMsg.textContent = msg;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
