const form = document.querySelector('#register');
const inputPassword = document.querySelector('#inputPassword');
const inputConfirmPassword = document.querySelector('#inputConfirmPassword');
const feedback = document.querySelector('#feedback');

function correctPassword() {
  if (inputPassword.value !== inputConfirmPassword.value) {
    feedback.textContent = 'Пароли не совпадают';
    feedback.style.display = 'block';
    return false;
  }

  feedback.style.display = 'none';
  return true;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (correctPassword()) {
    const {
      name: { value: name },
      email: { value: email },
      password: { value: password },
    } = event.target;

    console.log(name);

    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    console.log(data);

    if (data.registration) {
      window.location = '/home';
    } else {
      feedback.textContent = data.message;
      feedback.style.display = 'block';
    }
  }
});
