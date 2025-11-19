document.addEventListener("DOMContentLoaded", function () {
  // header에 대한 js.

  // 스크롤 시 header에 down 및 header-down 클래스 부여

  // header를 변수로 저장.
  const header = document.getElementById("header"); // getElementById에서는 #을 넣지 않는다.
  console.log(header);

  // 1) 스크롤 위치 값을 다루기 위해 변수 저장.
  var previousScroll; // 이전의 위치값 -> 직전 스크롤 위치를 보관하기 위해 저장

  // window.pageYOffset은 현대 브라우저 표준이고, document.documentElement.scrollTop은 일부 구형/특수 모드 호환용이다.(둘 중 있는 값을 사용 (|| -> OR연산자))
  // 여기 저장된 값은 그 순간의 값이라, 그 이후 스크롤이 변해도 자동으로 갱신되지 않습니다. 계속 사용할 목적이라면 이벤트 안에서 다시 읽어야 한다.
  // 최신 브라우저만 고려한다면 window.scrollY가 가장 간단. (=pageYOffSet과 동일)
  var windowScroll = window.pageYOffset || document.documentElement.scrollTop; // "현재 스크롤 위치"를 선언 시점에 한 번 읽어 저장.
  var scrollPosition; // 스크롤 이벤트 핸들러 등에서 반복해서 쓰기 위한 "현재 스크롤 값"을 저장하려고 변수로 빈 선언

  // 시작할 때 헤더의 down 클래스 삭제. (초기화)
  header.classList.remove("down");

  // 2) 현재 스크롤 위치값 저장용 변수에 현재 스크롤 위치값 넣기
  scrollPosition = window.scrollY || window.pageYOffset; // 현재 스크롤 y값을 읽어 scrollPosition에 저장

  // 현재 스크롤 값이 100px이상을 초과하면 header_down 클래스 부여,  아니라면 클래스 삭제
  if (scrollPosition > 100) {
    header.classList.add("header_down");
  } else {
    header.classList.remove("header_down");
  }

  // 3) 스크롤 이벤트 핸들러 사용.
  window.addEventListener("scroll", () => {
    // 현재 스크롤 값을 변수에 저장
    scrollPosition = window.scrollY || window.pageYOffset;

    // 3-1) 위치에 따라 클래스 부여 및 삭제.
    if (scrollPosition > 100) {
      header.classList.add("header_down");
    } else {
      header.classList.remove("header_down");
    }

    // 모달 창이 떴을 때에 대비해서 스크롤 방향 판단하여 아래로 스크롤 시 모달 창 안보이게.
    if (scrollPosition > currentPosition) {
      header.classList.add("down");
    } else {
      header.classList.remove("down");
      searchModal.classList.remove("on");
    }

    // nav 변수 저장
    const Nav = document.getElementById("nav");

    // 3-2)) nav에 on클래스가 부여되어있다면 실행 중지.
    if (Nav.classList.contains("on")) {
      return;
    }

    // 3-3) 스크롤 방향에 따라 클래스 부여 및 삭제.
    var currentPosition = scrollPosition; // window.scrollY = 현재 스크롤 값 위치

    // 스크롤 위/아래 방향 판별 현재 위치값이 크면 아래, 현재 위치값이 작으면 위.
    if (currentPosition > previousScroll && currentPosition > 10) {
      header.classList.add("down");
      document.body.classList.add("down");
    } else {
      header.classList.remove("down");
      document.body.classList.remove("down");
    }

    // 마지막에 값을 갱신하는 이유 : 다음 스크롤 이벤트에서 "직전 값"으로 사용하려고, 이걸 하지 않으면 방향 판별이 망가진다.
    // 어떻게 망가지나 : previousScroll이 갱신되지 않으면 계속 오래된 값과 비교한다.
    // previousScroll = 0으로 저장되어있는데, 여기서 갱신을 하지 않는다면 첫 이벤트는 상관없지만, 다음 이벤트에서도 0으로 인식되어 또 다음 이벤트에서 값이 잘못될 수 있다.
    // 즉, 매 이벤트 끝에서 previousScroll을 현재값으로 업데이트를 해야 "이번 이벤트의 현재값"이 다음 이벤트의 직전값이 되어 정확한 값과 방향 비교가 가능하다.
    previousScroll = currentPosition;
  });

  // 검색 창 모달 구현
  const searchBtn = document.querySelector(".search-box");
  const searchModal = document.querySelector(".all-sch");
  const searchCloseBtn = document.querySelector(".close-btn");
  console.log(searchBtn, searchModal, searchCloseBtn);

  function searchAni() {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();

      searchModal.classList.add("on");
    });

    searchCloseBtn.addEventListener("click", (e) => {
      searchModal.classList.remove("on");
    });
  }

  searchAni();

  // 로그인 모달 창 구현
  // HTML 태그 내에 있는 onclick은 openLoginModal을 전역에 선언해야 하는데, 처음 js에선 함수가 전역(window)에 없었음.
  // 그리고 html태그 내에 있는 onclick은 인라인 핸들러라고 하는데, 인라인 핸들러란 html 요소 속성에 직접 JS 코드를 쓰는 방식.
  // 즉 html내에 script를 이용해 그 안에서 이 밑에 js코드를 사용하면 아까 전 수정없이 사용 가능하다.
  // 지금은 window.함수 = function() {}으로 전역에 선언하여 수정했으므로 사용이 가능한 것이다.
  // onclick은 html에  js를 짜서 넣어주는 방식으로 간단하고 편리하게 사용 가능하다. 한번에
  window.openLoginModal = function (page, idx = "") {
    const modal = document.querySelector("#loginBox");
    console.log(modal);
    if (modal) {
      modal.classList.add("open");
    }

    if (window.innerWidth > 1240) {
      lenis.stop();
    }

    document.documentElement.classList.add("scroll-none");
  };

  // 모달 클릭 이벤트(로그인)
  window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".modal").forEach((modal) => {
      // 닫기 버튼
      modal.querySelectorAll(".modal-close-btn").forEach((button) => {
        // 클릭 처리
        button.addEventListener("click", function () {
          document.documentElement.classList.remove("scroll-none");
          modal.classList.remove("open");

          if (modal.id === "loginBox") {
            if (window.innerWidth > 1240 && typeof lenis !== "undefined") {
              lenis.start();
            }
            document.documentElement.classList.remove("scroll-none");
          }
        });
      });
    });
  });

  // openLoginModal();

  // 헤더에 있는 메뉴에 hover했을 시 각 서브메뉴가 구현
  // 이 바로 밑은 Jquery방식으로 한 서브메뉴 구현
  // $('.header .nav .depth1 > li').hover(
  //     function () {
  //         if ($('.all_sch').hasClass('on')) return;
  //         $(this).find('.depth2').stop().slideDown(400);
  //         $(this).find('.depth2').addClass('on');
  //     },
  //     function () {
  //         if ($('.all_sch').hasClass('on')) return;
  //         $(this).find('.depth2').stop().slideUp(400);
  //         $(this).find('.depth2').removeClass('on');
  //     }
  // );

  // javascript로 구현.
  // 헤더에 있는 각 메뉴요소 잡기
  document.querySelectorAll("#header #nav .depth1 > li").forEach((li) => {
    // 각 li 하위요소에 depth2 찾기.
    const Depth2 = li.querySelector(".depth2");

    if (!Depth2) return;

    li.addEventListener("mouseover", () => {
      if (searchModal.classList.contains("on")) return;
      Depth2.classList.add("on");
    });

    li.addEventListener("mouseout", () => {
      if (searchModal.classList.contains("on")) return;
      Depth2.classList.remove("on");
    });
  });

  // 지금 이렇게 하니 li에서 벗어나는 순간 on클래스가 삭제가 돼 depth2(서브메뉴)에 닿기도 전에 사라지고, depth2에 마우스가 가는 순간 on클래스 삭제
  // 이유는 depth2가 li의 absolute가 되어있어서 li의 mouseleave가 즉시 실행되어 on클래스가 지워짐
});
