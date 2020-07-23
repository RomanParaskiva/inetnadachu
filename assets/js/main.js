"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const slidesWrapper = document.querySelector('.how__slider-wrapper'),
            slider = document.querySelector('.how__slider'),
            slides = slidesWrapper.querySelectorAll('.how__slide'),
            slideCounter = document.querySelector('#current'),
            slideTotal = document.querySelector('#total'),
            leftArrow = document.querySelector('.how__slider-prev'),
            rightArrow = document.querySelector('.how__slider-next'),
            slidesInner = slidesWrapper.querySelector('.how__slider-inner'),
            width = window.getComputedStyle(slidesWrapper).width,
            blocks = document.querySelectorAll('.how__info-block');

    const counterZero = i => {
        return  i < 10 ?  `0${i}` : i;
    };

    const blockBlur = (temp) => {
        blocks.forEach((item, i) => {
            if(temp - 1 == i ) {
                item.style.filter = "blur(0px)";
            } else {
                item.style.filter = "blur(3px)";
            }
        });
    };

    const getData = async (url) => {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }   
        return await res.json();
    };

    slideTotal.textContent = counterZero(slides.length);
    let temp = 1,
        offset = 0;

    slidesInner.style.width = 100 * slides.length + '%';
    slides.forEach(item => {
        item.style.width = width;
    });
    slidesWrapper.style.overflow = 'hidden';
    slideCounter.textContent = counterZero(temp);
    blockBlur(temp);

    rightArrow.addEventListener('click', () => {
        if (offset == +(width.replace('px', '')) * (slides.length - 1) ) {
            offset = 0;
            temp = 1;
        } else {
            offset += +(width.replace('px', ''));
            temp++;
        }  
    
        slideCounter.textContent = counterZero(temp);
        slidesInner.style.transform = `translateX(-${offset}px)`;
        blockBlur(temp);
    });

    leftArrow.addEventListener('click', () => {
        if ( offset == 0 ) {
            offset = +(width.replace('px', '')) * (slides.length - 1);
            temp = slides.length;
        } else {
            offset -= +(width.replace('px', ''));
            temp--;
        }   
        
        slideCounter.textContent = counterZero(temp);
        slidesInner.style.transform = `translateX(-${offset}px)`;
        blockBlur(temp);
    });

    /// calculator 

    const gridItems = [...document.querySelectorAll('.grid-item')];


    const router = document.querySelector('.router'),
          imgs = [...router.querySelectorAll('img')],
          titles = [...router.querySelectorAll('h4')],
          btns = [...router.querySelectorAll('.grid__item-btn')],
          total = router.querySelector('.grid__item-total span');

          btns.forEach(btn => {
              btn.addEventListener('click', e => {
                const t = e.target;
                spanToggler(t.dataset.id, t.dataset.price);
                t.classList.add('active');
              });
          });
    
    const spanToggler = (id, price) => {
        imgs.forEach(img => {
            img.style.display = id == img.dataset.id? '' : 'none';
        });
        titles.forEach(title => {
            title.style.display = id == title.dataset.id? '' : 'none';
        });
        total.textContent = price;
        btns.forEach(btn => {
            btn.classList.remove('active');
        });
    };

    console.log(routerBtns);


});
$(function() {

    
    //===== Prealoder
    
    $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut(500);
    });
    
    
     //===== Sticky

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".header_navbar").removeClass("sticky");
        } else {
            $(".header_navbar").addClass("sticky");
        }
    });
    
    
    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset().top - 73;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
            if(scrollbarLocation == 0){
                $(this).parent().removeClass('active');
            }
        });
    });
    
    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });
    
    
    
    //===== Back to top
    
    // Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('.back-to-top').fadeIn(200)
        } else{
            $('.back-to-top').fadeOut(200)
        }
    });
    
    
    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });  
    
    
});

