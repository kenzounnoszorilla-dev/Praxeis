/**
 * Configuration
 * Change MENU_URL to your deployed domain. 
 * While it is empty or still the placeholder, the QR code falls back to the current page address.
 */
const MENU_URL = "https://your-domain.com/"; // Replace with your actual domain

/**
 * Menu Data Array
 */
const menuData = [
  {
    id: "01",
    title: "Coffee classics",
    subtitle: "A familiar comfort, one cup at a time.",
    items: [
      { name: "Espresso", price: 90, desc: "A rich double shot with a smooth finish.", star: false },
      { name: "Americano", price: 110, desc: "Espresso and water. Simple, bold, balanced.", star: false },
      { name: "Cappuccino", price: 135, desc: "Espresso, steamed milk, and a cloud of foam.", star: false },
      { name: "Café Latte", price: 140, desc: "Silky milk meets a full-bodied espresso.", star: false },
      { name: "Spanish Latte", price: 155, desc: "Espresso with a sweet, creamy milk blend.", star: true }
    ]
  },
  {
    id: "02",
    title: "Signature sips",
    subtitle: "Sweet moments worth slowing down for.",
    items: [
      { name: "Caramel Macchiato", price: 165, desc: "Vanilla milk, espresso, and caramel drizzle.", star: true },
      { name: "Salted Caramel Latte", price: 165, desc: "Buttery caramel with a little sea-salt finish.", star: false },
      { name: "Café Mocha", price: 160, desc: "Deep chocolate, espresso, and creamy milk.", star: false },
      { name: "Honey Cinnamon Latte", price: 165, desc: "A mellow honey sweetness and warm spice.", star: false },
      { name: "Vanilla Sweet Cream Cold Brew", price: 170, desc: "Slow-steeped coffee, topped with sweet cream.", star: false }
    ]
  },
  {
    id: "03",
    title: "Beyond coffee",
    subtitle: "Something lovely for every kind of cup.",
    items: [
      { name: "Matcha Latte", price: 160, desc: "Earthy green tea whisked with creamy milk.", star: false },
      { name: "Strawberry Matcha", price: 180, desc: "Strawberry purée, milk, and a matcha layer.", star: true },
      { name: "Classic Chocolate", price: 140, desc: "Rich cocoa and milk, cozy or over ice.", star: false },
      { name: "Chai Latte", price: 150, desc: "Black tea with cinnamon and warming spices.", star: false },
      { name: "Loose-leaf Tea", price: 100, desc: "Choose English breakfast or chamomile.", star: false }
    ]
  },
  {
    id: "04",
    title: "Cool & refreshing",
    subtitle: "Bright, light, and made for a fresh start.",
    items: [
      { name: "House Lemonade", price: 115, desc: "Fresh lemon, a little sweetness, plenty of ice.", star: false },
      { name: "Strawberry Lemonade", price: 135, desc: "A berry-bright twist on the classic.", star: false },
      { name: "Peach Iced Tea", price: 125, desc: "Black tea with a soft, fruity peach finish.", star: false },
      { name: "Calamansi Cooler", price: 115, desc: "A refreshing citrus sip, sweet and tart.", star: false },
      { name: "Mango Fizz", price: 140, desc: "Golden mango and sparkling soda over ice.", star: false }
    ]
  },
  {
    id: "05",
    title: "From the pastry case",
    subtitle: "A little sweetness alongside your sip.",
    items: [
      { name: "Butter Croissant", price: 95, desc: "Golden layers with a tender, buttery center.", star: false },
      { name: "Cinnamon Roll", price: 115, desc: "Soft swirls of cinnamon with vanilla icing.", star: true },
      { name: "Chocolate Chip Cookie", price: 75, desc: "Crisp edges, a soft center, generous chocolate.", star: false },
      { name: "Banana Walnut Loaf", price: 90, desc: "A home-style slice with toasted walnuts.", star: false },
      { name: "Classic Cheesecake", price: 150, desc: "Creamy cheesecake on a biscuit crumb base.", star: false }
    ]
  },
  {
    id: "06",
    title: "A bite to stay for",
    subtitle: "For slow mornings and easy afternoons.",
    items: [
      { name: "Ham & Cheese Croissant", price: 185, desc: "Flaky croissant, savory ham, and melted cheese.", star: false },
      { name: "Grilled Three-cheese Sandwich", price: 175, desc: "A golden toastie with a comforting cheese trio.", star: false },
      { name: "Tuna Melt", price: 180, desc: "Creamy tuna and cheese on toasted sourdough.", star: false },
      { name: "Creamy Mushroom Pasta", price: 225, desc: "Pasta tossed in a creamy garlic mushroom sauce.", star: false },
      { name: "Tomato Basil Pasta", price: 210, desc: "A bright tomato sauce with basil and parmesan.", star: false }
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  setupLayoutMetrics();
  renderMenu();
  setupIntersectionObserver();
  setupAnimations();
  generateQRCode();
});

function renderMenu() {
  const tabsContainer = document.getElementById('category-tabs');
  const gridContainer = document.getElementById('menu-grid');

  menuData.forEach((category, index) => {
    // 1. Create Tab Link
    const tabLink = document.createElement('a');
    tabLink.href = `#cat-${category.id}`;
    tabLink.className = `tab-link ${index === 0 ? 'active' : ''}`;
    tabLink.textContent = category.title;
    tabsContainer.appendChild(tabLink);

    // 2. Create Category Section
    const catDiv = document.createElement('div');
    catDiv.className = 'category';
    catDiv.id = `cat-${category.id}`;

    const catHeader = `
      <div class="category-header">
        <span class="cat-num">${category.id}</span>
        <h3>${category.title}</h3>
      </div>
      <div class="category-underline"></div>
      <p class="cat-desc">${category.subtitle}</p>
    `;

    // 3. Create Items
    const itemsHTML = category.items.map(item => `
      <div class="menu-item">
        <div class="item-top">
          <span class="menu-item-name">${item.name}${item.star ? ' <span class="star" role="img" aria-label="Recommended">✦</span>' : ''}</span>
          <span class="menu-item-price">₱${item.price}</span>
        </div>
        <p class="item-desc">${item.desc}</p>
      </div>
    `).join('');

    catDiv.innerHTML = catHeader + itemsHTML;
    gridContainer.appendChild(catDiv);
  });
}

/* Keeps --header-h / --tabs-h in sync with the real sticky element heights (used by CSS and the scroll spy). */
function setupLayoutMetrics() {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const tabs = document.querySelector('.category-tabs-wrapper');
  const update = () => {
    root.style.setProperty('--header-h', `${header.offsetHeight}px`);
    root.style.setProperty('--tabs-h', `${tabs.offsetHeight}px`);
  };
  update();
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(update);
    ro.observe(header);
    ro.observe(tabs);
  } else {
    window.addEventListener('resize', update);
  }
}

