const router = require('express').Router();
const { User, Message } = require('../db/models');

router.get('/', (req, res) => {
  if (req.session.user) {
    const auth = !!req.session.user;
    return res.render('home', { auth });
  }
  return res.render('home');
});

router.route('/logout').get((req, res) => {
  const { user } = req.session;

  if (user) {
    req.session.destroy();

    res.clearCookie('user_sid');

    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});

router.post('/', async (req, res) => {
  const { subject, email, message } = req.body;

  const userInDatabase = await User.findOne({ where: { email } });

  console.log(userInDatabase);

  if (!userInDatabase) {
    res.status(403).json({ create: false, message: 'Вам необходимо зарегистрироваться' });
  } else {
    try {
      await Message.create({
        author: userInDatabase.id,
        subject,
        message,
      });

      res.status(201).json({ create: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
