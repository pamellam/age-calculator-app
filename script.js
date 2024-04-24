const btn = document.querySelector('.image__wrapper');

const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const dayErrorMsg = document.querySelector('.day .error-message');
const monthErrorMsg = document.querySelector('.month .error-message');
const yearErrorMsg = document.querySelector('.year .error-message');

const today = new Date();

// EventHanlder
btn.addEventListener('click', () => {
  validateForm();
  calculateAge();
});

function validateForm() {
  // Convert inputs to numbers
  const userDay = parseInt(day.value, 10);
  const userMonth = parseInt(month.value, 10);
  const userYear = parseInt(year.value, 10);

  clearErrorsClass();

  // If fields are empty
  if (isNaN(userDay) || isNaN(userMonth) || isNaN(userYear)) {
    dayErrorMsg.textContent = 'The field is required';
    monthErrorMsg.textContent = 'The field is required';
    yearErrorMsg.textContent = 'The field is required';

    addErrorClass();
    return;
  }

  // February validation
  if (userMonth === 2) {
    const isLeapYear =
      (userYear % 4 === 0 && userYear % 100 !== 0) || userYear % 400 === 0;
    if (isLeapYear && userDay > 29) {
      dayErrorMsg.textContent = 'Must be a valid day';
      addErrorClass();
    } else if (!isLeapYear && userDay > 28) {
      dayErrorMsg.textContent = 'Must be a valid day';
      addErrorClass();
    }
  }

  // Months with 30 days validation
  if ([4, 6, 9, 11].includes(userMonth)) {
    if (userDay > 30) {
      dayErrorMsg.textContent = 'Must be a valid day';
      addErrorClass();
    }
  }

  // Month validation
  if (userMonth < 1 || userMonth > 12) {
    monthErrorMsg.textContent = 'Must be a valid month';
    addErrorClass();
  }

  // Day validation
  if (userDay < 1 || userDay > 31) {
    console.log('Must be a valid day');
    dayErrorMsg.textContent = 'Must be a valid day';
    addErrorClass();
  }

  // Year validation
  if (userYear > today.getFullYear()) {
    console.log('Must be in the past');
    yearErrorMsg.textContent = 'Must be in the past';
    addErrorClass();
  }
}

// Show error messages
function addErrorClass() {
  const labels = document.querySelectorAll('#input label');
  const inputs = document.querySelectorAll('#input input');

  labels.forEach((label) => {
    label.classList.add('error');
  });

  inputs.forEach((input) => {
    input.classList.add('error__border');
  });
}

// Clear error messages
function clearErrorsClass() {
  const errorElements = document.querySelectorAll('.error-message');
  const inputs = document.querySelectorAll('#input input');
  const labels = document.querySelectorAll('#input label');

  errorElements.forEach((element) => {
    element.textContent = '';
    element.classList.remove('error');
  });

  inputs.forEach((input) => {
    input.classList.remove('error__border');
  });

  labels.forEach((label) => {
    label.classList.remove('error');
  });
}

// Calculate user's age
function calculateAge() {
  const today = new Date();
  const userDay = parseInt(day.value, 10);
  const userMonth = parseInt(month.value, 10);
  const userYear = parseInt(year.value, 10);

  let years = today.getFullYear() - userYear;
  let months = today.getMonth() + 1 - userMonth;
  let days = today.getDate() - userDay;

  // If the birthdate is in the future
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12; // Add 12 months to handle negative values
  }

  // If the birthdate hasn't occurred yet this month
  if (days < 0) {
    months--; // Decrement months
    const lastDayOfMonth = new Date(userYear, userMonth, 0).getDate();
    days += lastDayOfMonth; // Add the number of days in the birth month
  }

  // Update the spans with the calculated age components
  document.querySelector('.years').textContent = years;
  document.querySelector('.months').textContent = months;
  document.querySelector('.days').textContent = days;
}
