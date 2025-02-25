const userInputEl = document.getElementById('user-input');
const spacesCheckbox = document.getElementById('checkbox-space');
let characterCounter = 0;

userInputEl.addEventListener('input', function (e) {
  displayCharCount(e.target.value);
});

function displayCharCount(str) {
  if (!spacesCheckbox.checked) {
    characterCounter = str.length;
    formattedCharStr = characterCounter.toString().padStart(2, '0');
    document.querySelector('.character-count').innerText = formattedCharStr;
  } else {
    const splitStr = str.split('');
    const filteredStr = splitStr.filter((i) => i !== ' ').join('');
    characterCounter = filteredStr.length;
    formattedCharStr = characterCounter.toString().padStart(2, '0');
    document.querySelector('.character-count').innerText = formattedCharStr;
  }
}

spacesCheckbox.addEventListener('change', function () {
  document.querySelector('.excludedText').classList.toggle('excludedText');
});
