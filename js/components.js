/* ==========================================================================
   TRÌNH RENDER THÀNH PHẦN GIAO DIỆN — MAI'S BOUTIQUE (js/components.js)
   --------------------------------------------------------------------------
   Ghi chú:
   - Tập hợp các hàm đọc dữ liệu từ window.MAI_DATA và render ra HTML cho:
     1. Thẻ hạng phòng (Room Cards)
     2. Danh sách tiện ích & Chính sách minh bạch
     3. Thư viện ảnh & Bộ lọc theo danh mục
     4. Biểu đồ đánh giá sao & Danh sách đánh giá khách hàng
   ========================================================================== */

window.MAI_COMPONENTS = (() => {
  /**
   * Định dạng giá tiền linh hoạt theo đơn vị tiền tệ đang chọn (VND hoặc USD).
   */
  function formatPrice(room, currency) {
    if (currency === "USD") {
      return `$${room.nightlyUSD}`;
    }
    return `${room.nightlyVND.toLocaleString("vi-VN")}₫`;
  }

  /**
   * Định dạng tổng tiền (cho Modal đặt phòng).
   */
  function formatAmount(amount, currency) {
    if (currency === "USD") {
      return `$${amount.toLocaleString("en-US")}`;
    }
    return `${amount.toLocaleString("vi-VN")}₫`;
  }

  /**
   * 1. RENDER DANH SÁCH HẠNG PHÒNG
   * - Lọc theo số khách nếu người dùng đã bấm "Tìm Phòng Trống".
   */
  function renderRooms(state) {
    const container = document.getElementById("rooms-grid");
    const filterBanner = document.getElementById("booking-filter-banner");
    const filterText = document.getElementById("booking-filter-text");
    if (!container) return;

    const { lang, currency, bookingFilter } = state;
    const t = window.MAI_DATA.i18n[lang];

    let roomsToShow = window.MAI_DATA.rooms;
    if (bookingFilter && bookingFilter.active) {
      const perRoomGuests = Math.ceil(bookingFilter.guests / bookingFilter.rooms);
      const matched = roomsToShow.filter((r) => r.maxGuests >= perRoomGuests);
      roomsToShow = matched.length > 0 ? matched : roomsToShow;

      if (filterBanner && filterText) {
        filterBanner.hidden = false;
        filterText.textContent = t.filterActiveText
          .replace("{guests}", bookingFilter.guests)
          .replace("{nights}", bookingFilter.nights)
          .replace("{inDate}", bookingFilter.checkIn)
          .replace("{outDate}", bookingFilter.checkOut);
      }
    } else if (filterBanner) {
      filterBanner.hidden = true;
    }

    container.innerHTML = roomsToShow
      .map((room) => {
        const priceLabel = formatPrice(room, currency);
        const badgeText = room.badge[lang];
        const leftText = t.roomsLeft.replace("{n}", room.availableCount);
        const featuresHtml = room.features[lang]
          .slice(0, 3)
          .map((feat) => `<span class="spec-chip">${feat}</span>`)
          .join("");

        return `
          <article class="room-card" data-room-id="${room.id}">
            <div class="room-card__media">
              <img
                class="room-card__img"
                src="${room.image}"
                alt="${room.name[lang]} - Mai's Boutique"
                loading="lazy"
              />
              <span class="badge room-card__badge">${badgeText}</span>
              <span class="badge badge--dark room-card__availability">
                <i data-lucide="check-circle-2" width="13" height="13" aria-hidden="true"></i>
                ${leftText}
              </span>
            </div>

            <div class="room-card__body">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; font-size:0.78rem; color:var(--color-wood-500);">
                <span><i data-lucide="maximize-2" width="13" height="13" style="display:inline; vertical-align:-2px;" aria-hidden="true"></i> ${room.size}</span>
                <span><i data-lucide="users" width="13" height="13" style="display:inline; vertical-align:-2px;" aria-hidden="true"></i> ${room.maxGuests} ${t.guestsUnit}</span>
              </div>

              <h3 class="room-card__title">${room.name[lang]}</h3>
              <p class="room-card__desc">${room.description[lang]}</p>

              <div class="room-card__specs">${featuresHtml}</div>

              <div class="room-card__footer">
                <div>
                  <div class="room-card__price-value">${priceLabel}</div>
                  <div class="room-card__price-unit">${t.perNight}</div>
                </div>
                <button
                  type="button"
                  class="btn btn--primary"
                  data-open-booking="${room.id}"
                >
                  ${t.btnBookRoom}
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    refreshIcons();
  }

  /**
   * 2. RENDER TIỆN ÍCH & CHÍNH SÁCH MINH BẠCH
   */
  function renderAmenities(lang) {
    const amenitiesEl = document.getElementById("amenities-grid");
    const policiesEl = document.getElementById("policy-list");
    if (amenitiesEl) {
      amenitiesEl.innerHTML = window.MAI_DATA.amenities
        .map(
          (item) => `
          <div class="amenity-item">
            <div class="amenity-item__icon" aria-hidden="true">
              <i data-lucide="${item.icon}" width="20" height="20"></i>
            </div>
            <div>
              <h3 class="amenity-item__title">${item.title[lang]}</h3>
              <p class="amenity-item__desc">${item.desc[lang]}</p>
            </div>
          </div>
        `
        )
        .join("");
    }

    if (policiesEl) {
      policiesEl.innerHTML = window.MAI_DATA.policies
        .map(
          (item) => `
          <li>
            <i data-lucide="${item.icon}" width="18" height="18" style="flex-shrink:0; color:var(--color-gold-400); margin-top:2px;" aria-hidden="true"></i>
            <span>${item.text[lang]}</span>
          </li>
        `
        )
        .join("");
    }

    refreshIcons();
  }

  /**
   * 3. RENDER THƯ VIỆN ẢNH THỰC TẾ (Kèm bộ lọc danh mục)
   */
  function renderGallery(state) {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;

    const { lang, galleryFilter } = state;
    const filtered =
      galleryFilter === "all"
        ? window.MAI_DATA.gallery
        : window.MAI_DATA.gallery.filter((img) => img.category === galleryFilter);

    grid.innerHTML = filtered
      .map((item, idx) => {
        const featuredClass = item.featured && galleryFilter === "all" ? "gallery-item--featured" : "";
        return `
          <button
            type="button"
            class="gallery-item ${featuredClass}"
            data-lightbox-index="${idx}"
            aria-label="${item.caption[lang]}"
          >
            <img src="${item.src}" alt="${item.caption[lang]}" loading="lazy" />
            <div class="gallery-item__overlay">
              <span class="gallery-item__caption">${item.caption[lang]}</span>
            </div>
          </button>
        `;
      })
      .join("");

    refreshIcons();
  }

  /**
   * 4. RENDER BIỂU ĐỒ SAO & ĐÁNH GIÁ TỪ GOOGLE MAPS
   */
  function renderReviews(lang) {
    const barsEl = document.getElementById("rating-bars");
    const gridEl = document.getElementById("reviews-grid");

    if (barsEl) {
      barsEl.innerHTML = window.MAI_DATA.hotel.rating.breakdown
        .map(
          (row) => `
          <div class="rating-bar-row">
            <span>${row.stars} ★</span>
            <div class="rating-bar-track" aria-hidden="true">
              <div class="rating-bar-fill" style="width:${row.percent}%"></div>
            </div>
            <span style="text-align:right;">${row.count}</span>
          </div>
        `
        )
        .join("");
    }

    if (gridEl) {
      gridEl.innerHTML = window.MAI_DATA.reviews
        .map((rev) => {
          const starsHtml = Array.from({ length: 5 }, (_, i) =>
            `<i data-lucide="star" width="14" height="14" fill="${i < rev.rating ? "currentColor" : "none"}" aria-hidden="true"></i>`
          ).join("");

          const replyHtml = rev.ownerReply
            ? `<div class="review-card__reply">${rev.ownerReply[lang]}</div>`
            : "";

          const subScoreHtml = rev.subScores
            ? `<div style="font-size:0.75rem; color:var(--color-gold-400); font-weight:500;">${rev.subScores}</div>`
            : "";

          return `
            <article class="review-card">
              <div class="review-card__header">
                <div>
                  <div class="review-card__author">${rev.author}</div>
                  <div class="review-card__meta">${rev.badge[lang]} · ${rev.date[lang]}</div>
                </div>
                <div class="rating-stars" aria-label="${rev.rating} / 5">${starsHtml}</div>
              </div>
              <p class="review-card__text">"${rev.text[lang]}"</p>
              ${subScoreHtml}
              ${replyHtml}
            </article>
          `;
        })
        .join("");
    }

    refreshIcons();
  }

  /**
   * 5. RENDER MENU LIÊN HỆ NỔI GÓC PHẢI (Điện thoại, Zalo, Booking.com, Agoda)
   */
  function getConciergeIconSvg(type) {
    switch (type) {
      case "zalo":
        /* Biểu tượng Zalo đồng bộ tông gỗ óc chó & vàng đồng */
        return `
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="28" height="28" rx="9" fill="#2C2119" />
            <path d="M8 9.5C8 8.67 8.67 8 9.5 8H22.5C23.33 8 24 8.67 24 9.5V19.5C24 20.33 23.33 21 22.5 21H14.2L9.8 24.3C9.3 24.67 8.6 24.31 8.6 23.69V21H9.5C8.67 21 8 20.33 8 19.5V9.5Z" fill="#FBF9F5" />
            <text x="16" y="16.8" text-anchor="middle" font-family="Inter, sans-serif" font-size="7.2" font-weight="800" fill="#9E6E30">Zalo</text>
          </svg>
        `;
      case "booking":
        /* Biểu tượng Booking.com (chữ B. đặc trưng theo tông gỗ & vàng đồng) */
        return `
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="28" height="28" rx="8" fill="#3E2F24" />
            <text x="14.5" y="21.5" text-anchor="middle" font-family="Georgia, serif" font-size="16" font-weight="700" fill="#FBF9F5">B</text>
            <circle cx="22.5" cy="20.5" r="2.2" fill="#D4AC72" />
          </svg>
        `;
      case "agoda":
        /* Biểu tượng Agoda (chữ a + dãy chấm đặc trưng theo bảng màu ấm) */
        return `
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="28" height="28" rx="8" fill="#FAF6EE" stroke="#CBBBA9" stroke-width="1.2" />
            <text x="16" y="18.2" text-anchor="middle" font-family="Inter, sans-serif" font-size="13.5" font-weight="800" fill="#2C2119">a</text>
            <circle cx="8.5" cy="23.5" r="1.5" fill="#B9382C" />
            <circle cx="12.2" cy="24.2" r="1.5" fill="#D4AC72" />
            <circle cx="16" cy="24.4" r="1.5" fill="#2C6E49" />
            <circle cx="19.8" cy="24.2" r="1.5" fill="#9E6E30" />
            <circle cx="23.5" cy="23.5" r="1.5" fill="#594638" />
          </svg>
        `;
      case "phone":
      default:
        return `<i data-lucide="phone" width="20" height="20" aria-hidden="true"></i>`;
    }
  }

  function renderConciergeMenu(lang) {
    const menuEl = document.getElementById("concierge-menu");
    if (!menuEl || !Array.isArray(window.MAI_DATA.conciergeChannels)) return;

    menuEl.innerHTML = window.MAI_DATA.conciergeChannels
      .map((item) => {
        const label = item.label[lang] || item.label.vi;
        const attrs = item.external
          ? `target="_blank" rel="noopener noreferrer"`
          : "";
        return `
          <div class="concierge-item">
            <a
              href="${item.href}"
              class="concierge-item__link"
              aria-label="${label}"
              ${attrs}
            >
              ${getConciergeIconSvg(item.type)}
              <span class="concierge-item__label">${label}</span>
            </a>
          </div>
        `;
      })
      .join("");

    refreshIcons();
  }

  /**
   * Hàm gọi lại thư viện Lucide Icons để chuyển đổi thẻ <i data-lucide="..."> thành SVG.
   */
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  return {
    formatPrice,
    formatAmount,
    renderRooms,
    renderAmenities,
    renderGallery,
    renderReviews,
    renderConciergeMenu,
    refreshIcons
  };
})();
