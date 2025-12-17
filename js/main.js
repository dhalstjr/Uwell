document.addEventListener("DOMContentLoaded", function () {
  // 1. visual 섹션에 대한 js

  // 1-1. visual 섹션에 swiper 적용.

  // 인스턴스/타이머를 "재할당"하기 위해서 초기화
  // 스와이퍼 인스턴스 new  Swiper(...)를 여러 번 만들 수 있는데, 리사이즈/탭 전환/라우트 전환 등으로 재초기화할 때가 많다. 그 때 이전 인스턴스를 변수에 보관했다가 깨끗이 제거(destroy)하고 다시 할당하려면 let이 필요하다.
  // bar는 보통 프로그레스 바 애니메이션 제어용(interval/RAF id 또는 상태값)으로 쓰이는데, 이것도 재시작 시 새 id를 할당해야 하니 let이 적절.
  let visualSwiper;
  let bar; // ProgressBar 변수를 전역으로 이동

  // gsap 타임라인 생성.
  const visualTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".visual-section",
      scrub: false,
      markers: false, // 제대로 적용되는지 확인
      pin: false,
    },
  });

  // 반응형 코드 (>1240 , 768-1240, <768)
  // setTimeout은 지정된 시간이 지난 후에 특정 코드를 한번만 실행하도록 스케줄링하는 기능
  if (window.innerWidth > 1240) {
    setTimeout(() => {
      // GSAP 타임라인을 활용한 코드
      visualTimeline
        .to(".visual-section .cover-bg .cover", {
          width: "0%",
          duration: 0.5,
          ease: "none",
        })
        .to(
          ".visual-section .symbol",
          {
            opacity: 0,
            duration: 0.5,
            ease: "none",
          },
          "<"
        )
        .to(
          ".visual-section .txt-box .tit",
          {
            fontSize: "5.4rem",
            duration: 0.5,
            ease: "none",
          },
          "<"
        )
        .to(
          ".visual-section .txt-box .txt",
          {
            fontSize: "2.1rem",
            duration: 0.5,
            ease: "none",
          },
          " <"
        )
        .to(
          [".visual-section .txt-box", ".visual-section .slide-move"],
          {
            opacity: 1,
            duration: 1,
            ease: "none",
          },
          "<"
        )
        .call(() => {
          initVisualSwiper();
        });
    }, 2000);
  } else if (window.innerWidth > 768) {
    setTimeout(() => {
      visualTimeline
        .to(".visual-section .cover-bg .cover", {
          width: "0%",
          duration: 0.5,
          ease: "none",
        })
        .to(
          ".visual-section .symbol",
          {
            opacity: 0,
            duration: 0.5,
            ease: "none",
          },
          "<"
        )
        .to(
          ".visual-section .txt-box .tit",
          {
            fontSize: "6rem",
            duration: 0.5,
            ease: "none",
          },
          "<"
        )
        .to(
          ".visual-section .txt-box .txt",
          {
            fontSize: "2.6rem",
            duration: 0.5,
            ease: "none",
          },
          " <"
        )
        .to(
          [".visual-section .txt-box", ".visual-section .slide-move"],
          {
            opacity: 1,
            duration: 1,
            ease: "none",
          },
          "<"
        )
        .call(() => {
          initVisualSwiper();
        });
    });
  } else {
    visualTimeline
      .to(".visual-section .cover-bg .cover", {
        width: "0%",
        duration: 0.5,
        ease: "none",
      })
      .to(
        ".visual-section .symbol",
        {
          opacity: 0,
          duration: 0.5,
          ease: "none",
        },
        "<"
      )
      .to(
        ".visual-section .txt-box .tit",
        {
          fontSize: "22px",
          duration: 0.5,
          ease: "none",
        },
        "<"
      )
      .to(
        ".visual-section .txt-box .txt",
        {
          fontSize: "14px",
          duration: 0.5,
          ease: "none",
        },
        " <"
      )
      .to(
        [".visual-section .txt-box", ".visual-section .slide-move"],
        {
          opacity: 1,
          duration: 1,
          ease: "none",
        },
        "<"
      )
      .call(() => {
        initVisualSwiper();
      });
  }

  function initVisualSwiper() {
    if (visualSwiper) {
      // destroy가 필요한 상황
      // 1. 재초기화 - 브레이크 포인트에 따라 옵션을 바꿀 때
      // 2. 중복 인스턴스 방지  : destroy 없이 다시 new Swiper 하면 이벤트가 중복되고, autoplay가 2배 속도로 돌거나 pagination이 꼬이는 문제발생.
      // 3. 메모리 누수 예방 : 이벤트 리스너 / observer / 타이머가 남아 누수와 퍼포먼스 저하 유발
      // 4.
      visualSwiper.destroy(); // 이건 Swiper에 인스턴스를 파괴한 것이고, lenis와는 무관. Swiper API를 사용.
    }

    visualSwiper = new Swiper(".visual-section .swiper-container", {
      // 전환 효과 종류 : slide,fade,cube,flip, coverflow,cards,creative
      // 전환 효과
      effect: "fade", //: fade - 슬라이드가 좌우로 움직이지 않고 페이드 인/아웃으로 전환

      // 이전/다음 슬라이드를 겹쳐서 부드럽게 크로스 페이드
      // 페이드 + 루프 조합은 복제 슬라이드가 많이 필요할 수 있음(깜빡임 방지), 고해상도 이미지일수록 speed , delay를 넉넉하게.
      fadeEffect: {
        crossFade: true,
      },

      // 자동재생
      autoplay: {
        delay: 6000,
        disableOnInteraction: false, // 유저가 드래그/스와이프해도 autoplay를 계속 유지 , 기본값은 true
      },

      speed: 750, // 전환 속도
      loop: true, // 무한루프
      slidesPerView: 1, // 슬라이드가 보여지는 개수
      // 루프 관련 추가 설정(버전 주의)
      loopedSlides: 2, // Swiper의 루프(loop) 모드에서 슬라이드가 순환할 때 복제되는 슬라이드의 개수를 설정하는 옵션입니다. 이 옵션을 사용하면 loop: true 상태에서, 슬라이드의 끝에서 시작으로, 또는 시작에서 끝으로 부드럽게 이동하는 '순환'이 가능해집니다
      initialSlide: 0, // 첫번째 슬라이드부터 시작

      // DOM 변화 감지 (옵저버)
      observeParents: true, // 상위(부모) 요소의 표시/크기 변화를 감지해 SWiper 레이아웃을 갱신
      observer: true, //Swiper의 컨테이너 또는 슬라이드 내용에 동적으로 변경이 발생했을 때, Swiper가 이를 자동으로 감지하고 업데이트하도록 만드는 기능

      // 페이지네이션 (Swiper.js API)
      // Swiper의 페이지네이션(pagination)을 fraction으로 커스터마이징한 코드
      pagination: {
        el: ".visual-section .paging", // 페이지네이션이 그려질 컨테이너를 지정.
        clickable: true, // bullet 타입에서만 의미가 있습니다. fraction에서는 클릭할 점(불릿)이 없어서 효과 없음. 켜져 있어도 상관은 없음.
        type: "fraction", // 현재 / 전체 형태 (예 1 / 6)의 페이지네이션을 렌더링

        // 즉, 이 3가지 설정으로 어떤 기능을 구현하냐?
        // 1. 분수형 페이지네이션
        // 2. 중간 '타이머' 슬롯 확보 // renderFraction
        // 3. 표시 포맷 완전 커스터마이즈

        // formatFractionCurrent는 swiper페이지네이션 옵션의 프로퍼티이고, 값으로 함수를 넣는 콜백 API.
        // 그리고 formatFractionCurrent(number)는 현재 페이지 번호를 문자열로 포맷하는 콜백 - 반환값이 그대로 .swiper-pagination-current요소의 텍스트가 됨.

        // number는 현재 페이지 번호
        formatFractionCurrent: function (number) {
          // 화면에 찍힐 문자열 : 한 자리일 때 앞에 0을 붙여 두 자리로 포멧 (예 : 1 -> 01 이런식으로 앞에 0이 나오게.)
          return ("0" + number).slice(-2); // slice는 javascript 문법. 여기서 slice(-2)는 뒷자리 2글자만 자르고 반환, 음수 인덱스는 "문자 열 끝에서부터 자르라는 뜻"
          // 예를 들어 07.slice(-2) : "07" -> 012.slice(-2)  : "12"
        },

        // 전체 페이지 개수 포멧 콜백 - 반환값이 .swiper-pagination-total 요소의 텍스트가 됨.
        // 루프(loop)가 켜저있어도, 복제 슬라이드는 제외한 실제 개수가 total로 들어오도록 swiper가 처리.
        formatFractionTotal: function (number) {
          return ("0" + number).slice(-2);
        },

        // "fraction" 페이지네이션의 HTML 구조를 직접 정의하는 콜백
        // Swiper가 currentClass / totalClass(예 : swiper-pagination-current , swiper-pagination-total)를 넘겨주면, 그 클래스를 가진 요소안에 4,5번에서 포맷된 숫자를 자동 삽입해줌.
        // 중간에 임의의 요소를 끼워 넣을 수 있어, 여기서는 <div class = "timer"></div>를 넣어 프로그레스 바를 위한 공간을 만듦.

        // currentClass :  Swiper가 내부적으로 쓰는 "현재 숫자" 클래스 명  -> totalClass도 같은 맥락으로 "전체 숫자" 클래스 명
        renderFraction: function (currentClass, totalClass) {
          return (
            '<span class = "' +
            currentClass +
            '"></span>' +
            '<div class ="timer"></div>' +
            '<span class = "' +
            totalClass +
            '"></span>'
          );
        },
      },

      // ProgressBar.js를 활용하여 .timer에 프로그레스 바 생성 및 재생 / 현재 슬라이드의 data-color로 색상 동기화

      // on : 이것은 Swiper에서 Swiper 인스턴스의 이벤트 리스너를 한꺼번에 등록하는 옵션.
      // Swiper에서 init은 인스턴스가 준비 완료된 직후 1회, DOM이 렌더된 뒤 -> 페이지네이션 커스터마이즈, ProgressBar.js 생성 등을 넣기 좋음.
      // init처럼 Swiper에서 자주 쓰는 이벤트는 slideChange, autoplayStart/autoplayStop , resize/breakpoint , beforeDestroy/destroy
      on: {
        init: function () {
          // 1) ProgressBar 초기화를 여기로 이동 -> progressBar.js 인스턴스 생성
          bar = new ProgressBar.Line(".timer", {
            strokeWidth: 1, // 진행선 두께(px)
            duration: 6000, // 기본 애니메이션 시간(ms) - 0 -> 1로 채울 때 걸리는 시간
            color: "#FFFFFF", // 진행선 색상
            trailColor: "rgba(255,255,255,0.2)", // 배경선(트랙) 색상
            trailWidth: 1, // 배경선 두께

            // 삽입될 SVG의 크기(반응형으로 100% 폭)
            svgStyle: {
              width: "100%",
              height: "2px",
            },

            autoPlayContainer: false, // 컨테이너에 라이브러리가 임의 스타일을 넣지 않도록.
          });

          // 2) 즉시 0->1 애니메이션 시작 (기본 duration=6000 적용 ( 저 위에))
          // 처음엔 이렇게 하면 다음 슬라이드가 올 때는 다시 진행이 되질 않음. 다른 코드가 더 필요함.
          bar.animate(1.0);

          // 현재 활성 슬라이드의 실제 인덱스
          // 필요한 이유? : 현재 슬라이드가 몇 번째인지를 기준으로 색상/지연시간/데이터를 가져오거나, 통계/로그/표시 를 위해서 활용
          const currentSlideIndex = this.realIndex; // realIndex는 swiper.js에서 사용하며, loop 모드 사용 시 복제된 슬라이드 제외 실제 슬라이드 인덱스를 반환

          // 현재 슬라이드의 DOM요소를 직접 잡음.
          // 필요한 이유 : 그 엘리면트에서 data-* 속성을 읽고 , 그 값을 UI(프로그레스 바/텍스트/버튼)에 반영하기 위해서
          // 주의할 점 : loop : true 라면 복제 슬라이드 때문에 nth-child가 빗나갈 수 있다.
          // 여기서 왜 nth-child를 사용했는가? : 부모의 n번째 자식 요소가 swiper-slide클래스를 가지고 있으면 선택한다. 즉, 슬라이드 컨테이너 안에서 정확히 n번째 자식 슬라이드를 잡겠다는 의도.
          // currentSlideIndex + 1를 사용했나 : this.realIndex는 0부터 시작하는 JS인덱스이다. 반면 :nth-child는 1부터 시작하는 CSS인덱스이다. 그래서 0베이스를 1베이스로 맞추려고 currentSlideIndex에 1을 더한 것이다.
          const currentSlideElement = document.querySelector(
            `.swiper-slide:nth-child(${currentSlideIndex + 1})`
          );

          // 슬라이드에 붙여둔 테마 색상을 읽음.
          // 사용하는 이유 : 페이지네이션/버튼/아이콘의 색 변경 , 진행바의 stroke 색 동기화 ,  섹션 배경/텍스트 강조 색 등 슬라이드 별 테마 적용 하기 위해서.
          // 사용하려면 html구조에 속성이 data-color가 들어가야 함. data-color = #FFFFFF
          const currentColor = currentSlideElement.getAttribute("data-color");

          // 그 슬라이드만의 autoplay 대기시간(ms). 없으면 기본 6000,
          // 사용하는 이유 : swiper의 autoplay 타이밍과 맞춰 프로그레스 바 애니메이션 길이 설정, 콘텐츠에 따라 길게 보여줄 슬라이드는 값을 키워 가독성 확보
          // 이것도 사용하려면 HTML구조에 속성에 data-swiper-autoplay = 7000;
          var duration =
            currentSlideElement.getAttribute("data-swiper-autoplay") || 6000;

          // 이제 프로그레스 바가 원활하게 적용되기 위해서는 duration에 필요한 data-swiper-autoplay를 html속성에 넣어줘야 한다.
          bar.set(0);
          bar.animate(1.0, {
            duration: parseInt(duration) + 750,
          });

          // 비주얼 프로그레스 바에 관련된 컬러를 data-color를 통해 변경하기
          document.querySelector(
            ".visual-section .slide-move .paging"
          ).style.color = currentColor;

          // 버튼 컬러 변경
          document.querySelector(".visual-section .btn-wrap a").style.color =
            currentColor;

          document.querySelector(
            ".visual-section .btn-wrap a"
          ).style.borderColor = currentColor;

          document.querySelector(".visual-section .btn-wrap a").style.fill =
            currentColor;

          // bar는 progressBar.js에서 인스턴스로 생성된 객체이고, 그 안에 path, trail, value()등 여러 속성과 메서드가 자동으로 포함된다.
          if (bar && bar.path) {
            //setAttribute는 웹 문서(DOM)의 특정 속성을 생성하거나 수정하는 기능.
            bar.path.setAttribute("stroke", currentColor);
            bar.trail.setAttribute("stroke", currentColor);
            bar.trail.style.opacity = "0.2";
          }
        },
        //on : init{}에서 벗어나서 -> on : 은 Swiper 인스턴스가 초기화 직 후 단 한번 이기에 최초갑을 세팅.
        // 슬라이드가 변경될 때  실행  -> slideChange : function(){...} Swiper에 이벤트 콜백 함수.
        slideChange: function () {
          // 그래야 Swiper 인스턴스에 접근이 가능하다. this.slides나 this.activeIndex처럼
          // this.slides -> Swiper가 관리하는 모든 슬라이드 요소의 배열
          // this.activeIndex -> 현재 활성화된 슬라이드 인덱스 번호(0부터 시작)
          const activeSlide = this.slides[this.activeIndex];
          const currentColor = activeSlide.getAttribute("data-color");

          // 비주얼 프로그레스 바에 관련된 컬러를 data-color를 통해 변경하기
          document.querySelector(
            ".visual-section .slide-move .paging"
          ).style.color = currentColor;
          // 버튼 컬러 변경
          // 지금 텍스트 색 변경이 되지 않는 이유는 span에서 color를 CSS에서 상속받고 있을 확률이 있다. a의 color가 바꿔도 span이 자기 color를 가지고 있다면 상속이 안됨.
          // CSS에서 변경을 해줘보자.
          document.querySelector(".visual-section .btn-wrap a").style.color =
            currentColor;

          document.querySelector(
            ".visual-section .btn-wrap a"
          ).style.borderColor = currentColor;

          document.querySelector(".visual-section .btn-wrap a").style.fill =
            currentColor;

          if (bar && bar.path) {
            bar.path.setAttribute("stroke", currentColor);
            bar.trail.setAttribute("stroke", currentColor);
            bar.trail.style.opacity = "0.2";
          }

          // 이 위의 코드를 재할당하는 이유는 : currentColor 값을 다시 지정하는 이유는 슬라이드 전환 시마다 버튼/페이지네이션/프로그레스 바의 색상을
          // 현재 슬라이드의 data-color 값에 맞게 '다시 적용'시키기 위해서. 즉, 현재 슬라이드에 맞춰 테마를 동적으로 업데이트하는 과정
        },

        // slideChangeTransitionStart 이벤트는 Swiper에서 현재 슬라이드에서 다른 슬라이드로 전환되는 애니메이션을 시작할 때 발생.
        slideChangeTransitionStart: function () {
          setBarDuration();
        },
      },
    });

    // visualSwiper.on은 Swiper 인스턴스에 이벤트 리스너를 등록하는 메서드
    // sliderMove는 Swiper 이벤트로 사용자가 드래그/스와이프 중일 떄 지속적으로 발생하는 이벤트이다.
    // 이 코드의 기능은 1.사용자가 슬라이드를 드래그하는 매 순간에 bar.set(0)로 프로그레스 바를 0%로 리셋.
    // 2. 다시 bar.animate{1.0,{duration : 6000}}로  6초 애니메이션을 재시작함.
    visualSwiper.on("sliderMove", function () {
      bar.set(0);
      bar.animate(1.0, { duration: 6000 });
    });
  }

  // 새로운 함수 동작
  // 현재 슬라이드에 맞춰 프로그레스 바(progressBar.js)의 애니메이션 리셋하고 다시 재생시키는 역할을 한다.
  // 즉, 슬라이드 타이밍(autoplay 시간)과 "진헹 바 애니메이션"을 동기화시키는 핵심 함수.
  function setBarDuration() {
    var activeSlide = visualSwiper.slides[visualSwiper.activeIndex];
    var duration = activeSlide.getAttribute("data-swiper-autoplay") || 6000;

    bar.set(0);
    bar.animate(1.0, {
      duration: parseInt(duration) + 750,
    });
  }

  //ProgressBar.js는 가볍고 MIT 라이선스를 받았으며 IE9+를 포함한 모든 주요 브라우저를 지원합니다.

  // ====== 여기까지 visual-section - Swiper

  //특화 전문 센터 슬라이드
  var centerSlide = new Swiper(".center-section .swiper-container", {
    // sliderPerView에 소수점을 올릴수록 메인 슬라이드가 작아지는 건 정상적인 동작임.
    slidesPerView: 1.1, // 숫자를 소수점으로 설정하면, -> 슬라이드 한 개 +  다음 슬라이드 일부만 보이보록 만드는 디자인이 가능하게 됨. -> 다음 슬라이드가 10% 보임.
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1500,

    // Swiper API - on메서드는 Swiper가 제공하는 다양한 이벤트에 대한 콜백 함수를 등록
    on: {
      // 슬라이드가 바뀔 때마다(자동재생, 드래그, 버튼 클릭) 한번씩 호출
      slideChange: function () {
        // 1. 인스턴스가 제대로 생성됐는지 확인 - if(centerSlide) - Swiper 인스턴스.
        // 2. realIndex는 Swiper에서 제공하는 프로퍼티. - loop를 사용하여 앞뒤에 슬라이드를 복제해서 붙이는데, 이때 realIndex는 복제 제외한 진짜 슬라이드 인덱스(0,1,2,3...)
        //    여기서 realIndex말고 activeIndex도 있는데, activeIndex는 복제 슬라이드까지 포함한 "실제 DOM 상 인덱스"
        // 그래서 탭/페이지네이션/텍스트/배경 등 "논리적인 번호"와 맞춰야할 때는 realIndex를 사용하는 게 정석.

        // 3.centerSlide.realIndex !== undefined -> 는 realIndex는 숫자로 들어오기 때문에 undefined에 ""를 사용하면 안된다. (주의)
        //   그래서 realIndex가 아예 없다면 !== updateActiveTab이 실행되지 않고, 그게 아니라면 실행. -> 안전한 방어코드 형성된다.

        if (centerSlide && centerSlide.realIndex !== undefined) {
          // 여기서 .tab에 active를 toggle 이벤트 함수를 적용한 것으로 보임.
          // slideChange안에 updataActiveTab 함수는 -> slideChange는 Swiper 이벤트 콜백인데, 슬라이드가 바뀔 때마다 실행되는 이벤트 콜백 함수이다.
          // 지금 보여지는 "실제 슬라이드 번호" 그 값에 updateActiveTab를 넣어줌.
          // 즉, 슬라이드가 몇번째인지 (realIndex)가져와서, 그 번호에 해당하는 탭에 active 클래스를 붙인다.는 이야기이다.
          updateActiveTab(centerSlide.realIndex);
        }
      },
    },

    // 반응형 코드(브레이크 포인트)
    breakpoints: {
      1920: {
        slidesPerView: 1.1,
        spaceBetween: 150,
      },

      1640: {
        slidesPerView: 1.2,
        spaceBetween: 100,
      },

      769: {
        slidesPerView: 1.2,
        spaceBetween: 15,
      },

      500: {
        slidesPerView: 2.2,
        spaceBetween: 15,
      },
    },
  });

  // tab을 활성화시켜 Swiper와 연결하기 위한 코드 (클릭 이벤트)
  const centerTabs = document.querySelectorAll(".center-tab .tab");

  console.log(centerTabs);

  // centerTabs에 각각의 요소에게 이벤트를 주기 위해서 forEach문을 사용해서 이벤트를 설정.
  // 탭 요소를 슬라이드와 연결.
  centerTabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      // 여기서 slideToLoop는 Swiper에서 제공하는 메서드(API)
      // 이 기능은 loop :  true로 설정된 Swiper에서 "실제 인덱스(realIndex)기준으로 해당 슬라이드로 이동시키는 메서드" -> loop모드 때문에 복제 슬라이드가 많아도 내가 원하는 실제 슬라이드 번호로 정확하게 이동시켜주는 Swiper 기능.
      // 일반적인 slideTo(index)를 사용하면 복제 슬라이드로 갈 가능성이 있다.  그래서 Swiper는 loop모드 전용 이동 함수 slideToLoop(index)를 이용 재공.
      centerSlide.slideToLoop(index);
    });
  });

  // active클래스를 부여.- CSS로 active 클래스가 추가될 시 변경될 이벤트
  function updateActiveTab(index) {
    centerTabs.forEach((tab, i) => {
      // ===는 값과 데이터타입이 모두 같아야 true, 아니라면 false인데. 지금 돌고있는 탭 번호와 현재 활성화하고싶은 탭 번호가 같으면 active 클래스를 추가
      // i === index인 딱 하나의 값만 true, 나머지 탭은 false -> active를 제거.
      // 즉, updateActiveTab(index)함수는 탭 리스트에서 index번째 탭에만 active 클래스를 붙이고, 나머지 탭에는 active를 모두 제거하는 함수.그래서 항상 한 개의 탭에만 active가 활성화 상태로 만들어준다.
      tab.classList.toggle("active", i === index);
    });

    // 활성화(active)된 탭을 왼쪽으로 스크롤
    // 모바일에서 탭이 여러 개라 가로 스크롤이 생길 때, 지금 활성화된 탭이 화면 밖에 반쯤 가려져 있다가 탭/슬라이드 변경 시 부드럽게 가운데 또는 왼쪽에 정렬되게 만드는 그런 UX.
    // 반응형(특히 모바일) UI에서 자주 쓰는 패턴, 쇼핑몰 카테고리 탭/네이버/카카오 앱 상단 탭 메뉴/병원/센터 페이지 진료과목 탭/포트폴리오 섹션 탭 메뉴/필터/정렬 가로 스크롤 메뉴 실무에서도 반복되는 패턴임.

    const activeTab = centerTabs[index];
    const centerTabContainer = document.querySelector(".center-tab");

    if (activeTab && centerTabContainer) {
      const containerLeft = centerTabContainer.scrollLeft;
      const containerWidth = centerTabContainer.innerWidth;
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;

      centerTabContainer.scrollTo({
        left: tabLeft - 20, // 왼쪽 여백 20px추가
        behavior: "smooth",
      });
    }
  }

  // IntersectionObserver는 특정 요소가 브라우저 뷰포트와 교차하는지 여부를 비동기적으로 감지하는 웹 API이다.(js에서 제공하는 API)
  // 이를 통해 요소가 화면에 보이거나 숨겨질 때, 또는 특정 비율로 보일 때 콜백 함수를 실행하여 무한 스크롤, 지연 로딩(Lazy Loading), 회면 애니메이션 등을 효율적으로 구현할 수 있다.

  // new intersectionObserver((entries) => {...}) 브라우저가 제공하는 API로 DOM요소가 viewport(화면)에 들어왔는지/나갔는지를 감지하는 기능이다.
  // 즉, 스크롤 이벤트가 없이도 요소가 화면에 보이는 순간, 화면에서 벗어나는 순간을 정확하게 감지할 수 있다.
  // entries는 관찰 대상 요소들의 교차 상태에 대한 정보를 담고 있는 intersectionObserverEntry 객체의 배열이다.
  // 이 코드가 전체적으로 무슨 역할 하는지 -> 스크롤 위치에 따라 Swiper autoplay를 껐다 켰다 하는 코드이다.

  // 1. 인스턴스 생성  new intersectionObserver((entries)=>{...})
  // callback의 첫번째 인자 : entries : 여기서 entries는 배열(Array)이다. 타입 - intersectionObserverEntry[] 즉, 여러 개의 감지 결과 객체들이 있다.
  const centerSectWrap = new IntersectionObserver((entries) => {
    // 2. 콜백함수 - 요소가 화면에 보일 때 /사라질 때 자동 호출되는 함수.
    // observer는 여러 타겟을 감시할 수 있기 떄문에  entries는 "감지된 요소들의 리스트"가 들어있음.
    // entries 안에는 "이번에 변화가 감지된 요소들"이 여러 개 들어올 수 있으니 forEach로 하나씩 꺼내서 처리하는 전형적인 패턴.
    // entry는 entries에서 하나씩 잡은 요소를 entry(단일)이라고 한다.
    entries.forEach(
      (entry) => {
        // 주요 프로퍼티 - entry.target : 감시하던 실제 DOM 요소. / 다른 주요 프로퍼티는 : entry.isIntersecting → 화면에 보이는 상태인지 (boolean) ,entry.intersectionRatio → 몇 % 보이는지 (0 ~ 1) ,entry.boundingClientRect → 요소의 위치 정보 등
        const $target = entry.target;

        // entry.isIntersecting은 관찰 대상 요소가 현재 뷰포트와 교차하고 있는지 여부를 나타내는 불리언(Boolean) 값이다. ->  해당 요소가 뷰포트와 교차하고 있는 상태를 확인하는 것
        // 즉, 요소가 화면에 보일 때는 true, 화면 밖으로 나가 보이지 않을 때는 false를 반환한다.
        if (entry.isIntersecting) {
          //  true
          // 1) active 클래스를 한번만 추가.(classList.contains로 중복 방지)
          if (!$target.classList.contains("active")) {
            $target.classList.add("active");
          }
          // 2) centerSlide.autoplay.start() -> 슬라이드 재생
          centerSlide.autoplay.start();

          // false
        } else {
          // 슬라이드 정지.
          centerSlide.autoplay.stop();
        }
      },
      { threshold: 0.2 } // option 겍체. -> 0.2 :요소의 20%이상이 viewport(화면)에 들어와야 isIntersecting = true / 그 이하로 보이면 false
      // 즉, 섹션이 회면에 "살짝" 보이는 정도가 아니라. 대략 20% 정도는 보여야 감지되도록 설정한 것.
      // threshold가 없다면 요소가 딱 1px만이라도 보이면 true로 결정된다.
    );
  }); // 지금까지는 감지할 요소가 없기 때문에, 감지할 요소를 만들어줘야한다.

  // 감지할 요소 찾기
  const centerSectItems = document.querySelectorAll(".center-section");
  centerSectItems.forEach((items) => {
    // intersectionObserver를 동작하기 위해서는 반드시 observer()가 있어야 한다. -> 실제로 DOM 요소를 감지하기 위해서는 observer()를 호춯해야한다.
    centerSectWrap.observe(items);
  });

  // IntersectionObserver 기능을 구현하는 이유 : 1) 성능 최적화를 위해서 - 보이지도 않는 슬라이드를 계속 재생시키는 것은 리소스 낭비. (불필요한 애니메이션, CPU 연산을 막아서 성능을 높이는 효과)
  //                                            2) UX 개선
  //                                            3) 여러 개의 Swiper가 있는 페이지에서 충돌방지.

  // 리더 섹션 - leader-section에 Swiper

  // 새로운 leader Swiper 인스턴스 생성 -> 인스턴스 생성 시 이미지 크기가 조정되기 때문에 이미지 크기 조절해야 함.
  // Swiper 기본 옵션은 "모바일 퍼스트"로 동작한다. - new Swiper("" ,{...})안에 넣은 옵션들은 모든 화면 크기에서 적용되는 공통 기본값이다.
  var leaderSlide = new Swiper(".leader-section .slide-box .swiper", {
    // 모든 화면 크기에 적용되는 공통 기본값.
    // 여기서 breakpoints로 화면 크기에 따라 옵션들을 다르게 줬고, 이 기본 옵션들은 499px이하 일때 적용되는 기본 옵션이다. -> breakpoints로 500px 이상까지 옵션을 정해뒀기 때문에.
    slidesPerView: 1.6,
    spaceBetween: 15, // 간격두기
    loop: true,
    speed: 1000,
    autoplay: false, // 다른 방법으로 autoplay를 연동해서 효과 구현
    on: {
      slideChange: function () {
        if (leaderSlide && leaderSlide.realIndex !== undefined) {
          // 함수 이름 - 아직 함수의 동작 기능을 넣어주지 않아서 어떤 코드인 지 확인 안됌.
          updateLeaderActiveTab(leaderSlide.realIndex);
        }
      },
    },

    // 반응형 코드 (브레이크 포인트)
    // breakpoints 구조는 모바일 퍼스트 - min-width 기반 형태(모바일 -> 데스크톱으로 확장)
    breakpoints: {
      // 1640px 이상일 때
      1640: {
        slidesPerView: 2.5,
        spaceBetween: 25,
      },
      // 768px 이상일 때
      768: {
        slidesPerView: 2.2,
        spaceBetween: 15,
      },
      // 500px 이상일 때
      500: {
        slidesPerView: 3.2,
        spaceBetween: 15,
      },
    },
  });

  // leader-section에 필요한 swiper 기능들

  // 스크롤 트리거를 이용해 autoplay를 동작 및 제어.
  // 이번에 scrollTrigger로 자동재생을 제어한 이유는 scrollTrigger를 이용해 애니메이션을 구현하기 위해서인 것 같음.
  ScrollTrigger.create({
    trigger: ".leader-section",
    start: "top 80%",
    // markers: true, // 적용되는 거 확인

    // onEnter : 스크롤 이벤트 콜백함수 - 사용자가 스크롤을 통해 트리거 요소의 시작 지점을 지나칠 때 특정 함수나 동작을 실행하도록 하는 기능
    // onEnter ()=>{} - ()=>{}는 콜백 함수이기 때문에 함수가 와야 하므로 이런 구조로 사용하는 것이다.
    onEnter: () => {
      // ScrollTrigger와 Swiper의 API를 같이 사용한 것이다.
      leaderSlide.autoplay.start(); // 자동재생 시작.
      // 이렇게 params가 붙은 것은 Swiper 인스턴스가 내부에 들고 있는 설정 객체에 접근하기 위해서는 "params"가 붙어야만 접근할 수 있다.
      // 저 위에 autoplay.start() 처럼 기능은 메서드 형태로 따로 있다. 그러니까  params는 “옵션 값(설정)”을 확인하거나 수정할 때 사용
      leaderSlide.params.autoplay.delay = 3000; // 하나의 슬라이드에 3초간 머무른다.
      leaderSlide.params.autoplay.disableOnInteraction = false; // 사용자가 슬라이드를 드래그해도  autoplay를 유지하도록 설정.
    },

    // onLeaveBack도 마찬가지로 스크롤 이벤트 콜백 함수이기 때문에 ()=>{} 이 구조로 사용된다.
    // onLeaveBack은 스크롤을 위로 올려서 화면 아래로 벗어날 때(역방향) ->사용자가 스크롤을 다시 위로 올리는 과정에서 트리거 영역을 완전히 벗어났을 때 실행되는 콜백 함수
    onLeaveBack: () => {
      leaderSlide.autoplay.stop();
    },
  });

  // 탭 클릭 시 해당 슬라이드로 이동.
  const leaderTabs = document.querySelectorAll(
    ".leader-section .tab-wrap .tab"
  );

  leaderTabs.forEach((leaderTab, index) => {
    leaderTab.addEventListener("click", function () {
      leaderSlide.slideToLoop(index);
    });
  });

  // 해당 탭에 active 클래스 부여 및 제거
  function updateLeaderActiveTab(index) {
    leaderTabs.forEach((tab, i) => {
      // tab의 index와 leaderSlide의 index가 ===(값과 데이터타입이 같아야한다.) 이 되어야만 true, 아니라면 false
      // true라면 active를 주고, 다른 것들은 active 제거.
      tab.classList.toggle("active", i === index);
    });

    // 활성화된 탭을 왼쪽으로 스크롤
    // 활성화된 탭이 너무 왼쪽에 딱 붙어보이지 않도록 하기 위한 UX 보정 -> 특히 모바일 환경에서
    const activeTab = leaderTabs[index];
    const tabContainer = document.querySelector(
      ".leader-section .slide-wrap .tab-wrap"
    );

    if (activeTab && tabContainer) {
      const ContainerLeft = tabContainer.scrollLeft;
      const ContainerWidth = tabContainer.innerWidth;
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;

      tabContainer.scrollTo({
        left: tabLeft - 20, // 왼쪽 여백 추가
        behavior: "smooth",
      });
    }
  }

  // leader-section에 라인 효괴 (라인이 스크롤에 의해서 내려가는 효과)

  // GSAP의 timeline은 여러 애니메이션을 순서대로(또는 겹쳐서) 관리하는 컨테이너
  // 이 GSAP에 코드가 하는 일은 스크롤 효과, 스크롤에 인한 라인 애니메이션 , 반응형 높이 조절까지 한 코드.
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".leader-section",
        start: "top 70%",
        end: "center 20%",
        scrub: 1, //  scrub은 스크롤 위치와 애니메이션 진행을 묶어주는 옵션. -> 스크롤을 올리고/내리면, 라인의 height 증가/감소가 스크롤에 맞춰 쓱쓱 움직임.
        markers: false,

        // toggleActions는 스크롤 위치에 따라 애니메이션의 동작 방식을 제어하는 scrollTrigger의 핵심기능
        // 스크롤이 onEnter (트리거 요소가 화면에 진입), onLeave (화면 밖으로 나감), onEnterBack (화면으로 다시 돌아옴), onLeaveBack (화면 밖으로 완전히 나감)
        // 4가지 이벤트가 발생했을 때 각각 어떤 액션(play, pause, resume, reverse, restart, complete, reset, none)을 취할지 설정합니다.
        // toggleActions는 콜백함수는 아니다. 미리 정의된 액션 키워드를 설정하는 속성이다.
        toggleActions: "play none none reverse", // onEnter - 타임라인 재생 / onLeave - 동작없음 / onEnterBack - 동작없음 / onLeaveBack - 타임라인 역재생  : 섹션이 처음 보일 때 라인이 내려가고, 다시 위로 올리면 라인이 올라간다.
      },
    })
    // 시작 값(from)과 끝 값(to)을 명확하게 지정하는 메서드 - fromTo("", {from},{to}) 이런 구조

    .fromTo(
      ".leader-section .line1",
      // from : 시작은 0
      { height: 0 },
      // to : 끝은 height : (조건에 따라 15% or 10%) -> 즉, 스크롤에 맞춰 높이를 0~15% / 10%까지 채워주는 효과
      {
        // 여기서 디테일은 이 조건식인데, 이 조건식은 삼향 연산자이다. 일반적인 if문을 줄인 것인데, 풀어서 사용하면
        // let targetHeight;  if(window.innerWidth > 1240) {targetHeight : "60%" } else {targetHeight : "80%"} height : targetHeight - 이렇게 사용되는데,
        // 의미는 화면 너비가 1240px이상일 때 PC화면이라고 보고, height : 15% , 60%까지만 늘리고, 그 외에 사이즈 1240px 아래라면 10% , 80%까지 늘려라 -> 이 퍼센트 값은 디자인 상 "이정도가 예쁘다"라고 정해놓은 값이다.
        height: window.innerWidth > 1240 ? "15%" : "10%",
        duration: 1,
        ease: "none",
      }
    )

    // 여기도 저 위랑 마찬가지로 같은 효과를 내는데 높이의 값만 다르다.
    .fromTo(
      ".leader-section .line2",
      { height: 0 },
      {
        height: window.innerWidth > 1240 ? "60%" : "80%",
        duration: 1,
        ease: "none",
      }
    );

  // 공통 텍스트 영역 효과

  // 여기서 gasp의 기능을 활용한 이유 utils.toArray()로 배열을 가져온 이유 -> querySelectorAll로 가져와도 되지 않았나?
  // querySelectorAll을 배열이 아닌 NodeList이고, toArray는 실제 배열 요소로 가져오고, 배열 기능을 제대로 사용할 수 있기 때문에 즉, 편하게 사용하기 위한 메서드이다.
  // 그리고 선택자가 "단일 요소"여도 안전하게 처리가 가능하기 때문에 사용.
  // GSAP 내부에서 최적화됨 (성능 도움) : GSAP 애니메이션을 처리할 때 DOM 요소 관련 메모리를 많이 쓰기 때문에 가능한 한 자기 내부에서 최적화된 배열 형태를 원한다.
  // 그러면 querySelectorAll를 사용하면 안되냐? 그건 아니다 querySelectorAll을 사용해도 잘 적용된다.
  let mainTxt = gsap.utils.toArray(".main-tit-wrap");
  mainTxt.forEach(function (item, idx) {
    let mainTxtSpan = item.querySelectorAll("span em");
    console.log(item, idx);

    // GSAP 타임라인 생성
    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
          toggleActions: "play none none reverse",
          // markers: true,
        },
      })
      .to(mainTxtSpan, {
        width: "100%",
        stagger: 0, // 하나의 애니메이션으로 여러 요소를 순차적으로 제어할 수 있게 해주는 속성.
        ease: "none",
      });
  });

  // 이 아래 gsap.to는 저 위에 타임라인과 별개의 gsap.to() 애니메이션이다.
  // 페이지 로드 후 바로 실행되는 무한 루프 애니메이션이다.
  gsap.to(".tit .gradient", {
    backgroundPosition: "100% 100%", //background-position을 애니메이션 시켜서 그라디언트가 흐르는 느낌을 만들 때 자주 사용.
    duration: 2, // 애니메이션이 한번 도는 데 2초 background-position이 현재 값 -> 100% 100%으로 이동하는 데 2초
    repeat: -1, // 무한 반복을 의미 (-1)
    yoyo: true, // repeat이랑 같이 사용할 때 의미가 있는 속성. -> 반복할 때 그냥 처음 위치로 뚝 가는 게 아닌 거꾸로 다시 되돌아가면서 원활하게 애니메이션 실행.
    ease: "linear", // 애니메이션 속도를 처음부터 끝까지 일정하게 만드는 이징 효과
  });

  gsap.to(".count-section .gradient", {
    backgroundPosition: "100% 100%",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "linear",
  });

  //------------------- 또 다른 타임라인 생성.
  let col = gsap.utils.toArray(".leader-section .box-wrap");
  col.forEach(function (item, idx) {
    let emElement = item.querySelectorAll("span em");
    console.log(item); // timeline 생성

    // 타임라인
    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
          toggleActions: "play none none reverse",

          markers: false,
        },
      })
      .to(emElement, {
        width: "100%",
        stagger: 0.1, // 0.1초 간격으로 실행.
        ease: "none",
      });
  });

  // 다른 Swiper Slide 인스턴스 생성. staff-slide-section - 의료진 섹션 슬라이드
  var staffSlide = new Swiper(".staff-slide-section .swiper-container", {
    slidesPerView: 1.2,
    spaceBetween: 15,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false, // 드래그해도 autoplay을 유지.
    },

    // 패이지네이션 적용
    pagination: {
      el: ".staff-slide-section .paging-con .paging",
      //  Swiper 기본 pagination 타입은 bullets, fraction,progress,custom 등이 있는데, fraction은 1/5 형태 자동 출력, progress는 기본 스타일의 프로그레스 바이다.
      // 그렇다면 custom은 숫자/HTML/구조를 내가 완전히 커스텀하고 싶을 때 사용하는 것이다.
      // 그래서 custom은 숫자 모양도 직접 정하고 진행바(progress bar)도 직접 제어하기 위해 type : "custom" +  renderCustom 조합을 사용한것이다.

      // custom을 사용하게 된다면 반드시 내가 UI를 만들어야 한다 그 말은 즉슨 custom을 사용 시 Swiper의 기본 페이지네이션 UI를 제공하지 않는다.
      // 아래처럼 return 해주는 코드가 반드시 필요하다. renderCustom은 필수.
      type: "custom",

      // renderCustom 콜백 함수 - 이 함수는 Swiper가 페이지네이션을 다사 그려야할 때 호출된다. -  슬라이드 초기화 시, 슬라이드가 바뀔 대 마다
      // swiper -  이 Swiper 인스턴스 자체 / current - 현재 슬라이드 번호(1부터 시작) / total - 전체 슬라이드 개수(loop 복제 슬라이드 제외한 실제 개수)
      // 저 swiper , current, total은 이름을 바꿔줘도 무방하다. a,b,c로 해도 기능 그대로 동작한다.
      // 이름은 바꿔줘도 무방하지만 renderCustom을 사용하려면 3개의 이름이 있어야한다. 즉 개수와 순서는 고정이다. 옵션의 순서 -> 꼭 3개가 필요한 이유는 swiper 내부에서 콜백을 호춯할 때 정확한 인수 3개를 전달하기 때문이다. (Swiper가 이렇게 정해진 규칙대로 세 값을 넘겨주기 때문에, 함수도 인자를 3개를 받아야 그 값들을 모두 제대로 사용할 수 있다.)
      // 3개가 아닌 1개나 2개를 넣으면 순서대로 옵션 기능을 받지만 제대로 구현이 되지 않는다. 그리고 3개 이상 이름이 들어가면 4번째 부터는 undefined가 된다.

      //이렇게 custom과 renderCustom을 사용하는 이유는 Swiper 기본 pagination으로 구현할 수 없을 때 사용한다.
      renderCustom: function (swiper, current, total) {
        //  이 부분이 핵심인데, 진행 바(progress bar)계산 로직

        const progressBar = document.querySelector(
          ".staff-slide-section .paging-con .progress .bar"
        );
        if (progressBar) {
          // renderCustom의 기능 2 - 현재 current/ total을 기준으로 "진행 바"까지 원하는대로 만들 수가 있다.
          const progress = (current / total) * 100; // 몇번 째 슬라이드인지에 따라 진행률 계산 - 예시) 총 슬라이드 개수가 5(total = 5개)개라면 1번 슬라이드는 1/5 *100 = 20% 2번 슬라이드는 40% 이런식으로 계산을 한다.
          progressBar.style.width = progress + "%"; // 그리고 계산한 것을 CSS에 접근하여 width에 적용. 그러면 가로로 채워지는  progress bar가 만들어진다.
        }
        // renderCustom의 기능 1 - 반환(return)한 HTML 문자열을 Swiper가 pagination element에 넣는다.
        // 아래에 코드가 paging 안에 HTMl 구조가 들어간다.
        return (
          '<span class = "current">' +
          current +
          "</span>" +
          '<span class = "total">' +
          total +
          "</span>"
        );
      },
    },

    // 네비게이션 적용
    navigation: {
      nextEl: ".staff-slide-section .slide-btn-wrap .btn-next", // 다음으로 넘어가는 버튼 기능을 하게 되는 요소
      prevEl: ".staff-slide-section .slide-btn-wrap .btn-prev", // 이전으로 넘어가는 버튼 기능을 하게 되는 요소
    },

    // 반응형 코드 (breakpoints) - 화면 크기에 따라 슬라이드 개수가 보여지는 슬라이드 부분
    breakpoints: {
      // 1921px 이상
      1921: {
        slidesPerView: 3.5,
        spaceBetween: 25,
      },
      // 1640px 이상
      1640: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      // 1000px 이상
      1000: {
        slidesPerView: 3.8,
        spaceBetween: 25,
      },
      // 600px 이상
      600: {
        slidesPerView: 2.2,
        spaceBetween: 15,
      },
    },
  });

  // 슬라이드 자동재생 제어 (영역에 들어욌을 때 슬라이드를 자동재생.) -> 성능 최적화 코드이디.
  const staffSlidSectWrap = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const $target = entry.target;
        if (entry.isIntersecting) {
          if (!$target.classList.contains("active")) {
            $target.classList.add("active");
          }
          staffSlide.autoplay.start();
        } else {
          staffSlide.autoplay.stop();
        }
      });
    },
    { /* 옵션 */ threshold: 0.2 } // 영역에 20% 이상 들어왔을 때 자동재생 제어
  );

  const staffSlideSectItems = document.querySelectorAll(".staff-slide-section");
  staffSlideSectItems.forEach((item) => {
    // IntersectionObserver을 사용하기 위해서는 observe() 가 꼭 필요하다.
    staffSlidSectWrap.observe(item);
  });

  // .count-section(카운트 섹션) - 스크롤 효과
  // 화면 크기가 768px 보다 클 때(즉 PC나 태블릿 이상에 화면)
  if (window.innerWidth > 768) {
    // gsap의 타임라인 생성 - pin할 섹션에 스크롤을 고정시켜 스크롤을 내리는만큼 countTl 타임라인 안의 에니메이션이 진행되도록 하는 코드.
    let countTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".count-section",
          // start 설정 지점에 대해서 start는 보통 "요소의 위치 뷰포트 위치" 형식 -> 예를 들어 "top top" , "top center" "top 50%"
          // 하지만 여기서는 헤더 높이(px) (패딩 + 보더 포함한 jQuery의 높이 계산 - 예를 들어 헤더 높이가 80px이면 -> start : "top 80px") -> .count-section의 top이 화면 위에서 헤더 높이만큼(예 : 80px) 내려왔을 때 시작해라.
          // 이렇게 헤더 높이만큼 설정한 이유는 고정 헤더 때문에 컨텐츠가 뒤에 가려지지 않게 보정해주는 것. -> 그래서 "top top"으로 설정해봤더니, 확실히 보여지는 부분이 어색해진다.
          // 사용자 개선을 위해서는 꼭 필요한 코드이다.

          // 저 구조는 jQUery이기 때문에 javascript로 변형한다면
          // 1. 헤더 높이 구하기 - jQuery에선 outerHeight()로 JS에서는 offsetHeight()로 충분히 가능하다.
          // 코드 )  const header = document.querySelector(".header");
          //         const headerHeight = header ? header.offsetHeight : 0;
          // 2. start에 텍스로 넣기
          // start :  "top" + heightHeight + "px"  또는 `top ${headerHeight}px`
          start: `top ${$("header").outerHeight()}px`,

          // end 설정도 처음 보는 구조 -> bottom += 1000px 같은 경우에는 봤지만, 이런 구조는 처음 보기 때문에 설명이 필요하다.
          // 이건 ScrollTrigger의 상대 거리 문법이다. 해석하자면 트리거(.count-section)의 bottom이 자기 높이의 150%만큼 더 아래로 진행된 위치에서 뷰포트의 bottom 기준으로 끝낸다.
          // 즉, .count-section 섹션이 화면에 고정된 상태에서 섹션 높이의 1.5베 만큼 더 스크롤할 수 있게 타임라인 길이를 늘려놓은 것이다. -> +=5000px 늘리는 것처럼 말이다.
          // 섹션이 고정된 상태에서 더 길게 애니메이션을 진행할 수 있다. 길이가 길수록 더 길어진다.

          // 1.  궁금해서 px단위로 늘려도 되는 퍼센트로 설정한 이유는 "반응형 + 섹션 높이 기반으로 자연스럽게 조정이 되기 때문이다."
          // px로 구현을 한다면 화면 크기에 관계없이 항상 px만큼 스크롤 구간이 생긴다.
          // 반응형에선 화면 별로 섹션의 높이 다를 수 있기 때문에 px로 구현을 한다면 큰 화면에서는 짧고, 작은 화면에서 길어져 부자연스러운 효과가 나타날 수 있다. -> 경직된 구조엔 반응형은 적합하지 않다.\

          // 2. 그리도 또 특히 더 필요한 이유가 있는데, .to() 애니메이션이 많을수록 스크롤 구간이 필요한데, 단순히 정해진 px로 한다면 애니메이션 전개 속도가 기기마다 다르게 보일 수 있다.
          //    반면에 퍼센트로 설정한다면 애니메이션 길이가 자동으로 조정되어 항상 '적당한 타이밍' 으로 보인다.
          // 여기서 궁금한 점이 생겼는데, .to() 애니메이션에 duration을 사용했는데, px로 하면 애니메이션이 틀어질까? 했는데
          // duration은 상대적인 시간, scrollTrigger의 end는 "전체 구간 길이" -> 즉 duration은 타임라인 안에서 "애니메이션 비율"을 나누는 용도 / end는 이 타임라인 전체를 스크롤로 얼마나 길게 늘일지를 결정.
          // end를 어디까지 잡느냐 -> 스크롤을 얼마나 해야 전체 애니메이션이 다 끝나는지를 의미하고, duration은 그 안에서 “어떤 파트가 더 빨리/천천히 보이느냐”를 나누는 역할이다.
          // ScrollTrigger에 scrub : 1 이 붙는 순간 실제 시간으로 돌지 않고 스크롤 거리에 비례해서 애니메이션 속도가 지정된다.

          // "%"를 사용하는 이유 - 1. 반응형 - 모든 해상도에서 애니메이션 비율이 일정함
          // "%"를 사용하는 이유 - 2. 섹션 높이 기반 - 콘텐츠 양이 변해도 자연스럽게 스크롤 구간 확보
          // "%"를 사용하는 이유 - 3. 유연성 - px는 고정 , %는 유동 -> UX 훨씬 부드러움.
          // "%"를 사용하는 이유 - 4. GSAP 권장 패턴 - 스크롤 기반 애니메이션은 % 사용이 일반적
          end: "bottom+=150% bottom", // 퍼센트로 설정한 이유는 반응형을 고려하여 설정한 것이다.
          pin: true,
          scrub: 1,

          // pin을 true했을 때 사용하는 옵션인데, 섹샨을 pin할 때, 갑자기 딱 멈추면서 튀는 느낌이 생길 수 있는데, 그걸 줄이려고 스크롤 중 살짝 미리 계산해서 부드럽게 고정시켜주는 옵션
          // 숫자가 클수록 미리 당겨서 준비하는 느낌 -> 그렇지만 보통 0.5 ~ 1 정도로 많이 서용된다.
          anticipatePin: 1,
          markers: false,
        },
      })
      .to(
        ".count-section .bg-wrap",
        {
          width: "100%",
          height: "100%",
          duration: 1,
        },
        0 // 타임라인 0초 지점에서 바로 시작
      )
      .to(
        ".count-section .bg-wrap .bg-img",
        {
          width: "100%",
          // 이 코드가 이해가 안되서 자세하게 알아볼 필요가 있음.
          // 이 코드의 내용 : 데스트탑( > 768) - paddingTop : 100vh / 모바일(< 768) - height : 100% -> 어떻게 해서 데스크탑일 때는 paddingTop을 가지고, 모바일일 때는 height를 갖게 되는지 궁금함.
          // 이 코드식은 삼향 연산자 + 객체의 동적 속성명(Computed Property Name)을 함께 사용한 것.(조건식)
          // 이 구조는 객체의 속성명도 조건에 따라 바꾸고, 그 속성명의 값도 조건에 따라 바꿀 떄 사용하는 방법. 즉, 속성 이름을 "동적"으로 생성하는 문법.
          // 보통 JS 객체는 {height : "100%"} 이렇게 만드는데, 속성명을 변수나 조건식으로 만들고 싶을 때는 []을 사용한다. -> 예){[동적 값] : "100%"} 이걸 동적 속성명(Computed Property Name)이라고 한다.
          // []안에는 문자열이 되고, 그 문자열은 객체의 key가 된다.
          [window.innerWidth > 768 ? "paddingTop" : "height"]:
            window.innerWidth > 768 ? "100vh" : "100%",
          duration: 1,
        },
        0 // 위에 bg-wrap과 동시에 애니메이션이 진행
      )
      // 즉, 이 위에 코드의 애니메이션은 섹션이 고정된 상태에서 배경 덩어리와 이미지가 동시에 펼쳐지는 연출

      // position이 안들어갔으니 순차적으로 실행된다.
      .to(".count-section .bg-wrap .bg", { opacity: 1, duration: 0.5 })
      // css에서 opacity :0으로 설정해놓고 시작해야함.
      .to(".count-section .wrap", { opacity: 1, duration: 0.5 })

      // 여기서 call()은 GSAP이 제공하는 전용 메서드이며, JS의 기본 기능이 아니다.
      // call()은 GSAP의 메서드인데 타임라인에서 특정 지점에 JS 함수를 실행시키는 메서드이다. 즉, 타임라인 안에 애니메이션이 아닌 JS 코드를 끼워넣는 메서드
      // call() 메서드를 사용하는 이유는 애니메이션 아닌 "함수"를 타임라인 중간에 넣어 애니메이션을 진행하고 싶을 떄 사용하는데, 이 타임라인의 특정 위치에서 실행되게 하려는 것이 핵심이다.
      // 그리고 중요한 사실은 call()은 한번만 실행된다. - 다시 위로 스크롤해서 되돌려도 기본적으로 재실행되지 않는다. (scrollTrigger +  scrub일 떄 , 이게 아니더라도 한번만 실행되는 것은 맞다.)

      // 그리고 타임라인 내에서 사용하는 것으로 보아 동작의 시점을 맞추는 것으로 보인다.
      .call(startCountAnimation /*  - 함수임 : 동작 만들어야함 */)

      // 섹션 전체를 한 번 더 안정적으로 보여주거나 다음 상태로 정리하는 용도  - 사실 opacity 1이라면 시각적으로는 변화 없을 수도 있고, 연출용 버퍼 느낌
      // opacity 0으로 설정하면 섹션 전체가 보이지 않고 다음으로 넘어간다.
      .to(".count-section", { opacity: 1, duration: 1 });
  }
  // 화면 크기가 768px 보다 작을 때
  else {
    // 타임라인 생성
    gsap.timeline({
      scrollTrigger: {
        trigger: ".count-section",
        // 모바일에서는 데스크탑과는 다르게 scrollTrigger을 설정한 것 같은데, 왜 이렇게 사용했는지에 대해서 알아보자.
        // 모바일에서는 스크롤과 연동하기보다는 섹션이 화면에 들어오는 순간 딱 한 번 애니메이션을 재생하는 구조로 바뀐 것.(그래서 옵션 구조가 다른것.) -> 데스크탑은 스크롤과 연동 (scrub)
        start: "top 20%",

        // 모바일에서는 섹션이 들어올 떄마다 계속 카운트 애니메이션이 재실행되면 UX가 별로라서 한번만 실행하고 끝내려고,
        once: true, // 애니메이션이 단 한 번만 실행되도록 설정. -> onEnter가 여러번 호출되지 않게 하고, 스크롤이 위아래로 왔다갔다 해도 다시 재실행되지 않게 만드는 옵션.

        // trigger 요소가 start 조건에 만족하면서 화면 안으로 들어올 때 실행된다. - 코드 애니메이션 시작.
        // 그리고 왜 onEnter안에 timeline을 다시 만들까? -> 모바일에서는 scroll연동형 애니메이션이 아니라, 그냥 시간 기반 애니메이션을 한번만 설정하면 되기때문에
        // 데스크톱에선 타임라인 전체가 scrollTrigger에 묶여있고, 스크롤 위치 -> 타임라인 진행률과 1:1 대응 (scrub연동)
        // 모바일에선 바깥의 타임라인은 사실상 scrollTrigger를 만들기 위한 껍데기 역할만 한다. (이 타임라인 자체에 to()가 없어서, 자체 애니메이션이 없다.)
        // 진짜 애니메이션은 onEnter 안에서 새로운 타임라인으로 생성하여 설정한다.
        onEnter: () => {
          // 그래서 이 안에 있는 타임라인이 애니메이션으로 설정되고, 시간 기반 재생(기본 애니메이션)이다.
          gsap
            .timeline()
            .to(
              ".count-section .bg-wrap",
              {
                width: "100%",
                height: "100%",
                duration: 1,
              },
              0
            )
            // 왜 모바일에서는 paddingTop을 110vh로 설정하였을까? -> 개발자의 의도? 아니면 모바일의 필요한 설정?
            // 단순한 의도가 아닌 모바일 레이아웃 특성때문에 거의 필수적으로 사용하는 테크닉이라고 한다.
            // 그렇다면 이유가 뭘까? -> 모바일에서 영상/이미지 비율을 강제로 세로로 길게 늘려서 꽉 차 보이도록 만들기 위한 것이다.
            // 모바일 화면은 세로가 더 길다. 그래서 모바일 화면에서는 세로 공간이 더 많이 필요하다.
            // 핵심은 모바일에서 애니메이션이 지연스럽고 원활하게 보여주기 위해 화면보다 더 큰 세로 공간이 필요하기 때문에 paddingTop을 110vh로 사용한 것이다. (paddingTop : 110vh는 화면 높이보다 10% 더 긴 세로 배경을 만들라는 이야기다.)
            .to(
              ".count-section .bg-wrap .bg-img",
              { width: "100%", paddingTop: "110vh", duration: 1 },
              0
            )
            .to(".count-section .bg-wrap .bg", {
              opacity: 1,
              duration: 0.5,
            })
            .to(".count-section .wrap", {
              opacity: 1,
              duration: 0.5,
            })
            .call(startCountAnimation)
            .to(".count-section", {
              opacity: 1,
              duration: 1,
            });
        },
      },
    });
  }

  // .count-section에 있는 숫자를 카운팅 하는 효과
  // startCountAnimation이 하는 일은
  function startCountAnimation() {
    // 모든 숫자 카운팅 시작
    // 1. targetNumbers 배열 - 이 아래 숫자들은 최종적으로 각 카운트 박스에 찍히길 원하는 숫자들이고, 순서대로 첫번째~네번째의 배열의 인덱스를 가지게 된다.
    //                         이 배열의 인덱스(index)값이 나중에 .each()의 index와 매칭된다.
    // 이 코드는 배열(Array)이다. [] <- 배열 리터럴.
    const targetNumbers = [151174, 8606, 800, 17];

    // jQuery
    // each()는 javascript문법에서 forEach()와 비슷한 문법을 가지고 있다. - each메서드는 선택한 요소들이 여러 개일 때, 각 요소에 대헤 지정된 함수를 반복적으로 실행하는 기능.
    // each()의 첫번째 매개변수는 index(인덱스(숫자)) , 두번째 매개변수는 value(값 또는 요소 자체) 그렇다면 foeEach()랑은 반대의 매개변수를 가지고 있다.
    // jQuery의 $는 javascript의 document.querySelector와 같은 기능을 가지고 있다.

    // 2. jQuery로 각 .count-box를 순회
    // each()을 사용해 jQuery의 반복문 메서드를 형셩 -> 함수를 실행하여 index값을 몇번째인지 알려준다.
    $(".count-section .count-container .count-box").each(function (index) {
      // $(this) -> 현재 .count-box 요소를 말하고,  저 숫자의 인덱스값을 가져오고, 1500 -> 애니메이션 총 시간(ms) ,즉 1.5초 동안 0에서 목표 숫자까지 올라가게 설정한 것이다.
      // animateNumber가 숫자가 올라가게 하는 기능의 함수일 것이다.
      // 첫번째 인자 $(this) , 두번째 인자 targetNumbers[index] 값, 세번쨰 인자는 1500 ,
      animateNumber($(this), targetNumbers[index], 1500);
    });

    //javaScript로도 변경.
    //$(".count-section .count-container .count-box").each(function (index) -> 이 부분을 document.querySelector나 querySelectorAll로 변경하면 되는데, 지금 여기서는 querySelectorAll을 사용하는 것이 맞다.
    // 그러면 document.querySelectorAll(".count-section .count-container .count-box")가 된다.
    // 그리고 each(function (index){}) -> 에서 forEach문을 사용해주면 되는데, 저 document.querySelectorAll("...")에 변수를 저장해준 다음 forEach문을 사용한다.
    // const countBoxes = document.querySelectorAll(".count-section .count-container .count-box") 로 저장하고
    // countBoxes.forEach((box,index) =>{animateNumber(box, targetNumbers[index] , 1500)}) -> 으로 사용해주면 된다.

    /*     const countBoxes = document.querySelectorAll(
      ".count-section .count-container .count-box"
    );
    countBoxes.forEach((box, index) => {
      animateNumber(box, targetNumbers[index], 1500);
    }); */ // 이렇게 Js로 변경이 가능하다.
  }

  //  count-box 숫자 카운팅 효과
  // 첫번째 인자 $(this) , 두번째 인자 targetNumbers[index] 값, 세번쨰 인자는 1500 - 그래서 여기서 element = $(this) , end = targetNumbers , duration = 1500이 되는 것이다.
  // 이건 매개변수(피라미터)개념과 호출 시 전달되는 인자(argument)구조 때문에
  function animateNumber($element, end, duration) {
    // 0부터 숫자 카운팅 시작
    // jQuery
    let start = 0; // <- 이건 카운트 시작 숫자.
    const step = end / (duration / 16); // (duration / 16)은 프레임 수 - end / (프레임수) -> 매 프레임마다 얼마씩 숫자를 올릴 지 결정 -> 예를 들어 end = 1000 , duration = 1000 이라면 duration / 16 =62.5프레임 -> step은 1000(end) / 62.5 = 16 -> 매 프레임 숫자를 16씩 올려서, 1초 동안 0-> 1000까지 도달

    // jQuery에서 find()의 기능은 요소의 하위(후손) 요소 중에서 특정 요소를 찾아 반환한다.
    // 여기서 궁금한 게 $element가 어떻게 .count-box가 되는건지에 대해서
    // startCountAnimation()안에서 each를 돌릴 때 this는 각각의 .count-box의 DOM 요소이다. 그걸 $(this)로 감싸서 jQuery객체로 만든 뒤 animateNumber($(this),..) 에 넘겨
    // 즉, animateNumber의 첫번째 인자 -> $(this) -> 하나의 .count-box - 이 인자가 함수 안에서 $element라는 이름으로 받는 것이다.
    // 결국 포인트는 이 함수 안에서는 .count-box를 직접 선택하는 게 아니러, startCountAnimation안에서 이미 골라서 인자로 넘겼기 때문에 그 결과를 $element로 받은 것이다.
    const $num = $element.find(".num"); // .count-box 안에 숫자 출력용 요소를 찾는것

    // detach()의 기능은 선택한 요소를 DOM에서 제거하지만, 해당 요소에 연결된 jQuery 데이터와 이벤트 핸들러는 유지하여 나중에 다시 삽입할 수 있게 한다.
    // remove()와 달리 제거된 요소에 대한 정보를 보존한다는 점에서 차이가 있습니다.
    // 그래서 find("span").detach()는 숫자 옆에 붙은 단위(span)을 DOM에서 잠깐 빼놓고 변수에 저장
    // detach() -> DOM에서 완전히 빠지는데, 하지만 $span 변수 안에는 이벤트/데이터/속성 유지
    // 왜 span이라는 DOM요소를 제거했냐면 숫자 자체는 계속 바뀌는데, 옆에 붙어 있는 단위 (명 또는 %)는 바뀌지 않아야 하기 때문에, span을 DOM요소를 잠깐 뺴놓는다는 말이다
    const $span = $num.find("span").detach();

    // 이 함수는 updateNumber()는 숫자를 0 -> 목표값(end)까지 부드럽게 증가시키는 애니메이션 함수. -> requestAnimationFrame을 이용해 매 프레임마다 숫자를 조금씩 증가시키고 화면에 업데이트하는 함수.
    function updateNumber() {
      // start = 현재 숫자 / end = 목표 숫자 / step = 1프레임 당 증가량(숫자 증가량)
      // start값을 step만큼 증가시키는 연산. -> start = start = step 을 줄여 쓴 문법이 start += step 이다.
      start += step;

      // 목표(end)보다 커지면 end에 강제로 맞춤 -> start가 목표(end)를 넘기지 못하게 "제동"을 거는 코드이다.
      // 애니메이션 도중 rounding 때문에 start가 end보다 살짝 커질 수 있음. -> 그럴 때 강제로 끝값(end)으로 맞춰준다.
      // 이렇게 해서 최종 숫자(end)를 정확히 맞추도록 오버 하는 것을 막는 역할을 한다.
      if (start > end) start = end;

      // jQuery 문법.
      // 화면에 숫자를 업데이트.
      // 1) 이 한 줄은 세가지 작업을 순서대로 하는데, Math.floor()는 주어진 숫자보다 작거나 같은 가장 큰 정수를 반환하는 함수. - 소수점 이하를 버림.
      // 그러니 Math.floor(start)는 start숫자를 소수점 버리고 정수로 만든다.

      // 2) toLocaleString()은 JS의 표준 내장 함수(메서드)문법 - 숫자, 날짜 , 배열등의 객체를 사용자의 로컬(지역)설정에 맞는 형식의 문자열로 변환하는 기능.
      // 숫자를 사람이 읽기 쉬운 문자열로 변환 + 천단위 콤마 추가 -> en-Us 옵션은 미국식 숫자 표기(쉼표 사용)기준이라는 의미

      // 3) $num.text(...) .num 요소의 textContent를 실제로 변경 -> 쉽게 말하면 .num 내부의 텍스트를 위에서 만든 숫자 문자열로 바꾸라는 말.

      // 즉, 현재 카운트 숫자(start)를 정수로 내리고, 천 단위 콤마를 붙여 문자열로 만든 후, .num에 출력.
      $num.text(Math.floor(start).toLocaleString("en-US"));

      // detach()로 떼어 둔 span을 다시 append로 다시 .num에 붙여 넣는 코드이다.
      // 왜 append로 다시 붙여서 사용하냐면 .num안의 숫자를 덮어쓰기(text)할 때 span이 사라자기 때문이다.
      // text()는 해당 요소의 모든 자식 노드를 지워버리고, 문자만 넣는다. -> text()가 실행되면 안에 요소가 사라지기에 미리 span을 뺴놓고 다시 붙여주는 것이다.
      // text()는 jQuery 문법이다. -> 즉, 이 코드는 숫자 옆에 다시 단위를 넣어주는 작업이다.
      $num.append($span);

      // 이 코드는 지금 숫자가 목표값에 도달하지 않았다면 -> 애니메이션을 반복.(숫자 증가)
      if (start < end) {
        // 숫자 애니메이션은 requestAnimationFrame이 최적의 방법이다.
        requestAnimationFrame(updateNumber);
      }
    }
    updateNumber();
  }

  // innovation-section JS

  // 이 섹션은 768px보다 더 넓을 때만 실행
  if (innerWidth > 768) {
    // gsap를 활용 - 타임라인 생성
    gsap
      .timeline({
        // 스크롤 트리거를 활용
        scrollTrigger: {
          // 효과를 줄 섹션
          trigger: ".innovation-section .innov-box .box-wrap",
          start: "top 70%",
          end: "bottom 70%",
          // 스크롤과 연동되도록
          scrub: 2,
          // 콜백함수 기능 onEnter / onLeave / onEnterBack / onLeaveBack
          toggleActions: "play none none reverse",
          markers: false,
        },
      })
      // innovation에 line효과 - 라인이 스크롤에 의해서 내려오는 효과(height 값)
      .to(".innovation-section .innov-box .box-wrap .bg-line", {
        height: "140%",
        duration: 1,
        ease: "none",
      });

    // 박스안에 이미지들 애니메이션
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".innovation-section .innov-box .box-wrap",
          start: "top 70%",
          end: "bottom 80%",
          scrub: 2,
          toggleActions: "play none none reverse",
          markers: false,
        },
      })
      .to(".innovation-section .innov-box .box-wrap .box", {
        opacity: 1,
        duration: 0.2,
        // stagger를 사용하지 않으면 전체 박스가 opacity : 1로 서서히 올라가는데,
        // stagger를 사용하니 차례대로 박스가 보이기 시작한다. -> CSS에서 초기 세팅을 opacity: 0으로 설정
        // stagger를 0.2로 설정하여 차례대로 0.2초 마다 나오게 하려는 애니메이션을 구현한 것이다.
        // 여기서 중요한 포인트는 stagger는 "순서 애니메이션"이 아니라는 이야기이다. 모두 같은 애니메이션의 효과를 주는 것이지만 시작 지점이 달라 순서 애니메이션처럼 보일 수 있다.
        // .box들이 형제 관게이기 때문에 이 구조에서는 stagger기능을 잘 활용할 수 있다.
        stagger: 0.2, // 차례대로 나오게 하는 기능
        ease: "none",
      });
  } else {
    // 모바일일 때 실행
    // intersectionObserver는 특정 요소가 뷰포트나 다른 상위 요소와 교차(겹치거나 벗어나는)하는 시점을 감지해주는 API
    const innovObserver = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          if (entry.isIntersecting) {
            // 모바일에서는  scrub기능 빼고 사용 (스크롤과 연동되지 않게 애니메이션이)
            gsap
              .timeline()
              .to(".innovation-section .innov-box .box-wrap .bg-line", {
                height: "140%",
                duration: 3.4,
                ease: "none",
              });

            // 모바일에서는 세로 길이가 길어져 duration을 더 길게 사용
            gsap
              .timeline()
              .to(".innovation-section .innov-box .box-wrap .box", {
                opacity: 1,
                duration: 0.4,
                stagger: 0.4,
                ease: "none",
              });
          }
        },
        { threshold: 0.3 } // 뷰포트에 30%이상 영역에 들어왔을 때
      );
    });
    // 이 부분이 중요한 이유는 이 DOM요소를 관찰 대상으로 등록하여, 등록 대상이 있고, 없고를 나누어
    // 없다면 콜백 실행 X / 있다면 해당 요소가 뷰포트에 들어올 때마다 entries 배열에 정보를 전달.
    innovObserver.observe(
      document.querySelector(".innovation-section .innov-box .box-wrap")
    );
  }

  // 커리어 슬라이드
  // career-section Swiper 슬라이드 설정
  // 새로운 커리어 슬라이드 구현
  var careerSlide = new Swiper(".career-section .swiper", {
    // 모바일을 우선으로 디자인해야하기 때문에 웹에서 보이는 슬라이드 개수가 아니라 모바일에서 보이는 개수를 지정
    // 웹에서는 4개 반이 보이고 모바일에선 1.5개가 보이게 사용

    // 768px 이하일 때 -> Swiper 설정하는 코드는 모바일 퍼스트를 우선으로 한다.
    slidesPerView: 1.5,
    spaceBetween: 20,
    loop: true,

    // centeredSlides의 기본값은 false.
    centeredSlides: false, //centeredSlides 옵션은 활성화(active) 슬라이드를 항상 컨테이너 중앙에 배치하기 위해 사용

    autoplay: {
      delay: 5000,

      // 기본값 true는 터치하거나 넘기면 autoplay가 중지.
      // false를 사용하는 이유는  1.배너 슬라이드처럼 계속 움직여야 눈에 띄는 컨텐츠일 때
      // 2. 사용자 경험보다 노출 빈도가 중요한 마케팅성 슬라이드일 때
      // 3. 슬라이드가 잠깐 조작되더라도 다시 자동으로 진행되길 원할 때
      disableOnInteraction: false, // 사용자가 터치하거나 넘겨도 autoplay가 지속되도록.
    },

    // progress bar 코드
    pagination: {
      el: ".career-section .top .paging-con .paging",
      type: "custom", // custom을 사용하면 디자인이 swiper의 기본 디자인처럼 변경지 않는다.

      // 타입을 custom으로 설정한다면 renderCustom을 사용하여 직접 설정하여야한다.
      // renderCustom에서 매개변수는 3개의 변수를 받는다.
      // 1. Swiper : 현재 Swiper 인스턴스 자체를 가리킴. 이를 통해 Swiper의 다른 속성이나 메소드에 접근 가능하다.
      // 2. current : 현재 횔성화된(보이는) 슬라이드 번호(인덱스가 아닌 1부터 시작하는 숫자)
      // 3. total : 전체 슬라이드 총 개수
      renderCustom: function (swiper, current, total) {
        // progress bar 업데이트
        const progressBar = document.querySelector(
          ".career-section .top .paging-con .progress .bar"
        );

        if (progressBar) {
          const progress = (current / total) * 100;
          progressBar.style.width = progress + "%";
        }
        // 현 상태까지는 progress에 bar만 채워지는 것만 구현

        // 숫자 페이지네이션 업데이트
        // HTML 구조를 짜서 넣어줌.
        return (
          '<span class = "current">' +
          current +
          "</span>" +
          '<span class = "total">' +
          total +
          "</span>"
        );
      },
    },

    // 네비게이션 버튼
    navigation: {
      nextEl: ".career-section .top .paging-con .slide-btn-wrap .btn-next",
      prevEl: ".career-section .top .paging-con .slide-btn-wrap .btn-prev",
    },

    // 반응형 코드 설정
    breakpoints: {
      // 1640px 이상
      1640: {
        slidesPerView: 4.5,
        spaceBetween: 35,
      },
      // 1240px 이상
      1240: {
        slidesPerView: 3.5,
        spaceBetween: 25,
      },

      // 768px 이상일 때
      768: {
        slidesPerView: 2.5,
        spaceBetween: 15,
      },
    },
  });

  // banner-section
  // 배너 섹션에 gsap 타임라인 설정
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".banner-section",
        start: "top 70%",
        end: "center 70%",
        scrub: 2,
        // 되돌아갔을 때 다시 효과를 주기 위해서 onLeaveBack에 reverse를 사용하여 다시 되돌린다. 효과 실행 전 모습으로.
        toggleActions: "play none none reverse",
        markers: true,
      },
    })
    .to(".banner-section .bg", {
      width: "100%",
      duration: 1,
      ease: "none",
    })
    // 텍스트
    .to(
      ".banner-section .cont .tit-box",
      {
        opacity: 1,
        duration: 1,
        ease: "none",
        transform: "translateY(0)",
      },
      "+=0.1"
    )
    .to(
      ".banner-section .cont .txt",
      {
        opacity: 1,
        duration: 1,
        transform: "translateY(0)",
        ease: "none",
      },
      "<" // 바로 이전의 시작 지점과 동일한 시점에서 시작.
    )
    // 버튼도 같은 효과 적용
    .to(
      ".banner-section .btn-wrap",
      {
        opacity: 1,
        duration: 1,
        ease: "none",
        transform: "translateY(0)",
      },
      "<" // 바로 이전의 시작 지점과 동일한 시점에서 시작.
    );
});
