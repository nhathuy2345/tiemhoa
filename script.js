(function () {
      const PRODUCTS_KEY = 'flowercorner_products';
      const VOUCHERS_KEY = 'flowercorner_vouchers';
      const BANK_KEY = 'flowercorner_bank';
      const BANNERS_KEY = 'flowercorner_banners';
      const BLOG_KEY = 'flowercorner_blog';
      const ORDERS_KEY = 'flowercorner_orders';
      const VOUCHER_CODE = 'NEW20';
      const DISCOUNT_RATE = 0.20;

      const DEFAULT_PRODUCTS = [
        { id: 1, name: 'Bó Hoa Hồng Đỏ', price: 450000, oldPrice: 640000, image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&auto=format&fit=crop&q=80', category: 'rose' },
        { id: 2, name: 'Hoa Hướng Dương', price: 320000, oldPrice: 460000, image: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=400&auto=format&fit=crop&q=80', category: 'fresh' },
        { id: 3, name: 'Bó Hoa Tulip Hồng', price: 380000, oldPrice: 540000, image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=400&auto=format&fit=crop&q=80', category: 'bouquet' },
        { id: 4, name: 'Hoa Cẩm Tú Cầu', price: 290000, oldPrice: 410000, image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&auto=format&fit=crop&q=80', category: 'fresh' },
        { id: 5, name: 'Bó Hoa Baby Trắng', price: 250000, oldPrice: 360000, image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&auto=format&fit=crop&q=80', category: 'bouquet' },
        { id: 6, name: 'Hoa Ly Trắng', price: 350000, oldPrice: 500000, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&auto=format&fit=crop&q=80', category: 'fresh' },
        { id: 7, name: 'Hoa Cát Tường', price: 280000, oldPrice: 400000, image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=400&auto=format&fit=crop&q=80', category: 'fresh' },
        { id: 8, name: 'Bó Hoa Mix Pastel', price: 420000, oldPrice: 600000, image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&auto=format&fit=crop&q=80', category: 'mix' }
      ];

      const DEFAULT_VOUCHERS = [{ code: 'NEW20', percent: 20, desc: 'Giảm 20% đơn hàng đầu tiên', active: true }];
      const DEFAULT_BANK = {
        bankName: 'Vietcombank',
        accountNumber: '1234567890',
        accountName: 'CÔNG TY FLOWERCORNER',
        branch: 'Chi nhánh TP.HCM'
      };
      const DEFAULT_BANNERS = [
        { id: 1, title: 'Hoa tươi mỗi ngày', subtitle: 'Tặng ngay ưu đãi lên đến 30%', image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80', link: '#', active: true },
        { id: 2, title: 'Bó hoa sinh nhật', subtitle: 'Thiết kế đặc biệt cho ngày vui', image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80', link: '#', active: true },
        { id: 3, title: 'Quà tặng ý nghĩa', subtitle: 'Gửi trọn niềm thương đến người thân', image: 'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80', link: '#', active: true }
      ];
      const DEFAULT_BLOG = [
        { id: 1, title: 'Top 5 mẫu bó hoa cho ngày Valentine', excerpt: 'Những thiết kế hoa nổi bật và được yêu thích nhất trong mùa yêu.', image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80', link: '#', active: true },
        { id: 2, title: 'Cách chọn hoa phù hợp với dịp sinh nhật', excerpt: 'Lựa chọn hoa theo màu sắc, phong cách và tâm trạng của người nhận.', image: 'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80', link: '#', active: true },
        { id: 3, title: 'Hoa tươi giữ được lâu hơn như thế nào?', excerpt: '6 mẹo nhỏ giúp bó hoa của bạn tươi lâu hơn trong ngày.', image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80', link: '#', active: true }
      ];

      let cart = [];
      let voucherApplied = false;
      let currentVoucherCode = '';
      let currentCategory = 'all';

      const productGrid = document.getElementById('productGrid');
      const autoSlider = document.getElementById('autoSlider');
      let sliderDots = document.querySelectorAll('.slider-dot');
      const cartBadge = document.getElementById('cartBadge');

      function getProductsFromStorage() {
        try {
          const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || 'null');
          if (stored && stored.length) return stored;
        } catch (e) {}
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
        return DEFAULT_PRODUCTS;
      }

      function getVouchersFromStorage() {
        try {
          const stored = JSON.parse(localStorage.getItem(VOUCHERS_KEY) || 'null');
          if (stored && stored.length) return stored;
        } catch (e) {}
        localStorage.setItem(VOUCHERS_KEY, JSON.stringify(DEFAULT_VOUCHERS));
        return DEFAULT_VOUCHERS;
      }

      function getBankFromStorage() {
        try {
          const stored = JSON.parse(localStorage.getItem(BANK_KEY) || 'null');
          if (stored) return stored;
        } catch (e) {}
        localStorage.setItem(BANK_KEY, JSON.stringify(DEFAULT_BANK));
        return DEFAULT_BANK;
      }

      function renderBankInfo() {
        const bank = getBankFromStorage();
        const bankContent = document.getElementById('bankTransferSummary');
        if (!bankContent) return;
        bankContent.innerHTML = `
          <p><span class="font-semibold text-gray-800">Ngân hàng:</span> ${bank.bankName || '—'}</p>
          <p><span class="font-semibold text-gray-800">Tên tài khoản:</span> ${bank.accountName || '—'}</p>
          <p><span class="font-semibold text-gray-800">Số tài khoản:</span> ${bank.accountNumber || '—'}</p>
          <p><span class="font-semibold text-gray-800">Nội dung chuyển khoản:</span> FlowerCorner + Mã đơn hàng</p>
        `;
      }

      function refreshPublicData() {
        products = getProductsFromStorage();
        renderProducts();
        updateCartUI();
        renderBankInfo();
      }

      let products = getProductsFromStorage();
      const cartItemsContainer = document.getElementById('cartItemsContainer');
      const cartSubtotalEl = document.getElementById('cartSubtotal');
      const cartDiscountEl = document.getElementById('cartDiscount');
      const cartTotalEl = document.getElementById('cartTotal');
      const discountRow = document.getElementById('discountRow');
      const voucherInput = document.getElementById('voucherInput');
      const applyVoucherBtn = document.getElementById('applyVoucherBtn');
      const voucherMessage = document.getElementById('voucherMessage');

      const cartSidebar = document.getElementById('cartSidebar');
      const cartOverlay = document.getElementById('cartOverlay');
      const closeCartBtn = document.getElementById('closeCartBtn');
      const cartBtn = document.getElementById('cartBtn');
      const checkoutBtn = document.getElementById('checkoutBtn');

      const loginModal = document.getElementById('loginModal');
      const userMenu = document.getElementById('user-menu');
      const userMenuText = document.getElementById('userMenuText');
      const closeLoginBtn = document.getElementById('closeLoginBtn');
      const tabLogin = document.getElementById('tabLogin');
      const tabRegister = document.getElementById('tabRegister');
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');

      const trackModal = document.getElementById('trackModal');
      const trackOrderBtn = document.getElementById('trackOrderBtn');
      const closeTrackBtn = document.getElementById('closeTrackBtn');
      const trackOrderInput = document.getElementById('trackOrderInput');
      const trackSearchBtn = document.getElementById('trackSearchBtn');
      const trackResult = document.getElementById('trackResult');
      const trackError = document.getElementById('trackError');

      const paymentModal = document.getElementById('paymentModal');
      const orderCodeDisplay = document.getElementById('orderCodeDisplay');
      const finalTotalDisplay = document.getElementById('finalTotalDisplay');
      const finishOrderBtn = document.getElementById('finishOrderBtn');
      const bankPaymentDetails = document.getElementById('bankPaymentDetails');
      const proofUpload = document.getElementById('proofUpload');
      const proofUploadName = document.getElementById('proofUploadName');

      // ===============================
      // 2. UTILITIES
      // ===============================
      function formatCurrency(amount) {
        return Number(amount).toLocaleString('vi-VN') + '₫';
      }

      function generateOrderCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'FL-';
        for (let i = 0; i < 6; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
      }

      function getOrders() {
        try {
          const data = localStorage.getItem(ORDERS_KEY);
          return data ? JSON.parse(data) : [];
        } catch (error) {
          return [];
        }
      }

      function saveOrder(order) {
        const orders = getOrders();
        orders.unshift(order);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      }

      function findOrderByCode(code) {
        const orders = getOrders();
        return orders.find((order) => order.code.toUpperCase() === code.toUpperCase());
      }

      function getStatusLabel(status) {
        const labels = {
          pending: 'Chờ xử lý',
          confirmed: 'Đã xác nhận',
          shipping: 'Đang giao hàng',
          delivered: 'Đã giao hàng'
        };
        return labels[status] || 'Chờ xử lý';
      }

      function getStatusClass(status) {
        const classes = {
          pending: 'status-pending',
          confirmed: 'status-confirmed',
          shipping: 'status-shipping',
          delivered: 'status-delivered'
        };
        return classes[status] || 'status-pending';
      }

      // ===============================
      // 3. SLIDER
      // ===============================
      let sliderIndex = 0;
      let sliderTimer = null;

      function getBannersFromStorage() {
        try {
          const stored = JSON.parse(localStorage.getItem(BANNERS_KEY) || 'null');
          if (stored && stored.length) return stored.filter(item => item.active !== false);
        } catch (e) {}
        localStorage.setItem(BANNERS_KEY, JSON.stringify(DEFAULT_BANNERS));
        return DEFAULT_BANNERS.filter(item => item.active !== false);
      }

      function getBlogPostsFromStorage() {
        try {
          const stored = JSON.parse(localStorage.getItem(BLOG_KEY) || 'null');
          if (stored && stored.length) return stored.filter(item => item.active !== false);
        } catch (e) {}
        localStorage.setItem(BLOG_KEY, JSON.stringify(DEFAULT_BLOG));
        return DEFAULT_BLOG.filter(item => item.active !== false);
      }

      function renderSlider() {
        const banners = getBannersFromStorage();
        if (!autoSlider || !banners.length) return;

        autoSlider.innerHTML = banners.map((banner) => `
          <div class="min-w-full">
            <img src="${banner.image}" alt="${banner.title}" class="w-full h-72 md:h-96 object-cover" />
          </div>
        `).join('');

        const dotsContainer = document.getElementById('sliderDotsContainer');
        if (dotsContainer) {
          dotsContainer.innerHTML = banners.map((_, idx) => `
            <button class="slider-dot w-3 h-3 rounded-full ${idx === 0 ? 'bg-white/80 active-dot' : 'bg-white/40'}" data-slide="${idx}"></button>
          `).join('');
        }

        sliderDots = document.querySelectorAll('.slider-dot');
        autoSlider.style.transform = `translateX(-${sliderIndex * 100}%)`;
        sliderDots.forEach((dot, idx) => {
          const active = idx === sliderIndex;
          dot.classList.toggle('active-dot', active);
          dot.classList.toggle('bg-white/80', active);
          dot.classList.toggle('bg-white/40', !active);
        });
      }

      function renderBlogSection() {
        const blogPosts = getBlogPostsFromStorage();
        const container = document.getElementById('blogPostsContainer');
        if (!container) return;
        container.innerHTML = blogPosts.map(post => `
          <article class="bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm">
            <img src="${post.image}" alt="${post.title}" class="w-full h-52 object-cover" />
            <div class="p-5">
              <p class="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Blog</p>
              <h3 class="text-xl font-bold text-gray-800 mb-2">${post.title}</h3>
              <p class="text-gray-600 text-sm leading-relaxed">${post.excerpt}</p>
              <a href="${post.link || '#'}" class="mt-4 inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">Xem thêm <i class="fas fa-arrow-right"></i></a>
            </div>
          </article>
        `).join('');
      }

      function startSlider() {
        const banners = getBannersFromStorage();
        if (!autoSlider || !banners.length) return;
        sliderTimer = setInterval(() => {
          sliderIndex = (sliderIndex + 1) % banners.length;
          renderSlider();
        }, 3500);
      }

      // ===============================
      // 4. PRODUCT CATALOG
      // ===============================
      function renderProducts() {
        products = getProductsFromStorage();
        const visibleProducts = currentCategory === 'all'
          ? products
          : products.filter((item) => (item.category || 'fresh') === currentCategory);

        productGrid.innerHTML = visibleProducts.map((p) => {
          const discount = Math.round((1 - p.price / p.oldPrice) * 100);
          return `
            <div class="product-card bg-white rounded-2xl shadow-sm overflow-hidden border border-pink-100 flex flex-col">
              <div class="relative">
                <img src="${p.image}" alt="${p.name}" class="w-full h-56 object-cover" loading="lazy" />
                <span class="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">-${discount}%</span>
              </div>
              <div class="p-4 flex flex-col flex-1">
                <h3 class="font-semibold text-gray-800 text-lg">${p.name}</h3>
                <div class="mt-1 flex items-center gap-2">
                  <span class="text-gray-400 line-through text-sm">${formatCurrency(p.oldPrice)}</span>
                  <span class="text-primary font-bold text-xl">${formatCurrency(p.price)}</span>
                </div>
                <button class="add-to-cart mt-4 w-full bg-primary-light hover:bg-primary text-white font-medium py-2 rounded-full transition flex items-center justify-center gap-2" data-id="${p.id}">
                  <i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          `;
        }).join('');

        document.querySelectorAll('.add-to-cart').forEach((button) => {
          button.addEventListener('click', (event) => {
            addToCart(Number(event.currentTarget.dataset.id));
          });
        });
      }

      function addToCart(productId) {
        const product = products.find((item) => item.id === productId);
        if (!product) return;

        const existingItem = cart.find((item) => item.id === productId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
          });
        }

        updateCartUI();
        openCart();
      }

      function changeQuantity(productId, delta) {
        const item = cart.find((entry) => entry.id === productId);
        if (!item) return;

        const newQty = item.quantity + delta;
        if (newQty <= 0) {
          removeItem(productId);
        } else {
          item.quantity = newQty;
          updateCartUI();
        }
      }

      function removeItem(productId) {
        cart = cart.filter((item) => item.id !== productId);
        updateCartUI();
      }

      // ===============================
      // 5. CART & VOUCHER
      // ===============================
      function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;

        if (!cart.length) {
          cartItemsContainer.innerHTML = '<p class="text-gray-400 text-center py-10">Giỏ hàng trống</p>';
        } else {
          cartItemsContainer.innerHTML = cart.map((item) => `
            <div class="flex gap-3 border-b border-pink-50 pb-3">
              <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg" />
              <div class="flex-1">
                <h4 class="font-semibold text-gray-800 text-sm">${item.name}</h4>
                <p class="text-primary font-bold text-sm">${formatCurrency(item.price)}</p>
                <div class="flex items-center gap-2 mt-1">
                  <button class="decrease-qty w-7 h-7 rounded-full border border-pink-200 flex items-center justify-center text-primary hover:bg-pink-50" data-id="${item.id}">−</button>
                  <span class="w-8 text-center font-medium">${item.quantity}</span>
                  <button class="increase-qty w-7 h-7 rounded-full border border-pink-200 flex items-center justify-center text-primary hover:bg-pink-50" data-id="${item.id}">+</button>
                  <button class="remove-item ml-auto text-gray-400 hover:text-red-400 text-sm" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
              </div>
            </div>
          `).join('');
        }

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discountAmount = voucherApplied ? subtotal * DISCOUNT_RATE : 0;
        const finalTotal = subtotal - discountAmount;

        cartSubtotalEl.textContent = formatCurrency(subtotal);

        if (voucherApplied && subtotal > 0) {
          discountRow.classList.remove('hidden');
          cartDiscountEl.textContent = '-' + formatCurrency(discountAmount);
          document.querySelector('#discountRow span').textContent = 'Giảm giá (' + currentVoucherCode + '):';
        } else {
          discountRow.classList.add('hidden');
        }

        cartTotalEl.textContent = formatCurrency(finalTotal);

        document.querySelectorAll('.decrease-qty').forEach((btn) => {
          btn.addEventListener('click', (event) => {
            changeQuantity(Number(event.currentTarget.dataset.id), -1);
          });
        });

        document.querySelectorAll('.increase-qty').forEach((btn) => {
          btn.addEventListener('click', (event) => {
            changeQuantity(Number(event.currentTarget.dataset.id), 1);
          });
        });

        document.querySelectorAll('.remove-item').forEach((btn) => {
          btn.addEventListener('click', (event) => {
            removeItem(Number(event.currentTarget.dataset.id));
          });
        });
      }

      function showVoucherMessage(message, color) {
        voucherMessage.textContent = message;
        voucherMessage.classList.remove('hidden');
        voucherMessage.className = 'text-xs mt-1 ' + (color === 'green' ? 'text-green-600' : color === 'red' ? 'text-red-500' : 'text-orange-500');
      }

      function applyVoucher() {
        const code = voucherInput.value.trim().toUpperCase();

        if (!cart.length) {
          showVoucherMessage('Vui lòng thêm sản phẩm vào giỏ hàng trước!', 'red');
          return;
        }
        // Kiểm tra đăng nhập
        if (!currentUser) {
          showVoucherMessage('Vui lòng đăng nhập/đăng ký để sử dụng mã giảm giá!', 'red');
          return;
        }

        const vouchers = getVouchersFromStorage();
        const matchedVoucher = vouchers.find((voucher) => voucher.active !== false && voucher.code.toUpperCase() === code);

        if (!matchedVoucher) {
          voucherApplied = false;
          currentVoucherCode = '';
          showVoucherMessage('Mã giảm giá không hợp lệ hoặc đã hết hạn!', 'red');
          updateCartUI();
          return;
        }

        // Kiểm tra số lượng
        if (matchedVoucher.quantity <= 0) {
          voucherApplied = false;
          currentVoucherCode = '';
          showVoucherMessage('Mã giảm giá đã hết lượt sử dụng!', 'red');
          updateCartUI();
          return;
        }

        // Kiểm tra điều kiện "Đơn đầu tiên"
        if (matchedVoucher.isNewUserOnly) {
          const orders = getOrders();
          const hasOrdered = orders.some(o => o.userEmail === currentUser.email);
          if (hasOrdered) {
            voucherApplied = false;
            currentVoucherCode = '';
            showVoucherMessage('Mã này chỉ áp dụng cho đơn hàng đầu tiên của bạn!', 'red');
            updateCartUI();
            return;
          }
        }

        // Hợp lệ
        voucherApplied = true;
        currentVoucherCode = matchedVoucher.code.toUpperCase();
        showVoucherMessage('Áp dụng mã thành công!', 'green');
        updateCartUI();
      }

      function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }

      function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.add('hidden');
        document.body.style.overflow = '';
      }

      function openModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }

      function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }

      function showLoginTab() {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
      }

      function showRegisterTab() {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
      }

      function handleCheckout() {
        // 1. Kiểm tra giỏ hàng trước
        if (!cart.length) {
          alert('Giỏ hàng của bạn đang trống!');
          return;
        }

        // 2. Tính toán tiền
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discountAmount = voucherApplied ? subtotal * DISCOUNT_RATE : 0;
        const finalTotal = subtotal - discountAmount;

        closeCart();

        // 3. Tạo mã đơn và hiển thị lên giao diện
        const orderCode = generateOrderCode();
        orderCodeDisplay.textContent = orderCode;
        finalTotalDisplay.textContent = formatCurrency(finalTotal);

        // 4. Lưu dữ liệu đơn hàng (Chỉ gán 1 lần duy nhất ở đây)
        window._currentOrder = {
          code: orderCode,
          items: JSON.parse(JSON.stringify(cart)),
          subtotal,
          discount: discountAmount,
          total: finalTotal,
          voucherApplied,
          usedVoucherCode: voucherApplied ? currentVoucherCode : null, // Lưu lại mã đã xài
          userEmail: currentUser ? currentUser.email : null, // Gắn email khách hàng vào đơn
          paymentMethod: 'cod',
          date: new Date().toISOString(),
          status: 'pending'
        };

        openModal(paymentModal);
      }
          

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discountAmount = voucherApplied ? subtotal * DISCOUNT_RATE : 0;
        const finalTotal = subtotal - discountAmount;

        closeCart();

        const orderCode = generateOrderCode();
        orderCodeDisplay.textContent = orderCode;
        finalTotalDisplay.textContent = formatCurrency(finalTotal);

        window._currentOrder = {
          code: orderCode,
          items: JSON.parse(JSON.stringify(cart)),
          subtotal,
          discount: discountAmount,
          total: finalTotal,
          voucherApplied,
          paymentMethod: 'cod',
          date: new Date().toISOString(),
          status: 'pending'
        };

        openModal(paymentModal);

      // ===============================
      // 6. AUTH & MODAL FLOW
      // ===============================
      function toggleBankPaymentUI() {
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        const isBank = selectedPayment && selectedPayment.value === 'bank';
        bankPaymentDetails.classList.toggle('hidden', !isBank);
        if (isBank) {
          renderBankInfo();
        }
      }
      // Quản lý User Session
      let currentUser = JSON.parse(localStorage.getItem('flowercorner_current_user') || 'null');
      if(currentUser) userMenuText.textContent = 'Xin chào, ' + currentUser.name;

      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value.trim();
        currentUser = { email: email, name: email.split('@')[0] }; // Giả lập user
        localStorage.setItem('flowercorner_current_user', JSON.stringify(currentUser));
        
        alert('Đăng nhập thành công!');
        closeModal(loginModal);
        userMenuText.textContent = 'Xin chào, ' + currentUser.name;
      });

      registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = registerForm.querySelector('input[type="text"]').value.trim();
        const email = registerForm.querySelector('input[type="email"]').value.trim();
        currentUser = { email: email, name: name };
        localStorage.setItem('flowercorner_current_user', JSON.stringify(currentUser));

        alert('Đăng ký thành công!');
        closeModal(loginModal);
        userMenuText.textContent = 'Xin chào, ' + currentUser.name;
      });

      // ===============================
      // 7. ORDER CHECKOUT & TRACKING
      // ===============================
      function finishOrder() {
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        const paymentMethod = selectedPayment ? selectedPayment.value : 'cod';

        if (paymentMethod === 'bank') {
          const file = proofUpload.files && proofUpload.files[0];
          if (!file) {
            alert('Vui lòng chụp lại minh chứng đã chuyển khoản trước khi hoàn tất!');
            return;
          }
        }

        const finalizeOrder = () => {
          if (window._currentOrder) {
            window._currentOrder.paymentMethod = paymentMethod;
            window._currentOrder.proofFileName = paymentMethod === 'bank' && proofUpload.files[0] ? proofUpload.files[0].name : '';
            window._currentOrder.proofImage = paymentMethod === 'bank' && proofUpload.files[0] ? window._currentOrder.proofImage || '' : '';
            
            // XỬ LÝ TRỪ SỐ LƯỢNG VOUCHER
            if (window._currentOrder.voucherApplied && window._currentOrder.usedVoucherCode) {
              const allVouchers = getVouchersFromStorage();
              const vIndex = allVouchers.findIndex(v => v.code.toUpperCase() === window._currentOrder.usedVoucherCode);
              if (vIndex !== -1 && allVouchers[vIndex].quantity > 0) {
                allVouchers[vIndex].quantity -= 1;
                localStorage.setItem(VOUCHERS_KEY, JSON.stringify(allVouchers));
              }
            }

            saveOrder(window._currentOrder);
          }
          // ... (giữ nguyên phần còn lại của finalizeOrder) ...

          alert('Đặt hàng thành công, hệ thống sẽ sớm liên hệ cho bạn!');
          closeModal(paymentModal);

          cart = [];
          voucherApplied = false;
          currentVoucherCode = '';
          voucherInput.value = '';
          voucherMessage.classList.add('hidden');
          proofUpload.value = '';
          proofUploadName.classList.add('hidden');
          proofUploadName.textContent = '';
          window._currentOrder = null;
          updateCartUI();
        };

        if (paymentMethod === 'bank' && proofUpload.files && proofUpload.files[0]) {
          const reader = new FileReader();
          reader.onload = function () {
            if (window._currentOrder) {
              window._currentOrder.proofImage = reader.result;
            }
            finalizeOrder();
          };
          reader.readAsDataURL(proofUpload.files[0]);
          return;
        }

        finalizeOrder();
      }

      function searchOrder() {
        const code = trackOrderInput.value.trim();
        if (!code) {
          alert('Vui lòng nhập mã đơn hàng!');
          return;
        }

        const order = findOrderByCode(code);
        if (!order) {
          trackResult.classList.add('hidden');
          trackError.classList.remove('hidden');
          return;
        }

        trackResult.classList.remove('hidden');
        trackError.classList.add('hidden');

        document.getElementById('resultOrderCode').textContent = order.code;

        const statusEl = document.getElementById('resultStatus');
        statusEl.textContent = getStatusLabel(order.status);
        statusEl.className = 'status-badge ' + getStatusClass(order.status);

        const date = new Date(order.date);
        document.getElementById('resultOrderDate').textContent = date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

        document.getElementById('resultItems').innerHTML = order.items.map((item) => 
          `<div class="flex justify-between"><span>${item.name} x${item.quantity}</span><span>${formatCurrency(item.price * item.quantity)}</span></div>`
        ).join('');

        document.getElementById('resultTotal').textContent = formatCurrency(order.total);

        const paymentLabels = {
          cod: 'Thanh toán khi nhận hàng (COD)',
          bank: 'Chuyển khoản ngân hàng'
        };
        document.getElementById('resultPayment').textContent = paymentLabels[order.paymentMethod] || order.paymentMethod;
      }

      cartBtn.addEventListener('click', openCart);
      closeCartBtn.addEventListener('click', closeCart);
      cartOverlay.addEventListener('click', closeCart);
      checkoutBtn.addEventListener('click', handleCheckout);

      applyVoucherBtn.addEventListener('click', applyVoucher);
      voucherInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') applyVoucher();
      });

      userMenu.addEventListener('click', () => {
        showLoginTab();
        openModal(loginModal);
      });
      closeLoginBtn.addEventListener('click', () => closeModal(loginModal));
      loginModal.addEventListener('click', (event) => {
        if (event.target === loginModal) closeModal(loginModal);
      });

      tabLogin.addEventListener('click', showLoginTab);
      tabRegister.addEventListener('click', showRegisterTab);

      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Đăng nhập thành công!');
        closeModal(loginModal);
        userMenuText.textContent = 'Xin chào, Thành viên!';
      });

      registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Đăng ký thành công!');
        closeModal(loginModal);
        userMenuText.textContent = 'Xin chào, Thành viên!';
      });

      trackOrderBtn.addEventListener('click', () => {
        openModal(trackModal);
        trackOrderInput.value = '';
        trackResult.classList.add('hidden');
        trackError.classList.add('hidden');
      });
      closeTrackBtn.addEventListener('click', () => closeModal(trackModal));
      trackModal.addEventListener('click', (event) => {
        if (event.target === trackModal) closeModal(trackModal);
      });
      trackSearchBtn.addEventListener('click', searchOrder);
      trackOrderInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') searchOrder();
      });

      finishOrderBtn.addEventListener('click', finishOrder);
      document.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
        radio.addEventListener('change', toggleBankPaymentUI);
      });
      proofUpload.addEventListener('change', () => {
        const file = proofUpload.files && proofUpload.files[0];
        if (file) {
          proofUploadName.textContent = 'Đã chọn minh chứng: ' + file.name;
          proofUploadName.classList.remove('hidden');
        } else {
          proofUploadName.classList.add('hidden');
          proofUploadName.textContent = '';
        }
      });

      document.querySelectorAll('.category-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
          currentCategory = tab.dataset.category;
          document.querySelectorAll('.category-tab').forEach((item) => {
            item.classList.remove('active', 'bg-primary', 'text-white');
            item.classList.add('bg-white', 'text-gray-700', 'border', 'border-pink-200');
            item.classList.remove('font-semibold');
            item.classList.add('font-medium');
          });

          tab.classList.add('active', 'bg-primary', 'text-white');
          tab.classList.remove('bg-white', 'text-gray-700', 'border', 'border-pink-200');
          tab.classList.add('font-semibold');
          renderProducts();
        });
      });

      sliderDots.forEach((dot) => {
        dot.addEventListener('click', () => {
          sliderIndex = Number(dot.dataset.slide);
          renderSlider();
          clearInterval(sliderTimer);
          startSlider();
        });
      });

      // ===============================
      // 9. INITIALIZATION
      // ===============================
      renderSlider();
      renderBlogSection();
      startSlider();
      renderProducts();
      updateCartUI();
      renderBankInfo();
      toggleBankPaymentUI();

      window.refreshStorefrontContent = function() {
        renderSlider();
        renderBlogSection();
        renderProducts();
        updateCartUI();
        renderBankInfo();
      };

      window.addEventListener('storage', (event) => {
        if (['flowercorner_products', 'flowercorner_vouchers', 'flowercorner_bank', 'flowercorner_banners', 'flowercorner_blog'].includes(event.key)) {
          refreshPublicData();
        }
      });

      loginModal.classList.remove('show');
      trackModal.classList.remove('show');
      paymentModal.classList.remove('show');
      cartOverlay.classList.add('hidden');
    })();
    (() => {
      const KEY = 'flowercorner_chats', ID_KEY = 'flowercorner_chat_id';
      const $ = i => document.getElementById(i);
      const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
      const save = t => { const d = load(); d[t.id] = t; localStorage.setItem(KEY, JSON.stringify(d)); };
      const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      const show = (i, on) => $(i).classList.toggle('hidden', !on);
      let id = localStorage.getItem(ID_KEY), open = false;
      const thread = () => load()[id];

      const bubble = m => {
        const me = m.from === 'buyer';
        const time = new Date(m.ts).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        return `<div class="flex ${me ? 'justify-end' : 'justify-start'}"><div class="max-w-[80%] px-3 py-2 rounded-2xl text-sm ${me ? 'bg-primary text-white rounded-br-sm' : 'bg-white border border-pink-100 text-gray-700 rounded-bl-sm'}">${esc(m.text)}<div class="text-[10px] opacity-60 mt-0.5">${time}</div></div></div>`;
      };
      function render() {
        const t = thread();
        show('chatIntro', !t); show('chatBody', !!t); show('chatForm', !!t);
        show('chatQuick', !!t && t.msgs.length < 3);
        $('chatQuick').classList.toggle('flex', !!t && t.msgs.length < 3);
        $('chatForm').classList.toggle('flex', !!t);
        if (t) {
          if (open && t.unreadBuyer) { t.unreadBuyer = 0; save(t); }
          $('chatBody').innerHTML = t.msgs.map(bubble).join('');
          $('chatBody').scrollTop = 1e9;
        }
        const n = t ? t.unreadBuyer || 0 : 0;
        $('chatBadge').textContent = n;
        $('chatBadge').classList.toggle('hidden', !n || open);
      }
      function send(text) {
        text = text.trim(); const t = thread();
        if (!text || !t) return;
        t.msgs.push({ from: 'buyer', text, ts: Date.now() });
        t.unreadShop = (t.unreadShop || 0) + 1; t.updated = Date.now();
        if (!t.msgs.some(m => m.tag === 'ack')) t.msgs.push({ from: 'shop', auto: 1, tag: 'ack', ts: Date.now() + 1, text: 'Shop đã nhận tin nhắn và sẽ trả lời sớm nhất. Cần gấp, bạn gọi 0909 123 456 nhé!' });
        save(t); render();
      }
      function toggle(on) {
        open = on; show('chatBox', on); render();
        if (on) setTimeout(() => ($('chatInput').offsetParent ? $('chatInput') : $('chatName')).focus(), 50);
      }
      $('chatFab').onclick = () => toggle(!open);
      $('chatClose').onclick = () => toggle(false);
      $('footerChatBtn').onclick = () => toggle(true);
      $('chatIntro').onsubmit = e => {
        e.preventDefault();
        const name = $('chatName').value.trim();
        id = 'c' + Date.now().toString(36); localStorage.setItem(ID_KEY, id);
        save({ id, name, phone: $('chatPhone').value.trim(), unreadShop: 0, unreadBuyer: 0, updated: Date.now(),
          msgs: [{ from: 'shop', auto: 1, ts: Date.now(), text: 'Chào ' + name + '! FlowerCorner có thể giúp gì cho bạn?' }] });
        render(); $('chatInput').focus();
      };
      $('chatForm').onsubmit = e => { e.preventDefault(); send($('chatInput').value); $('chatInput').value = ''; };
      document.querySelectorAll('#chatQuick .quick').forEach(b => b.onclick = () => send(b.textContent));
      window.addEventListener('storage', e => { if (e.key === KEY) render(); }); // shop trả lời ở tab khác -> hiện ngay
      render();
      // Khôi phục trạng thái cuộn trang và ẩn toàn bộ Modal khi mở web
      document.body.style.overflow = 'auto'; 
      loginModal.classList.remove('show');
      trackModal.classList.remove('show');
      paymentModal.classList.remove('show');
      cartOverlay.classList.add('hidden');
    })();