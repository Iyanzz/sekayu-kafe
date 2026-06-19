/* =============================================
   SEKAYU COFFEE & EATERY — MAIN JAVASCRIPT
   ============================================= */

// ===== MENU DATA =====
const menuData = {
  'mie-1':    { name: 'Mie Kuah Sekayu Original', price: 15000 },
  'mie-2':    { name: 'Mie Kuah Sekayu Pedas',    price: 17000 },
  'nasi-1':   { name: 'Nasi Ayam Bakar',           price: 20000 },
  'nasi-2':   { name: 'Nasi Ayam Goreng',          price: 20000 },
  'snack-1':  { name: 'Kentang Goreng',            price: 12000 },
  'snack-2':  { name: 'Roti Bakar',                price: 10000 },
  'snack-3':  { name: 'Nugget Goreng',             price: 13000 },
  'snack-4':  { name: 'Cheese Stick',              price: 13000 },
  'minum-1':  { name: 'Es Teh Sekayu',             price: 5000  },
  'minum-2':  { name: 'Kopi Susu Sekayu',          price: 12000 },
  'minum-3':  { name: 'Jus Buah Segar',            price: 10000 },
  'minum-4':  { name: 'Minuman Dingin Lainnya',    price: 8000  },
};

// Cart state
let cart = {};
let guestCount = 2;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 });
  initNavbar();
  initMinDate();
  initMobileMenu();
  updateCartUI();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Scrolled state
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== MIN DATE =====
function initMinDate() {
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm   = String(today.getMonth() + 1).padStart(2, '0');
    const dd   = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }
}

