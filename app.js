const computer = document.getElementById("computer");
const user = document.querySelectorAll(".user");
const notification = document.querySelector(".notification");
const playAgainBtn = document.querySelector(".btn");

const VALUES = [
  { id: "scissors", value: "✌️" },
  { id: "rock", value: "✊" },
  { id: "paper", value: "🖐" },
];

let i = 0;
const hanlderChange = () => {
  computer.innerText = VALUES[i].value;
  computer.dataset.id = VALUES[i].id;
  if (i === VALUES.length - 1) {
    i = 0;
  } else {
    i++;
  }
};

let interval = setInterval(hanlderChange, 100);

const compare = (user, computer) => {
  const indexUser = VALUES.findIndex((item) => item.id === user);
  const indexComputer = VALUES.findIndex((item) => item.id === computer);
  const check = indexUser - indexComputer;

  if ([-2, 1].includes(check)) {
    return 1;
  } else if ([-1, 2].includes(check)) {
    return -1;
  } else {
    return 0;
  }
};

user.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    clearInterval(interval);
    const valueUser = e.target.id;
    const valueComputer = computer.getAttribute("data-id");
    const result = compare(valueUser, valueComputer);
    let html = "";

    if (result === 1) {
      html = "You Win!";
    } else if (result === -1) {
      html = "You Lose!";
    } else {
      html = "You Tie!";
    }

    notification.innerText = html;
    e.target.classList.add("active");
    playAgainBtn.classList.add("active");

    user.forEach((_btn) => {
      _btn.style.pointerEvents = "none";
    });
  });
});

playAgainBtn.addEventListener("click", () => {
  interval = setInterval(hanlderChange, 100);
  document.querySelector(".user.active").classList.remove("active");
  playAgainBtn.classList.remove("active");
  notification.innerText = "Ready To Play!";
  user.forEach((_btn) => {
    _btn.style.pointerEvents = "";
  });
});
