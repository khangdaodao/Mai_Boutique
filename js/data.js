/* ==========================================================================
   TRUNG TÂM DỮ LIỆU & CẤU HÌNH — MAI'S BOUTIQUE (js/data.js)
   --------------------------------------------------------------------------
   Ghi chú cho người quản trị / chỉnh sửa:
   - Toàn bộ thông tin doanh nghiệp, hạng phòng, giá phòng, tiện ích, thư viện
     ảnh, đánh giá khách hàng và văn bản song ngữ (VI / EN) đều nằm ở đây.
   - Khi muốn thay đổi giá phòng, thêm phòng mới, đổi số điện thoại hoặc cập
     nhật đánh giá mới từ Google Maps, bạn CHỈ CẦN SỬA FILE NÀY.
   ========================================================================== */

window.MAI_DATA = {
  /* ------------------------------------------------------------------------
     1. THÔNG TIN DOANH NGHIỆP (Trích xuất chính xác từ Google Maps)
     ------------------------------------------------------------------------ */
  hotel: {
    name: "Mai's Boutique",
    tagline: {
      vi: "Wellness Hotel · Đà Nẵng",
      en: "Wellness Hotel · Da Nang"
    },
    address: {
      vi: "104 Tô Hiến Thành, An Hải, Sơn Trà, Đà Nẵng 550000, Việt Nam",
      en: "104 To Hien Thanh, An Hai, Son Tra, Da Nang 550000, Vietnam"
    },
    plusCode: "366R+CX An Hải, Đà Nẵng",
    coordinates: { lat: 16.0610177, lng: 108.2424088 },
    phoneDisplay: "+84 862 298 125",
    phoneHref: "tel:+84862298125",
    email: "concierge@maisboutique.vn", // Email liên hệ mẫu - thay bằng email thật nếu có
    googleMapsUrl: "https://maps.app.goo.gl/XLX3ed93QSMrhzPh8",
    checkInTime: "14:00 (2:00 PM)",
    checkOutTime: "12:00 (12:00 PM)",
    walkToBeach: {
      vi: "~10 phút đi bộ ra Biển Mỹ Khê",
      en: "~10 min walk to My Khe Beach"
    },
    rating: {
      score: 4.7,
      totalReviews: 221,
      breakdown: [
        { stars: 5, count: 193, percent: 87.3 },
        { stars: 4, count: 12, percent: 5.4 },
        { stars: 3, count: 6, percent: 2.7 },
        { stars: 2, count: 5, percent: 2.3 },
        { stars: 1, count: 5, percent: 2.3 }
      ]
    }
  },

  /* ------------------------------------------------------------------------
     1B. KÊNH LIÊN HỆ NỔI GÓC PHẢI (Floating Concierge Dock)
     Ghi chú: Bạn có thể thay link Booking.com / Agoda bằng URL trang khách sạn
     cụ thể của bạn trên từng nền tảng, hoặc thêm/bớt kênh tại đây.
     ------------------------------------------------------------------------ */
  conciergeChannels: [
    {
      id: "phone",
      type: "phone",
      href: "tel:+84862298125",
      external: false,
      label: {
        vi: "Gọi +84 862 298 125",
        en: "Call +84 862 298 125"
      }
    },
    {
      id: "zalo",
      type: "zalo",
      href: "https://zalo.me/84862298125",
      external: true,
      label: {
        vi: "Nhắn tin qua Zalo",
        en: "Chat on Zalo"
      }
    },
    {
      id: "booking",
      type: "booking",
      /* Thay bằng link property Booking.com chính thức của bạn nếu muốn trỏ thẳng */
      href: "https://www.booking.com/searchresults.html?ss=Mai%27s+Boutique+Da+Nang",
      external: true,
      label: {
        vi: "Đặt qua Booking.com",
        en: "Book on Booking.com"
      }
    },
    {
      id: "agoda",
      type: "agoda",
      /* Thay bằng link property Agoda chính thức của bạn nếu muốn trỏ thẳng */
      href: "https://www.agoda.com/search?text=Mai%27s+Boutique+Da+Nang",
      external: true,
      label: {
        vi: "Đặt qua Agoda",
        en: "Book on Agoda"
      }
    }
  ],

  /* ------------------------------------------------------------------------
     2. DANH SÁCH HẠNG PHÒNG (Dựa trên ảnh nội thất thật của Mai's Boutique)
     Lưu ý: Giá nightlyVND / nightlyUSD là mức giá gợi ý tham khảo, bạn có thể
     điều chỉnh trực tiếp theo mùa cao điểm / thấp điểm.
     ------------------------------------------------------------------------ */
  rooms: [
    {
      id: "deluxe-timber",
      badge: { vi: "Được ưa chuộng", en: "Most Popular" },
      name: {
        vi: "Deluxe Timber King",
        en: "Deluxe Timber King"
      },
      size: "28 m²",
      maxGuests: 2,
      bedType: { vi: "1 Giường King gỗ tự nhiên", en: "1 Natural Wood King Bed" },
      availableCount: 4,
      nightlyVND: 1150000,
      nightlyUSD: 46,
      image: "assets/images/room-deluxe-desk.jpg",
      description: {
        vi: "Không gian gỗ tự nhiên kết hợp tường đá ong ấm áp, bàn làm việc riêng và khung cửa mành gỗ hướng mảng xanh tĩnh lặng.",
        en: "Warm natural timber slats paired with textured laterite stone walls, a dedicated wood study desk, and louvered windows overlooking lush greenery."
      },
      features: {
        vi: ["Giường King êm ái", "Bàn làm việc gỗ", "Mành gỗ cản nắng", "Wi-Fi tốc độ cao"],
        en: ["Plush King Bed", "Timber Study Desk", "Wooden Louvers", "High-Speed Wi-Fi"]
      }
    },
    {
      id: "studio-kitchenette",
      badge: { vi: "Phù hợp lưu trú dài ngày", en: "Extended Stay" },
      name: {
        vi: "Boutique Studio Bếp Riêng",
        en: "Boutique Kitchenette Studio"
      },
      size: "35 m²",
      maxGuests: 2,
      bedType: { vi: "1 Giường Queen + Khu bếp gỗ", en: "1 Queen Bed + Kitchenette" },
      availableCount: 3,
      nightlyVND: 1450000,
      nightlyUSD: 58,
      image: "assets/images/room-apartment-kitchen.jpg",
      description: {
        vi: "Căn hộ studio rộng rãi với hệ tủ bếp lam gỗ đồng bộ, bồn rửa và đầy đủ dụng cụ cơ bản cùng khu vực làm việc tách biệt.",
        en: "Spacious studio suite featuring custom slatted-wood kitchen cabinetry, sink, essential cookware, and a serene work alcove."
      },
      features: {
        vi: ["Bếp nhỏ riêng", "Tủ gỗ lam đứng", "Bàn làm việc", "Hướng giếng trời"],
        en: ["Private Kitchenette", "Slatted Wood Cabinetry", "Work Alcove", "Atrium Light"]
      }
    },
    {
      id: "family-indochine-twin",
      badge: { vi: "Nhóm bạn & Gia đình", en: "Family & Friends" },
      name: {
        vi: "Grand Indochine Twin Suite",
        en: "Grand Indochine Twin Suite"
      },
      size: "42 m²",
      maxGuests: 4,
      bedType: { vi: "2 Giường Đôi Lớn (Double)", en: "2 Large Double Beds" },
      availableCount: 2,
      nightlyVND: 1850000,
      nightlyUSD: 74,
      image: "assets/images/room-twin-wood.jpg",
      description: {
        vi: "Phòng hạng sang mang dấu ấn Indochine với trần nan gỗ, tủ mây tre đan thủ công, sàn gạch bông nghệ thuật và rèm hai lớp.",
        en: "Signature Indochine suite with timber-slat ceilings, handcrafted woven rattan wardrobes, patterned encaustic floor tiles, and twin double beds."
      },
      features: {
        vi: ["2 Giường lớn", "Tủ mây tre thủ công", "Ban công / Cửa lớn", "Phù hợp gia đình"],
        en: ["2 Double Beds", "Woven Rattan Storage", "Large Balcony Doors", "Kid-Friendly"]
      }
    }
  ],

  /* ------------------------------------------------------------------------
     3. TIỆN ÍCH & CHÍNH SÁCH MINH BẠCH (Theo thông tin xác thực Google Maps)
     ------------------------------------------------------------------------ */
  amenities: [
    {
      icon: "waves",
      title: { vi: "Hồ bơi giếng trời nội khu", en: "Indoor Courtyard Pool" },
      desc: {
        vi: "Hồ bơi xanh mát nằm ngay trung tâm giếng trời lộng gió, thắp đèn lung linh vào buổi tối.",
        en: "Tranquil stone-tiled pool nestled inside the open-air atrium, warmly lit every evening."
      }
    },
    {
      icon: "wifi",
      title: { vi: "Wi-Fi tốc độ cao miễn phí", en: "Complimentary High-Speed Wi-Fi" },
      desc: {
        vi: "Phủ sóng ổn định toàn bộ phòng nghỉ, bàn làm việc và khu vực lounge bên hồ.",
        en: "Reliable coverage across all guest rooms, study desks, and poolside seating."
      }
    },
    {
      icon: "coffee",
      title: { vi: "Bữa sáng & Khay trà thư giãn", en: "Breakfast & Poolside Refreshments" },
      desc: {
        vi: "Phục vụ bữa sáng (có phụ phí) và dịch vụ phòng chu đáo theo yêu cầu.",
        en: "Paid breakfast options and attentive in-room dining / poolside refreshment service."
      }
    },
    {
      icon: "car",
      title: { vi: "Đỗ xe miễn phí & Đưa đón sân bay", en: "Free Parking & Airport Shuttle" },
      desc: {
        vi: "Hỗ trợ đặt xe đưa đón sân bay quốc tế Đà Nẵng và chỗ đậu xe thuận tiện.",
        en: "Complimentary parking on-site and convenient airport transfer arrangement."
      }
    },
    {
      icon: "shirt",
      title: { vi: "Dịch vụ giặt ủi & Phòng máy lạnh", en: "Laundry & Climate Control" },
      desc: {
        vi: "Điều hòa âm trần êm ái trong mọi phòng cùng dịch vụ giặt ủi nhanh trong ngày.",
        en: "Quiet concealed air conditioning in every suite plus same-day laundry service."
      }
    },
    {
      icon: "trees",
      title: { vi: "Ốc đảo yên tĩnh gần biển Mỹ Khê", en: "Quiet Alley Oasis Near Beach" },
      desc: {
        vi: "Nằm trong con hẻm bình yên, tách biệt tiếng ồn phố thị nhưng chỉ 10 phút đi bộ ra biển.",
        en: "Tucked in a peaceful lane away from traffic, yet just a 10-minute stroll to My Khe Beach."
      }
    }
  ],

  /* Chính sách trung thực giúp tăng độ tin cậy với khách đặt phòng */
  policies: [
    {
      icon: "clock",
      text: {
        vi: "Nhận phòng từ 14:00 (2:00 PM) · Trả phòng trước 12:00 (12:00 PM).",
        en: "Check-in from 2:00 PM · Check-out by 12:00 PM."
      }
    },
    {
      icon: "luggage",
      text: {
        vi: "Kiến trúc giếng trời dùng cầu thang bộ (không có thang máy) — lễ tân luôn sẵn sàng hỗ trợ mang hành lý tận phòng.",
        en: "Boutique walk-up architecture without an elevator — our staff gladly assists with your luggage upon request."
      }
    },
    {
      icon: "cigarette-off",
      text: {
        vi: "Khách sạn 100% không khói thuốc, thân thiện với gia đình có trẻ nhỏ.",
        en: "100% smoke-free wellness property and welcoming for families with children."
      }
    },
    {
      icon: "ban",
      text: {
        vi: "Hiện chưa hỗ trợ mang theo thú cưng và chưa có nhà hàng/phòng gym riêng trong khuôn viên.",
        en: "Pets are not permitted; no on-site restaurant or fitness center (breakfast & room service available)."
      }
    }
  ],

  /* ------------------------------------------------------------------------
     4. THƯ VIỆN HÌNH ẢNH THỰC TẾ (Tất cả ảnh lấy từ Google Maps Mai's Boutique)
     ------------------------------------------------------------------------ */
  gallery: [
    {
      src: "assets/images/pool-night.jpg",
      category: "pool",
      featured: true,
      caption: {
        vi: "Hồ bơi giếng trời thắp đèn ấm áp buổi tối cùng ban công gỗ riêng tư",
        en: "Illuminated courtyard pool at dusk framed by timber ceilings and private terraces"
      }
    },
    {
      src: "assets/images/courtyard-lounge.jpg",
      category: "architecture",
      caption: {
        vi: "Giếng trời thông tầng, gạch thông gió đón nắng và cầu thang gỗ",
        en: "Multi-story lightwell, terracotta breeze-blocks, and timber-tread staircase"
      }
    },
    {
      src: "assets/images/room-deluxe-desk.jpg",
      category: "rooms",
      caption: {
        vi: "Phòng Deluxe Timber King với bàn làm việc gỗ và tường đá ong",
        en: "Deluxe Timber King room with wooden study desk and laterite stone wall"
      }
    },
    {
      src: "assets/images/dining-wood.jpg",
      category: "architecture",
      caption: {
        vi: "Phòng sinh hoạt chung với bàn gỗ nguyên khối và tủ mây tre đan",
        en: "Communal timber dining room with handcrafted woven rattan cabinetry"
      }
    },
    {
      src: "assets/images/room-twin-wood.jpg",
      category: "rooms",
      caption: {
        vi: "Grand Indochine Twin Suite hai giường lớn dành cho gia đình",
        en: "Grand Indochine Twin Suite with two double beds and timber-slat ceiling"
      }
    },
    {
      src: "assets/images/hero-pool.jpg",
      category: "pool",
      caption: {
        vi: "Ghế gỗ thư giãn bên hồ bơi tràn ánh sáng tự nhiên ban ngày",
        en: "Poolside wooden lounge chairs bathed in natural daylight"
      }
    },
    {
      src: "assets/images/room-apartment-kitchen.jpg",
      category: "rooms",
      caption: {
        vi: "Boutique Studio với hệ tủ bếp lam gỗ tiện nghi cho kỳ nghỉ dài",
        en: "Boutique Studio featuring custom slatted-wood kitchenette"
      }
    },
    {
      src: "assets/images/pool-tray.jpg",
      category: "pool",
      caption: {
        vi: "Góc trà thư giãn và mảng cây xanh nhiệt đới cạnh mặt hồ",
        en: "Poolside tea refreshment tray beside tropical courtyard greenery"
      }
    },
    {
      src: "assets/images/courtyard-lightwell.jpg",
      category: "architecture",
      caption: {
        vi: "Góc nhìn từ sảnh nghỉ tầng trệt hướng lên các tầng phòng",
        en: "Ground-floor lounge view looking toward the upper timber balconies"
      }
    },
    {
      src: "assets/images/living-wall.jpg",
      category: "architecture",
      caption: {
        vi: "Bức tường cây xanh thẳng đứng tạo vi khí hậu mát lành",
        en: "Vertical living green wall bringing fresh serenity to the atrium"
      }
    }
  ],

  /* ------------------------------------------------------------------------
     5. ĐÁNH GIÁ THỰC TẾ TỪ GOOGLE MAPS (4.7★ · 221 Đánh giá)
     ------------------------------------------------------------------------ */
  reviews: [
    {
      author: "Haixiong Jiang",
      badge: { vi: "Local Guide · 151 đánh giá", en: "Local Guide · 151 reviews" },
      rating: 5,
      date: { vi: "3 tuần trước · Phòng 303", en: "3 weeks ago · Room 303" },
      highlight: true,
      text: {
        vi: "Mình được bạn Thư hỗ trợ nhận phòng và bạn Nhi hỗ trợ trả phòng — cực kỳ hài lòng với sự hiếu khách và tận tâm của các bạn. Phòng 303 rất thơm, sạch sẽ. Một ốc đảo nhỏ bình yên giữa con hẻm.",
        en: "I was attended by Ms Thu during check-in and Ms Nhi during checkout. Pleased and happy with their hospitality. Room 303 smells great. A nice little oasis among the alleys."
      },
      subScores: "Phòng 5/5 · Dịch vụ 5/5"
    },
    {
      author: "scott poole",
      badge: { vi: "Local Guide · Du lịch một mình", en: "Local Guide · Solo Vacation" },
      rating: 5,
      date: { vi: "1 tuần trước", en: "1 week ago" },
      highlight: false,
      text: {
        vi: "Khách sạn thực sự tuyệt đẹp, nhân viên vô cùng nhiệt tình và chào đón nồng hậu. Nếu có dịp quay lại Đà Nẵng, chắc chắn đây vẫn là nơi mình chọn lưu trú! Sang trọng, lãng mạn, yên tĩnh và rất đáng tiền.",
        en: "Absolutely beautiful hotel, the staff were extremely helpful and welcoming. If I ever come back to Danang this is where I would stay! Luxury, romantic, quiet, great value."
      },
      subScores: "Phòng 5/5 · Dịch vụ 5/5 · Vị trí 5/5"
    },
    {
      author: "Siripapan Ratchawong",
      badge: { vi: "Local Guide · 27 ảnh", en: "Local Guide · 27 photos" },
      rating: 5,
      date: { vi: "4 tuần trước", en: "4 weeks ago" },
      highlight: false,
      text: {
        vi: "Nhân viên dễ thương, lịch sự và rất thân thiện. Không gian thanh bình, yên tĩnh hoàn toàn, cảm giác rất an toàn và sạch sẽ. Phòng ngủ rộng rãi, giường êm ái giúp kỳ nghỉ cực kỳ thư giãn.",
        en: "The staff were lovely, polite, helpful, and friendly. The atmosphere was peaceful and quiet, safe and clean. Spacious bedroom, soft comfortable bed, very relaxing overall stay."
      },
      subScores: "Phòng 5/5 · Dịch vụ 5/5"
    },
    {
      author: "MichelS861",
      badge: { vi: "Đánh giá qua Tripadvisor", en: "Verified Tripadvisor Review" },
      rating: 5,
      date: { vi: "1 năm trước", en: "1 year ago" },
      highlight: false,
      text: {
        vi: "Boutique hotel xuất sắc gần biển Mỹ Khê (10 phút đi bộ) trong khu dân cư yên tĩnh ngay sau đại lộ lớn. Phòng hiện đại, sạch sẽ, được chăm chút kỹ, có hồ bơi và giếng trời thoáng đãng. Rất đáng giới thiệu!",
        en: "Excellent boutique hotel near My Khe beach (10 min walk) in a quiet neighbourhood. Friendly caring staff, clean modern rooms, courtyard pool and sunroof. Much recommended!"
      },
      subScores: "Gần biển Mỹ Khê · Giếng trời & Hồ bơi"
    },
    {
      author: "Ken Tozawa",
      badge: { vi: "Góp ý minh bạch & Phản hồi", en: "Candid Feedback & Owner Reply" },
      rating: 1,
      date: { vi: "1 tháng trước", en: "1 month ago" },
      highlight: false,
      text: {
        vi: "Khách sạn chưa phù hợp với kỳ vọng cá nhân về khoảng cách ra biển, bữa sáng kèm theo và việc di chuyển hành lý.",
        en: "Felt other options closer to the beach with included breakfast suited their preferences better."
      },
      ownerReply: {
        vi: "Phản hồi từ Mai's Boutique: Cảm ơn bạn đã góp ý. Như thông tin mô tả rõ ràng, khách sạn không có thang máy nhưng đội ngũ luôn sẵn sàng hỗ trợ mang hành lý khi khách cần, và luôn minh bạch tiện ích từng hạng phòng để du khách lựa chọn phù hợp nhất.",
        en: "Owner Response: Thank you for sharing your feedback. As noted in our listing, our hotel does not have an elevator, though our staff are always available to assist with luggage upon request."
      }
    }
  ],

  /* ------------------------------------------------------------------------
     6. TỪ ĐIỂN GIAO DIỆN SONG NGỮ (I18N DICTIONARY)
     ------------------------------------------------------------------------ */
  i18n: {
    vi: {
      navStory: "Không gian",
      navRooms: "Hạng phòng",
      navAmenities: "Tiện ích",
      navGallery: "Thư viện",
      navReviews: "Đánh giá",
      navLocation: "Vị trí",
      navBook: "Đặt phòng ngay",

      heroEyebrow: "104 Tô Hiến Thành · An Hải · Đà Nẵng",
      heroTitle: "Nghỉ Dưỡng Gỗ Ấm Giữa Lòng Phố Biển",
      heroSubtitle:
        "Ốc đảo boutique yên bình cách biển Mỹ Khê 10 phút tản bộ — nơi kiến trúc gỗ tự nhiên, giếng trời xanh mát và hồ bơi nội khu hòa quyện.",
      heroTrustRating: "4.7 / 5 (221 đánh giá Google Maps)",
      heroTrustWalk: "10 phút ra biển Mỹ Khê",
      heroTrustQuiet: "Hẻm yên tĩnh · Không khói thuốc",

      labelCheckIn: "Nhận phòng",
      labelCheckOut: "Trả phòng",
      labelGuests: "Số khách",
      labelRooms: "Số phòng",
      btnCheckAvail: "Tìm Phòng Trống",
      bookingMetaDates: "Nhận phòng 14:00 · Trả phòng 12:00",
      bookingMetaDirect: "Đặt trực tiếp — Không phí trung gian · Hỗ trợ hành lý 24/7",

      storyEyebrow: "Triết lý & Kiến trúc",
      storyTitle: "Một Ốc Đảo Gỗ & Ánh Sáng Giữa Lòng An Hải",
      storyP1:
        "Lấy cảm hứng từ chất liệu gỗ tự nhiên, đá ong bản địa và nghệ thuật mây tre đan, Mai's Boutique được thiết kế xoay quanh khoảng giếng trời thông tầng đón nắng gió tự nhiên.",
      storyP2:
        "Tách biệt khỏi sự ồn ào của đại lộ lớn nhưng vẫn kết nối nhanh chóng tới biển Mỹ Khê, mỗi buổi sáng tại đây bắt đầu bằng làn nước hồ bơi êm ả và sự tiếp đón ân cần như người thân trong gia đình.",
      storyStatNum: "87.3%",
      storyStatLabel: "Khách hàng chấm 5 sao tuyệt đối trên Google Maps (193/221 đánh giá)",
      pillar1Title: "Kiến trúc gỗ & Đá ong",
      pillar1Text: "Nội thất lam gỗ sồi ấm áp kết hợp mảng tường đá ong và gạch bông Indochine.",
      pillar2Title: "Giếng trời & Mảng xanh",
      pillar2Text: "Bức tường cây xanh thẳng đứng và hồ bơi trung tâm điều hòa vi khí hậu.",
      pillar3Title: "Dịch vụ cá nhân hóa",
      pillar3Text: "Được du khách khen ngợi đặc biệt bởi sự tận tâm của đội ngũ lễ tân (Ms. Thu, Ms. Nhi).",
      pillar4Title: "Yên tĩnh tuyệt đối",
      pillar4Text: "Tọa lạc tại hẻm 104 Tô Hiến Thành an ninh, lý tưởng để nghỉ ngơi và làm việc từ xa.",

      roomsEyebrow: "Khám Phá Không Gian Lưu Trú",
      roomsTitle: "Lựa Chọn Hạng Phòng Của Bạn",
      roomsSubtitle:
        "Mỗi căn phòng đều được chăm chút mùi hương dịu nhẹ, ga trải cao cấp và ánh sáng tự nhiên từ giếng trời hoặc tán cây xanh.",
      perNight: "/ đêm",
      btnBookRoom: "Xem & Đặt Phòng",
      guestsUnit: "khách",
      roomsLeft: "Còn {n} phòng",
      filterActiveText: "Hiển thị phòng phù hợp cho {guests} khách · {nights} đêm ({inDate} → {outDate})",
      btnClearFilter: "Đặt lại ngày",

      amenitiesEyebrow: "Tiện Nghi & Minh Bạch",
      amenitiesTitle: "Trải Nghiệm Trọn Vẹn & Rõ Ràng",
      amenitiesSubtitle:
        "Chúng tôi trân trọng sự tin tưởng của du khách bằng việc cung cấp đầy đủ tiện nghi thiết yếu và thông báo minh bạch các đặc điểm công trình.",
      policyTitle: "Lưu ý & Chính sách lưu trú",

      galleryEyebrow: "Hình Ảnh Thực Tế Từ Google Maps",
      galleryTitle: "Thước Phim Không Gian Mai's Boutique",
      gallerySubtitle: "Nhấn vào từng bức ảnh để xem kích thước gốc độ phân giải cao.",
      filterAll: "Tất cả (10)",
      filterPool: "Hồ bơi & Sảnh",
      filterRooms: "Phòng nghỉ",
      filterArch: "Kiến trúc gỗ",

      reviewsEyebrow: "Cảm Nhận Từ Du Khách",
      reviewsTitle: "4.7 Sao Từ 221 Trải Nghiệm Thực Tế",
      reviewsQuote:
        "\"Một ốc đảo nhỏ bình yên giữa con hẻm. Nhân viên hiếu khách, tận tâm và căn phòng lúc nào cũng thơm dịu dễ chịu.\"",
      reviewsQuoteAuthor: "Haixiong Jiang — Local Guide · Lưu trú phòng 303",
      reviewsGoogleBtn: "Xem tất cả trên Google Maps",

      locationEyebrow: "Vị Trí & Liên Hệ Trực Tiếp",
      locationTitle: "Ghé Thăm Mai's Boutique Tại Đà Nẵng",
      locationSubtitle:
        "Chỉ cách bãi biển Mỹ Khê vài phút đi bộ, thuận tiện di chuyển ra cầu Rồng và sân bay quốc tế Đà Nẵng.",
      contactAddressLabel: "Địa chỉ",
      contactPhoneLabel: "Hotline / Zalo đặt phòng",
      contactHoursLabel: "Giờ nhận & trả phòng",
      contactHoursVal: "Nhận phòng: 14:00 · Trả phòng: 12:00",
      btnDirections: "Chỉ đường Google Maps",
      btnCopyPhone: "Sao chép SĐT",

      footerDesc:
        "Khách sạn boutique phong cách gỗ trang trọng & wellness tại 104 Tô Hiến Thành, An Hải, Đà Nẵng. Trân trọng từng khoảnh khắc nghỉ ngơi của bạn.",
      footerQuickLinks: "Điều hướng nhanh",
      footerBookingSupport: "Hỗ trợ đặt phòng",
      footerCopyright: "© 2026 Mai's Boutique Đà Nẵng. Dữ liệu thông tin & đánh giá trích xuất từ Google Maps.",

      modalRoomSpecs: "Thông số & Tiện nghi phòng",
      modalBookingTitle: "Xác nhận yêu cầu đặt phòng",
      modalFullName: "Họ và tên khách *",
      modalPhone: "Số điện thoại / WhatsApp *",
      modalEmail: "Email nhận xác nhận",
      modalNote: "Yêu cầu thêm (đón sân bay, hỗ trợ hành lý, giờ đến...)",
      modalSubmit: "Gửi Yêu Cầu Đặt Phòng",
      modalNightsLabel: "Số đêm lưu trú",
      modalRoomCountLabel: "Số lượng phòng",
      modalEstTotal: "Tổng tiền dự kiến",
      modalPayNote: "Thanh toán linh hoạt tại quầy lễ tân khi nhận phòng."
    },
    en: {
      navStory: "Concept",
      navRooms: "Rooms",
      navAmenities: "Amenities",
      navGallery: "Gallery",
      navReviews: "Reviews",
      navLocation: "Location",
      navBook: "Book Now",

      heroEyebrow: "104 To Hien Thanh · An Hai · Da Nang",
      heroTitle: "Enjoy Warm Timber, Boutique Serenity",
      heroSubtitle:
        "A tranquil wellness sanctuary tucked 10 minutes on foot from My Khe Beach — crafted around natural wood, a lush lightwell, and a courtyard pool.",
      heroTrustRating: "4.7 / 5 (221 Google Maps Reviews)",
      heroTrustWalk: "10-min walk to My Khe Beach",
      heroTrustQuiet: "Quiet Alley · 100% Smoke-Free",

      labelCheckIn: "Check In",
      labelCheckOut: "Check Out",
      labelGuests: "Guests",
      labelRooms: "Rooms",
      btnCheckAvail: "Check Availability",
      bookingMetaDates: "Check-in 2:00 PM · Check-out 12:00 PM",
      bookingMetaDirect: "Direct Booking — Best Rate · Luggage Assistance Available",

      storyEyebrow: "Brand Concept & Architecture",
      storyTitle: "A Timber & Lightwell Oasis in An Hai",
      storyP1:
        "Inspired by natural hardwood slats, warm local laterite stone, and handcrafted rattan weaving, Mai's Boutique centers around a breezy multi-story skylight atrium.",
      storyP2:
        "Set quietly off the main boulevard yet minutes from the shoreline, every morning begins beside the calm courtyard pool with sincere, personal hospitality.",
      storyStatNum: "87.3%",
      storyStatLabel: "Five-star ratings on Google Maps (193 out of 221 verified reviews)",
      pillar1Title: "Timber & Stone Craft",
      pillar1Text: "Warm oak slats paired with textured laterite walls and Indochine floor tiles.",
      pillar2Title: "Atrium & Living Wall",
      pillar2Text: "Open-air skylight and vertical greenery keep the courtyard naturally cool.",
      pillar3Title: "Personal Hospitality",
      pillar3Text: "Praised by guests for attentive check-in/out care (Ms. Thu, Ms. Nhi).",
      pillar4Title: "Peaceful Sanctuary",
      pillar4Text: "Tucked inside a safe, quiet alley ideal for restful sleep and remote work.",

      roomsEyebrow: "Discover Your Stay",
      roomsTitle: "Curated Timber Suites",
      roomsSubtitle:
        "Every suite features subtle signature scenting, crisp bedding, and serene light from our central courtyard or tree canopy.",
      perNight: "/ night",
      btnBookRoom: "View & Reserve",
      guestsUnit: "guests",
      roomsLeft: "{n} rooms left",
      filterActiveText: "Showing suites for {guests} guest(s) · {nights} night(s) ({inDate} → {outDate})",
      btnClearFilter: "Reset dates",

      amenitiesEyebrow: "Amenities & Transparency",
      amenitiesTitle: "Thoughtful Comfort, Honest Details",
      amenitiesSubtitle:
        "We value guest trust by highlighting both our signature wellness amenities and transparent building notes ahead of your arrival.",
      policyTitle: "House Notes & Policies",

      galleryEyebrow: "Authentic Photos From Google Maps",
      galleryTitle: "Inside Mai's Boutique",
      gallerySubtitle: "Click any photo to inspect full resolution.",
      filterAll: "All (10)",
      filterPool: "Pool & Lounge",
      filterRooms: "Suites",
      filterArch: "Wood Architecture",

      reviewsEyebrow: "Guest Voices",
      reviewsTitle: "Rated 4.7 Across 221 Reviews",
      reviewsQuote:
        "\"I was pleased and happy with their hospitality and assistance. The room smells great. A nice little oasis among the alleys.\"",
      reviewsQuoteAuthor: "Haixiong Jiang — Local Guide · Stayed in Room 303",
      reviewsGoogleBtn: "Read all on Google Maps",

      locationEyebrow: "Location & Direct Concierge",
      locationTitle: "Find Mai's Boutique in Da Nang",
      locationSubtitle:
        "A short walk to My Khe Beach, with quick access to Dragon Bridge and Da Nang International Airport.",
      contactAddressLabel: "Address",
      contactPhoneLabel: "Direct Phone / WhatsApp",
      contactHoursLabel: "Check-in & Check-out",
      contactHoursVal: "Check-in: 2:00 PM · Check-out: 12:00 PM",
      btnDirections: "Open in Google Maps",
      btnCopyPhone: "Copy Phone",

      footerDesc:
        "A warm timber wellness boutique hotel at 104 To Hien Thanh, An Hai, Da Nang. Crafted for tranquil coastal stays.",
      footerQuickLinks: "Quick Navigation",
      footerBookingSupport: "Reservation Desk",
      footerCopyright: "© 2026 Mai's Boutique Da Nang. Business details & reviews sourced from Google Maps.",

      modalRoomSpecs: "Suite Highlights & Specs",
      modalBookingTitle: "Complete Your Reservation Request",
      modalFullName: "Full Name *",
      modalPhone: "Phone / WhatsApp *",
      modalEmail: "Confirmation Email",
      modalNote: "Special requests (airport pickup, luggage assistance, arrival time...)",
      modalSubmit: "Confirm Reservation Request",
      modalNightsLabel: "Length of stay",
      modalRoomCountLabel: "Rooms selected",
      modalEstTotal: "Estimated Total",
      modalPayNote: "Pay flexibly at the reception desk upon check-in."
    }
  }
};
