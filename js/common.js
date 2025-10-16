document.addEventListener("DOMContentLoaded", function () {
  //  gsap scrollTrigger 초기화
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  //   :root {
  //   font-size: 62.5%; /* 10px */
  // } 이 아래 코드는 위에 CSS와의 실행 개념은 같다.

  // 이 아래 코드가 하는 일은
  // 1 . window.innerHeight는 현재 레이아웃 뷰포트의 높이(px)를 반환하는 프로퍼티. (함수X)
  // -> 모바일 브라우저에서는 주소창/ 툴 바가 나타났다 사라질 때 이 값이 변동된다. (특히 iOS Safari)

  // 2. 0.01 : 뷰포트 높이의 1%(=1vh와 같은 개념)를 픽셀 값으로 계산한다. 예로 들어 innerHeight가 800px이면 0.01*800 = 8px.

  // 3.  document.documentElement.style.setProperty(name, value);는 아까 저 위 CSS와 같은 루트 요소(html)의 인라인 스타일에 CSS 커스텀 속성(변수)를 설정.
  // -> --vh라는 CSS변수에 방금 계산한 px값을 넣는 것.  템플릿 리터럴 `${vh}px`로 단위까지 포함한 문자열을 전달.

  // 결과 : CSS에서 var(--vh)를 사용하면 실시간 뷰포트 1%의 px값을 참조할 수 있다. -> 예) height : calc(var(--vh) * 100) : 항상 '실제'  100vh와 같게 만듦
  // 사용하는 이유 : 모바일에서 height : 100vh는 브라우저 UI(주소창/툴 바)를 포함/제외하는 방식이 들쭉해서 레이아웃이 툭 튀는 문제가 자주 생겨서 사전 방지용으로 사용되는 코드. (반응형)

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // 이 코드의 기능은 뷰포트의 높이가 바뀔 때 마다 CSS변수 --vh를 다시 계산해 넣는 역할을 한다.
  // 모바일 상황에서는 주소창/툴바가 등장 및 숨김 , 키보드 열림/닫힘 , 가로/세로 회전 등이 있고, 데스크톱은 PIP/분할화면/브라우저 창 크기 변경 등이 있다.
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  // 탑버튼 : 맨 위로 이동하기.
  function scrollTopBtn() {
    // 탑버튼 변수로 저장
    const topBtn = document.querySelector(".top-btn");

    // 탑버튼이 존재하지 않는다면 실행 X
    if (!topBtn) return;

    topBtn.addEventListener("click", (e) => {
      // 클릭하면 실행되는 확인
      console.log(e);

      // a 링크가 아니므로 기본동작 이동을 막지 않아도 된다.
      //   e.preventDefault;

      // duration 만들기
      const duration = window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // jQuery 탑버튼 구현
    // $(".top-btn").click(function () {
    //   $("html, body").animate(
    //     {
    //       scrollTop: 0,
    //     },
    //     400
    //   );
    //   return false;
    // });

    console.log(topBtn);
  }

  scrollTopBtn();

  // 사이트 맵(모달) 클래스 부여 및 삭제하여 사이트 맵 구현
  function siteMapOn() {
    // 사이트 맵이 나올 버튼 변수 저장
    const hamBtn = document.querySelector(".ham-box");
    // 사이트 맵이 구현될 떄 필요한 요소
    const siteMap = document.querySelector(".site-map");

    // 사이트 맵을 닫을 취소 버튼 변수 저장
    const closeBtn = document.querySelector(".cls-btn");
    // console.log(hamBtn, siteMap, closeBtn);

    hamBtn.addEventListener("click", (e) => {
      // a링크 기본 동작 제어
      e.preventDefault();

      siteMap.classList.add("on");
      // typeof lenis !== 'undefined' -> 전역 스코프에 lenis라는 변수가 정의되어 있다면 안쪽 코드를 실행하라는 안전 장치용 코드인데, '
      // 이걸 사용한 이유는 어떤 페이지/상태에서는 lenis가 없을 수도 있기에 그때는 lenis.stop()/start() 를 그냥 호출하면 "lenis is not defined" 에러가 나니까, 존재 확인 후에 살행하는 패턴이다.
      // !== 불일치 연산자로, 왼쪽 피연산자와 오른쪽 피연산자의 값이 같지 않거나 타입이 다를 경우 참(true)을 반환한다.

      // !== 이 부분에서 헷갈리는 부분이 있음
      // typeof lenis 결과는 항상 문자열로 반환하는데 (예 : "undefined" , "object" ,"function" 등) 따라서 이 조건식은 문자열 비교인 것이다.
      // typeof lenis (문자열) !==(연산자(불일치)) "undefined"(문자열) 이렇게 문자열로 비교한다. 즉 lenis라는 식별자의 typeof 결과가 문자열 "undefined"와 다르면 -> lenis가 존재(선언)한다고 보고 실행해라.
      // 우리는 lenis가 정의되어 있을 때 "실행"을 원하니까 둘이 달라야한다.4
      // typeof는 문자열 형태로 바꿔주는 기능이다.
      if (typeof lenis !== "undefined") {
        // lenis 공식 메서드
        lenis.stop();
      }
      // html 오소에 클래스를 부여. documentElement 자체가 html이다.
      document.documentElement.classList.add("scroll_none");
    });

    closeBtn.addEventListener("click", function () {
      siteMap.classList.remove("on");
      if (typeof lenis !== "undefined") {
        lenis.start();
      }
      document.documentElement.classList.remove("scroll_none");
    });

    // 모바일 아코디언 메뉴 구현(jQuery로 만든 코드를 javascript로 구현.) -> 모바일 아코디언 메뉴란 모바일에서 메뉴를 접었다 펴는 방식으로 표시하는 네비게이션 UI패턴.
    // 이게 jQuery 방식의 모바일 아코디언 메뉴 코드
    // $(".site-map .site-cont .depth1").click(function (e) {
    //   e.preventDefault();
    //   // 클릭한 .depth1의 부모 요소를 기준으로 형제 요소(p)를 모두 찾고, 그 형제들 내부에 있는 모든 .depth2를 접는다.
    //   $(this).parent().siblings().find(".depth2").slideUp(300);
    //   //클릭한 .depth1과 같은 부모를 가진 형제 .depth2만 열고/닫기 토글을 하고 stop() jQuery 애니메이션 큐를 비워서 중복 애니메이션 누적 방지
    //   $(this).siblings(".depth2").stop().slideToggle(300);
    // });

    // jQuery를 Javascript로 변환.
    // 사이트 맵이 구현되고 나서 나오는 메뉴 변수 저장
    const siteDepth1 = document.querySelector(".site-map .site-cont .depth1");
    const siteDepth2 = document.querySelector(".site-map .site-cont .depth2");

    console.log(siteDepth1, siteDepth2);

    siteDepth1.addEventListener("click", (e) => {
      // a 링크가 아니라서 막지 않아도 된다. 하지만 일단 적용
      e.preventDefault();
    });
  }

  siteMapOn();
});
