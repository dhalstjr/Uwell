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

      // CSS에서 is-open으로도 열려있는 상태가 아니라서 실제 scrollHeight를 가져올 수 없다고 한다. 이유는 site-map이 숨겨져있을 때는 실제 높이는 0이지만, on클래스를 붙여 보이게 만들면 브라우저가 레이아웃을 다시 계산해서 진짜 높이를 알수 있게 된다.

      // 사이트 맵이 on클래스를 가졌을 때 이제 .box .depth2가  높이 계산이 가능하기에 -> 열린 박스들 높이 주입.
      document.querySelectorAll(".site-cont .box.is-open").forEach((box) => {
        const panel = getPanel(box);
        if (panel) setPanelHeight(panel);
      });

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

    // 모든 depth1 요소 가져오기
    const siteDepth1s = document.querySelectorAll(
      ".site-map .site-cont .depth1"
    );

    //사이트 맵에 요소들이 있는 content부분
    const siteCont = document.querySelector(".site-cont");

    console.log(siteDepth1, siteDepth2, siteCont, siteDepth1s);

    // 직계 depth2 찾기 (:scope와 children의 차이)
    // :scope와 children의 차이는 서로 현재 요소를 기준으로 직계 자식을 선택하는 것은 같다.
    // :scope는 (CSS 선택자) 현재 요소에 .depth2를 찾지 ( :scope > .depth2) -> 한 줄로 명확하고 간결하다. CSS 선택자 문법 그대로라 가독성에 좋다. (CSS에 따로 해줄 게 없음)
    // children (DOM 트리 탐색) 실제 DOM 컬렉션을 순회해서 직계 자식만 필터링 -> 선택자 호환성을 신경 안써도 되고, IE같은 레거시(더 이상 지원이 종료된 인터넷 익스플로러의 기술과 호환성이 필요한 오래된 웹사이트나 애플리케이션을 말함.)까지 커버 가능(요즘엔 사용 x)
    // 웹접근성 미치는 영향은 차이가 없고, 실무에서는 현대 프론트에서는 :scope가 간결하고 읽기 쉬워서 선호. 레거시 브라우저(특히 IE) 지원 요구가 없다면 :scope 추천
    // children은 모든 브라우저에서 오래전부터 사용 / Chrome, Edge(Chromium), Firefox, Safari — 현대 브라우저에서는 :scope 2025년 기준 웹 표준 타겟이라면 :scope 써도 안전. IE 포함 초레거시만 신경 쓰면 children

    // children 사용
    // 찾은 결과를 담을 변수 초기화
    // let panel = null;

    // box의 직계 자식들만 순회.
    // 프로퍼티 : box.children - 직계 자식 요소만 포함. 요소(ELement)만 제공.
    // box안에 들어있는 자식 요소들을 하나씩 꺼내서 child라는 이름으로 사용하겠다는 말이다.
    // 그리고 반복문(for문)이다. for(let i = 0; i < ~; i++) 같은 "숫자로 도는 for문"이 아니라 요소 값 자체를 하나씩 꺼내는 반복문이다.
    // 즉 이 코드를 해석하자면 box.children 안에 있는 각 child에 대해 반복해서 ~을 하라.
    // 여기서 child는 따로 변수로 선언할 필요가 없다. 이 for문 안에서 box.children안의 요소들을 하나씩 꺼내 child라는 이름의 변수로 만들어라 라는 내용이기에
    // for..of 문법이 자동으로 child 라는 이름의 변수를 만든것이다. 그리고 이 child라는 변수는 for문안에서 사용가능이다.
    // for (const child of box.children) {
    //   //지금 for문에서 child가 depth2 클래스를 가지고 있다면, 그 요소를 panel에 담고 반복을 멈춰라.
    //   // ?는 옵셔널 체이닝 -> 혹시 classList가 없으면 여기서 에러 내지 말고 그냥 넘어가라(안전장치용)
    //   if (child.classList?.contains("depth2")) {
    //     // panel은 찾은 것을 변수로 저장 child라는 이름으로.
    //     panel = child;
    //     break; // 찾았으니 for문(반복문)을 중단
    //   }
    //   // 끝까지 못찾았으면(panel이 비어있으면) 더이상 진행하지말고 함수에서 나와라.
    //   // !panel은 가드 문장
    // }
    // if (!panel) return;

    // 이 위 코드를 함수로 변경해서 코드 변경
    // 이렇게 하면 좋은 점은 불필요한 외부 변수를 제거하고 재사용/유지보수가 쉬움.
    function getPanel(box) {
      for (const child of box.children) {
        if (child.classList?.contains("depth2")) return child;
      }
      return null;
    }

    // depth1을 클릭 시 메뉴가 슬라이드 업다운되는 코드 구현하려고 한다. 이거를 함수로 정의해서 구현한다.
    // 여기는 함수 정의
    function setPanelHeight(panel) {
      // 3.그 DOM요소의 scrollHeight를 읽어 "***px"로 만들어,
      // panel.style.setProperty('--h', ..)로 CSS 변수 --h를 요소의 인라인 스타일에 세팅 -> 이후 CSS에서 max-height : var (--h)로 부드럽게 펼침.
      panel.style.setProperty("--h", panel.scrollHeight + "px");
    }

    function openBox(box) {
      const panel = getPanel(box); // 1. box안에 ul class = "depth2" DOM 요소를 찾아 panel 변수에 담음.
      if (!panel) return;
      // 여기는 함수 실행.
      setPanelHeight(panel); // 2. 저 위에 있는 함수 호출하고 실행, 그리고 const panel = getPanel(box) <-> panel 이것을 인자로 넘겨 DOM 요소가 매개변수 panel에 들어간다. (저 위에 있는 panel)
      box.classList.add("is-open"); // 클래스를 추가하여 열린 상태를 만든다.
    }

    function closeBox(box) {
      const panel = getPanel(box);
      if (!panel) return; // panel이 없으면 실행 중단(안전장치)

      box.classList.remove("is-open");
      // removeProperty 메서드는 일반적인 객체에 속성을 제거하는 것이 아니라 DOM요소의 인라인 CSS스타일 속성을 제거할 때 사용.
      // 인라인 스타일은 HTML태그 안에 style ="" 이 들어가 있으면 인라인 스타일.
      panel.style.removeProperty("--h"); // 역할 : 인라인 스타일에 설정돼 있던 CSS속성(여기서는 CSS 변수 --h)를 삭제
    }

    function closeAll() {
      // 각 .box 요소를 closeBox 함수에 넘겨서 실행한다.
      document.querySelectorAll(".site cont .box").forEach(closeBox); // 여기서 closeBox는 위에 있는 closeBox 함수를 실행한것이다.
    }

    // querySelector()로 잡으면 첫번째 .depth1 요소 하나만 잡기 때문에 querySelectorAll로 잡고 forEach문을 사용하던지, 아니면 이벤트 위임을 하든지 둘 중 하나이다.
    // 1. forEach방식으로 구현 -> 기본적인 동작 구조(직관적이라 JS 기초를 다지기 굿.)
    siteDepth1s.forEach((depth1) => {
      depth1.addEventListener("click", (e) => {
        // a링크의 기본 동작 막기 -> 그리고 이 버튼이 토글 전용이니 항상 막아도 무방하다.
        e.preventDefault();

        // 그래도 실무 안정성을 위한다면 조건부로 막거나 토글 버튼과 링크를 분리하는 것이 좋다.
        // a링크를 변수로 잡고 조건부를 설정하여 a링크의 기본 동작을 제어한다.
        const depth1Link = depth1.querySelector("a");
        if (depth1Link) e.preventDefault();

        // 현재 .depth1에 부모인 box 찾기
        // 이 변수가 왜 필요한가? .site-cont안에 여러 개의 .box가 있는데 각 box는 .depth1과 .depth2와 같이 한쌍으로 이룬다.
        // 지금 구현하고자 하는 것은 .depth1는 클릭했을 때 슬라이드 업다운 효과를 주려면 .depth2도 함께 잡아야하기 때문에
        // 클릭된 .depth1이 속한 box를 기준점으로 삼아야, 정확히 그 박스 안의 depth2 하나만을 잡을 수 있다.

        // closest 메서드 기능은 특정 요소에서 시작하여 자기 자신을 포함해 위쪽(부모방향)으로 올라가면서 주어진 CSS 선택자와 일치하는 가장 가까운 조상 요소를 찾는다.
        // 내가 생각한 index값을 맞추는 방법은 DOM변화에 취약하고 유지보수가 커지기 때문에 부모 구조가 DOM관계 그대로 사용하고, 안전하다
        const box = depth1.closest(".box");
        // 박스 요소가 없다면 실행 중단
        if (!box) return;

        // b 는 .site-cont 안에 있는 모든 .box를 하나씩 순회하면서 가리키는 각 박스 요소
        // box는 지금 클릭한 .depth1에 속한 그 박스(const box = depth1.closest('.box))
        document.querySelectorAll(".site-cont .box").forEach((b) => {
          //if (b !== box)는 DOM요소 참조 비교(엄격 비교 - 불일치 연산자)인데, 즉 같은 요소 객체면 false , 다른 요소면 true
          // 그래서 결과적으로 현재 클릭한 박스(box)만 제외하고 그 외의 모든 박스(b)에는 closeBox(b)를 실행 -> 전부 닫음(클릭한 박스 제외)
          if (b !== box) closeBox(b);
        });

        // 현재 박스 토글 -> 이걸 넣어야 --h가 부여된다.
        const willOpen = !box.classList.contains("is-open");
        if (willOpen) openBox(box);
        else closeBox(box);
      });
    });
  }

  siteMapOn();
});
