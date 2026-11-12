/* ==========================================================================
   LOGIC KIỂM TRA PHÒNG & ĐẶT PHÒNG — MAI'S BOUTIQUE (js/booking.js)
   --------------------------------------------------------------------------
   Ghi chú:
   - Xử lý thanh tìm phòng nổi (Hero Booking Bar):
     + Tự động gán ngày nhận phòng mặc định (Ngày mai) và trả phòng (+2 đêm).
     + Kiểm tra ngày hợp lệ, tính số đêm và lọc danh sách phòng phù hợp.
   - Xử lý Modal Chi tiết phòng & Form xác nhận đặt phòng:
     + Cho phép đổi ngày/số phòng ngay trong Modal và tự động tính tổng tiền.
     + Kiểm tra lỗi nhập liệu ngay khi rời ô nhập (onBlur) và khi bấm Gửi.
     + Tạo mã đặt phòng tham khảo & hiển thị thông báo xác nhận thân thiện.
   ========================================================================== */

window.MAI_BOOKING = (() => {
  let activeRoom = null;

  /**
   * Trả về chuỗi ngày YYYY-MM-DD cộng thêm offsetDays kể từ hôm nay.
   */
  function getOffsetDateString(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * Tính số đêm giữa ngày nhận phòng và ngày trả phòng (tối thiểu 1 đêm).
   */
  function calculateNights(checkInStr, checkOutStr) {
    const inDate = new Date(checkInStr);
    const outDate = new Date(checkOutStr);
    if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) return 0;
    const diffMs = outDate.getTime() - inDate.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

  /**
   * Khởi tạo giá trị ngày mặc định và gắn sự kiện cho Hero Booking Bar.
   */
  function initHeroBookingBar(state, onFilterApplied) {
    const form = document.getElementById("hero-booking-form");
    const checkInInput = document.getElementById("hero-checkin");
    const checkOutInput = document.getElementById("hero-checkout");
    const guestsSelect = document.getElementById("hero-guests");
    const roomsSelect = document.getElementById("hero-rooms");
    const errorEl = document.getElementById("hero-booking-error");
    const clearBtn = document.getElementById("clear-booking-filter");

    if (!form || !checkInInput || !checkOutInput) return;

    const today = getOffsetDateString(0);
    const tomorrow = getOffsetDateString(1);
    const threeDaysLater = getOffsetDateString(3);

    checkInInput.min = today;
    checkInInput.value = tomorrow;
    checkOutInput.min = tomorrow;
    checkOutInput.value = threeDaysLater;

    // Khi đổi ngày nhận phòng, tự động điều chỉnh min của ngày trả phòng
    checkInInput.addEventListener("change", () => {
      const nextDay = new Date(checkInInput.value);
      nextDay.setDate(nextDay.getDate() + 1);
      const minOut = nextDay.toISOString().split("T")[0];
      checkOutInput.min = minOut;
      if (checkOutInput.value <= checkInInput.value) {
        checkOutInput.value = minOut;
      }
      if (errorEl) errorEl.textContent = "";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nights = calculateNights(checkInInput.value, checkOutInput.value);
      if (nights <= 0) {
        if (errorEl) {
          errorEl.textContent =
            state.lang === "vi"
              ? "Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 đêm."
              : "Check-out date must be at least 1 night after check-in.";
        }
        checkOutInput.focus();
        return;
      }

      if (errorEl) errorEl.textContent = "";
      state.bookingFilter = {
        active: true,
        checkIn: checkInInput.value,
        checkOut: checkOutInput.value,
        nights,
        guests: Number(guestsSelect.value),
        rooms: Number(roomsSelect.value)
      };

      onFilterApplied();

      // Cuộn mượt xuống khu vực hạng phòng
      const roomsSection = document.getElementById("rooms");
      if (roomsSection) {
        roomsSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        state.bookingFilter = { active: false };
        onFilterApplied();
      });
    }
  }

  /**
   * Mở Modal Chi tiết & Đặt phòng cho hạng phòng được chọn.
   */
  function openBookingModal(roomId, state) {
    const room = window.MAI_DATA.rooms.find((r) => r.id === roomId) || window.MAI_DATA.rooms[0];
    if (!room) return;
    activeRoom = room;

    const modal = document.getElementById("booking-modal");
    const imgEl = document.getElementById("modal-room-img");
    const badgeEl = document.getElementById("modal-room-badge");
    const titleEl = document.getElementById("modal-room-title");
    const descEl = document.getElementById("modal-room-desc");
    const specsEl = document.getElementById("modal-room-specs");

    const inInput = document.getElementById("modal-checkin");
    const outInput = document.getElementById("modal-checkout");
    const roomsInput = document.getElementById("modal-rooms");
    const formEl = document.getElementById("modal-booking-form");
    const successEl = document.getElementById("modal-booking-success");

    if (!modal) return;

    // Reset về trạng thái nhập form
    if (formEl) formEl.hidden = false;
    if (successEl) successEl.hidden = true;

    const { lang } = state;
    imgEl.src = room.image;
    imgEl.alt = room.name[lang];
    badgeEl.textContent = `${room.badge[lang]} · ${room.size}`;
    titleEl.textContent = room.name[lang];
    descEl.textContent = room.description[lang];
    specsEl.innerHTML = room.features[lang]
      .map((f) => `<span class="spec-chip">${f}</span>`)
      .join("");

    // Đồng bộ ngày từ thanh Hero Booking Bar (nếu có)
    const heroIn = document.getElementById("hero-checkin")?.value || getOffsetDateString(1);
    const heroOut = document.getElementById("hero-checkout")?.value || getOffsetDateString(3);
    const heroRooms = document.getElementById("hero-rooms")?.value || "1";

    inInput.min = getOffsetDateString(0);
    inInput.value = heroIn;
    outInput.min = heroIn;
    outInput.value = heroOut > heroIn ? heroOut : getOffsetDateString(2);
    roomsInput.value = heroRooms;

    updateModalSummary(state);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Đưa focus vào nút đóng hoặc trường họ tên để hỗ trợ bàn phím
    setTimeout(() => {
      document.getElementById("guest-name")?.focus();
    }, 120);
  }

  /**
   * Cập nhật bảng tóm tắt giá tiền theo thời gian thực trong Modal.
   */
  function updateModalSummary(state) {
    if (!activeRoom) return;
    const inVal = document.getElementById("modal-checkin")?.value;
    const outVal = document.getElementById("modal-checkout")?.value;
    const roomCount = Number(document.getElementById("modal-rooms")?.value || 1);

    const nights = Math.max(1, calculateNights(inVal, outVal));
    const unitPrice =
      state.currency === "USD" ? activeRoom.nightlyUSD : activeRoom.nightlyVND;
    const total = unitPrice * nights * roomCount;

    const nightsEl = document.getElementById("summary-nights");
    const countEl = document.getElementById("summary-room-count");
    const totalEl = document.getElementById("summary-total");

    if (nightsEl) {
      nightsEl.textContent = `${nights} ${state.lang === "vi" ? "đêm" : "night(s)"}`;
    }
    if (countEl) {
      countEl.textContent = `${roomCount} ${state.lang === "vi" ? "phòng" : "room(s)"}`;
    }
    if (totalEl) {
      totalEl.textContent = window.MAI_COMPONENTS.formatAmount(total, state.currency);
    }
  }

  /**
   * Đóng Modal đặt phòng.
   */
  function closeBookingModal() {
    const modal = document.getElementById("booking-modal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /**
   * Khởi tạo sự kiện cho Modal Đặt phòng & Kiểm tra lỗi form (Inline Validation).
   */
  function initBookingModal(state, showToast) {
    const modal = document.getElementById("booking-modal");
    const closeBtn = document.getElementById("close-booking-modal");
    const form = document.getElementById("modal-booking-form");
    const nameInput = document.getElementById("guest-name");
    const phoneInput = document.getElementById("guest-phone");
    const emailInput = document.getElementById("guest-email");
    const inInput = document.getElementById("modal-checkin");
    const outInput = document.getElementById("modal-checkout");
    const roomsInput = document.getElementById("modal-rooms");
    const doneBtn = document.getElementById("booking-done-btn");

    // Delegate sự kiện click từ mọi nút [data-open-booking]
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-booking]");
      if (btn) {
        const roomId = btn.getAttribute("data-open-booking");
        openBookingModal(roomId, state);
      }
    });

    closeBtn?.addEventListener("click", closeBookingModal);
    doneBtn?.addEventListener("click", closeBookingModal);

    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeBookingModal();
    });

    // Tự động tính lại tiền khi thay đổi ngày / số phòng trong Modal
    [inInput, outInput, roomsInput].forEach((el) => {
      el?.addEventListener("change", () => {
        if (inInput && outInput && outInput.value <= inInput.value) {
          const next = new Date(inInput.value);
          next.setDate(next.getDate() + 1);
          outInput.value = next.toISOString().split("T")[0];
        }
        updateModalSummary(state);
      });
    });

    // Kiểm tra từng trường khi người dùng rời khỏi ô (onBlur validation)
    function validateField(input, errorId, validatorFn, msgVi, msgEn) {
      const errEl = document.getElementById(errorId);
      const valid = validatorFn(input.value.trim());
      input.classList.toggle("is-invalid", !valid);
      if (errEl) {
        errEl.textContent = valid ? "" : state.lang === "vi" ? msgVi : msgEn;
      }
      return valid;
    }

    nameInput?.addEventListener("blur", () =>
      validateField(
        nameInput,
        "err-guest-name",
        (v) => v.length >= 2,
        "Vui lòng nhập họ tên đầy đủ.",
        "Please enter your full name."
      )
    );

    phoneInput?.addEventListener("blur", () =>
      validateField(
        phoneInput,
        "err-guest-phone",
        (v) => /^[+\d\s()-]{8,18}$/.test(v),
        "Vui lòng nhập số điện thoại hợp lệ.",
        "Please enter a valid phone number."
      )
    );

    emailInput?.addEventListener("blur", () =>
      validateField(
        emailInput,
        "err-guest-email",
        (v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        "Địa chỉ email chưa đúng định dạng.",
        "Please enter a valid email address."
      )
    );

    // Xử lý gửi yêu cầu đặt phòng
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const okName = validateField(
        nameInput,
        "err-guest-name",
        (v) => v.length >= 2,
        "Vui lòng nhập họ tên đầy đủ.",
        "Please enter your full name."
      );
      const okPhone = validateField(
        phoneInput,
        "err-guest-phone",
        (v) => /^[+\d\s()-]{8,18}$/.test(v),
        "Vui lòng nhập số điện thoại hợp lệ.",
        "Please enter a valid phone number."
      );
      const okEmail = validateField(
        emailInput,
        "err-guest-email",
        (v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        "Địa chỉ email chưa đúng định dạng.",
        "Please enter a valid email address."
      );

      if (!okName || !okPhone || !okEmail) return;

      // Tạo mã tham chiếu đặt phòng
      const code = `MAI-${Math.floor(100000 + Math.random() * 900000)}`;
      const successBox = document.getElementById("modal-booking-success");
      const codeEl = document.getElementById("booking-ref-code");
      const detailEl = document.getElementById("booking-success-detail");

      if (codeEl) codeEl.textContent = code;
      if (detailEl && activeRoom) {
        const totalTxt = document.getElementById("summary-total")?.textContent || "";
        detailEl.textContent =
          state.lang === "vi"
            ? `Cảm ơn ${nameInput.value.trim()}! Yêu cầu giữ ${roomsInput.value} phòng ${activeRoom.name.vi} (${inInput.value} → ${outInput.value}, dự kiến ${totalTxt}) đã được ghi nhận. Lễ tân Mai's Boutique sẽ liên hệ xác nhận qua số ${phoneInput.value.trim()}.`
            : `Thank you, ${nameInput.value.trim()}! Your request for ${roomsInput.value}x ${activeRoom.name.en} (${inInput.value} → ${outInput.value}, est. ${totalTxt}) is recorded. Our reception will confirm shortly via ${phoneInput.value.trim()}.`;
      }

      form.hidden = true;
      if (successBox) successBox.hidden = false;

      showToast(
        state.lang === "vi"
          ? `Đã tạo yêu cầu đặt phòng ${code}!`
          : `Reservation request ${code} received!`
      );
    });
  }

  return {
    initHeroBookingBar,
    initBookingModal,
    openBookingModal,
    closeBookingModal,
    updateModalSummary
  };
})();
