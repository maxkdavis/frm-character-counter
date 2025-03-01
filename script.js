const userInputEl = document.getElementById('user-input');
const checkboxSetSpacesEl = document.getElementById('checkbox-space');
const checkboxSetCharLimitEl = document.getElementById('checkbox-set-limit');
const inputCharLimitEl = document.getElementById('input-char-limit');
const noSpaceTextEl = document.querySelector('.no-space-text');
const limitWarningEl = document.querySelector('.limit-warning-box');
let characterCounter = 0;
let wordCounter = 0;
let sentenceCounter = 0;
let data = []; // Global array to store letter counts.

// Handles 'Exclude Spaces' checkbox
checkboxSetSpacesEl.addEventListener('change', function () {
  noSpaceTextEl.classList.toggle('hidden');
});

// toggle 'Set Character Limit' checkbox
checkboxSetCharLimitEl.addEventListener('change', function () {
  inputCharLimitEl.style.visibility = this.checked ? 'visible' : 'hidden';
  inputCharLimitEl.value = ''; // clear input when unchecked
  userInputEl.classList.remove('limit-exceeded');
  limitWarningEl.classList.remove('warning');
});

//Handle's any changes within our textarea
userInputEl.addEventListener('input', function (e) {
  //handle character limit on input
  const charLimit = parseInt(inputCharLimitEl.value, 10); // Get limit from user input
  const currentLength = this.value.length;

  if (!isNaN(charLimit) && currentLength > charLimit) {
    this.classList.add('limit-exceeded');
    limitWarningEl.classList.add('warning');
    document.querySelector(
      '.limit-warning-text'
    ).textContent = `Limit reached! Your text exceeds ${inputCharLimitEl.value} characters.`;
    this.value = this.value.substring(0, charLimit); //trim extra characters
  } else {
    this.classList.remove('limit-exceeded');
    limitWarningEl.classList.remove('warning');
  }

  displayCharCount(e.target.value);
  displayWordCount(e.target.value);
  displaySentenceCount(e.target.value);
  renderLetterDensity(e.target.value);
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
  //call function to display 'approx reading time'
  displayReadTime(wordCounter);
}

function displaySentenceCount(str) {
  const trimmedStr = str.trim();
  //using a regular expression on one or more occurrences of . ? or !
  const sentences = trimmedStr ? trimmedStr.split(/[.!?]+/).filter((sentence) => sentence.trim() !== '') : [];
  sentenceCounter = sentences.length;
  formattedSentencesStr = sentenceCounter.toString().padStart(2, '0');
  document.querySelector('.sentence-count').innerText = formattedSentencesStr;
}

function displayReadTime(numWords) {
  const readTimeEl = document.querySelector('.duration');
  const readTime =
    numWords === 0 ? `0 minutes` : numWords < 200 ? `<1 minute` : `${Math.floor(numWords / 200)} minutes`;
  readTimeEl.innerText = readTime;
}

function renderLetterDensity(str) {
  const letterCounts = {}; //object to track letter frequencies
  const lettersOnly = str.toUpperCase().replace(/[^A-Z]/g, ''); //keep only A-Z. Removes non-letters

  for (let letter of lettersOnly) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1; //if letterCounts[a] does not exist, it'll be undefined which will then short circuit to equal 0. And then we increment by 1 to signify the letter has one instance so far.
  }
  // console.log(letterCounts);
  // Convert letterCounts object into array of {letter, count} objects
  data = Object.keys(letterCounts)
    .map((letter) => ({
      letter,
      count: letterCounts[letter],
    }))
    .sort((a, b) => b.count - a.count); //sort by letter count descening order
  console.log(data);
}

// const ctx = document.getElementById('myChart');

// new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });
