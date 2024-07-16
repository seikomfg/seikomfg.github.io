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
        if ($(window).scrollTop() > 72) {
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
    slidesPerView: 2,
    loop: true,
    spaceBetween: 30,
    speed: 10000,
    observer: true,
    observeParents: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      450: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      868: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  var getOneItem = function (item) {
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
    } = item;
    return `<div class="item">
            <div class="listing-post">
                <div class="featured-property">
                    <div class="group-meta">
                        <div class="inner">
                            <span
                                class="count-list-gallery view-gallery"
                                data-mfp-event
                                data-gallery="${banner}"><img
                                    src="/wp-content/plugins/tf-car-listing/includes/elementor-widget/assets/images/icons/camera.svg"
                                    alt="icon-map">${banner.length}</span>
                        </div>
                        <span class="date-car"><i
                                class="icon-seikomfg-open-eye"></i>${view}</span>
                    </div>
                    <div class="listing-images">
                        <div class="hover-listing-image">
                            <div class="wrap-hover-listing">
                                <div class="listing-item">
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
                                <div class="listing-item view-gallery"
                                    data-mfp-event
                                    data-gallery="${banner}"
                                    title="BMW 3 Series Hybrid">
                                    <div class="images">
                                        <img decoding="async"
                                            src="${banner[3]}"
                                            class="swiper-image tfcl-light-gallery"
                                            alt="images">
                                        <div class="overlay-limit">
                                            <img decoding="async"
                                                src="/wp-content/plugins/tf-car-listing/includes/elementor-widget/assets/images/icons/picture.svg"
                                                class="icon-img"
                                                alt="icon-map">
                                            <p>1 more photos</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bullet-hover-listing">
                                    <div class="bl-item"></div>
                                    <div class="bl-item"></div>
                                    <div class="bl-item"></div>
                                    <div class="bl-item"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="content">
                    <h3 class="title">
                        <a class="title-a"
                            href="/carheadlights/detail/${title}">${title}</a>
                    </h3>
                    <div class="description">
                        <ul>
                            <li class="listing-information fuel">
                                <div class="inner">
                                    <span
                                        class="my-span">Packaging</span>
                                    <p>${packaging}</p>
                                </div>
                            </li>
                            <li
                                class="listing-information mileages">
                                <div class="inner">
                                    <span
                                        class="my-span">Power</span>
                                    <p>${power}</p>
                                </div>
                            </li>
                            <li
                                class="listing-information transmission">
                                <div class="inner">
                                    <span>minimum</span>
                                    <p>${minimum}</p>
                                </div>
                            </li>
                            <li
                                class="listing-information transmission">
                                <div class="inner">
                                    <span>Trade Mode</span>
                                    <p>${trade_mode}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="bottom-content">
                        <div class="button-details">
                            <a href="/carheadlights/detail/${title}">detail<i
                                    class="icon-seikomfg-readmore"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  };
  window.huancunList = [];
  var initCarheadlightsList = function (catagory, page) {
    var currentDoms = ''
    var pageSize = 6;
    var currentList = [];

    if (catagory) {// 点选分类时,重新获取总缓存列表数据
      var templatWrapper = $("template");
      window.huancunList = [];
      window.goodsdata.carheadlights.forEach(function (ii) {
        if (ii.catagory.includes(catagory)) {
          window.huancunList.push(ii);
        }
      })
    }
    console.log(catagory, page,window.huancunList)
    page = page || 1;
    currentList = window.huancunList.slice((page - 1) * pageSize,page * pageSize);
    var items = "";
    currentList.forEach(function (i) {
        items = items + getOneItem(i);
    });
    currentDoms = $(items);

    $("#carheadlights .listing").html(currentDoms);
  };
  var getOneTabStr = function (name) {
    var name1 = name.replace(" ", "-");
    return `<a class="filter-listing ${
      name == "All" ? "active" : ""
    }" data-slug="${name1}" data-tooltip="${name1}">${name}</a>`;
  };
  var initCarheadlightsTabs = function () {
    var tabs = "";
    window.goodsdata.catagory.forEach(function (i) {
      tabs = tabs + getOneTabStr(i);
    });
    var tabsDom = $(tabs);
    // 更新商品列表
    initCarheadlightsList('All', 1);

    $("#carheadlights .my-filter-bar")
      .append(tabsDom)
      .find(".filter-listing")
      .on("click", function (e) {
        // 更新tabbar当前激活的tab
        $(this)
          .attr("class", "filter-listing active")
          .siblings()
          .attr("class", "filter-listing");
        // 更新商品列表
        initCarheadlightsList($(this).attr("data-slug"), 1);
      });
  };

  // 初始化商品数据
  if (!window.goodsdata) {
    console.log($);
    $.ajax({
      url: "./database/data.json",
      success: function (result) {
        window.goodsdata = result;
        window.goodsdata &&
          window.goodsdata.carheadlights &&
          window.goodsdata.carheadlights.length &&
          initCarheadlightsTabs();
      },
    });
  }

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
