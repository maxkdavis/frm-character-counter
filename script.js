const userInputEl = document.getElementById('user-input');
const spacesCheckbox = document.getElementById('checkbox-space');
const noSpaceTextEl = document.querySelector('.no-space-text');
let characterCounter = 0;
let wordCounter = 0;

spacesCheckbox.addEventListener('change', function () {
  noSpaceTextEl.classList.toggle('hidden');
});

userInputEl.addEventListener('input', function (e) {
  displayCharCount(e.target.value);
  displayWordCount(e.target.value);
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

function displayWordCount(str) {
  const trimmedStr = str.trim(); //remove leading and trailing spaces
  // "if trimmedStr is truthy then create and array where each word from my sentence that's separated by a space (' ') becomes an array item. From there chain on the filter() array method and filter for array items that don't equal and empty string. If trimmedStr is falsy just return an empty array (0 in length)
  const words = trimmedStr ? trimmedStr.split(' ').filter((word) => word !== '') : [];
  wordCounter = words.length;
  formattedWordStr = wordCounter.toString().padStart(2, '0');
  document.querySelector('.word-count').innerText = formattedWordStr;
}
