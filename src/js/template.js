
/*
Javascript пользовательский
 */
jQuery(document).ready(function ($) {

    /* Валидация Email */
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }

    /************************/
    /* Читаем GET параметры */
    /************************/
    var my_uri = document.location;
    var utm_medium = '';
    var utm_source = '';
    var utm_campaign = '';
    var utm_content = '';
    var utm_term = '';
    function getParam(e){
        utm_medium = getURLParam(e.search, 'utm_medium');
        utm_source = getURLParam(e.search, 'utm_source');
        utm_campaign = getURLParam(e.search, 'utm_campaign');
        utm_content = getURLParam(e.search, 'utm_content');
        utm_term = getURLParam(e.search, 'utm_term');

        if(utm_medium != ''){
            //$.cookie('utmmedium', utm_medium);
            $.cookie("utmmedium", utm_medium, {
                expires: 7,
                path: "/"
            });
            //console.log('юзаем get параметр: '+utm_medium);
        }else{
            if(typeof $.cookie('utmmedium') == "undefined"){
                utm_medium = '';
                //console.log('опусташаем utm_medium');
            }else{
                utm_medium = $.cookie('utmmedium');
                //console.log('юзаем куки: '+utm_medium);
            }
        }

        if(utm_source != ''){
            $.cookie("utmsource", utm_source, {
                expires: 7,
                path: "/"
            });
        }else{
            if(typeof $.cookie('utmsource') == "undefined"){
                utm_source = '';
            }else{
                utm_source = $.cookie('utmsource');
            }
        }

        if(utm_campaign != ''){
            $.cookie("utmcampaign", utm_campaign, {
                expires: 7,
                path: "/"
            });
        }else{
            if(typeof $.cookie('utmcampaign') == "undefined"){
                utm_campaign = '';
            }else{
                utm_campaign = $.cookie('utmcampaign');
            }
        }

        if(utm_content != ''){
            $.cookie("utmcontent", utm_content, {
                expires: 7,
                path: "/"
            });
        }else{
            if(typeof $.cookie('utmcontent') == "undefined"){
                utm_content = '';
            }else{
                utm_content = $.cookie('utmcontent');
            }
        }

        if(utm_term != ''){
            $.cookie("utmterm", utm_term, {
                expires: 7,
                path: "/"
            });
        }else{
            if(typeof $.cookie('utmterm') == "undefined"){
                utm_term = '';
            }else{
                utm_term = $.cookie('utmterm');
            }
        }

    }
    function getURLParam(target, name) {
        return decodeURI(target.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(name).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    getParam(my_uri);


    $("input[type='tel']").mask("+7(999) 999-99-99");

    /* wow эффекты */
    wow = new WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       false,       // default
            live:         true        // default
        }
    );
    new WOW().init();




    $(document).on('click',  '#menuToggle input', function() {
        if($(this).prop("checked")){
            //$('body').css({'overflow':'hidden', 'position':'fixed', 'width':'100%'});
            $('html').css({'-webkit-overflow-scrolling':'touch'});
            $('body').css({'-webkit-overflow-scrolling':'touch'});

            $('#menuToggle').on("scroll", function(event) { event.stopPropagation(); });

            /*$('html').css({'overflow':'hidden', 'width':'100%', '-webkit-overflow-scrolling':'touch'});
            $('body').css({'overflow':'hidden', 'width':'100%', '-webkit-overflow-scrolling':'touch'});*/
        }else{
            $('body').css({'overflow':'unset', 'position':'relative'});
            $('html').css({'overflow':'unset', 'width':'100%'});

            //$('#menuToggle').on("scroll", function(event) { event.stopPropagation(); });
        }
    });




    /* Анимация счетчика цифр */
    $('.guarantee_wrapper').viewportChecker({
        callbackFunction: function(elem, action){
            setTimeout(function(){
                $(".spincrement").spincrement({
                    from: 0,                // Стартовое число
                    to: false,              // Итоговое число. Если false, то число будет браться из элемента с классом spincrement, также сюда можно напрямую прописать число. При этом оно может быть, как целым, так и с плавающей запятой
                    decimalPlaces: 0,       // Сколько знаков оставлять после запятой
                    decimalPoint: ".",      // Разделитель десятичной части числа
                    thousandSeparator: ",", // Разделитель тыcячных
                    duration: 4000          // Продолжительность анимации в миллисекундах
                });
            },300);
        }
    });

    /****************************************/
    /* Растягивание блока под высоту экрана */
    /****************************************/
    function setHeiHeight() {
        var block_h =  $(window).height();
        if($(window).height() < 650){
            block_h =  650;
        }

        $('.auto_screen').css({
            'min-height': block_h + 'px'
        });
        $('.auto_screen.slider_sw').css({
            'height': block_h + 'px'
        });

    }
    if($(window).width() > 991){
        setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
    }

    $(window).resize(function() {
        if ($(window).width() > 991) {
            setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
        }
    }); // обновляем при изменении размеров окна
    /*****************************************/


    /* Слайдер стандартный */
    var swiper = new Swiper('.swiper-container.default', {
        slidesPerView: 1,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        },
    });

    /* слайдер на главной */
    var swiper = new Swiper('.slider_sw .swiper-container', {
        slidesPerView: 1,
        loop: false,
    });

    /* Слайдер с цифровой пагинацияей */
    var swiper = new Swiper('.swiper-container.advantages', {
        /*autoHeight: true,*/
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next.advantages_next',
            prevEl: '.swiper-button-prev.advantages_prev',
        },
        pagination: {
            el: '.swiper-pagination.advantages',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
    });



    /* Слайдер 3 слайда в ряду */
    var swiper2 = new Swiper('.swiper-container.slidein3', {
        slidesPerView: 3,
        spaceBetween: 30,
        /*autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },*/
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next.slidein3_next',
            prevEl: '.swiper-button-prev.slidein3_prev',
        },
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            0: {
                slidesPerView: 1
            },
            // when window width is >= 480px
            500: {
                slidesPerView: 2
            },
            // when window width is >= 640px
            991: {
                slidesPerView: 3
            }
        }
    });


    /* Слайдер отзывов с превью */
    var galleryThumbs = new Swiper('.gallery-thumbs.reviews', {
        spaceBetween: 10,
        slidesPerView: 3,
        //loop: true,
        freeMode: true,
        //loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination.reviews',
            dynamicBullets: true,
            clickable: true,
        },
    });
    var galleryTop = new Swiper('.gallery-top.reviews', {
        //spaceBetween: 10,
        //loop:true,
        //loopedSlides: 5, //looped slides should be the same
        /*navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },*/
        thumbs: {
            swiper: galleryThumbs,
        },
        /*autoplay: {
            delay: 2500,
        },*/
        on: {
            init: function() {
                this.el.addEventListener('mouseenter', function() {
                    this.autoplay.stop();
                }.bind(this));

                this.el.addEventListener('mouseleave', function() {
                    this.autoplay.start();
                }.bind(this));
            }
        },
    });



    /* Прикрепление top_menu */
    /* Функция для фиксированной шапки - меняем высоту шапки при прокрутки страницы вниз */

    function fixed_header(){
        var w_width = $( window ).width(); // ширина окна
        var h_hght = 63; // высота скрываемой части шапки
        var elem = $('header');  // цель для доп.класса
        var top = $(this).scrollTop(); // высота от верхней границы страницы при скроле

        if(top > h_hght && w_width > 991){
            elem.addClass('top_mini');
        }else{
            if(elem.hasClass('top_mini')){
                elem.removeClass('top_mini');
            }
        }
    }

    fixed_header();
    $(window).resize(function(){
        fixed_header();
    });

    $(window).scroll(function(){
        fixed_header();
    });
    /* \\END Прикрепление top_menu */



    /* Процесс создания сайта */
    $('.process .process-item .block-process div').each(function(heightElementProcess){
        $(this).css({"height" : this.offsetHeight + 5 * heightElementProcess});
    });

    $('.process .process-item .alt-proc').each(function(index) {
        var top_block = $(this).outerHeight() + 30;
        $(this).css({'top' : '-' + top_block + 'px'});
    });
    /****************/


    /* Кто будет работать над проектом */
    $('.back-pesonal .container .pers-container .name > div').hover(function () {
        $(this).parent().children().each(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        var nameId = $(this).attr('data-id');
        $('.back-pesonal .text-pers .description div').each(function(){
            $(this).removeClass('active');
            if ($(this).attr('data-id') == nameId) {
                $(this).addClass('active');
            }
        });
        $(this).addClass('active');
    });
    /* \\END Кто будет работать над проектом */




    /* Разница магазинов */
    var galleryTop = new Swiper('.gallery-top.raznica', {
        spaceBetween: 10,
        loop:true,
        slideToClickedSlide:true,
        effect: 'fade',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    $('.raznica_control').on('click',  '.item', function() {
        const index = $(this).data('index')
        galleryTop.slideTo(index);
        $('.raznica_control .item').removeClass('active');
        $(this).addClass('active');
    });

    galleryTop.on('slideChange', function () {
        $('.raznica_control .item').removeClass('active');
        $('.raznica_control .item.index_' + this.realIndex).addClass('active');
    });



    /* Стоимость магазина */
    var priceMagazine = new Swiper('.swiper-container.price_magazine', {
        spaceBetween: 10,
        loop:true,
        slideToClickedSlide:true,
        /*effect: 'fade',*/
        navigation: {
            nextEl: '.swiper-button-next.price_magazine',
            prevEl: '.swiper-button-prev.price_magazine',
        },
    });

    $(document).on('click',  '.price_magazine_wrapper .item span.slide', function() {
        const index = $(this).data('index')
        priceMagazine.slideTo(index);
        $('.price_magazine_wrapper .item').removeClass('active');
        $(this).parent('.item').addClass('active');

        /* скролим */
        destination = $('.price_magazine_wrapper.part2').offset().top - 150;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1000);
    });

    priceMagazine.on('slideChange', function () {
        $('.price_magazine_wrapper .item').removeClass('active');
        $('.price_magazine_wrapper .slide.index_' + this.realIndex).parent('.item').addClass('active');
        console.log(this.realIndex);
    });


    /* Подсказки */
    $('.tip').tooltip();


    /********************************************/
    /* Отрисовка динамических графиков Chart.js */
    /********************************************/
    $('.owl-carousel-result').owlCarousel({
        loop:false,
        nav:true,
        pagination : true,
        items:1,
        autoplay:false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        dotsSpeed: 1000,
        dragEndSpeed: 1000,
        navSpeed: 1000,
        autoplaySpeed: 1000,
        onInitialized: carouselInitialized
    });

    function generateConfig(data) {
        let config = {
            type: 'bar',
            data: {
                labels: ['09.18', '10.18', '11.18', '12.18', '01.19', '02.19'],
                datasets: [{
                    label: 'Переходы',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 87, 87, 0.5)',
                        'rgba(255, 87, 87, 0.5)',
                        'rgba(255, 87, 87, 0.5)',
                        'rgba(255, 87, 87, 0.5)',
                        'rgba(255, 87, 87, 0.5)',
                        '#C4262E'
                    ],
                    borderColor: [
                        'rgba(255, 87, 87, 0.5)',
                        'rgba(255, 87, 87, 0.5)',
                        'rgba(255, 87, 87, 0.5)',
                        'rgba(255, 87, 87, 0.5)',
                        'rgba(255, 87, 87, 0.5)',
                        '#C4262E'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        },

                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                    }]
                },
                responsive: true,
                legend: {
                    display: false,
                },
                defaultFontFamily: "Montserrat', sans-serif",
                defaultFontSize: 12,
                tooltips: {
                },
                plugins: {
                    datalabels: {
                        color: ' #4F4F4F',
                        anchor: 'end',
                        align: 'end',
                        offset: 20

                    }
                },
                layout: {
                    padding: {
                        top: 15
                    }
                },

            },
        };
        return config;
    }

    jQuery('.owl-carousel-result').on('translated.owl.carousel', function(event) {
        carouselInitialized(event);
    });

    Chart.defaults.global.defaultFontColor = '#C4C4C4';

    function carouselInitialized(event){
        let index = event.item.index;
        let id = $(event.target).find('.owl-item').eq(index).find('canvas').attr('id');
        createChart(id);
    }

    function createChart(id) {
        let dataOne = [10984, 23384, 34664, 40800, 45856, 60236];
        let configOne = generateConfig(dataOne);
        let ctx = $("#" + id);
        let chart = new Chart(ctx, configOne);
        //console.log(id);
    }
    /**************************************************/
    /* \\END Отрисовка динамических графиков Chart.js */
    /**************************************************/


    /***********/
    /* Воронка */
    /***********/
    $(document).on('mouseenter', '.voronka_wp .treug_wp.bottom2 .item', function () {
        var link_tab_r = $(this).attr('data-target');
        $('.voronka_wp #right_text_pesok .tab_content').removeClass('active');	// Скрываем остальные блоки контента
        $('#'+link_tab_r).addClass('animated');	// Запускаем анимацию контента
        $('#'+link_tab_r).addClass('active');	// Показываем блок контента
    });


    $(document).on('mouseenter', '.voronka_wp .treug_wp.bottom .item', function () {
        $('#right_text_pesok > div').removeClass('active');
        $('.treug_wp > .item > img').removeClass('active');
        var link_tab = $(this).attr('data-target');
        $('#'+link_tab).addClass('animated');
        $('#'+link_tab).addClass('active');
        $(this).children('img').addClass('active');
    });

    /****************/
    /* \END Воронка */
    /****************/



    /* Портфолио - кнопки переключатели */
    $('#link_more_portfolio li a').on('click',function(e){
        e.preventDefault();

        // Прокрутка презентации вверх
        /*$('#laptop_portfolio .item').scrollTop(0);
        $('#phone_portfolio .item').scrollTop(0);*/

        var link_tab = $(this).attr('href');    // Узнаем Id картинки

        // Обработка картинок в десктопе
        $('#laptop_portfolio .item img').addClass('hidden');    // Скрываем все картинки
        $(link_tab).removeClass('hidden');  // Показываем нужную картинку

        // Обработка картинок в телефоне
        var img_src = $(link_tab).attr('data-mob');  // узнаем путь к картинке
        $('#phone_portfolio .item img').attr('src', img_src);

        // Обработка ссылок переключалок
        $('#link_more_portfolio li a').removeClass('active');   // убираем активную ссылку
        $(this).addClass('active'); // Создаем активную ссылку

    });
    /* END Портфолио - кнопки переключатели */


    /***********************************/
    /* активация модального окна формы */
    /***********************************/
    $("button[data-toggle='modal']").on("click", function(event){
        event.preventDefault(); // выключаем стандартную роль элемента

        // Опустошаем текста
        $('.modal .modal-dialog .modal-content .modal-header .modal-title').text('Оставить заявку');
        $('.modal .modal-dialog .modal-content .modal-body p.zagolovok').text('');
        $('.modal .modal-dialog .modal-content .modal-header .dop_text').text('');
        $('.modal .modal-dialog .modal-content .modal-body p.price').text('');
        $('.modal .modal-dialog .modal-content .modal-body p.knopka').text('');

        if(typeof $(this).data('zag') !== "undefined"){
            zag = $(this).data('zag');  // заголовок в модальном окне
            $('.modal .modal-dialog .modal-content .modal-header .modal-title').text(zag);
        }
        if(typeof $(this).data('dopzag') !== "undefined"){
            dop_zag = $(this).data('dopzag');   // заголовок для менеджера в письме
            $('.modal .modal-dialog .modal-content .modal-body p.zagolovok').text(dop_zag);

            if(dop_zag == 'Узнать стоимость сайта конкурента'){
                $('#zakaz_usluga_modal.modal .modal-dialog .modal-content .modal-body ul li.site').css({'display':'block'});
            }else{
                $('#zakaz_usluga_modal.modal .modal-dialog .modal-content .modal-body ul li.site').css({'display':'none'});
            }
        }
        if(typeof $(this).data('doptext') !== "undefined"){
            dop_text = $(this).data('doptext'); // параграф под заголовком модального окна
            $('.modal .modal-dialog .modal-content .modal-header .dop_text').text(dop_text);
        }
        if(typeof $(this).data('price') !== "undefined"){
            price = $(this).data('price');  // стоимость для менеджера в письме
            $('.modal .modal-dialog .modal-content .modal-body p.price').text(price);
        }

        knopka = $(this).text();  // текст кнопки
        $('.modal .modal-dialog .modal-content .modal-body p.knopka').text(knopka);

    });


    /**********************************************/
    /* Отправка формы из модального окна стандарт */
    /**********************************************/
    $("#zakaz_usluga_modal .modal-dialog .modal-content .modal-body button.send").on("click", function(event) {
        event.preventDefault(); // выключаем стандартную роль элемента
        zag_form = $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-header .modal-title').text();
        name_form = $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-body input.name').val();
        phone_form = $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-body input[type="tel"]').val();
        site_konkur = $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-body input.site').val();
        email_form = $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-body input.email').val();
        uri = document.location.href;
        zagolovok = $('#zakaz_usluga_modal  .modal-dialog .modal-content .modal-body p.zagolovok').text();
        price_form = $('#zakaz_usluga_modal  .modal-dialog .modal-content .modal-body p.price').text();
        knopka_form = $('#zakaz_usluga_modal  .modal-dialog .modal-content .modal-body p.knopka').text();

        button_send = $(this);


        var data = new FormData();

        /* Создаем объект для массива данных формы */
        var inputsarr = {};

        /* Перебераем данные формы */
        /*$('#support-modal .modal-form').find ('input, textarea, select').each(function(index) {
            str_val =$(this).val().replace(/"/g,"");
            inputsarr[index] = {"title" : this.getAttribute('info'), "value" : str_val};
        });*/

        /* Перебираем поля вручную */
        //inputsarr[0] = {"title" : 'Заголовок формы', "value" : zag_form};
        inputsarr[0] = {"title" : 'ФИО', "value" : name_form};
        inputsarr[1] = {"title" : 'Телефон', "value" : phone_form};
        inputsarr[2] = {"title" : 'Сайт конкурента', "value" : site_konkur};
        inputsarr[3] = {"title" : 'E-mail', "value" : email_form};
        inputsarr[4] = {"title" : 'Дополнительный заголовок', "value" : zagolovok};
        inputsarr[5] = {"title" : 'Стоимость', "value" : price_form};
        inputsarr[6] = {"title" : 'Кнопка формы', "value" : knopka_form};
        //inputsarr[7] = {"title" : 'URL', "value" : uri};

        data.append( 'uri', uri );
        data.append( 'zag_val', zag_form );

        data.append( 'utm_medium', utm_medium );
        data.append( 'utm_source', utm_source );
        data.append( 'utm_campaign', utm_campaign );
        data.append( 'utm_content', utm_content );
        data.append( 'utm_term', utm_term );

        /*
        data.append( 'zag_form', zag_form );
        data.append( 'name', name_form );
        data.append( 'phone', phone_form );
        data.append( 'email', email_form );
        data.append( 'uri', uri );
        data.append( 'dop_zagolovok', zagolovok );
        data.append( 'price', price_form );
        data.append( 'knopka', knopka_form );*/

        var inputsarr_json = JSON.stringify(inputsarr); // Преобразуем наш объект в строку json
        data.append( 'forma_info', inputsarr_json ); // записываем массив/объект в пост переменную forma_info

        /* проверка обязательных полей */
        var phoneLen = phone_form.length;

        if(phoneLen < 10){
            $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-body input[type="tel"]').addClass("error");
        }else if(phoneLen >= 10){
            $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-body input[type="tel"]').removeClass("error");
        }

        if(name_form == ''){
            $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-body input.name').addClass("error");
        }else{
            $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-body input.name').removeClass("error");
        }


        email_valid_true = 'true';
        if(typeof email_form != "undefined" && email_form != ''){
            if(email_form == 0 || isValidEmailAddress(email_form) === false){
                $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-body input.email').addClass("error");
                //alert('Укажите ваш Email');
                email_valid_true = 'false';
                return false;
            }else if(email_form != 0 || isValidEmailAddress(email_form)){
                $('#zakaz_usluga_modal .modal-dialog .modal-content .modal-body input.email').removeClass("error");
                email_valid_true = 'true';
            }
        }


        /*console.log(data);
        console.log(name_form);
        console.log(phone_form);*/
        // Отправка письма
        if(phoneLen >= 10 && name_form != '' && email_valid_true == 'true') {
            $(button_send).after("<div class='loading' style='text-align: center; padding-bottom: 11px;'>Отправка...</div>");
            $(button_send).remove();

            $.ajax({
                type: "POST",
                url: "/templates/protostar/send_message.php",
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,  // отключаем обработку передаваемых данных, пусть передаются как есть
                contentType: false,  // отключаем установку заголовка типа запроса. Так jQuery скажет серверу что это строковой запрос
                success: function (html) {
                    //console.log(html);
                    //$('#support-modal .modal-form').html(html);
                    if (html === true) {
                        ym(43993329, 'reachGoal', 'request_from_site'); // аналитика для я.метрики
                        dataLayer.push({'event': 'form_lid'}); // аналитика для я.директ
                        //$(location).attr('href', uri + '?form=service-btn');
                        $("#zakaz_usluga_modal .modal-dialog .modal-content .modal-body").html("<div class='success_form'><img src='/images/templates/success.png' alt=''><span>Ваша заявка отправлена</span></div>");
                        $("#zakaz_usluga_modal .modal-dialog .modal-content .modal-title").css({'display':'none'});
                        $("#zakaz_usluga_modal .modal-dialog .modal-content .dop_text").css({'display':'none'});
                    } else if (html === false) {
                        $("#zakaz_usluga_modal .modal-dialog .modal-content .modal-body").html("<h4 style='color:red'>Ошибка отправки</h4>");
                    } else {
                        $("#zakaz_usluga_modal .modal-dialog .modal-content .modal-body").html(html);
                    }

                },/* Ошибка при получении данных */
                error: function (error) {
                    console.log(error);
                    $('#zakaz_usluga_modal  .modal-dialog .modal-content .modal-body').html("<h4 style='color:red;'>ошибка отправки!</h4>"); // вставляем в блок div новую информацию
                }
            });
        }

    });



    /**********************************************/
    /* Отправка формы */
    /**********************************************/
    $(".formback_horisont_wrapper .btn.send").on("click", function(event) {
        event.preventDefault(); // выключаем стандартную роль элемента
        zag_form = $('.formback_horisont_wrapper .left_block h2').text();
        name_form = $('.formback_horisont_wrapper .right_block .inputs input[name="name"]').val();
        phone_form = $('.formback_horisont_wrapper .right_block .inputs input[type="tel"]').val();
        email_form = $('.formback_horisont_wrapper .right_block .inputs input[name="email"]').val();
        uri = document.location.href;

        button_send = $(this);


        var data = new FormData();

        /* Создаем объект для массива данных формы */
        var inputsarr = {};

        /* Перебераем данные формы */
        /*$('#support-modal .modal-form').find ('input, textarea, select').each(function(index) {
            str_val =$(this).val().replace(/"/g,"");
            inputsarr[index] = {"title" : this.getAttribute('info'), "value" : str_val};
        });*/

        /* Перебираем поля вручную */
        //inputsarr[0] = {"title" : 'Заголовок формы', "value" : zag_form};
        inputsarr[0] = {"title" : 'ФИО', "value" : name_form};
        inputsarr[1] = {"title" : 'Телефон', "value" : phone_form};
        inputsarr[2] = {"title" : 'E-mail', "value" : email_form};

        data.append( 'uri', uri );
        data.append( 'zag_val', zag_form );

        data.append( 'utm_medium', utm_medium );
        data.append( 'utm_source', utm_source );
        data.append( 'utm_campaign', utm_campaign );
        data.append( 'utm_content', utm_content );
        data.append( 'utm_term', utm_term );
        /*
        data.append( 'zag_form', zag_form );
        data.append( 'name', name_form );
        data.append( 'phone', phone_form );
        data.append( 'email', email_form );
        data.append( 'uri', uri );
        data.append( 'dop_zagolovok', zagolovok );
        data.append( 'price', price_form );
        data.append( 'knopka', knopka_form );*/

        var inputsarr_json = JSON.stringify(inputsarr); // Преобразуем наш объект в строку json
        data.append( 'forma_info', inputsarr_json ); // записываем массив/объект в пост переменную forma_info

        /* проверка обязательных полей */
        var phoneLen = phone_form.length;

        if(phoneLen < 10){
            $('.formback_horisont_wrapper .right_block .inputs input[type="tel"]').addClass("error");
        }else if(phoneLen >= 10){
            $('.formback_horisont_wrapper .right_block .inputs input[type="tel"]').removeClass("error");
        }

        if(name_form == ''){
            $('.formback_horisont_wrapper .right_block .inputs input[name="name"]').addClass("error");
        }else{
            $('.formback_horisont_wrapper .right_block .inputs input[name="name"]').removeClass("error");
        }



        email_valid_true = 'true';
        if(typeof email_form != "undefined" && email_form != ''){
            if(email_form == 0 || isValidEmailAddress(email_form) === false){
                $('.formback_horisont_wrapper .right_block .inputs input[name="email"]').addClass("error");
                //alert('Укажите ваш Email');
                email_valid_true = 'false';
                return false;
            }else if(email_form != 0 || isValidEmailAddress(email_form)){
                $('.formback_horisont_wrapper .right_block .inputs input[name="email"]').removeClass("error");
                email_valid_true = 'true';
            }
        }

        /*console.log(data);
        console.log(name_form);
        console.log(phone_form);*/
        // Отправка письма
        if(phoneLen >= 10 && name_form != '' && email_valid_true == 'true') {
            $(button_send).after("<div class='loading' style='text-align: center; padding-bottom: 11px;'>Отправка...</div>");
            $(button_send).remove();

            $.ajax({
                type: "POST",
                url: "/templates/protostar/send_message.php",
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,  // отключаем обработку передаваемых данных, пусть передаются как есть
                contentType: false,  // отключаем установку заголовка типа запроса. Так jQuery скажет серверу что это строковой запрос
                success: function (html) {
                    //console.log(html);
                    //$('#support-modal .modal-form').html(html);
                    if (html === true) {
                        ym(43993329, 'reachGoal', 'request_from_site'); // аналитика для я.метрики
                        dataLayer.push({'event': 'form_lid'}); // аналитика для я.директ
                        //$(location).attr('href', uri + '?form=service-btn');
                        $(".formback_horisont_wrapper .right_block").html("<div class='success_form'><img src='/images/templates/success.png' alt=''><span>Ваша заявка отправлена</span></div>");
                    } else if (html === false) {
                        $(".formback_horisont_wrapper .right_block").html("<h4 style='color:red'>Ошибка отправки</h4>");
                    } else {
                        $(".formback_horisont_wrapper .right_block").html(html);
                    }

                },/* Ошибка при получении данных */
                error: function (error) {
                    console.log(error);
                    $('.formback_horisont_wrapper .right_block .inputs').html("<h4 style='color:red;'>ошибка отправки!</h4>"); // вставляем в блок div новую информацию
                }
            });
        }

    });


    /**********************************************/
    /* Отправка формы блог категория */
    /**********************************************/
    $(".vertical_form button.btn").on("click", function(event) {
        event.preventDefault(); // выключаем стандартную роль элемента
        zag_form = $('.vertical_form p.zag').text();
        name_form = $('.vertical_form input.name').val();
        phone_form = $('.vertical_form input.tel').val();
        email_form = $('.vertical_form input.email').val();
        uri = document.location.href;

        button_send = $(this);


        var data = new FormData();

        /* Создаем объект для массива данных формы */
        var inputsarr = {};

        /* Перебераем данные формы */
        /*$('#support-modal .modal-form').find ('input, textarea, select').each(function(index) {
            str_val =$(this).val().replace(/"/g,"");
            inputsarr[index] = {"title" : this.getAttribute('info'), "value" : str_val};
        });*/

        /* Перебираем поля вручную */
        //inputsarr[0] = {"title" : 'Заголовок формы', "value" : zag_form};
        inputsarr[0] = {"title" : 'ФИО', "value" : name_form};
        inputsarr[1] = {"title" : 'Телефон', "value" : phone_form};
        inputsarr[2] = {"title" : 'E-mail', "value" : email_form};

        data.append( 'uri', uri );
        data.append( 'zag_val', zag_form );

        data.append( 'utm_medium', utm_medium );
        data.append( 'utm_source', utm_source );
        data.append( 'utm_campaign', utm_campaign );
        data.append( 'utm_content', utm_content );
        data.append( 'utm_term', utm_term );


        var inputsarr_json = JSON.stringify(inputsarr); // Преобразуем наш объект в строку json
        data.append( 'forma_info', inputsarr_json ); // записываем массив/объект в пост переменную forma_info

        /* проверка обязательных полей */
        var phoneLen = phone_form.length;

        if(phoneLen < 10){
            $('.vertical_form input.tel').addClass("error");
        }else if(phoneLen >= 10){
            $('.vertical_form input.tel').removeClass("error");
        }

        if(name_form == ''){
            $('.vertical_form input.name').addClass("error");
        }else{
            $('.vertical_form input.name').removeClass("error");
        }



        email_valid_true = 'true';
        if(typeof email_form != "undefined" && email_form != ''){
            if(email_form == 0 || isValidEmailAddress(email_form) === false){
                $('.vertical_form input.email').addClass("error");
                email_valid_true = 'false';
                return false;
            }else if(email_form != 0 || isValidEmailAddress(email_form)){
                $('.vertical_form input.email').removeClass("error");
                email_valid_true = 'true';
            }
        }

        // Отправка письма
        if(phoneLen >= 10 && name_form != '' && email_valid_true == 'true') {
            $(button_send).after("<div class='loading' style='text-align: center; padding-bottom: 11px;'>Отправка...</div>");
            $(button_send).remove();

            $.ajax({
                type: "POST",
                url: "/templates/protostar/send_message.php",
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,  // отключаем обработку передаваемых данных, пусть передаются как есть
                contentType: false,  // отключаем установку заголовка типа запроса. Так jQuery скажет серверу что это строковой запрос
                success: function (html) {
                    //console.log(html);
                    //$('#support-modal .modal-form').html(html);
                    if (html === true) {
                        ym(43993329, 'reachGoal', 'request_from_site'); // аналитика для я.метрики
                        dataLayer.push({'event': 'form_lid'}); // аналитика для я.директ

                        //$(location).attr('href', uri + '?form=service-btn');
                        $(".vertical_form").html("<div class='success_form'><img src='/images/templates/success.png' alt=''><span>Ваша заявка отправлена</span></div>");
                    } else if (html === false) {
                        $(".vertical_form").html("<h4 style='color:red'>Ошибка отправки</h4>");
                    } else {
                        $(".vertical_form").html(html);
                    }

                },/* Ошибка при получении данных */
                error: function (error) {
                    console.log(error);
                    $('.vertical_form').html("<h4 style='color:red;'>ошибка отправки!</h4>"); // вставляем в блок div новую информацию
                }
            });
        }

    });




    /**********************************************/
    /* Отправка формы */
    /**********************************************/
    $(".body_tabs_block.normal_pos button").on("click", function(event) {
        event.preventDefault(); // выключаем стандартную роль элемента
        zag_form = $(this).parent().find('.zag').text();
        name_form = $('.body_tabs_block.normal_pos #name_form').val();
        phone_form = $('.body_tabs_block.normal_pos input[type="tel"]').val();
        uri = document.location.href;

        button_send = $(this);


        var data = new FormData();

        /* Создаем объект для массива данных формы */
        var inputsarr = {};

        /* Перебераем данные формы */
        /*$('#support-modal .modal-form').find ('input, textarea, select').each(function(index) {
            str_val =$(this).val().replace(/"/g,"");
            inputsarr[index] = {"title" : this.getAttribute('info'), "value" : str_val};
        });*/

        /* Перебираем поля вручную */
        //inputsarr[0] = {"title" : 'Заголовок формы', "value" : zag_form};
        inputsarr[0] = {"title" : 'ФИО', "value" : name_form};
        inputsarr[1] = {"title" : 'Телефон', "value" : phone_form};

        data.append( 'uri', uri );
        data.append( 'zag_val', zag_form );

        data.append( 'utm_medium', utm_medium );
        data.append( 'utm_source', utm_source );
        data.append( 'utm_campaign', utm_campaign );
        data.append( 'utm_content', utm_content );
        data.append( 'utm_term', utm_term );

        var inputsarr_json = JSON.stringify(inputsarr); // Преобразуем наш объект в строку json
        data.append( 'forma_info', inputsarr_json ); // записываем массив/объект в пост переменную forma_info

        /* проверка обязательных полей */
        var phoneLen = phone_form.length;

        if(phoneLen < 10){
            $('.body_tabs_block.normal_pos input[type="tel"]').addClass("error");
        }else if(phoneLen >= 10){
            $('.body_tabs_block.normal_pos input[type="tel"]').removeClass("error");
        }

        if(name_form == ''){
            $('.body_tabs_block.normal_pos #name_form').addClass("error");
        }else{
            $('.body_tabs_block.normal_pos #name_form').removeClass("error");
        }



        /*console.log(data);
        console.log(name_form);
        console.log(phone_form);*/
        // Отправка письма
        if(phoneLen >= 10 && name_form != '') {
            $(button_send).after("<div class='loading' style='text-align: center; padding-bottom: 11px;'>Отправка...</div>");
            $(button_send).remove();

            $.ajax({
                type: "POST",
                url: "/templates/protostar/send_message.php",
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,  // отключаем обработку передаваемых данных, пусть передаются как есть
                contentType: false,  // отключаем установку заголовка типа запроса. Так jQuery скажет серверу что это строковой запрос
                success: function (html) {
                    //console.log(html);
                    //$('#support-modal .modal-form').html(html);
                    if (html === true) {
                        ym(43993329, 'reachGoal', 'request_from_site'); // аналитика для я.метрики
                        dataLayer.push({'event': 'form_lid'}); // аналитика для я.директ
                        //$(location).attr('href', uri + '?form=service-btn');
                        $(".body_tabs_block.normal_pos").html("<div class='success_form'><img src='/images/templates/success.png' alt=''><span>Ваша заявка отправлена</span></div>");
                    } else if (html === false) {
                        $(".body_tabs_block.normal_pos").html("<h4 style='color:red'>Ошибка отправки</h4>");
                    } else {
                        $(".body_tabs_block.normal_pos").html(html);
                    }

                },/* Ошибка при получении данных */
                error: function (error) {
                    console.log(error);
                    $('.body_tabs_block.normal_pos').html("<h4 style='color:red;'>ошибка отправки!</h4>"); // вставляем в блок div новую информацию
                }
            });
        }

    });


    /**********************************************/
    /* Отправка формы Контакты */
    /**********************************************/
    $(".contacts_wrapper .contact_info .form_info .form_contact button.send").on("click", function(event) {
        event.preventDefault(); // выключаем стандартную роль элемента
        zag_form = 'Контакты - обратная связь';
        name_form = $('.contacts_wrapper .contact_info .form_info .form_contact input[name="name"]').val();
        phone_form = $('.contacts_wrapper .contact_info .form_info .form_contact input[type="tel"]').val();
        email_form = $('.contacts_wrapper .contact_info .form_info .form_contact input[name="email"]').val();
        comment_form = $('.contacts_wrapper .contact_info .form_info .form_contact textarea').val();
        uri = document.location.href;

        button_send = $(this);


        var data = new FormData();

        /* Создаем объект для массива данных формы */
        var inputsarr = {};

        /* Перебераем данные формы */
        /*$('#support-modal .modal-form').find ('input, textarea, select').each(function(index) {
            str_val =$(this).val().replace(/"/g,"");
            inputsarr[index] = {"title" : this.getAttribute('info'), "value" : str_val};
        });*/

        /* Перебираем поля вручную */
        //inputsarr[0] = {"title" : 'Заголовок формы', "value" : zag_form};
        inputsarr[0] = {"title" : 'ФИО', "value" : name_form};
        inputsarr[1] = {"title" : 'Телефон', "value" : phone_form};
        inputsarr[2] = {"title" : 'E-mail', "value" : email_form};
        inputsarr[3] = {"title" : 'Комментарий', "value" : comment_form};

        data.append( 'uri', uri );
        data.append( 'zag_val', zag_form );

        data.append( 'utm_medium', utm_medium );
        data.append( 'utm_source', utm_source );
        data.append( 'utm_campaign', utm_campaign );
        data.append( 'utm_content', utm_content );
        data.append( 'utm_term', utm_term );

        var inputsarr_json = JSON.stringify(inputsarr); // Преобразуем наш объект в строку json
        data.append( 'forma_info', inputsarr_json ); // записываем массив/объект в пост переменную forma_info

        /* проверка обязательных полей */
        var phoneLen = phone_form.length;

        if(phoneLen < 10){
            $('.contacts_wrapper .contact_info .form_info .form_contact input[type="tel"]').addClass("error");
        }else if(phoneLen >= 10){
            $('.contacts_wrapper .contact_info .form_info .form_contact input[type="tel"]').removeClass("error");
        }

        if(name_form == ''){
            $('.contacts_wrapper .contact_info .form_info .form_contact input[name="name"]').addClass("error");
        }else{
            $('.contacts_wrapper .contact_info .form_info .form_contact input[name="name"]').removeClass("error");
        }

        email_valid_true = 'true';
        if(typeof email_form != "undefined" && email_form != ''){
            if(email_form == 0 || isValidEmailAddress(email_form) === false){
                $('.contacts_wrapper .contact_info .form_info .form_contact input[name="email"]').addClass("error");
                //alert('Укажите ваш Email');
                email_valid_true = 'false';
                return false;
            }else if(email_form != 0 || isValidEmailAddress(email_form)){
                $('.contacts_wrapper .contact_info .form_info .form_contact input[name="email"]').removeClass("error");
                email_valid_true = 'true';
            }
        }



        /*console.log(data);
        console.log(name_form);
        console.log(phone_form);*/
        // Отправка письма
        if(phoneLen >= 10 && name_form != '' && email_valid_true == 'true') {
            $(button_send).after("<div class='loading' style='text-align: center; padding-bottom: 11px;'>Отправка...</div>");
            $(button_send).remove();

            $.ajax({
                type: "POST",
                url: "/templates/protostar/send_message.php",
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,  // отключаем обработку передаваемых данных, пусть передаются как есть
                contentType: false,  // отключаем установку заголовка типа запроса. Так jQuery скажет серверу что это строковой запрос
                success: function (html) {
                    //console.log(html);
                    //$('#support-modal .modal-form').html(html);
                    if (html === true) {
                        ym(43993329, 'reachGoal', 'request_from_site'); // аналитика для я.метрики
                        dataLayer.push({'event': 'form_lid'}); // аналитика для я.директ
                        //$(location).attr('href', uri + '?form=service-btn');
                        $(".contacts_wrapper .contact_info .form_info .form_contact").html("<div class='success_form'><img src='/images/templates/success.png' alt=''><span>Ваша заявка отправлена</span></div>");
                    } else if (html === false) {
                        $(".contacts_wrapper .contact_info .form_info .form_contact").html("<h4 style='color:red'>Ошибка отправки</h4>");
                    } else {
                        $(".contacts_wrapper .contact_info .form_info .form_contact").html(html);
                    }

                },/* Ошибка при получении данных */
                error: function (error) {
                    console.log(error);
                    $('.contacts_wrapper .contact_info .form_info .form_contact').html("<h4 style='color:red;'>ошибка отправки!</h4>"); // вставляем в блок div новую информацию
                }
            });
        }

    });




    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#button-up').css("display", "flex").fadeIn();
        } else {
            $('#button-up').fadeOut();
        }
    });

    $('#button-up').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });


    $('.mouse-block .mouse').click(function () {
        $('body,html').animate({
            scrollTop: $('.section_main').outerHeight() - 60
        }, 1000);
        return false;
    });

    $('.section_main .buttons_main button.button_main6').click(function () {
        $('body,html').animate({
            scrollTop: $('#tariff_wrapper').offset().top - 60
        }, 1000);
        return false;
    });

    $('.toogle_hide').on('click',function() {
        //console.log($(this).parent().siblings('.hide_text').html());

        //console.log($(this).data('show'));
        var toggle_block = $(this).data('show');

        if($('[data-hide="'+toggle_block+'"]').is(':visible')) {
            // Р  РЎСџР РЋР вЂљР РЋР РЏР РЋРІР‚РЋР  Р’ВµР  РЎВ
            $('[data-hide="'+toggle_block+'"]').slideUp('slow');
            $(this).removeClass('opened');
            $(this).children('i').removeClass('fa-caret-up');
        } else {
            // Р  РЎСџР  РЎвЂўР  РЎвЂќР  Р’В°Р  Р’В·Р РЋРІР‚в„–Р  Р вЂ Р  Р’В°Р  Р’ВµР  РЎВ
            $('[data-hide="'+toggle_block+'"]').slideDown('slow');
            $(this).addClass('opened');
            $(this).children('i').addClass('fa-caret-up');
        }
    });


    /* мобильная шапка - телефон */
    $("#menuToggle input").change(function() { //по клику
        if($(this).prop("checked")){
            $('header #mobile_menu .phone').css({'z-index':'0'});
        } else {
            $('header #mobile_menu .phone').css({'z-index':'1'});
        }
    });
    //
    /* \\END мобильная шапка - телефон */
});