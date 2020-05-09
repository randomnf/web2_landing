;(function($) {
    "use strict";

    $(document).ready(function() {
        $('.scrolldown-btn').on("click", function (event) {
            event.preventDefault();

            var targetID = $(this).attr("href");
            var scrollTo = $(targetID).position().top;

            $('html').animate({
                scrollTop: scrollTo - 60
            }, 1000);
        });

        var devStagesSwiper = new Swiper('.dev-stages-swiper', {
            autoHeight: true,
            slidesPerView: 1,
            pagination: {
                el: '.dev-stages-pagination',
            },
            navigation: {
                nextEl: '.dev-stages-next',
                prevEl: '.dev-stages-prev',
            },
            resistanceRatio: 0,
        });

        var $devStages = $(".dev-stages ");

        $devStages.on("click",".dev-stages-btn", devStageChangeHandler);

        devStagesSwiper.on("slideChange", devStageChangeHandler);

        var $carouselWrapper = $(".dev-img-carousel");
        var isCarouselOnPage = $carouselWrapper.length;
        var $devImgCarousel = null;

        if (isCarouselOnPage) {
            $carouselWrapper.Cloud9Carousel({
                bringToFront: true,
                yOrigin: 0,
                yRadius: 0,
                farScale: .4,
                itemClass: "dev-img-carousel__item",
                onLoaded: function() {
                    $devImgCarousel = this;
                }
            });

            $carouselWrapper.on("click", devStageChangeHandler);
        }

        function devStageChangeHandler(event) {
            var targetSlideNum = null;
            var prevSlideNum = null;

            // т.к. функция используется и как обработчик кликов
            // на .dev-stages-btn и на .dev-img-carousel
            // и как коллбек для свайпера при изменении активного слайда
            // нам нужно понять в каком из этих контекстов она выполняется

            if (event) {
                var buttonClickContext = event.currentTarget.classList.contains("dev-stages-btn");
                var carouselClickContext = event.currentTarget.classList.contains("dev-img-carousel");

                // контекст клика на кнопку
                if (buttonClickContext) {
                    event.preventDefault();

                    var target = event.currentTarget;

                    targetSlideNum = +target.dataset.stageN;
                    devStagesSwiper.slideTo(targetSlideNum);

                    return;
                }

                // контекст клика на карусель
                if (carouselClickContext) {
                    animateDevCarouselShadow();

                    targetSlideNum = +event.target.dataset.stageN;
                    devStagesSwiper.slideTo(targetSlideNum);

                    return;
                }
            }

            // контекст изменения слайдера
            prevSlideNum = this.previousIndex;
            targetSlideNum = this.activeIndex;
            $devStages
                .find(".dev-stages-btn_active")
                .removeClass("dev-stages-btn_active");

            $devStages
                .find(".dev-stages__item:nth-child(" + (targetSlideNum + 1) + ") > .dev-stages-btn")
                .addClass("dev-stages-btn_active");

            if (isCarouselOnPage) {
                $devImgCarousel.go(targetSlideNum - prevSlideNum);

                animateDevCarouselShadow();
            }
        }

        function animateDevCarouselShadow() {
            $carouselWrapper.addClass("dev-img-carousel_animating")

            setTimeout(function($carousel) {
                $carousel.removeClass("dev-img-carousel_animating");
            }, 450, $carouselWrapper);
        }

        $(".order-form__control").on("change", function(event) {
            var val = this.value;

            if (val !== "") $(this).addClass("order-form__control_state_filled");
            else $(this).removeClass("order-form__control_state_filled");
        });

        // position: sticky polyfill
        var tabNav = document.querySelectorAll('.tab-nav');
        Stickyfill.add(tabNav);

        // для нашего лубимого ieшника
        var $portfolioItems = $(".portfolio-item");
        $portfolioItems.on("mouseenter", function(event) {
            var $this = $(this);
            $this
                .addClass("js-hovered")
                .find(".portfolio-item__popover")
                .addClass("js-hovered");
            $this
                .addClass("js-hovered")
                .find(".portfolio-item__img")
                .addClass("js-hovered");
        });
        $portfolioItems.on("mouseleave", function(event) {
            var $this = $(this);
            $this
                .removeClass("js-hovered")
                .find(".portfolio-item__popover")
                .removeClass("js-hovered");
            $this
                .removeClass("js-hovered")
                .find(".portfolio-item__img")
                .removeClass("js-hovered");
        });

        var $solutionItems = $(".solution");
        $solutionItems.on("mouseenter", function(event) {
            $(this)
                .find(".solution__popover")
                .addClass("js-hovered");
        });
        $solutionItems.on("mouseleave", function(event) {
            $(this)
                .find(".solution__popover")
                .removeClass("js-hovered");
        });
    });
}(jQuery));