// ===== MENU FILTER =====
function filterMenu(category, el) {
  const cards   = document.querySelectorAll('.menu-card');
  const buttons = document.querySelectorAll('.tab-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  if (el) el.classList.add('active');

  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// ===== QUANTITY CHANGE =====
function changeQty(itemId, delta) {
  const wrapper = document.getElementById(`qty-${itemId}`);
  if (!wrapper) return;

  const numSpan = wrapper.querySelector('.qty-num');
  let current   = cart[itemId] ? cart[itemId].qty : 0;
  let newQty    = Math.max(0, current + delta);

  if (newQty === 0) {
    delete cart[itemId];
  } else {
    cart[itemId] = {
      ...menuData[itemId],
      qty: newQty,
    };
  }

  numSpan.textContent = newQty;

  // Animate number
  numSpan.classList.add('qty-pop');
  setTimeout(() => numSpan.classList.remove('qty-pop'), 200);

  // Show toast if adding
  if (delta > 0) {
    showToast(`${menuData[itemId].name} ditambahkan ✓`);
  }

  updateCartUI();
}

// ===== GUEST COUNT =====
function changeGuest(delta) {
  guestCount = Math.max(1, Math.min(20, guestCount + delta));
  document.getElementById('guestCountDisplay').textContent = guestCount;
  document.getElementById('guestCount').value = guestCount;
}

// ===== CART UI UPDATE =====
function updateCartUI() {
  const items      = Object.entries(cart);
  const badge      = document.getElementById('cartBadge');
  const cartItems  = document.getElementById('cartItems');
  const cartEmpty  = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal  = document.getElementById('cartTotal');
  const summaryItems  = document.getElementById('summaryItems');
  const summaryEmpty  = document.getElementById('summaryEmpty');
  const summaryTotal  = document.getElementById('summaryTotal');
  const summarySubtotal  = document.getElementById('summarySubtotal');
  const summaryGrandTotal = document.getElementById('summaryGrandTotal');

  const totalQty = items.reduce((s, [, v]) => s + v.qty, 0);
  const totalPrice = items.reduce((s, [, v]) => s + (v.price * v.qty), 0);

  // Badge
  badge.textContent = totalQty;
  badge.style.display = totalQty > 0 ? 'flex' : 'none';

  // -- Cart Drawer --
  if (totalQty === 0) {
    cartEmpty.style.display = 'flex';
    cartFooter.style.display = 'none';
    // Clear old rows except empty message
    cartItems.querySelectorAll('.cart-item-row').forEach(el => el.remove());
  } else {
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';
    cartTotal.textContent = formatRp(totalPrice);

    // Rebuild rows
    cartItems.querySelectorAll('.cart-item-row').forEach(el => el.remove());
    items.forEach(([id, v]) => {
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div class="cart-item-name">${v.name}</div>
        <div class="cart-item-qty">x${v.qty}</div>
        <div class="cart-item-price">${formatRp(v.price * v.qty)}</div>
        <button class="cart-item-del" onclick="removeItem('${id}')" title="Hapus">
          <i class="fas fa-trash-alt"></i>
        </button>`;
      cartItems.appendChild(row);
    });
  }

  // -- Booking Summary --
  if (totalQty === 0) {
    summaryEmpty.style.display = 'flex';
    summaryTotal.style.display = 'none';
    summaryItems.querySelectorAll('.summary-item-row').forEach(el => el.remove());
  } else {
    summaryEmpty.style.display = 'none';
    summaryTotal.style.display = 'block';
    summarySubtotal.textContent = formatRp(totalPrice);
    summaryGrandTotal.textContent = formatRp(totalPrice);

    summaryItems.querySelectorAll('.summary-item-row').forEach(el => el.remove());
    items.forEach(([, v]) => {
      const row = document.createElement('div');
      row.className = 'summary-item-row';
      row.innerHTML = `
        <div class="summary-item-name">${v.name}</div>
        <div class="summary-item-qty">x${v.qty}</div>
        <div class="summary-item-price">${formatRp(v.price * v.qty)}</div>`;
      summaryItems.insertBefore(row, summaryEmpty);
    });
  }
}

// ===== REMOVE ITEM FROM CART =====
function removeItem(itemId) {
  if (!cart[itemId]) return;
  const wrapper  = document.getElementById(`qty-${itemId}`);
  if (wrapper) wrapper.querySelector('.qty-num').textContent = '0';
  delete cart[itemId];
  updateCartUI();
  showToast('Item dihapus dari pesanan');
}

// ===== TOGGLE CART DRAWER =====
function toggleCart() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const isOpen  = drawer.classList.contains('open');

  drawer.classList.toggle('open', !isOpen);
  overlay.classList.toggle('active', !isOpen);
  document.body.style.overflow = !isOpen ? 'hidden' : '';
}

// ===== SCROLL TO BOOKING =====
function scrollToBooking() {
  toggleCart();
  setTimeout(() => {
    const section = document.getElementById('booking');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 350);
}

// ===== SUBMIT BOOKING → WHATSAPP =====
function submitBooking(e) {
  e.preventDefault();

  const name     = document.getElementById('guestName').value.trim();
  const phone    = document.getElementById('guestPhone').value.trim();
  const date     = document.getElementById('bookingDate').value;
  const time     = document.getElementById('bookingTime').value;
  const guests   = document.getElementById('guestCount').value;
  const note     = document.getElementById('bookingNote').value.trim();

  // Basic validation
  if (!name || !phone || !date || !time) {
    showToast('Mohon lengkapi semua field yang wajib diisi', 'error');
    return;
  }

  // Format date
  const dateObj  = new Date(date);
  const dateStr  = dateObj.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Build order lines
  const items    = Object.entries(cart);
  const totalPrice = items.reduce((s, [, v]) => s + (v.price * v.qty), 0);

  let orderLines = '';
  if (items.length > 0) {
    items.forEach(([, v]) => {
      orderLines += `- ${v.name} x${v.qty} = ${formatRp(v.price * v.qty)}\n`;
    });
  } else {
    orderLines = '- (Belum ada pilihan menu)\n';
  }

  // Compose message
  const message = `Halo Sekayu Coffee & Eatery, saya ingin booking meja:

Nama: ${name}
No. HP: ${phone}
Tanggal: ${dateStr}
Jam: ${time} WIB
Jumlah orang: ${guests} orang

Pesanan:
${orderLines}
Total estimasi: ${formatRp(totalPrice)}
Catatan: ${note || '-'}

Mohon konfirmasi ketersediaan meja. Terima kasih 🙏`;

  const waURL = `https://wa.me/6282246034954?text=${encodeURIComponent(message)}`;

  // Open WhatsApp
  window.open(waURL, '_blank');
}

// ===== UTILITY: FORMAT RUPIAH =====
function formatRp(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

// ===== UTILITY: SHOW TOAST =====
function showToast(msg, type = 'success') {
  const toast   = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const icon    = toast.querySelector('i');

  toastMsg.textContent = msg;
  icon.className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
  icon.style.color = type === 'error' ? '#e74c3c' : 'var(--gold)';

  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== QTY POP ANIMATION =====
const style = document.createElement('style');
style.textContent = `
  .qty-pop {
    animation: qtyPop 0.2s ease;
  }
  @keyframes qtyPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.4); color: var(--gold); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);
