const userInputEl = document.getElementById('user-input');
let characterCountEl = document.querySelector('.character-count');
let characterCounter = 0;

userInputEl.addEventListener('input', function (e) {
  // console.log(e.target.value);
  characterCounter = userInputEl.value.length;
  characterCountEl.innerText = characterCounter;
});
