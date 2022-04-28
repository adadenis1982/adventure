const navbar = document.querySelector('.navbar_list');
const slider = document.querySelector('.header');
const scrooldown = document.querySelector('.fa-arrow-down');
const scroolup = document.querySelector('.fa-arrow-up');

// scroll domn home section
scrooldown.addEventListener('click', () => {
  window.scroll({
    top: 2100,
    left: 0,
    behavior: 'smooth',
  });
});

// scroll up last section
scroolup.addEventListener('click', () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

// scroll home section on all section
navbar.addEventListener('click', (event) => {
  event.preventDefault();

  console.log(event.target.classList.contains('active'));

  if (event.target.classList.contains('active')) {
    document
      .querySelector('.active_default')
      .classList.remove('active_default');

    event.target.classList.add('active_default');

    switch (document.querySelector('.active_default').getAttribute('href')) {
      case 'home':
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        break;
      case 'about':
        window.scroll({
          top: 1300,
          left: 0,
          behavior: 'smooth',
        });
        break;
      case 'form':
        window.scroll({
          top: 2100,
          left: 0,
          behavior: 'smooth',
        });
        break;
      case 'trial':
        window.scroll({
          top: 2800,
          left: 0,
          behavior: 'smooth',
        });
        break;
      default:
        window.location = `/${document
          .querySelector('.active_default')
          .getAttribute('href')}`;
    }
  }
});

// slider home section rigth
document.querySelector('#slider_next').addEventListener('click', () => {
  switch (
    window
      .getComputedStyle(slider)
      .getPropertyValue('background-image')
      .split('url("http://localhost:3000/image/')[1]
  ) {
    case '1.jpg")':
      slider.style.backgroundImage = 'url(../image/2.jpg)';
      break;
    case '2.jpg")':
      slider.style.backgroundImage = 'url(../image/3.jpg)';
      break;
    default:
      slider.style.backgroundImage = 'url(../image/1.jpg)';
  }
});

// slider home section rigth
document.querySelector('#slider_prev').addEventListener('click', () => {
  switch (
    window
      .getComputedStyle(slider)
      .getPropertyValue('background-image')
      .split('url("http://localhost:3000/image/')[1]
  ) {
    case '1.jpg")':
      slider.style.backgroundImage = 'url(../image/3.jpg)';
      break;
    case '3.jpg")':
      slider.style.backgroundImage = 'url(../image/2.jpg)';
      break;
    default:
      slider.style.backgroundImage = 'url(../image/1.jpg)';
  }
});

// Send message
const form = document.querySelector('#form_message');
const feedback = document.querySelector('#feedback');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {
    email: { value: email },
    subject: { value: subject },
    message: { value: message },
  } = event.target;

  const response = await fetch('/home', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, email, message }),
  });

  const data = await response.json();

  if (data.create) {
    window.location = '/home';
  } else {
    feedback.textContent = data.message;
    feedback.style.display = 'block';
  }
});

// burger menu
const navbarBurger = document.querySelector('.navbar_burger');
const navbarMenu = document.querySelector('.navbar_menu');
const back = document.querySelector('body');

navbarBurger.onclick = () => {
  navbarBurger.classList.toggle('active');
  navbarMenu.classList.toggle('active');
  back.classList.toggle('lock');
};
