console.log('Attached');

// Create and destroy a DOM element
const btnCreate = document.getElementById('btnCreate');
const btnDestroy = document.getElementById('btnDestroy');
const elCreateDestroy = document.getElementById('create-destroy');

btnCreate.addEventListener('click', function () {
  const newEl = document.createElement('div');
  newEl.classList.add('alert', 'alert-primary');

  // newEl.innerHTML = '<p class="m-0">Hello World</p>';

  const newSubEl = document.createElement('p');
  newSubEl.className = 'm-0';
  newSubEl.textContent = 'Hello World';

  newEl.appendChild(newSubEl);
  elCreateDestroy.appendChild(newEl);
});
btnDestroy.addEventListener('click', function () {
  elCreateDestroy.innerHTML = '';
});

// Hide and show a DOM element
const btnShow = document.getElementById('btnShow');
const btnHide = document.getElementById('btnHide');
const elHideShow = document.getElementById('hide-show');

btnHide.addEventListener('click', () => {
  elHideShow.classList.add('d-none');
  // elHideShow.setAttribute('hidden', true);
});
btnShow.addEventListener('click', () => {
  elHideShow.classList.remove('d-none');
  // elHideShow.setAttribute('hidden', false);
  // elHideShow.removeAttribute('hidden');
});

const btnToggleShow = document.getElementById('btnToggleShow');
const elHideShowToggle = document.getElementById('hide-show-toggle');
btnToggleShow.addEventListener('click', () => {
  elHideShowToggle.hidden = !elHideShowToggle.hidden;
});

// Set interval
var elQuestion = document.querySelector('#question');

var time = 10;
var questionsRemaining = 10;

var interval = setInterval(function () {
  // check condition to keep running quiz
  if (time > 0 && questionsRemaining > 0) {
    // after a question is answered
    questionsRemaining--;
  }
  // condition on quiz end
  else {
    clearInterval(interval);
    // compute score
    // get input
    // save score
    // create HS table
  }
}, 1000);
