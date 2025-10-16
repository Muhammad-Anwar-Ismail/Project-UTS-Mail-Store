// Mail Store E-commerce JavaScript

// Global Variables
let cart = JSON.parse(localStorage.getItem("darkstore-cart")) || [];
let products = [];
let currentUser = JSON.parse(localStorage.getItem("darkstore-user")) || null;

// Sample Products Data
const sampleProducts = [
  {
    id: 1,
    name: "Headphone Wireless Premium",
    category: "electronics",
    price: 1299000,
    originalPrice: 1599000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 124,
    description:
      "Headphone wireless premium dengan kualitas suara Hi-Fi dan teknologi noise cancelling terdepan.",
    features: [
      "Teknologi Noise Cancelling",
      "Baterai 30 jam",
      "Bluetooth 5.0",
      "Quick Charge",
      "Garansi 2 tahun",
    ],
    stock: 15,
  },
  {
    id: 2,
    name: "Smartphone Gaming Pro",
    category: "electronics",
    price: 8999000,
    originalPrice: 9999000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviews: 89,
    description:
      "Smartphone gaming dengan performa tinggi dan layar 120Hz untuk pengalaman gaming terbaik.",
    features: [
      "Snapdragon 8 Gen 2",
      "RAM 12GB",
      "Storage 256GB",
      "Layar 120Hz",
      "Baterai 5000mAh",
    ],
    stock: 8,
  },
  {
    id: 3,
    name: "Laptop Ultrabook",
    category: "electronics",
    price: 15999000,
    originalPrice: 17999000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 156,
    description:
      "Laptop ultrabook ringan dengan performa tinggi untuk produktivitas maksimal.",
    features: [
      "Intel i7 Gen 12",
      "RAM 16GB",
      "SSD 512GB",
      'Layar 14" 2K',
      "Berat 1.2kg",
    ],
    stock: 12,
  },
  {
    id: 4,
    name: "Jaket Hoodie Premium",
    category: "fashion",
    price: 299000,
    originalPrice: 399000,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 78,
    description:
      "Jaket hoodie premium dengan bahan cotton blend yang nyaman dan tahan lama.",
    features: [
      "100% Cotton Blend",
      "Unisex Design",
      "Berbagai Ukuran",
      "Warna Pilihan",
      "Anti Shrink",
    ],
    stock: 25,
  },
  {
    id: 5,
    name: "Sepatu Sneakers Sport",
    category: "fashion",
    price: 899000,
    originalPrice: 1199000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 203,
    description:
      "Sepatu sneakers sport dengan teknologi cushioning untuk kenyamanan maksimal.",
    features: [
      "Air Cushion Technology",
      "Breathable Material",
      "Anti Slip Sole",
      "Lightweight Design",
      "Garansi 1 Tahun",
    ],
    stock: 18,
  },
  {
    id: 6,
    name: "Kursi Gaming Ergonomis",
    category: "home",
    price: 2499000,
    originalPrice: 2999000,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 67,
    description:
      "Kursi gaming ergonomis dengan dukungan lumbar dan material premium.",
    features: [
      "Ergonomic Design",
      "Lumbar Support",
      "Adjustable Height",
      "PU Leather",
      "Reclining Function",
    ],
    stock: 10,
  },
  {
    id: 7,
    name: "Smartwatch Fitness",
    category: "electronics",
    price: 1999000,
    originalPrice: 2499000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviews: 134,
    description:
      "Smartwatch dengan fitur fitness tracking lengkap dan baterai tahan lama.",
    features: [
      "Heart Rate Monitor",
      "GPS Tracking",
      "Water Resistant",
      "Sleep Tracking",
      "Baterai 7 Hari",
    ],
    stock: 22,
  },
  {
    id: 8,
    name: "Tas Ransel Travel",
    category: "fashion",
    price: 599000,
    originalPrice: 799000,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 91,
    description:
      "Tas ransel travel dengan kapasitas besar dan bahan tahan air.",
    features: [
      "Kapasitas 35L",
      "Water Resistant",
      "Multiple Compartments",
      "Ergonomic Straps",
      "USB Charging Port",
    ],
    stock: 16,
  },
];

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  products = sampleProducts;
  updateCartCount();
  initializePage();
});

