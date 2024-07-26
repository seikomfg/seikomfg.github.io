/**
 * Modal_Right
 * menu_Modal_Left
 * headerFixed
 * themesflatSearch
 * goTop
 * parallax_effect
 * tabFooter
 * niceSelectForm
 * removePreloader
 */

(function ($) {
  "use strict";
  // 不保留页面滚动位置
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  var Modal_Right = function () {
    const body = $("body");
    const modalMenu = $(".modal-menu-left");
    const dashboard = $(".sidebar-dashboard");
    const actionBox = $(".action-popup");
    const formListing = $(".widget_order_form_listing_widget");
    const modalMenuBody = modalMenu.children(".modal-menu__body");
    var adminbar = $("#wpadminbar").height();
    $(".sidebar-dashboard").css({ top: adminbar });

    if (dashboard.length) {
      const open = function () {
        dashboard.addClass("active");
        $(".dashboard-overlay").addClass("active");
      };
      const close = function () {
        dashboard.removeClass("active");
        $(".dashboard-overlay").removeClass("active");
      };

      $(".dashboard-toggle").on("click", function () {
        open();
      });
      $(".dashboard-overlay, .btn-menu").on("click", function () {
        close();
      });
    }

    if (formListing.length) {
      const open1 = function () {
        formListing
          .closest(".widget_order_form_listing_widget")
          .find(".form-sc-1")
          .addClass("active");
      };
      const open2 = function () {
        formListing
          .closest(".widget_order_form_listing_widget")
          .find(".form-sc-2")
          .addClass("active");
      };
      const close = function () {
        formListing
          .closest(".widget_order_form_listing_widget")
          .find(".form-sc-1")
          .removeClass("active");
        formListing
          .closest(".widget_order_form_listing_widget")
          .find(".form-sc-2")
          .removeClass("active");
      };
      $(".button-form-1").on("click", function () {
        open1();
        formListing.closest(".tfcl_single_sidebar").toggleClass("index");
      });
      $(".button-form-2").on("click", function () {
        open2();
        formListing.closest(".tfcl_single_sidebar").toggleClass("index");
      });
      $(".button-close, .overlay-form").on("click", function () {
        close();
        formListing.closest(".tfcl_single_sidebar").toggleClass("index");
      });
    }

    if (modalMenu.length) {
      const open = function () {
        modalMenu.addClass("modal-menu--open");
      };
      const close = function () {
        modalMenu.removeClass("modal-menu--open");
      };

      $(".modal-menu-left-btn").on("click", function () {
        open();
      });
      $(".modal-menu__backdrop, .modal-menu__close").on("click", function () {
        close();
      });
      $(".action-btn").on("click", function () {
        actionBox.remove();
      });
    }

    modalMenu.on("click", function (event) {
      const trigger = $(this);
      const item = trigger.closest("[data-modal-menu-item]");
      let panel = item.data("panel");

      if (!panel) {
        panel = item
          .children("[data-modal-menu-panel]")
          .children(".modal-menu__panel");

        if (panel.length) {
          modalMenuBody.append(panel);
          item.data("panel", panel);
          panel.width(); // force reflow
        }
      }

      if (panel && panel.length) {
        event.preventDefault();
      }
    });
    $(".modal-menu__body #mainnav-secondary .menu li").each(function (n) {
      if (
        $(".modal-menu__body #mainnav-secondary .menu li:has(ul)").find(">span")
          .length == 0
      ) {
        $(".modal-menu__body #mainnav-secondary .menu li:has(ul)").append(
          '<span class="icon-seikomfg-ona-38"></span>'
        );
      }
      $(this).find(".sub-menu").css({ display: "none" });
    });
    $(".modal-menu__body  #mainnav-secondary .menu li:has(ul) > span").on(
      "click",
      function (e) {
        e.preventDefault();
        $(this).closest("li").children(".sub-menu").slideToggle();
        $(this).closest("li").toggleClass("opened");
      }
    );
  };

  var menu_Modal_Left = function () {
    var menuType = "desktop";

    $(window).on("load resize", function () {
      var currMenuType = "desktop";
      var adminbar = $("#wpadminbar").height();

      if (matchMedia("only screen and (max-width: 991px)").matches) {
        currMenuType = "mobile";
      }

      if (currMenuType !== menuType) {
        menuType = currMenuType;

        if (currMenuType === "mobile") {
          var $mobileMenu = $("#mainnav").hide();
          var hasChildMenu = $("#mainnav_canvas").find("li:has(ul)");
          hasChildMenu.children("ul").hide();
          if (hasChildMenu.find(">span").length == 0) {
            hasChildMenu
              .children("a")
              .after('<span class="btn-submenu"></span>');
          }
          $(".btn-menu").removeClass("active");

          $(".canvas-nav-wrap .canvas-menu-close").css({
            top: adminbar + 30,
          });
        } else {
          var $mobileMenu = $("#mainnav").show();
          $(".canvas-nav-wrap .canvas-menu-close").css({
            top: adminbar + 30,
          });
          $("#header").find(".canvas-nav-wrap").removeClass("active");
        }
      }
    });

    $(".btn-menu").on("click", function (e) {
      $(this).closest("#header").find(".canvas-nav-wrap").addClass("active");
    });

    $(".canvas-nav-wrap .overlay-canvas-nav").on("click", function (e) {
      $(this).closest("#header").find(".canvas-nav-wrap").removeClass("active");
    });

    $(document).on("click", "#mainnav_canvas li .btn-submenu", function (e) {
      $(this).toggleClass("active").next("ul").slideToggle(300);
      e.stopImmediatePropagation();
    });
  };

  var headerFixed = function () {
    if (
      $("body:not(.page-template-page-dashboard)").hasClass("header_sticky")
    ) {
      var header = $("#header"),
        hd_height = $("#header").height(),
        injectSpace = $("<div />", { height: hd_height }).insertAfter(
          $("#header")
        );
      injectSpace.hide();
      $(window).on("load scroll resize", function () {
        var top_height = $(".themesflat-top").height(),
          wpadminbar = $("#wpadminbar").height();
        if (top_height == undefined) {
          top_height = 0;
        }
        if ($(window).scrollTop() >= top_height + hd_height) {
          header.addClass("fixed-show");
          injectSpace.show();
        } else {
          header.removeClass("fixed-show");
          injectSpace.hide();
        }
        if ($(window).scrollTop() > 500) {
          header.addClass("header-sticky");
          $(".header-sticky").css("top", wpadminbar);
        } else {
          $(".header-sticky").removeAttr("style");
          header.removeClass("header-sticky");
        }
      });
    }
  };

  var themesflatSearch = function () {
    $(document).on("click", function (e) {
      var clickID = e.target.id;
      if (clickID != "s") {
        $(".top-search").removeClass("show");
        $(".show-search").removeClass("active");
      }
    });

    $(".show-search").on("click", function (event) {
      event.stopPropagation();
    });

    $(".search-form").on("click", function (event) {
      event.stopPropagation();
    });

    $(".show-search").on("click", function (e) {
      if (!$(this).hasClass("active")) $(this).addClass("active");
      else $(this).removeClass("active");
      e.preventDefault();

      if (!$(".top-search").hasClass("show")) $(".top-search").addClass("show");
      else $(".top-search").removeClass("show");
    });
  };

  var parallax_effect = function () {
    if ($(".parallax").length > 0) {
      if ($().parallax && isMobile.any() == null) {
        $(".parallax").parallax("50%", -0.5);
      }
    }
  };

  var tabFooter = function () {
    if ($(".menu-tab-footer").length > 0) {
      for (var i = 1; i < 5; i++) {
        var item = $("#footer .wrap-widgets-" + i);
        item.find(".widget-title").insertBefore(item);
      }
      $("#footer .footer-widgets .widgets-areas > .widget-title").on(
        "click",
        function () {
          $(this).toggleClass("active");
          $(this)
            .closest(".widgets-areas")
            .find(".wrap-widgets")
            .toggleClass("active");
        }
      );
      $("#footer .widgets-areas")
        .find(".widget-title")
        .closest(".widgets-areas")
        .addClass("has-tab");
    }
  };

  var goTop = function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 72) {
        $(".go-top").addClass("show");
      } else {
        $(".go-top").removeClass("show");
      }
    });

    $(".go-top").on("click", function (event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 0);
    });
  };

  var setActiveMenuDashboard = function () {
    $(window).ready(function () {
      var href = window.location.href;
      $(
        ".db-dashboard-menu a, .widget_login_menu_widget .user-dropdown-menu a"
      ).each(function (e, i) {
        if (href.indexOf($(this).attr("href")) >= 0) {
          $(this).addClass("active");
        }
      });
    });
  };

  var removePreloader = function () {
    $("#preloader").fadeOut("slow", function () {
      setTimeout(function () {
        $("#preloader").remove();
      }, 300);
    });
  };

  var swiper = new Swiper(".carousel-5", {
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    loop: true,
    spaceBetween: 30,
    speed: 15000,
    observer: true,
    observeParents: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      450: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      868: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  window.jumpDetail = function(e,id){
    e.stopPropagation();
    e.preventDefault();
    if(!id) return false
    window.location.href = `/carheadlights/${id}`;
    return false
  }
  function getOneItem(item) {
    
    var {
      id,
      title,
      catagory,
      power,
      packaging,
      minimum,
      trade_mode,
      banner,
      view,
      video
    } = item;
    return `<div class="item">
            <div class="listing-post">
                <div class="featured-property">
                    <div class="group-meta">
                        <div class="inner">
                            
                            ${video?'<span class="my-count-list-gallery count-list-gallery view-gallery"><img src="/wp-content/plugins/tf-car-listing/includes/elementor-widget/assets/images/icons/video.svg" alt="icon-map">1 </span>':''}
                            <span class="my-count-list-gallery count-list-gallery view-gallery">
                              <img src="/wp-content/plugins/tf-car-listing/includes/elementor-widget/assets/images/icons/camera.svg" alt="icon-map">${banner.length} 
                            </span>    
                        </div>
                        <div class="button-details my-button-details" data-id="${id}">
                          <a>detail<i class="icon-seikomfg-readmore"></i></a>
                        </div>
                    </div>
                    <div class="listing-images">
                        <div class="hover-listing-image">
                            <div class="wrap-hover-listing">
                                <div class="listing-item active">
                                    <div class="images">
                                        <img decoding="async"
                                            src="${banner[0]}"
                                            class="swiper-image lazy tfcl-light-gallery"
                                            alt="images">
                                    </div>
                                </div>
                                <div class="listing-item">
                                    <div class="images">
                                        <img decoding="async"
                                            src="${banner[1]}"
                                            class="swiper-image lazy tfcl-light-gallery"
                                            alt="images">
                                    </div>
                                </div>
                                <div class="listing-item">
                                    <div class="images">
                                        <img decoding="async"
                                            src="${banner[2]}"
                                            class="swiper-image lazy tfcl-light-gallery"
                                            alt="images">
                                    </div>
                                </div>
                                <div class="listing-item">
                                    <div class="images">
                                        <img decoding="async"
                                            src="${banner[3]}"
                                            class="swiper-image lazy tfcl-light-gallery"
                                            alt="images">
                                    </div>
                                </div>
                                <div class="bullet-hover-listing">
                                    <div class="bl-item active"></div>
                                    <div class="bl-item"></div>
                                    <div class="bl-item"></div>
                                    <div class="bl-item"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="content link-content" data-id="${id}">
                    <h3 class="title my-title">
                        <a class="title-a">${title}</a>

                            
                    </h3>
                    <div class="description">
                        <ul>
                            <li class="listing-information fuel">
                                <div class="inner">
                                    <span
                                        class="my-span">packaging&power</span>
                                    <p class="my-p">${'customization'}</p>
                                </div>
                            </li>
                            
                            <li
                                class="listing-information mileages">
                                <div class="inner">
                                    <span
                                        class="my-span">After-sales Service</span>
                                    <p class="my-p">${'12 months'}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>`;
  };
  window.huancunList = [];
  window.pageSize = 3;
  function calculatePages() {
    // 计算总页数
    const totalPages = Math.ceil(window.huancunList.length / pageSize);
    return totalPages;
  }
  var getOnePagination = function (n, pageNum) {
    return `<span aria-current="page" class="page-numbers ${
      n == pageNum ? "current" : ""
    }">${n}</span>`;
  };
  function getElementTop(elem) {
    var elemTop = elem.offsetTop; //获得elem元素距相对定位的父元素的top

    elem = elem.offsetParent; //将elem换成起相对定位的父元素

    while (elem != null) {
      //只要还有相对定位的父元素

      //获得父元素 距他父元素的top值,累加到结果中

      elemTop += elem.offsetTop; //再次将elem换成他相对定位的父元素上;

      elem = elem.offsetParent;
    }

    return elemTop;
  }
  function initpagination(pageNum) {
    pageNum = pageNum || 1;
    var totalPages = calculatePages();
    var pagination = "";

    for (var i = 0; i < totalPages; i++) {
      pagination = pagination + getOnePagination(i + 1, pageNum);
    }
    $(".my-paging-navigation")
      .html($(pagination))
      .find(".page-numbers")
      .on("click", function (e) {
        var wrapperDom1 = $("#carheadlights .my-filter-bar")
        var wrapperDom2 = $(".my-condition-tab-wrap")
        e.preventDefault();
        // 更新页码当前激活的状态
        $(this)
          .addClass("class", "current")
          .siblings()
          .remove("class", "current");
        //传入当前激活页码值
        initCarheadlightsList(null, $(this).text());

        if(wrapperDom1 && wrapperDom1.length){
          // 获取商品列表上边界所在高度，滚动到原来高度
          var myElement = document.querySelector("#carheadlights .my-filter-bar");

          var scrollHeight = getElementTop(myElement);
          $("html, body").animate({ scrollTop: scrollHeight - 80 }, 0);
        }else if(wrapperDom2 && wrapperDom2.length){
          // 获取商品列表上边界所在高度，滚动到原来高度
          var myElement = document.querySelector(".my-condition-tab-wrap");

          var scrollHeight = getElementTop(myElement);
          $("html, body").animate({ scrollTop: scrollHeight - 45 }, 0);
        }
      });
  };

  window.initCarheadlightsList = function(catagory, pageNum) {
    var currentDoms = "";
    var currentList = [];

    if (catagory) {
      // 点选分类时,重新获取总缓存列表数据
      window.huancunList = [];
      window.goodsdata.carheadlights.forEach(function (ii) {
        if (ii.catagory.includes(catagory)) {
          window.huancunList.push(ii);
        }
      });
    }
    // console.log(catagory, pageNum, window.huancunList);
    pageNum = pageNum || 1;
    currentList = window.huancunList.slice(
      (pageNum - 1) * pageSize,
      pageNum * pageSize
    );
    var items = "";
    currentList.forEach(function (i) {
      items = items + getOneItem(i);
    });
    currentDoms = $(items);

    $("#carheadlights .listing").html(currentDoms);

    $(".hover-listing-image").each(function () {
      $(this).find(".listing-item:first-child").addClass("active");
      $(this)
        .find(".bullet-hover-listing .bl-item:first-child")
        .addClass("active");

      $(this)
        .find(".listing-item")
        .hover(
          function () {
            var index = $(this).index();
            $(this)
              .closest(".hover-listing-image")
              .find(".listing-item")
              .removeClass("active");
            $(this).addClass("active");

            $(this)
              .closest(".hover-listing-image")
              .find(".bl-item")
              .removeClass("active");
            $(this)
              .closest(".hover-listing-image")
              .find(".bl-item")
              .eq(index)
              .addClass("active");
          },
          function () {
            $(this).removeClass("active");
            $(this)
              .closest(".hover-listing-image")
              .find(".bl-item")
              .removeClass("active");
            $(this)
              .closest(".hover-listing-image")
              .find(".listing-item:first-child")
              .addClass("active");
            $(this)
              .closest(".hover-listing-image")
              .find(".bullet-hover-listing .bl-item:first-child")
              .addClass("active");
          }
        );
    });

    // 给热区绑定点击跳转逻辑
    $('.link-content').on("click", function (e) {
      window.jumpDetail(e,$(this).attr('data-id'))
    })
    $('.my-button-details').on("click", function (e) {
      window.jumpDetail(e,$(this).attr('data-id'))
    })
    initpagination(pageNum);
  };
  window.getOneTabStr = function(name) {
    var name1 = name.replace(" ", "-");
    return `<a class="filter-listing ${
      name == "All" ? "active" : ""
    }" data-slug="${name1}" data-tooltip="${name1}">${name}</a>`;
  };
  window.getOneTabStr2 = function(name) {
    var name1 = name.replace(" ", "-");
    return `<a data-value="all" class="btn-condition-filter ${
      name == (sessionStorage.getItem('currentCatagory') || (!sessionStorage.getItem('currentCatagory') && "All")) ? "active" : ""
    }">${name}</a>`;
  };
  window.initCarheadlightsTabs = function () {
    var wrapperDom1 = $("#carheadlights .my-filter-bar")
    var wrapperDom2 = $(".my-condition-tab-wrap")
    if(wrapperDom1 && wrapperDom1.length){
      var tabs = "";
      window.goodsdata.catagory.forEach(function (i) {
        tabs = tabs + getOneTabStr(i);
      });
      var tabsDom = $(tabs);
      // 更新商品列表
      initCarheadlightsList("All", 1);

      wrapperDom1 .append(tabsDom)
      .find(".filter-listing")
      .on("click", function (e) {
        e.preventDefault();
        // 更新tabbar当前激活的tab
        $(this)
          .attr("class", "filter-listing active")
          .siblings()
          .attr("class", "filter-listing");
        // 更新商品列表
        initCarheadlightsList($(this).text(), 1);

        // 获取商品列表上边界所在高度，滚动到原来高度
        var myElement = document.querySelector(".my-filter-bar");

        var scrollHeight = getElementTop(myElement);
        $("html, body").animate({ scrollTop: scrollHeight - 80 }, 0);
      });
    }else if(wrapperDom2 && wrapperDom2.length){
      
      var tabs = "";
      window.goodsdata.catagory.forEach(function (i) {
        tabs = tabs + getOneTabStr2(i);
      });
      var tabsDom = $(tabs);
      // 更新商品列表
      initCarheadlightsList(sessionStorage.getItem('currentCatagory') || "All", 1);
      if(sessionStorage.getItem('currentCatagory')){
        // 获取商品列表上边界所在高度，滚动到原来高度
        var myElement = document.querySelector(".my-condition-tab-wrap");
  
        var scrollHeight = getElementTop(myElement);
        $("html, body").animate({ scrollTop: scrollHeight - 45 }, 0);
        setTimeout(() => {
          sessionStorage.setItem('currentCatagory','')
        }, 1000);
      }

      wrapperDom2.append(tabsDom)
      .find(".btn-condition-filter")
      .on("click", function (e) {
        e.preventDefault();
        // 更新tabbar当前激活的tab
        $(this)
          .attr("class", "btn-condition-filter active")
          .siblings()
          .attr("class", "btn-condition-filter");
        // 更新商品列表
        initCarheadlightsList($(this).text(), 1);

        // 获取商品列表上边界所在高度，滚动到原来高度
        var myElement = document.querySelector(".my-condition-tab-wrap");

        var scrollHeight = getElementTop(myElement);
        $("html, body").animate({ scrollTop: scrollHeight - 45 }, 0);
      });
    
    }
  };
  // 初始化商品数据
  window.goodsdata = {
    catagory: [
      "All",
      "Hot",
      "New",
      "Max Repurchase",
      "Led Headlight Bulb",
      "Halogen Headlamp Bulb",
    ],
    carheadlights: [
      {
        id: "H3",
        index:1,
        title: "H3",
        catagory: ["All", "New", "Halogen Headlamp Bulb"],
        video:'https://youtu.be/vBtYtWlO8Kg?si=J4WBT2Lk0eRUbQG5',
        power: "custom",
        packaging: "custom",
        minimum: 200,
        trade_mode: "FOB",
        banner: [
          "/wp-content/uploads/2024/01/carr-32-1.webp",
          "/wp-content/uploads/2024/01/crr-13-1.webp",
          "/wp-content/uploads/2024/01/carr-31-3.webp",
          "/wp-content/uploads/2024/01/carr-57-1.webp",
          "/wp-content/uploads/2024/01/carr-34-1.webp",
        ],
        view: 1734,
      },
      {
        id: "LED.H4.Headlight.Bulb",
        index:2,
        title: "LED H4 Headlight Bulb",
        catagory: ["All", "Hot", "Led Headlight Bulb"],
        video:'https://youtu.be/vBtYtWlO8Kg?si=J4WBT2Lk0eRUbQG5',
        banner: [
          "/wp-content/uploads/carheadlights/LED.H4.Headlight.Bulb/LED.H4.Headlight.Bulb-1.jpg",
          "/wp-content/uploads/carheadlights/LED.H4.Headlight.Bulb/LED.H4.Headlight.Bulb-1.jpg",
          "/wp-content/uploads/carheadlights/LED.H4.Headlight.Bulb/LED.H4.Headlight.Bulb-1.jpg",
          "/wp-content/uploads/carheadlights/LED.H4.Headlight.Bulb/LED.H4.Headlight.Bulb-1.jpg",
          "/wp-content/uploads/carheadlights/LED.H4.Headlight.Bulb/LED.H4.Headlight.Bulb-1.jpg",
          "/wp-content/uploads/carheadlights/LED.H4.Headlight.Bulb/LED.H4.Headlight.Bulb-1.jpg",
          "/wp-content/uploads/carheadlights/LED.H4.Headlight.Bulb/LED.H4.Headlight.Bulb-1.jpg"
        ],
        desc:{
          en:[
            `Canbus LED error free in Luxury vehicles`,
            `450W high power LED headlight with lower battery consumption`,
            `Waterproof LED headlight`,
            `6500K color Temperature &amp; high quality product material`
          ]
        },
        specifications:{
          en:[
            {'Brand':`QiangRui`},
            // {'Raw Material':`Quartz/Tungsten/Al 6063`},
            {'Power':`55W/Customization`},
            {'Packaging':`Customization`},
            {'Printing':'Lsaser/Ink/Customization'},
            {'Voltage':`12V/24V/Customization`},
            {'Light Source Model':`SMD Chips`},
            {'Color temperature':`6000/Customization`},
            {'Operation Life':'>30000hrs'},
            {'Trade Mode':'FOB'},
            {'After-Sales Service':'12 months'}
          ]
        },
        features:{
          en:[
            `300% BRIGHTER THAN HALOGEN – 3 Color Changing LED headlight bulbs contains Top-Grade 30 Dots LED COB Diodes per side. Focused Beam Pattern Design that Produces 6500 Lumens. Prevents Blinding Oncoming Traffic and Glare Free Driving.`,
            `CAN BUS-READY FOR 98% OF VEHICLES – CAN Bus canceler increases the current to a safe level to ensure that your vehicle doesn’t bring up any error messages and work as expected. Some cars may require an additional CANBUS decoder to be installed.`,
            `QUALITY AND DURABILITY – Toby’s LED car headlights are made with aluminum alloy and polycarbonate. Performs well on extreme temperatures ranging from -40°C to +80°C. IP65 waterproof and 12,000 RPM fan to expand lifespan up to 30,000 hrs.`,
          ]
        },
        view: 1734,
      },
      {
        id: "Halogen-H4-Headlamp-Bulb",
        index:3,
        title: "Halogen H4 Headlamp Bulb",
        catagory: ["All", "Hot", "Halogen Headlamp Bulb"],
        video:'https://youtu.be/vBtYtWlO8Kg?si=J4WBT2Lk0eRUbQG5',
        power: "custom",
        packaging: "custom",
        minimum: 200,
        trade_mode: "FOB",
        banner: [
          "/wp-content/uploads/2024/01/carr-32-1.webp",
          "/wp-content/uploads/2024/01/crr-13-1.webp",
          "/wp-content/uploads/2024/01/carr-31-3.webp",
          "/wp-content/uploads/2024/01/carr-57-1.webp",
          "/wp-content/uploads/2024/01/carr-34-1.webp",
        ],
        view: 1734,
      },
      {
        id: "H7",
        index:4,
        title: "H7",
        catagory: ["All", "Max Repurchase", "Halogen Headlamp Bulb"],
        video:'https://youtu.be/vBtYtWlO8Kg?si=J4WBT2Lk0eRUbQG5',
        power: "custom",
        packaging: "custom",
        minimum: 200,
        trade_mode: "FOB",
        banner: [
          "/wp-content/uploads/2024/01/carr-32-1.webp",
          "/wp-content/uploads/2024/01/crr-13-1.webp",
          "/wp-content/uploads/2024/01/carr-31-3.webp",
          "/wp-content/uploads/2024/01/carr-57-1.webp",
          "/wp-content/uploads/2024/01/carr-34-1.webp",
        ],
        view: 1734,
      },
      {
        id: "D1",
        index:5,
        title: "D1",
        catagory: ["All", "Max Repurchase", "Led Headlight Bulb"],
        video:'https://youtu.be/vBtYtWlO8Kg?si=J4WBT2Lk0eRUbQG5',
        power: "custom",
        packaging: "custom",
        minimum: 200,
        trade_mode: "FOB",
        banner: [
          "/wp-content/uploads/2024/01/carr-32-1.webp",
          "/wp-content/uploads/2024/01/crr-13-1.webp",
          "/wp-content/uploads/2024/01/carr-31-3.webp",
          "/wp-content/uploads/2024/01/carr-57-1.webp",
          "/wp-content/uploads/2024/01/carr-34-1.webp",
        ],
        view: 1734,
      },
      {
        id: "D2",
        index:6,
        title: "D2",
        catagory: ["All", "Hot", "Led Headlight Bulb"],
        video:'https://youtu.be/vBtYtWlO8Kg?si=J4WBT2Lk0eRUbQG5',
        power: "custom",
        packaging: "custom",
        minimum: 200,
        trade_mode: "FOB",
        banner: [
          "/wp-content/uploads/2024/01/carr-32-1.webp",
          "/wp-content/uploads/2024/01/crr-13-1.webp",
          "/wp-content/uploads/2024/01/carr-31-3.webp",
          "/wp-content/uploads/2024/01/carr-57-1.webp",
          "/wp-content/uploads/2024/01/carr-34-1.webp",
        ],
        view: 1734,
      },
      {
        id: "D4",
        index:7,
        title: "D4",
        catagory: ["All", "New", "Led Headlight Bulb"],
        power: "custom",
        packaging: "custom",
        minimum: 200,
        trade_mode: "FOB",
        banner: [
          "/wp-content/uploads/2024/01/carr-32-1.webp",
          "/wp-content/uploads/2024/01/crr-13-1.webp",
          "/wp-content/uploads/2024/01/carr-31-3.webp",
          "/wp-content/uploads/2024/01/carr-57-1.webp",
          "/wp-content/uploads/2024/01/carr-34-1.webp",
        ],
        view: 1734,
      },
      {
        id: "9005",
        index:8,
        title: "9005",
        catagory: ["All", "Hot", "Halogen Headlamp Bulb"],
        power: "custom",
        packaging: "custom",
        minimum: 200,
        trade_mode: "FOB",
        banner: [
          "/wp-content/uploads/2024/01/carr-32-1.webp",
          "/wp-content/uploads/2024/01/crr-13-1.webp",
          "/wp-content/uploads/2024/01/carr-31-3.webp",
          "/wp-content/uploads/2024/01/carr-57-1.webp",
          "/wp-content/uploads/2024/01/carr-34-1.webp",
        ],
        view: 1934,
      },{
        id: "9008",
        index:9,
        title: "9007",
        catagory: ["All", "Hot", "Halogen Headlamp Bulb"],
        power: "custom",
        packaging: "custom",
        minimum: 200,
        trade_mode: "FOB",
        banner: [
          "/wp-content/uploads/2024/01/carr-32-1.webp",
          "/wp-content/uploads/2024/01/crr-13-1.webp",
          "/wp-content/uploads/2024/01/carr-31-3.webp",
          "/wp-content/uploads/2024/01/carr-57-1.webp",
          "/wp-content/uploads/2024/01/carr-34-1.webp",
        ],
        view: 1934,
      },{
        id: "9008",
        index:10,
        title: "9008",
        catagory: ["All", "Hot", "Halogen Headlamp Bulb"],
        power: "custom",
        packaging: "custom",
        minimum: 200,
        trade_mode: "FOB",
        banner: [
          "/wp-content/uploads/2024/01/carr-32-1.webp",
          "/wp-content/uploads/2024/01/crr-13-1.webp",
          "/wp-content/uploads/2024/01/carr-31-3.webp",
          "/wp-content/uploads/2024/01/carr-57-1.webp",
          "/wp-content/uploads/2024/01/carr-34-1.webp",
        ],
        view: 1934,
      },
    ],
  };
  window.getCurrentDetailObj = function(){
    var goodsId = window.location.pathname.split('/').filter(function(dir) { return dir !== ''; }).slice(-1)[0];
    if(goodsId){
      return window.goodsdata.carheadlights.filter((e)=>goodsId == e.id)[0]
    }else{
      return null
    }
  };
  window.getRelatedGoods = function(){
    if(!window.currentGoods || !window.currentGoods.id) return false
    var goodsId = window.currentGoods.id
    var tempArr = JSON.parse(JSON.stringify(window.goodsdata.carheadlights))
    var resArr = []
    if(goodsId){
      resArr = tempArr.filter((e,i)=>e.index > window.currentGoods.index)
    }
    resArr = [...resArr,...window.goodsdata.carheadlights].slice(0,8)
    return resArr
  };
  window.currentGoods = getCurrentDetailObj()
  window.relatedGoods = getRelatedGoods()
  
  $(".footerlink").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    var self = this;

    var wrapperDom1 = $("#carheadlights .my-filter-bar")
    var wrapperDom2 = $(".my-condition-tab-wrap")
    if(wrapperDom1 && wrapperDom1.length){
      var targetTab = wrapperDom1.find(".filter-listing")
      .filter(function () {
        return $(this).text() == $(self).text();
      });
      targetTab.click();
    }else if(wrapperDom2 && wrapperDom2.length){
      var targetTab = wrapperDom2.find(".btn-condition-filter")
      .filter(function () {
        return $(this).text() == $(self).text();
      });
      targetTab.click();
    }
  });


  $(".footerJump").click(function (e) {
      e.stopPropagation();
      e.preventDefault();
      window.location.href='/carheadlights'
    });


  // initCarheadlightsTabs();

  // Dom Ready
  $(function () {
    Modal_Right();
    menu_Modal_Left();
    headerFixed();
    themesflatSearch();
    goTop();
    parallax_effect();
    tabFooter();
    setActiveMenuDashboard();
    removePreloader();
  });
})(jQuery);
