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

    class GridItem {
        constructor(id, btns, items, parent, ...classes) {
            this.id = id;
            this.btns = btns;
            this.items = {...items};
            this.parent = parent;
            this.classes = classes;
            this.img = parent.querySelector('.grid__item-image');
            this.info = parent.querySelector('.grid__item-info');
            this.createButton();
            this.buttonListiner();
        }

        createButton () {
            if(this.btns.length > 0 && this.btns){
                this.btns.forEach((btn, i) => {
                    const span = document.createElement('span');
                    span.innerText = btn;
                    span.dataset.id = i + 1;
                    span.classList.add('grid__item-btn');
                    this.parent.querySelector('.grid__item-btns').append(span);
                });  
            }
        }

        buttonListiner () {
            const btns = [...this.parent.querySelectorAll('.grid__item-btn')];
            btns.map(btn => {
                btn.addEventListener('click', e => {
                    const t = e.target;
                    console.log(t);
                    const img = document.createElement('img');
                    this.img.innerHTML = '';
                    img.src = this.items[t.dataset.id - 1].img;
                    img.alt = this.items[t.dataset.id - 1].alt;
                    img.width = "100";
                    this.img.append(img);
                });
            });
        }



        render() {
            // if(this.btns.length > 0){
            //     this.createButton(this.btns, this.parent);
            // }
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes.push('grid__item-wrapper');
            }
            this.classes.map(item => {
                element.classList.add(item);
            });
            element.innerHTML = `
                    <img src=${this.items[0].img} width="100" alt=${this.items[0].alt}>
                    <h3 class="grid__item-subtitle">${this.items[0].title}</h3>
                    <div class="grid__item-price">
                        <div class="grid__item-cost">Цена:</div>
                        <div class="grid__item-total"><span>${this.items[0].price}</span></div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    const gridItems = [...document.querySelectorAll('.grid-item')];


    getData('/assets/js/db.json')
        .then( data => {
            console.log(data.calc);
            data.calc.forEach(item => {
                console.log(item.btns);
                const parent = document.querySelector(`.${item.id}`);
                    new GridItem(
                        item.id,
                        item.btns,
                        item.items,
                        parent
                    ).render();               
        });
    
    });

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

