const form = document.getElementById('contactForm');
const inputs = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  subject: document.getElementById('subject'),
  message: document.getElementById('message'),
};
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const charCount = document.getElementById('charCount');

function validateName() {
  const val = inputs.name.value.trim();
  const error = document.getElementById('nameError');
  if (val.length < 2) {
    error.textContent = 'Name must be at least 2 characters.';
    setInvalid(inputs.name);
    return false;
  }
  error.textContent = '';
  setValid(inputs.name);
  return true;
}

function validateEmail() {
  const val = inputs.email.value.trim();
  const error = document.getElementById('emailError');
  const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(val)) {
    error.textContent = 'Invalid email format.';
    setInvalid(inputs.email);
    return false;
  }
  error.textContent = '';
  setValid(inputs.email);
  return true;
}

function validatePhone() {
  const val = inputs.phone.value.trim();
  const error = document.getElementById('phoneError');
  const regex = /^\d{10}$/;
  if (!regex.test(val)) {
    error.textContent = 'Phone must be 10 digits.';
    setInvalid(inputs.phone);
    return false;
  }
  error.textContent = '';
  setValid(inputs.phone);
  return true;
}

function validateSubject() {
  const error = document.getElementById('subjectError');
  if (inputs.subject.value === '') {
    error.textContent = 'Please select a subject.';
    setInvalid(inputs.subject);
    return false;
  }
  error.textContent = '';
  setValid(inputs.subject);
  return true;
}

function validateContactMethod() {
  const radios = document.querySelectorAll('input[name="contactMethod"]');
  const error = document.getElementById('contactMethodError');
  for (const r of radios) {
    if (r.checked) {
      error.textContent = '';
      return true;
    }
  }
  error.textContent = 'Select a contact method.';
  return false;
}

function validateMessage() {
  const val = inputs.message.value.trim();
  const error = document.getElementById('messageError');
  if (val.length < 10) {
    error.textContent = 'Message must be at least 10 characters.';
    setInvalid(inputs.message);
    return false;
  }
  error.textContent = '';
  setValid(inputs.message);
  return true;
}

function setValid(input) {
  input.classList.remove('invalid');
  input.classList.add('valid');
}

function setInvalid(input) {
  input.classList.remove('valid');
  input.classList.add('invalid');
}

function updateCharCounter() {
  charCount.textContent = inputs.message.value.length;
}

function isFormValid() {
  return (
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateSubject() &&
    validateContactMethod() &&
    validateMessage()
  );
}

Object.values(inputs).forEach(input => {
  input.addEventListener('input', () => {
    updateCharCounter();
    submitBtn.disabled = !isFormValid();
  });
});
document.querySelectorAll('input[name="contactMethod"]').forEach(r => {
  r.addEventListener('change', () => {
    validateContactMethod();
    submitBtn.disabled = !isFormValid();
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (isFormValid()) {
    successMessage.style.display = 'block';
    form.reset();
    Object.values(inputs).forEach(i => i.classList.remove('valid'));
    submitBtn.disabled = true;
    charCount.textContent = '0';
  }
});