function setupIntersectionObserver() {
  const categories = document.querySelectorAll('.category');
  const tabLinks = document.querySelectorAll('.tab-link');
  const nav = document.getElementById('category-tabs');
  const css = getComputedStyle(document.documentElement);
  const offset = parseFloat(css.getPropertyValue('--header-h')) + parseFloat(css.getPropertyValue('--tabs-h')) + 24;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lockUntil = 0; // after a tab click, ignore the observer while the page scrolls

  const setActive = (activeLink) => {
    tabLinks.forEach(link => link.classList.toggle('active', link === activeLink));
    // Scroll only the tab bar sideways (scrollIntoView could also scroll the page).
    if (nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({
        left: activeLink.offsetLeft - (nav.clientWidth - activeLink.offsetWidth) / 2,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    }
  };

  tabLinks.forEach(link => link.addEventListener('click', () => {
    lockUntil = Date.now() + 1000;
    setActive(link);
  }));

  const observer = new IntersectionObserver((entries) => {
    if (Date.now() < lockUntil) return;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const link = document.querySelector(`.tab-link[href="#${entry.target.id}"]`);
      if (link) setActive(link);
    });
  }, { root: null, rootMargin: `-${offset}px 0px -40% 0px`, threshold: 0 });

  categories.forEach(cat => observer.observe(cat));
}

function setupAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const animatedElements = document.querySelectorAll('.fade-up');
  
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => animObserver.observe(el));
}

/* ---------- QR code ---------- */
const QR_COLORS = { dark: "#3B2F25", light: "#FFFDF6" }; // light must match --qr-light in style.css
const QR_SCREEN_SIZE = 220;
const QR_DOWNLOAD_SIZE = 1024;
const QR_DOWNLOAD_PADDING = 100; // quiet zone in the downloaded PNG

function getMenuUrl() {
  if (MENU_URL && !MENU_URL.includes("your-domain.com")) return MENU_URL;
  console.warn("MENU_URL is still the placeholder, so the QR code points to this page's current address. Set MENU_URL in script.js before printing.");
  return window.location.href.split("#")[0];
}

function generateQRCode() {
  const container = document.getElementById("qrcode-container");
  const fallback = document.getElementById("qr-fallback");
  const fallbackLink = document.getElementById("fallback-link");
  const urlLabel = document.getElementById("qr-url");
  const finalUrl = getMenuUrl();

  if (typeof QRCode !== 'undefined') {
    urlLabel.textContent = finalUrl;
    new QRCode(container, {
      text: finalUrl,
      width: QR_SCREEN_SIZE,
      height: QR_SCREEN_SIZE,
      colorDark: QR_COLORS.dark,
      colorLight: QR_COLORS.light,
      correctLevel: QRCode.CorrectLevel.H
    });
    setupQRButtons(finalUrl);
  } else {
    // Graceful fallback if the CDN fails
    container.style.display = "none";
    urlLabel.style.display = "none";
    fallback.style.display = "block";
    fallbackLink.href = finalUrl;
    fallbackLink.textContent = `View menu online at ${finalUrl}`;
    document.querySelector('.qr-actions').style.display = 'none';
  }
}

function setupQRButtons(url) {
  document.getElementById('download-qr').addEventListener('click', () => downloadQR(url));

  document.getElementById('print-qr').addEventListener('click', () => {
    // The print styles only apply while this class is set, so Ctrl+P elsewhere still prints the full page.
    const root = document.documentElement;
    root.classList.add('printing-qr');
    window.addEventListener('afterprint', () => root.classList.remove('printing-qr'), { once: true });
    window.print();
  });
}

function downloadQR(url) {
  const size = QR_DOWNLOAD_SIZE;
  const inner = size - QR_DOWNLOAD_PADDING * 2;

  // Render a fresh, large QR instead of stretching the small on-screen one (which blurs the modules).
  const temp = document.createElement('div');
  temp.style.cssText = 'position:fixed;left:-9999px;top:0;';
  document.body.appendChild(temp);
  new QRCode(temp, {
    text: url, width: inner, height: inner,
    colorDark: QR_COLORS.dark, colorLight: QR_COLORS.light,
    correctLevel: QRCode.CorrectLevel.H
  });
  const qrCanvas = temp.querySelector('canvas');
  if (!qrCanvas) { temp.remove(); return; }

  const out = document.createElement('canvas');
  out.width = size;
  out.height = size;
  const ctx = out.getContext('2d');
  ctx.fillStyle = QR_COLORS.light;
  ctx.fillRect(0, 0, size, size);
  ctx.imageSmoothingEnabled = false;
  // The library draws whole-pixel modules, so draw at natural size and centre it.
  const drawSize = Math.min(qrCanvas.width, inner);
  const offset = Math.round((size - drawSize) / 2);
  ctx.drawImage(qrCanvas, offset, offset, drawSize, drawSize);
  temp.remove();

  out.toBlob((blob) => {
    const link = document.createElement('a');
    link.download = 'praxeis-menu-qr.png';
    link.href = URL.createObjectURL(blob);
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }, 'image/png');
}
