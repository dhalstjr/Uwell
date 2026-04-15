const menuToggle = document.getElementById("menuToggle");
const gnb = document.getElementById("gnb");

if (menuToggle && gnb) {
  menuToggle.addEventListener("click", () => {
    const isOpen = gnb.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  gnb.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      gnb.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");

if (reservationForm instanceof HTMLFormElement && formMessage) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!reservationForm.checkValidity()) {
      formMessage.textContent = "필수 항목을 입력해 주세요.";
      formMessage.style.color = "#b33939";
      return;
    }

    const formData = new FormData(reservationForm);
    const payload = Object.fromEntries(formData.entries());
    console.log("[예약 신청 데이터]", payload);

    formMessage.textContent = "예약 신청이 접수되었습니다. 빠르게 연락드릴게요.";
    formMessage.style.color = "#2f6f2f";
    reservationForm.reset();
  });
}
