/* ==========================================================================
   BỘ ĐIỀU PHỐI ỨNG DỤNG CHÍNH — MAI'S BOUTIQUE (js/main.js)
   --------------------------------------------------------------------------
   Ghi chú:
   - Khởi tạo trạng thái toàn cục (Ngôn ngữ VI/EN, Tiền tệ VND/USD, Bộ lọc ảnh).
   - Cập nhật đồng bộ toàn bộ text có thuộc tính [data-i18n] khi đổi ngôn ngữ.
   - Điều khiển Sticky Navbar, Mobile Drawer, Gallery Lightbox, Toast & GSAP.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------------
     1. TRẠNG THÁI ỨNG DỤNG (Application State)
     ------------------------------------------------------------------------ */
  const state = {
    lang: "vi",            // Mặc định Tiếng Việt ('vi' hoặc 'en')
    currency: "VND",       // Mặc định VND ('VND' hoặc 'USD')
    galleryFilter: "all",  // Bộ lọc thư viện ảnh ('all', 'pool', 'rooms', 'architecture')
    bookingFilter: { active: false },
    lightboxIndex: 0
  };

  /* ------------------------------------------------------------------------
     2. HÀM CẬP NHẬT NGÔN NGỮ TOÀN TRANG (I18N)
     ------------------------------------------------------------------------ */
  function applyTranslations() {
    const dict = window.MAI_DATA.i18n[state.lang];
    document.documentElement.lang = state.lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Cập nhật placeholder cho ô ghi chú trong modal đặt phòng
    const noteInput = document.getElementById("guest-note");
    if (noteInput && dict.modalNote) {
      noteInput.placeholder = dict.modalNote;
    }

    // Cập nhật địa chỉ theo ngôn ngữ
    const addrEl = document.getElementById("contact-address-text");
    if (addrEl) {
      addrEl.textContent = window.MAI_DATA.hotel.address[state.lang];
    }

    // Render lại các phần dữ liệu động
    window.MAI_COMPONENTS.renderRooms(state);
    window.MAI_COMPONENTS.renderAmenities(state.lang);
    window.MAI_COMPONENTS.renderGallery(state);
    window.MAI_COMPONENTS.renderReviews(state.lang);
    window.MAI_COMPONENTS.renderConciergeMenu(state.lang);
    window.MAI_BOOKING.updateModalSummary(state);

    const conciergeBtn = document.getElementById("concierge-toggle");
    if (conciergeBtn) {
      conciergeBtn.setAttribute(
        "aria-label",
        state.lang === "vi"
          ? "Mở kênh liên hệ nhanh (Điện thoại, Zalo, Booking, Agoda)"
          : "Open quick contact channels (Phone, Zalo, Booking, Agoda)"
      );
    }
  }

  /* ------------------------------------------------------------------------
     3. CHUYỂN ĐỔI NGÔN NGỮ (VI/EN) & TIỀN TỆ (VND/USD) DẠNG ICON DROPDOWN
     ------------------------------------------------------------------------ */
  const navDropdowns = document.querySelectorAll(".nav-dropdown");

  function closeAllNavDropdowns() {
    navDropdowns.forEach((dd) => {
      dd.classList.remove("is-open");
      dd.querySelector("[data-dropdown-toggle]")?.setAttribute("aria-expanded", "false");
    });
  }

  document.querySelectorAll("[data-dropdown-toggle]").forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = toggleBtn.closest(".nav-dropdown");
      const willOpen = !parent?.classList.contains("is-open");
      closeAllNavDropdowns();
      if (parent && willOpen) {
        parent.classList.add("is-open");
        toggleBtn.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) {
      closeAllNavDropdowns();
    }
  });

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextLang = btn.getAttribute("data-lang-btn");
      closeAllNavDropdowns();
      if (nextLang === state.lang) return;
      state.lang = nextLang;

      document.querySelectorAll("[data-lang-btn]").forEach((b) => {
        const active = b.getAttribute("data-lang-btn") === nextLang;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-checked", String(active));
      });

      applyTranslations();
    });
  });

  document.querySelectorAll("[data-currency-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextCurr = btn.getAttribute("data-currency-btn");
      closeAllNavDropdowns();
      if (nextCurr === state.currency) return;
      state.currency = nextCurr;

      document.querySelectorAll("[data-currency-btn]").forEach((b) => {
        const active = b.getAttribute("data-currency-btn") === nextCurr;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-checked", String(active));
      });

      window.MAI_COMPONENTS.renderRooms(state);
      window.MAI_BOOKING.updateModalSummary(state);
    });
  });

  /* ------------------------------------------------------------------------
     4. NAVBAR CUỘN & MENU DI ĐỘNG (Mobile Drawer)
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById("navbar");
  const handleScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  const mobileDrawer = document.getElementById("mobile-drawer");
  const openDrawerBtn = document.getElementById("open-mobile-menu");
  const closeDrawerBtn = document.getElementById("close-mobile-menu");

  function setDrawerOpen(open) {
    if (!mobileDrawer || !openDrawerBtn) return;
    mobileDrawer.classList.toggle("is-open", open);
    mobileDrawer.setAttribute("aria-hidden", String(!open));
    openDrawerBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  openDrawerBtn?.addEventListener("click", () => setDrawerOpen(true));
  closeDrawerBtn?.addEventListener("click", () => setDrawerOpen(false));
  mobileDrawer?.addEventListener("click", (e) => {
    if (e.target === mobileDrawer || e.target.closest("a")) {
      setDrawerOpen(false);
    }
  });

  /* ------------------------------------------------------------------------
     5. BỘ LỌC THƯ VIỆN ẢNH & LIGHTBOX XEM ẢNH TOÀN MÀN HÌNH
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-gallery-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.galleryFilter = btn.getAttribute("data-gallery-filter");
      document.querySelectorAll("[data-gallery-filter]").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
      });
      window.MAI_COMPONENTS.renderGallery(state);
    });
  });

  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  function getCurrentGalleryItems() {
    return state.galleryFilter === "all"
      ? window.MAI_DATA.gallery
      : window.MAI_DATA.gallery.filter((img) => img.category === state.galleryFilter);
  }

  function showLightbox(index) {
    const items = getCurrentGalleryItems();
    if (!items.length || !lightbox) return;
    state.lightboxIndex = (index + items.length) % items.length;
    const current = items[state.lightboxIndex];

    lightboxImg.src = current.src;
    lightboxImg.alt = current.caption[state.lang];
    lightboxCaption.textContent = `${state.lightboxIndex + 1} / ${items.length} — ${current.caption[state.lang]}`;

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const itemBtn = e.target.closest("[data-lightbox-index]");
    if (itemBtn) {
      showLightbox(Number(itemBtn.getAttribute("data-lightbox-index")));
    }
  });

  document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev")?.addEventListener("click", () =>
    showLightbox(state.lightboxIndex - 1)
  );
  document.getElementById("lightbox-next")?.addEventListener("click", () =>
    showLightbox(state.lightboxIndex + 1)
  );
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Hỗ trợ phím Escape và mũi tên trái/phải cho Modal, Drawer, Lightbox & Concierge
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      setDrawerOpen(false);
      setConciergeOpen(false);
      closeAllNavDropdowns();
      window.MAI_BOOKING.closeBookingModal();
    } else if (lightbox?.classList.contains("is-open")) {
      if (e.key === "ArrowLeft") showLightbox(state.lightboxIndex - 1);
      if (e.key === "ArrowRight") showLightbox(state.lightboxIndex + 1);
    }
  });

  /* ------------------------------------------------------------------------
     5B. NÚT LIÊN HỆ NHANH GÓC PHẢI (Floating Concierge Dock)
     ------------------------------------------------------------------------ */
  const conciergeDock = document.getElementById("concierge-dock");
  const conciergeToggle = document.getElementById("concierge-toggle");
  const conciergeMenu = document.getElementById("concierge-menu");

  function setConciergeOpen(open) {
    if (!conciergeDock || !conciergeToggle || !conciergeMenu) return;
    conciergeDock.classList.toggle("is-open", open);
    conciergeToggle.setAttribute("aria-expanded", String(open));
    conciergeMenu.setAttribute("aria-hidden", String(!open));
  }

  conciergeToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = conciergeDock?.classList.contains("is-open");
    setConciergeOpen(!isOpen);
  });

  // Đóng menu liên hệ khi click ra ngoài vùng dock
  document.addEventListener("click", (e) => {
    if (
      conciergeDock?.classList.contains("is-open") &&
      !conciergeDock.contains(e.target)
    ) {
      setConciergeOpen(false);
    }
  });

  /* ------------------------------------------------------------------------
     6. TOAST NOTIFICATION & SAO CHÉP SỐ ĐIỆN THOẠI
     ------------------------------------------------------------------------ */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById("toast");
    const msgEl = document.getElementById("toast-message");
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3800);
  }

  document.getElementById("copy-phone-btn")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.MAI_DATA.hotel.phoneDisplay);
      showToast(
        state.lang === "vi"
          ? `Đã sao chép SĐT: ${window.MAI_DATA.hotel.phoneDisplay}`
          : `Copied phone: ${window.MAI_DATA.hotel.phoneDisplay}`
      );
    } catch {
      showToast(window.MAI_DATA.hotel.phoneDisplay);
    }
  });

  /* ------------------------------------------------------------------------
     7. KHỞI TẠO ĐẶT PHÒNG & HIỆU ỨNG GSAP TINH TẾ (Tôn trọng Reduced Motion)
     ------------------------------------------------------------------------ */
  window.MAI_BOOKING.initHeroBookingBar(state, () => {
    window.MAI_COMPONENTS.renderRooms(state);
  });
  window.MAI_BOOKING.initBookingModal(state, showToast);

  // Render giao diện ban đầu
  applyTranslations();

  // Kích hoạt hiệu ứng cuộn nhẹ nhàng nếu GSAP khả dụng và người dùng không bật Reduced Motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced && window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    window.gsap.from(".hero__content > *", {
      opacity: 0,
      y: 18,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "transform"
    });

    window.gsap.utils.toArray(".reveal-section").forEach((section) => {
      window.gsap.from(section, {
        opacity: 0,
        y: 16,
        duration: 0.55,
        ease: "power1.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          once: true
        }
      });
    });
  }
});
