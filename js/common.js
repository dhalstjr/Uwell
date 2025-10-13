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
});
