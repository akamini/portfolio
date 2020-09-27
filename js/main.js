'use strict'

$(function () {
  // wipe in
    $(".wipe").addClass("in");

  // back-to-top
    $("#back-to-top").click(function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600
      );
    });

    $(window).scroll(function () {
      if ($(window).scrollTop() > $(window).height()) {
        $("#back-to-top").addClass("in");
      } else {
        $("#back-to-top").removeClass("in");
      }
    });

  // parallax
  $(window).scroll(function () {
    let value = -$(window).scrollTop() / 40;

    $(".parallax").css({
      transform: "translateY(" + value + "%)",
    });
  });
  
  // smooth scroll
  $('a[href^="#"]').click(function () {
    var time = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" ? "html" : href);
    var distance = target.offset().top;
    $("html, body").animate({ scrollTop: distance }, time, "swing");
    return false;
  });


  // hamburger
    $("#hamburger").click(function () {
      $(this).toggleClass("active");
      $(".header-nav").fadeToggle();
      $("body").toggleClass("hidden");
    });

  // header-fixed
    $(window).scroll(function () {
      if ($(window).scrollTop() > 700) {
        $("header").addClass("fix");
      } else {
        $("header").removeClass("fix");
      }
    });
  
  // slideshow
    let nowPage = 0; 
    let nextPage = 1; 
    const slides = $("#slideshow img");
    const slideLength = slides.length; 
    const fadeTime = 1500; 
    const showTime = 3000; 

    const slideshow = () => {
      nextPage = (nowPage + 1) % slideLength;
      slides.eq(nowPage).fadeOut(fadeTime).removeClass("zoom");
      slides.eq(nextPage).fadeIn(fadeTime).addClass("zoom");
      nowPage = nextPage;
    };

    slides.hide();
    slides.eq(0).show();
    setInterval(slideshow, showTime);
  
  // slidein
    $(window).scroll(function () {
      $(".slide-trigger").each(function () {
        let trigger_point = $(this).offset().top - $(window).height() / 2;

        if ($(window).scrollTop() > trigger_point) {
          $(this).find(".slide").addClass("in");
        }
      });
    });

  // auto-slideshow
  // カスタム
  const autoPlay = true;
  const autoTime = 3000; 
  const speed = 500; 
  const timing = "swing"; 
  const page = 1; 

  // HTMLを取得する
  let carousel = $("#carousel-body");
  let next = $("#next");
  let prev = $("#prev");
  const scrollwidth = $(".item").width(); 

  let flag = true;
  let set;


  const autoPlayFunc = () => {
    set = setInterval(function () {
      next.click();
    }, autoTime);

  };

  autoPlayFunc();

  next.click(function () {

    if (flag) {

      flag = false;

      clearInterval(set);

      carousel.animate({
        left: -scrollwidth * page,
      },
        speed,
        timing,
        function () {
          carousel.append($('.item').eq(0));
          carousel.css({
            left: 0,
          });

          flag = true;
          autoPlayFunc();

        });

    }

  });

  prev.click(function () {

    if (flag) {

      flag = false;

      clearInterval(set);

      carousel.prepend($('.item').eq(-1));

      carousel.css({
        left: -scrollwidth * page,
      }).animate({
        left: 0,
      },
        speed,
        timing,
        function () {
          flag = true;
          autoPlayFunc();
        });

    }

  });


  //マウスストーカー用のdivを取得
  const stalker = document.getElementById('stalker');

  //aタグにホバー中かどうかの判別フラグ
  let hovFlag = false;

  //マウスに追従させる処理 （リンクに吸い付いてる時は除外する）
  document.addEventListener('mousemove', function (e) {
    if (!hovFlag) {
      stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    }
  });

  //リンクへ吸い付く処理
  const linkElem = document.querySelectorAll('a:not(.no_stick_)');
  for (let i = 0; i < linkElem.length; i++) {
    //マウスホバー時
    linkElem[i].addEventListener('mouseover', function (e) {
      hovFlag = true;

      //マウスストーカーにクラスをつける
      stalker.classList.add('hov_');

      //マウスストーカーの位置をリンクの中心に固定
      let rect = e.target.getBoundingClientRect();
      let posX = rect.left + (rect.width / 2);
      let posY = rect.top + (rect.height / 2);

      stalker.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';

    });
    //マウスホバー解除時
    linkElem[i].addEventListener('mouseout', function (e) {
      hovFlag = false;
      stalker.classList.remove('hov_');
    });
  }
  
});