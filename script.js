const userInputEl = document.getElementById('user-input');
let characterCounter = 0;

userInputEl.addEventListener('input', function (e) {
  displayCharCount(e.target.value);
});

function displayCharCount(str) {
  characterCounter = str.length;
  formattedCharStr = characterCounter.toString().padStart(2, '0');
  document.querySelector('.character-count').innerText = formattedCharStr;
}
