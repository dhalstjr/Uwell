//lenis 기본 사용 방법.
//   const lenis = new Lenis();

//   lenis.on("scroll", (e) => {
//     console.log(e);
//   });

//   function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
//   }

//   requestAnimationFrame(raf);

// lenis 라이브러리 적용. *기본 사용 방법과 다른 사용 방법
let lenis;
let lenisRafld;

// lenis 초기화 함수
// 기본 방법과 다른 점
// 1. 조건부 초기화 가드
// if  (typeof Lenis != "undefined" && !lenis && window.innerWidth > 1240) -> 라이브러리 로드 확인, 중복 초기화 방지, 데스크톱(>1240px)에서만 활성만.
// 기본 예시들은 보통 new lenis()를 바로 호출하고, 뷰포트 조건은 두지 않습니다.
function initLenis() {
  // 아래 줄이 하는 일은 lenis가 로드가 안됐거나 이미 초기화돼 있거나 화면이 1240px 이하라면 함수 실행 종료.
  // 왜 typeof를 사용하는 가? : 선언되지 않은 식별자에 직접 접근하면 ReferenceError가 나지만,
  // typeof를 사용하면 에러없이 안전하게 존재 여부를 검사할 수 있기 떄문. typeof는 항상 문자열을 반환.
  if (typeof Lenis !== "undefined" && !lenis && window.innerWidth > 1240) {
    // 3. 옵션 튜닝 -> 기본 적용되는 옵션 중에서 값만 바꾼 것과 일부는 옵션 기본 유지
    // 대문자 소문자 철자 확인.
    lenis = new Lenis({
      duration: 1.0, // duration은 있는 옵션에서 값만 1.2로 변경 (참고 - lerp를 지정하면 duration은 무시. 둘 중 하나만 의미가 있음.)
      infinite: false, // 이 옵션도 원래 있는 옵션. 기본값 유지 (무한 스크롤 기능)
      gestureOrientation: "vertical", // 이 옵션도 원래 있는 옵션에 기본값 유지. (제스처 (휄/터치)의 방향 기능)
      normalizeWheel: false, // 이 옵션은 기본 옵션에 없음. normalize-wheel이라는 라이브러리와 연동해서 사용한 것 같음.
      smoothTouch: true, // 이 기능도 lenis 기능에 없음.
    });

    // 2. 커스텀 RAF 루프 + 취소용 ID 저장
    // raf(time) {lenis.raf(time) ; lenisRafld = requestAnimationFrame(raf);} -> 수동으로 requestAnimationFrame을 돌리고 ID를 전역에 저장(아까 저 위에 let으로 변수를 저장했던 곳)
    // 기본 예시는 raf를 돌리긴 하지만, ID를 저장해  해제까지 고려하는 경우는 드물다.
    function raf(time) {
      lenis.raf(time);
      lenisRafId = requestAnimationFrame(raf);
    }

    lenisRafId = requestAnimationFrame(raf);

    // 이벤트 리스너
    addScrollEventListener();
  }
}

// Lenis 제거 함수
function destroyLenis() {
  if (lenis) {
    cancelAnimationFrame(lenisRafld); // cancelAnimationFrame은 브라우저 API, requestAnimationFrame으로 돌리던 렌더 루프를 중단. lenis를 raf로 구동했으니 필수적.
    lenis.destroy(); //lenis가 내부에서 등록한 휠/터치/스크롤 리스너/상태/옵저버 등을 깨끗하게 해제. (lenis 라이브러리 API)

    // 참조를 null로 하여 더이상 사용하지 않는 인스턴스/ID에 대한 참조를 끊어 메모리 누수 방지.
    lenis = null;
    lenisRafld = null;
  }

  removeEventListener();
  // 이 함수는 rAF 중단 > lenis 내부 중단 > 참조 헤제 > 외부 리스너 해제(자신이 만든)까지 정석 해제 순서를 잘 지킨 코드
}

// 이런 구조가 필요한 이유는 lenis/GSAP/맞춤 스무스 스크롤을 걸면, 안쪽의 스크롤 가능한 박스(지도 패널, 사이드 리스트 등)에서 휠이 발생해도 바깥 문서가 스르륵 움직여 버리는 "스크롤 체이닝" 문제가 생길 수 있어요.
// 그래서 내부 박스에 직접 wheel 리스너 달고
// 그 박스가 아직 스크롤한 여지가 있으면 그 박스만 스크롤되고,  끝에 닿았을 때만 페이지(바깥)가 스크롤돼야 자연스럽죠.

// 내부 스크롤 가능한 요소 이벤트 리스너 추가
function addScrollEventListener() {
  const scrollableContainers = document.querySelectorAll(".aside .map_cont");
  scrollableContainers.forEach((container) => {
    // 선택된 각 컨테이너에 wheel 리스너 등록 : 마우스 휠 스크롤이 발생하면 우리의 핸들러(handleWheelEvent)가 먼저 받도록 연결합니다.
    // handle Wheel Event는 사용자의 마우스 휠이나 동작에 반응하여 사용자 지정 동작을 수행하는 JavaScript기능.
    container.addEventListener("wheel", handleWheelEvent, {
      // 휠 이벤트에서 e.preventDefault()를 쓰려면 반드시 passive : false가 필요합니다.
      passive: false,
    });
  });
}

// 내부 스크롤 가능한 요소 이벤트 리스너 제거
function removeEventListener() {
  const scrollableContainers = document.querySelectorAll(".aside .map_cont");
  scrollableContainers.forEach((container) => {
    container.removeEventListener("wheel", handleWheelEvent);
  });
}

initLenis();

// 리사이즈 시 resize 활성화 및 비활성화 (화면 크기에 따른 lenis설정. )
// 반응형
window.addEventListener("resize", () => {
  if (window.innerWidth > 1240) {
    initLenis(); // 1240px이 넘으면 lenis 실행 (PC화면에서는 Lenis 초기화)
  } else {
    destroyLenis(); // 1240px이 넘지않으면 lenis 비활성화(모바일 화면에서는 lenis 비활성화)
  }
});

// lenis 스크롤 애니메이션 프레임 관리
// lenis의 표준 rAF 루프를 함수로 감싼 코드.
function smoothScroll() {
  function raf(time) {
    if (lenis) lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// jQuery DOM 형식
// $(document).ready(function () {...});

// javascript DOM 형식
document.addEventListener("DOMContentLoaded", function () {});
