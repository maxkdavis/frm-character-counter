const userInputEl = document.getElementById('user-input');
const checkboxSetSpacesEl = document.getElementById('checkbox-space');
const checkboxSetCharLimitEl = document.getElementById('checkbox-set-limit');
const inputCharLimitEl = document.getElementById('input-char-limit');
const noSpaceTextEl = document.querySelector('.no-space-text');
let characterCounter = 0;
let wordCounter = 0;
let sentenceCounter = 0;

// Handles 'Exclude Spaces' checkbox
checkboxSetSpacesEl.addEventListener('change', function () {
  noSpaceTextEl.classList.toggle('hidden');
});

// toggle 'Set Character Limit' checkbox
checkboxSetCharLimitEl.addEventListener('change', function () {
  inputCharLimitEl.style.visibility = this.checked ? 'visible' : 'hidden';
  inputCharLimitEl.value = ''; // clear input when unchecked
  userInputEl.classList.remove('limit-exceeded');
});

//Handle's any changes within our textarea
userInputEl.addEventListener('input', function (e) {
  //handle character limit on input
  const charLimit = parseInt(inputCharLimitEl.value, 10); // Get limit from user input
  const currentLength = this.value.length;

  if (!isNaN(charLimit) && currentLength > charLimit) {
    this.classList.add('limit-exceeded');
  } else {
    this.classList.remove('limit-exceeded');
  }

  displayCharCount(e.target.value);
  displayWordCount(e.target.value);
  displaySentenceCount(e.target.value);
});

function displayCharCount(str) {
  if (checkboxSetSpacesEl.checked) {
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

function displaySentenceCount(str) {
  const trimmedStr = str.trim();
  //using a regular expression on one or more occurrences of . ? or !
  const sentences = trimmedStr ? trimmedStr.split(/[.!?]+/).filter((sentence) => sentence.trim() !== '') : [];
  sentenceCounter = sentences.length;
  formattedSentencesStr = sentenceCounter.toString().padStart(2, '0');
  document.querySelector('.sentence-count').innerText = formattedSentencesStr;
}
