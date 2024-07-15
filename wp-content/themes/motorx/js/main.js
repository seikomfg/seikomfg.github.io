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
        history.scrollRestoration = 'manual';
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
            $(".dashboard-overlay, .btn-menu").on(
                "click",
                function () {
                    close();
                }
            );

        }

        if (formListing.length) {
            const open1 = function () {
                formListing.closest('.widget_order_form_listing_widget').find('.form-sc-1').addClass('active');
            };
            const open2 = function () {
                formListing.closest('.widget_order_form_listing_widget').find('.form-sc-2').addClass('active');
            };
            const close = function () {
                formListing.closest('.widget_order_form_listing_widget').find('.form-sc-1').removeClass('active');
                formListing.closest('.widget_order_form_listing_widget').find('.form-sc-2').removeClass('active');
            };
            $(".button-form-1").on("click", function () {
                open1();
                formListing.closest('.tfcl_single_sidebar').toggleClass('index');
            });
            $(".button-form-2").on("click", function () {
                open2();
                formListing.closest('.tfcl_single_sidebar').toggleClass('index');
            });
            $(".button-close, .overlay-form").on(
                "click",
                function () {
                    close();
                    formListing.closest('.tfcl_single_sidebar').toggleClass('index');
                }
            );
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
            $(".modal-menu__backdrop, .modal-menu__close").on(
                "click",
                function () {
                    close();
                }
            );
            $(".action-btn").on(
                "click",
                function () {
                    actionBox.remove();
                }
            );
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
                $(".modal-menu__body #mainnav-secondary .menu li:has(ul)").find(
                    ">span"
                ).length == 0
            ) {
                $(
                    ".modal-menu__body #mainnav-secondary .menu li:has(ul)"
                ).append('<span class="icon-seikomfg-ona-38"></span>');
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
            $(this)
                .closest("#header")
                .find(".canvas-nav-wrap")
                .addClass("active");
        });

        $(".canvas-nav-wrap .overlay-canvas-nav").on("click", function (e) {
            $(this)
                .closest("#header")
                .find(".canvas-nav-wrap")
                .removeClass("active");
        });

        $(document).on(
            "click",
            "#mainnav_canvas li .btn-submenu",
            function (e) {
                $(this).toggleClass("active").next("ul").slideToggle(300);
                e.stopImmediatePropagation();
            }
        );
    };

    var headerFixed = function () {
        if ($("body:not(.page-template-page-dashboard)").hasClass("header_sticky")) {
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
                    if ( $(window).scrollTop() > 72 ) {
                        header.addClass('header-sticky');
                        $(".header-sticky").css("top", wpadminbar);
                    } else {
                        $(".header-sticky").removeAttr("style");
                        header.removeClass('header-sticky');
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

            if (!$(".top-search").hasClass("show"))
                $(".top-search").addClass("show");
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
            for(var i = 1; i < 5; i++) {
                var item = $("#footer .wrap-widgets-"+i);
                item.find(".widget-title").insertBefore(item);
            }
            $("#footer .footer-widgets .widgets-areas > .widget-title").on("click", function () {
                $(this).toggleClass("active");
                $(this).closest(".widgets-areas").find(".wrap-widgets").toggleClass("active");
            });
            $("#footer .widgets-areas").find(".widget-title").closest('.widgets-areas').addClass('has-tab');
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
        $(window).ready(function() {
            var href = window.location.href;
            $('.db-dashboard-menu a, .widget_login_menu_widget .user-dropdown-menu a').each(function(e,i) {
              if (href.indexOf($(this).attr('href')) >= 0) {
                $(this).addClass('active');
              }
            });
        });
    }


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
