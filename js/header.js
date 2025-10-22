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

  // 서브 헤더 메뉴 슬라이드 업다운 효과 구현
  const Depth2 = document.querySelector(".depth2");
  const Depth2List = document.querySelectorAll(".depth1 > li");
  console.log(Depth2, Depth2List);

  Depth2List.forEach((li) => {
    li.addEventListener("mouseover", () => {
      Depth2.forEach((li2) => {
        li2.classList.add("on");
      });
    });
  });
});
