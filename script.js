const userInputEl = document.getElementById('user-input');
const checkboxSetSpacesEl = document.getElementById('checkbox-space');
const checkboxSetCharLimitEl = document.getElementById('checkbox-set-limit');
const inputCharLimitEl = document.getElementById('input-char-limit');
const noSpaceTextEl = document.querySelector('.no-space-text');
const limitWarningEl = document.querySelector('.limit-warning-box');
const logoThemeEl = document.querySelector('.logo-theme');
const btnMoon = document.querySelector('.btn-moon');
const btnSun = document.querySelector('.btn-sun');
let characterCounter = 0;
let wordCounter = 0;
let sentenceCounter = 0;
let data = []; // Global array to store letter counts.
let chartInstance = null; //Store Chart.js instance

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
  const letterDensityTextEl = document.querySelector('.letter-density-text');

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

  if (currentLength > 0) {
    letterDensityTextEl.style.visibility = 'hidden';
  } else {
    letterDensityTextEl.style.visibility = 'visible';
  }

  displayCharCount(e.target.value);
  displayWordCount(e.target.value);
  displaySentenceCount(e.target.value);
  getLetterDensity(e.target.value);
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

function getLetterDensity(str) {
  const letterCounts = {}; //object to track letter frequencies
  const lettersOnly = str.toUpperCase().replace(/[^A-Z]/g, ''); //keep only A-Z. Removes non-letters

  for (let letter of lettersOnly) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1; //if letterCounts[a] does not exist, it'll be undefined which will then short circuit to equal 0. And then we increment by 1 to signify the letter has one instance so far.
  }
  // Convert letterCounts object into array of {letter, count} objects
  data = Object.keys(letterCounts)
    .map((letter) => ({
      letter,
      count: letterCounts[letter],
    }))
    .sort((a, b) => b.count - a.count); //sort by letter count descening order

  //Call function to update the chart
  renderLetterDensityChart();
}

function renderLetterDensityChart() {
  const ctx = document.getElementById('myChart').getContext('2d');

  //Destroy previous chart instance if it exists (prevents duplicate charts)
  if (chartInstance) chartInstance.destroy();

  //Calculate total count of valid letters
  const totalLetters = data.reduce((sum, item) => sum + item.count, 0);

  //Create new chart.js instance
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map((item) => item.letter), // X-axis labels (letters)
      datasets: [
        {
          label: 'Letter Frequency',
          data: data.map((item) => item.count), // Y-axis values (counts)
          backgroundColor: 'hsl(274, 90%, 80%)', // Bar color
          borderWidth: 1,
          borderRadius: 100,
          borderSkipped: false,
          barThickness: 20, //adjust bar thinkness
          categoryPercentage: 0.7,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          right: 100, // 👈 Adds extra space on the right for labels
        },
      },
      plugins: {
        legend: {
          display: false, // Hide legend
        },
        datalabels: {
          anchor: 'end', // Position label at the end of the bar
          align: 'end', // Align it towards the end
          // formatter: (value) => value, // Display the value as is

          formatter: (value) => {
            const percentage = ((value / totalLetters) * 100).toFixed(2); //Calculate % with 2 decimal places
            return `${value} (${percentage}%)`;
          },
          color: getFontColor,
          font: {
            size: 16,
          },
        },
      },
      indexAxis: 'y',
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            display: false, // Hides x-axis labels
            color: getFontColor(),
          },
          grid: {
            display: false,
            drawTicks: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            align: 'start',
            crossAlign: 'center',
            font: {
              size: 16,
            },
            color: getFontColor(),
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}

//Dark Mode Functionality for Chart
//Function to determine the font color based on dark mode
function getFontColor() {
  return document.body.classList.contains('dark-mode') ? '#fff' : '#000';
}

//Dark Mode Functionality for rest of app
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');

  logoThemeEl.src = !isDarkMode ? './assets/images/logo-light-theme.svg' : './assets/images/logo-dark-theme.svg';

  //Toggle button visibility
  btnMoon.classList.toggle('visible-btn', !isDarkMode);
  btnMoon.classList.toggle('hidden-btn', isDarkMode);
  btnSun.classList.toggle('visible-btn', isDarkMode);
  btnSun.classList.toggle('hidden-btn', !isDarkMode);

  renderLetterDensityChart();
}

btnMoon.addEventListener('click', toggleTheme);
btnSun.addEventListener('click', toggleTheme);
