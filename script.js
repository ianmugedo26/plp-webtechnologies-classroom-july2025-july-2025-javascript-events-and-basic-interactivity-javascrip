// NIGHT VISION TOGGLE (Dark/Light Mode)
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  themeToggleBtn.textContent = body.classList.contains('dark-mode')
    ? 'Disable Night Vision'
    : 'Toggle Night Vision';
});


// MISSION IMPACT TRACKER (Counter)
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const counterValue = document.getElementById('counter-value');
const counterMessage = document.getElementById('counter-message');

let counter = 0;

function updateMissionMessage() {
  if (counter === 0) {
    counterMessage.textContent = "Time to rally the troops!";
  } else if (counter < 5) {
    counterMessage.textContent = "Initial recon complete.";
  } else if (counter < 10) {
    counterMessage.textContent = "Unit recruitment in progress.";
  } else {
    counterMessage.textContent = "Top recruiter! Mission impact: MAXIMUM.";
  }
}

incrementBtn.addEventListener('click', () => {
  counter++;
  counterValue.textContent = counter;
  updateMissionMessage();
});

decrementBtn.addEventListener('click', () => {
  if (counter > 0) {
    counter--;
    counterValue.textContent = counter;
    updateMissionMessage();
  }
});

updateMissionMessage(); // Init message


// INTEL BRIEFING (FAQ Toggle)
document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('.toggle-icon');

    // Close all other answers
    document.querySelectorAll('.faq-answer').forEach((a) => (a.style.maxHeight = null));
    document.querySelectorAll('.toggle-icon').forEach((i) => (i.textContent = '+'));

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      icon.textContent = '+';
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      icon.textContent = '−';
    }
  });
});


// ENLISTMENT FORM VALIDATION
const form = document.getElementById('enrollment-form');
const successMsg = document.getElementById('success-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  // Reset errors
  document.querySelectorAll('.error-message').forEach((el) => (el.textContent = ''));

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const county = form.county.value;
  const password = form.password.value;
  const confirmPassword = form['confirm-password'].value;
  const terms = form.terms.checked;

  // Name
  if (!name) {
    valid = false;
    document.getElementById('name-error').textContent = 'Name is required.';
  }

  // Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    valid = false;
    document.getElementById('email-error').textContent = 'Email is required.';
  } else if (!emailPattern.test(email)) {
    valid = false;
    document.getElementById('email-error').textContent = 'Enter a valid email.';
  }

  // Phone (Kenyan pattern)
  const phonePattern = /^07\d{8}$/;
  if (!phone) {
    valid = false;
    document.getElementById('phone-error').textContent = 'Phone number is required.';
  } else if (!phonePattern.test(phone)) {
    valid = false;
    document.getElementById('phone-error').textContent = 'Use the format 07XXXXXXXX.';
  }

  // County
  if (!county) {
    valid = false;
    document.getElementById('county-error').textContent = 'Select your operational base.';
  }

  // Passwords
  if (password.length < 6) {
    valid = false;
    document.getElementById('password-error').textContent = 'Minimum 6 characters.';
  }
  if (confirmPassword !== password) {
    valid = false;
    document.getElementById('confirm-password-error').textContent = 'Access codes do not match.';
  }

  // Terms
  if (!terms) {
    valid = false;
    document.getElementById('terms-error').textContent = 'You must agree to the Ironclad Code.';
  }

  if (valid) {
    form.style.display = 'none';
    successMsg.removeAttribute('hidden');
  }
});
