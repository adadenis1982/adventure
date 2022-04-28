// промежуточная фунция переадресации с главной страницы на необходимую
const home = (req, res, next) => {
  if (req.path === '/') {
    res.redirect('/home');
  }
  next();
};

// промежуточная функция проверки авторизированного пользователя
const sessionChecker = async (req, res, next) => {
  if (req.session.user) {
    res.redirect('/home');
  } else {
    next();
  }
};

// промежуточная функция для очистки куки при истёкшей сессии на сервере
const cookiesCleaner = (req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid').redirect('/');
  } else {
    next();
  }
};

module.exports = { home, sessionChecker, cookiesCleaner };