// Page Initialization
function initializePage() {
  const currentPage = getCurrentPage();

  switch (currentPage) {
    case "index":
      initHomePage();
      break;
    case "products":
      initProductsPage();
      break;
    case "product-detail":
      initProductDetailPage();
      break;
    case "contact":
      initContactPage();
      break;
    case "login":
      initLoginPage();
      break;
    case "checkout":
      initCheckoutPage();
      break;
  }

  // Common initializations
  initCartModal();
  initNavigation();
}

// Get Current Page
function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split("/").pop().split(".")[0];
  return filename || "index";
}

// Home Page Functions
function initHomePage() {
  loadFeaturedProducts();
}

function loadFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;

  const featuredProducts = products.slice(0, 4);
  container.innerHTML = "";

  featuredProducts.forEach((product) => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
}

// Products Page Functions
function initProductsPage() {
  loadProducts();
  initFilters();
  initSearch();
  initSort();
  initLoadMore();
}

function loadProducts(category = "all", searchTerm = "", sortBy = "name") {
  const container = document.getElementById("productsContainer");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const noProducts = document.getElementById("noProducts");

  if (!container) return;

  // Show loading
  loadingSpinner?.classList.remove("d-none");
  container.innerHTML = "";
  noProducts?.classList.add("d-none");

  // Filter products
  let filteredProducts = products;

  if (category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Simulate loading delay
  setTimeout(() => {
    loadingSpinner?.classList.add("d-none");

    if (filteredProducts.length === 0) {
      noProducts?.classList.remove("d-none");
      return;
    }

    filteredProducts.forEach((product) => {
      const productCard = createProductCard(product);
      container.appendChild(productCard);
    });
  }, 500);
}

function createProductCard(product) {
  const col = document.createElement("div");
  col.className = "col-lg-3 col-md-6 mb-4";

  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100
  );

  col.innerHTML = `
        <div class="product-card h-100">
            <div class="product-image">
                <img src="${product.image}" alt="${
    product.name
  }" class="img-fluid">
                <div class="product-overlay">
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${
                          product.id
                        })">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                        <button class="btn btn-outline-light btn-sm" onclick="viewProduct(${
                          product.id
                        })">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                ${
                  discount > 0
                    ? `<span class="badge bg-danger position-absolute top-0 end-0 m-2">${discount}% OFF</span>`
                    : ""
                }
            </div>
            <div class="product-info">
                <h6 class="product-title">${product.name}</h6>
                <div class="product-rating mb-2">
                    ${generateStars(product.rating)}
                    <small class="text-muted ms-1">(${product.reviews})</small>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="product-price">Rp ${formatPrice(
                          product.price
                        )}</span>
                        ${
                          product.originalPrice > product.price
                            ? `<br><small class="text-muted text-decoration-line-through">Rp ${formatPrice(
                                product.originalPrice
                              )}</small>`
                            : ""
                        }
                    </div>
                    <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${
                      product.id
                    })">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

  return col;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star text-warning"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt text-warning"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star text-warning"></i>';
  }

  return stars;
}

function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.dataset.category;
      const searchTerm = document.getElementById("searchInput")?.value || "";
      const sortBy = document.getElementById("sortSelect")?.value || "name";

      loadProducts(category, searchTerm, sortBy);
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  if (searchInput && searchBtn) {
    const performSearch = () => {
      const category =
        document.querySelector(".filter-btn.active")?.dataset.category || "all";
      const searchTerm = searchInput.value;
      const sortBy = document.getElementById("sortSelect")?.value || "name";

      loadProducts(category, searchTerm, sortBy);
    };

    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }
}

function initSort() {
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const category =
        document.querySelector(".filter-btn.active")?.dataset.category || "all";
      const searchTerm = document.getElementById("searchInput")?.value || "";
      const sortBy = this.value;

      loadProducts(category, searchTerm, sortBy);
    });
  }
}

function initLoadMore() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      // Simulate loading more products
      this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Memuat...';

      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-plus me-2"></i>Muat Lebih Banyak';
        // In a real app, you would load more products here
      }, 1000);
    });
  }
}

// Product Detail Page Functions
function initProductDetailPage() {
  loadProductDetail();
  initProductImageGallery();
  initQuantitySelector();
  initProductActions();
  loadRelatedProducts();
}

function loadProductDetail() {
  // In a real app, you would get the product ID from URL parameters
  const product = products[0]; // Using first product as example

  if (!product) return;

  // Update product information
  document.getElementById("productBreadcrumb").textContent = product.name;
  document.getElementById("productCategory").textContent =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);
  document.getElementById("productTitle").textContent = product.name;
  document.getElementById("productRating").textContent = product.rating;
  document.getElementById("productStars").innerHTML = generateStars(
    product.rating
  );
  document.getElementById("productPrice").textContent = `Rp ${formatPrice(
    product.price
  )}`;
  document.getElementById(
    "productOriginalPrice"
  ).textContent = `Rp ${formatPrice(product.originalPrice)}`;
  document.getElementById("productDescription").textContent =
    product.description;
}

function initProductImageGallery() {
  const thumbnails = document.querySelectorAll(".thumbnail-img");
  const mainImage = document.getElementById("mainProductImage");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      thumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      if (mainImage) {
        mainImage.src = this.dataset.main;
      }
    });
  });
}

function initQuantitySelector() {
  const decreaseBtn = document.getElementById("decreaseQty");
  const increaseBtn = document.getElementById("increaseQty");
  const quantityInput = document.getElementById("quantity");

  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener("click", function () {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    increaseBtn.addEventListener("click", function () {
      const currentValue = parseInt(quantityInput.value);
      const maxValue = parseInt(quantityInput.max) || 10;
      if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
      }
    });
  }
}

function initProductActions() {
  const addToCartBtn = document.getElementById("addToCartBtn");
  const buyNowBtn = document.getElementById("buyNowBtn");
  const wishlistBtn = document.getElementById("wishlistBtn");
  const shareBtn = document.getElementById("shareBtn");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function () {
      const productId = parseInt(this.dataset.productId) || 1; // Default to 1 if not specified
      const quantity = parseInt(document.getElementById("quantity").value) || 1;
      addToCart(productId, quantity);
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", function () {
      const productId = parseInt(this.dataset.productId) || 1; // Default to 1 if not specified
      const quantity = parseInt(document.getElementById("quantity").value) || 1;
      addToCart(productId, quantity);

      // Redirect to checkout page
      window.location.href = "checkout.html";
    });
  }

  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", function () {
      showAlert("Produk ditambahkan ke wishlist!", "success");
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      if (navigator.share) {
        navigator.share({
          title: document.getElementById("productTitle").textContent,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showAlert("Link produk disalin ke clipboard!", "success");
      }
    });
  }
}

function loadRelatedProducts() {
  const container = document.getElementById("relatedProducts");
  if (!container) return;

  const relatedProducts = products.slice(1, 5); // Get 4 related products
  container.innerHTML = "";

  relatedProducts.forEach((product) => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
}

// Contact Page Functions
function initContactPage() {
  initContactForm();
}

function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (this.checkValidity()) {
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Mengirim...';
      submitBtn.disabled = true;

      setTimeout(() => {
        this.style.display = "none";
        document.getElementById("successMessage").classList.remove("d-none");
      }, 2000);
    }

    this.classList.add("was-validated");
  });
}

// Login Page Functions
function initLoginPage() {
  initAuthForms();
  initPasswordToggles();
}

function initAuthForms() {
  // Form switching
  const showRegisterBtn = document.getElementById("showRegisterForm");
  const showLoginBtn = document.getElementById("showLoginForm");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");
  const backToLoginBtn = document.getElementById("backToLogin");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  if (showRegisterBtn) {
    showRegisterBtn.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.classList.add("d-none");
      registerForm.classList.remove("d-none");
      forgotPasswordForm.classList.add("d-none");
    });
  }

  if (showLoginBtn) {
    showLoginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.classList.remove("d-none");
      registerForm.classList.add("d-none");
      forgotPasswordForm.classList.add("d-none");
    });
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.classList.add("d-none");
      registerForm.classList.add("d-none");
      forgotPasswordForm.classList.remove("d-none");
    });
  }

  if (backToLoginBtn) {
    backToLoginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.classList.remove("d-none");
      registerForm.classList.add("d-none");
      forgotPasswordForm.classList.add("d-none");
    });
  }

  // Form submissions
  initLoginFormSubmission();
  initRegisterFormSubmission();
  initForgotPasswordFormSubmission();
}

function initLoginFormSubmission() {
  const loginForm = document.getElementById("loginFormSubmit");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (this.checkValidity()) {
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      // Simulate login
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Masuk...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Store user data
        const userData = {
          email: email,
          name: "User",
          loginTime: new Date().toISOString(),
        };

        localStorage.setItem("darkstore-user", JSON.stringify(userData));
        currentUser = userData;

        document
          .getElementById("loginSuccessMessage")
          .classList.remove("d-none");

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      }, 1500);
    }

    this.classList.add("was-validated");
  });
}

function initRegisterFormSubmission() {
  const registerForm = document.getElementById("registerFormSubmit");
  if (!registerForm) return;

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Custom validation for password confirmation
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      document
        .getElementById("confirmPassword")
        .setCustomValidity("Password tidak cocok");
    } else {
      document.getElementById("confirmPassword").setCustomValidity("");
    }

    if (this.checkValidity()) {
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Mendaftar...';
      submitBtn.disabled = true;

      setTimeout(() => {
        document
          .getElementById("registerSuccessMessage")
          .classList.remove("d-none");

        setTimeout(() => {
          // Switch to login form
          document.getElementById("registerForm").classList.add("d-none");
          document.getElementById("loginForm").classList.remove("d-none");
        }, 2000);
      }, 1500);
    }

    this.classList.add("was-validated");
  });
}

function initForgotPasswordFormSubmission() {
  const forgotPasswordForm = document.getElementById(
    "forgotPasswordFormSubmit"
  );
  if (!forgotPasswordForm) return;

  forgotPasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (this.checkValidity()) {
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Mengirim...';
      submitBtn.disabled = true;

      setTimeout(() => {
        document
          .getElementById("forgotPasswordSuccessMessage")
          .classList.remove("d-none");
      }, 1500);
    }

    this.classList.add("was-validated");
  });
}

function initPasswordToggles() {
  const toggleBtns = [
    "toggleLoginPassword",
    "toggleRegisterPassword",
    "toggleConfirmPassword",
  ];

  toggleBtns.forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", function () {
        const input = this.previousElementSibling;
        const icon = this.querySelector("i");

        if (input.type === "password") {
          input.type = "text";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          input.type = "password";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      });
    }
  });
}

// Cart Functions
function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity,
    });
  }

  localStorage.setItem("darkstore-cart", JSON.stringify(cart));
  updateCartCount();
  showAlert(`${product.name} ditambahkan ke keranjang!`, "success");
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("darkstore-cart", JSON.stringify(cart));
  updateCartCount();
  updateCartModal();
}

function updateCartQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      localStorage.setItem("darkstore-cart", JSON.stringify(cart));
      updateCartCount();
      updateCartModal();
    }
  }
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

function initCartModal() {
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      updateCartModal();
      const cartModal = new bootstrap.Modal(
        document.getElementById("cartModal")
      );
      cartModal.show();
    });
  }

  // Initialize checkout button
  initCheckoutBtn();
}

function updateCartModal() {
  const cartItems = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.style.display = "none";
    emptyCart.style.display = "block";
    if (cartTotal) cartTotal.textContent = "Rp 0";
    return;
  }

  cartItems.style.display = "block";
  emptyCart.style.display = "none";

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className =
      "cart-item d-flex align-items-center mb-3 p-3 bg-dark rounded";
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${
      item.name
    }" class="cart-item-image me-3" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            <div class="cart-item-info flex-grow-1">
                <h6 class="mb-1">${item.name}</h6>
                <p class="text-primary mb-0">Rp ${formatPrice(item.price)}</p>
            </div>
            <div class="cart-item-controls d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateCartQuantity(${
                  item.id
                }, ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateCartQuantity(${
                  item.id
                }, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${
                  item.id
                })">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

    cartItems.appendChild(cartItem);
  });

  if (cartTotal) {
    cartTotal.textContent = `Rp ${formatPrice(total)}`;
  }
}

// Navigation Functions
function initNavigation() {
  // Update user status in navigation
  updateUserNavigation();

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

function updateUserNavigation() {
  const loginLink = document.querySelector('a[href="login.html"]');
  if (loginLink && currentUser) {
    loginLink.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
    loginLink.href = "#";
    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      showUserMenu();
    });
  }
}

function showUserMenu() {
  // Simple user menu - in a real app, you'd show a dropdown
  if (confirm("Apakah Anda ingin logout?")) {
    logout();
  }
}

function logout() {
  localStorage.removeItem("darkstore-user");
  currentUser = null;
  showAlert("Logout berhasil!", "success");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}

// Utility Functions
function formatPrice(price) {
  return new Intl.NumberFormat("id-ID").format(price);
}

function showAlert(message, type = "info") {
  // Remove any existing alerts first
  const existingAlerts = document.querySelectorAll(".alert-dismissible");
  existingAlerts.forEach((alert) => alert.remove());

  // Create alert element
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  alert.style.cssText =
    "top: 100px; right: 20px; z-index: 9999; min-width: 300px;";
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.appendChild(alert);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (alert.parentNode) {
      alert.remove();
    }
  }, 3000);

  // Add Bootstrap dismiss functionality
  const bsAlert = new bootstrap.Alert(alert);
}

function viewProduct(productId) {
  // In a real app, you would navigate to product detail page with the product ID
  window.location.href = `product-detail.html?id=${productId}`;
}

// Animation on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements that should animate
  document
    .querySelectorAll(".feature-card, .product-card, .team-card, .value-card")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initScrollAnimations, 100);
});

// Handle form validation styling
document.addEventListener("DOMContentLoaded", function () {
  // Add custom validation styling
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });
});

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = "btn btn-primary position-fixed";
  backToTopBtn.style.cssText =
    "bottom: 20px; right: 20px; z-index: 9999; border-radius: 50%; width: 50px; height: 50px; display: none;";

  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize back to top button
document.addEventListener("DOMContentLoaded", initBackToTop);

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", initLazyLoading);

// Checkout Page Functions
function initCheckoutPage() {
  initPaymentMethods();
  initShippingMethods();
  initPromoCode();
  initCheckoutForm();
  initCardFormatting();
  updateOrderSummary();
  loadCheckoutItems();
}

function loadCheckoutItems() {
  const checkoutItems = document.getElementById("checkoutItems");
  if (!checkoutItems) return;

  checkoutItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;

    const orderItem = document.createElement("div");
    orderItem.className =
      "order-item d-flex align-items-center mb-3 p-3 bg-dark rounded";
    orderItem.innerHTML = `
      <img 
        src="${item.image}" 
        alt="${item.name}" 
        class="rounded me-3" 
        style="width: 60px; height: 60px; object-fit: cover"
      />
      <div class="flex-grow-1">
        <h6 class="mb-1">${item.name}</h6>
        <small class="text-muted">Qty: ${item.quantity}</small>
      </div>
      <div class="text-end">
        <strong class="text-primary">Rp ${formatPrice(
          item.price * item.quantity
        )}</strong>
      </div>
    `;

    checkoutItems.appendChild(orderItem);
  });

  // Update subtotal in order summary
  const subtotalElement = document.getElementById("subtotal");
  if (subtotalElement) {
    subtotalElement.textContent = `Rp ${formatPrice(subtotal)}`;
  }
}

function initPaymentMethods() {
  const paymentMethods = document.querySelectorAll('input[name="payment"]');
  const creditCardForm = document.getElementById("creditCardForm");

  if (!paymentMethods.length || !creditCardForm) return;

  paymentMethods.forEach((method) => {
    method.addEventListener("change", function () {
      if (this.value === "credit") {
        creditCardForm.style.display = "block";
        // Make credit card fields required
        document.getElementById("cardNumber").required = true;
        document.getElementById("expiryDate").required = true;
        document.getElementById("cvv").required = true;
        document.getElementById("cardName").required = true;
      } else {
        creditCardForm.style.display = "none";
        // Remove required from credit card fields
        document.getElementById("cardNumber").required = false;
        document.getElementById("expiryDate").required = false;
        document.getElementById("cvv").required = false;
        document.getElementById("cardName").required = false;
      }
    });
  });
}

function initShippingMethods() {
  const shippingMethods = document.querySelectorAll('input[name="shipping"]');

  if (!shippingMethods.length) return;

  shippingMethods.forEach((method) => {
    method.addEventListener("change", function () {
      updateOrderSummary();
    });
  });
}

function initPromoCode() {
  const applyPromoBtn = document.getElementById("applyPromo");
  const promoCodeInput = document.getElementById("promoCode");
  const promoMessage = document.getElementById("promoMessage");

  if (!applyPromoBtn || !promoCodeInput || !promoMessage) return;

  applyPromoBtn.addEventListener("click", function () {
    const code = promoCodeInput.value.trim().toUpperCase();

    if (code === "DARKSTORE10") {
      promoMessage.innerHTML =
        '<small class="text-success"><i class="fas fa-check me-1"></i>Kode promo berhasil diterapkan! Diskon 10%</small>';
      document.getElementById("discountRow").style.display = "flex";
      updateOrderSummary(true);
    } else if (code === "WELCOME20") {
      promoMessage.innerHTML =
        '<small class="text-success"><i class="fas fa-check me-1"></i>Kode promo berhasil diterapkan! Diskon 20%</small>';
      document.getElementById("discountRow").style.display = "flex";
      updateOrderSummary(true, 0.2);
    } else if (code === "") {
      promoMessage.innerHTML =
        '<small class="text-warning"><i class="fas fa-exclamation-triangle me-1"></i>Masukkan kode promo</small>';
    } else {
      promoMessage.innerHTML =
        '<small class="text-danger"><i class="fas fa-times me-1"></i>Kode promo tidak valid</small>';
    }
  });

  // Apply promo on Enter key
  promoCodeInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      applyPromoBtn.click();
    }
  });
}

function initCheckoutForm() {
  const checkoutForm = document.getElementById("checkoutForm");

  if (!checkoutForm) return;

  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (this.checkValidity()) {
      const placeOrderBtn = document.getElementById("placeOrderBtn");
      const originalText = placeOrderBtn.innerHTML;

      placeOrderBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Memproses...';
      placeOrderBtn.disabled = true;

      // Simulate order processing
      setTimeout(() => {
        // Generate order number
        const orderNumber =
          "#DS-" +
          new Date().getFullYear() +
          "-" +
          Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0");
        document.getElementById("orderNumber").textContent = orderNumber;

        // Show success modal
        const successModal = new bootstrap.Modal(
          document.getElementById("successModal")
        );
        successModal.show();

        // Clear cart
        localStorage.removeItem("darkstore-cart");
        cart = [];
        updateCartCount();

        placeOrderBtn.innerHTML = originalText;
        placeOrderBtn.disabled = false;
      }, 2000);
    }

    this.classList.add("was-validated");
  });
}

function initCardFormatting() {
  const cardNumberInput = document.getElementById("cardNumber");
  const expiryDateInput = document.getElementById("expiryDate");
  const cvvInput = document.getElementById("cvv");

  if (!cardNumberInput || !expiryDateInput || !cvvInput) return;

  // Format card number
  cardNumberInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
    let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
    if (formattedValue.length > 19)
      formattedValue = formattedValue.substring(0, 19);
    this.value = formattedValue;
  });

  // Format expiry date
  expiryDateInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    this.value = value;
  });

  // CVV only numbers
  cvvInput.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
}

function updateOrderSummary(hasDiscount = false, discountRate = 0.1) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const selectedShipping = document.querySelector(
    'input[name="shipping"]:checked'
  );
  let shippingCost = 15000; // Default regular shipping

  if (selectedShipping) {
    switch (selectedShipping.value) {
      case "express":
        shippingCost = 25000;
        break;
      case "sameday":
        shippingCost = 50000;
        break;
      default:
        shippingCost = 15000;
    }
  }

  let discount = 0;
  if (hasDiscount) {
    discount = subtotal * discountRate;
  }

  const taxableAmount = subtotal - discount + shippingCost;
  const tax = Math.round(taxableAmount * 0.11);
  const total = taxableAmount + tax;

  // Update display
  document.getElementById("subtotal").textContent =
    "Rp " + formatPrice(subtotal);
  document.getElementById("shippingCost").textContent =
    "Rp " + formatPrice(shippingCost);
  document.getElementById("discountAmount").textContent =
    "-Rp " + formatPrice(discount);
  document.getElementById("tax").textContent = "Rp " + formatPrice(tax);
  document.getElementById("totalAmount").textContent =
    "Rp " + formatPrice(total);
}
