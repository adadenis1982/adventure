const router = require('express').Router();
const { format } = require('date-fns');
const { Message } = require('../db/models');

router.get('/', async (req, res) => {
  if (req.session.user) {
    const auth = req.session.user;
    const message = await Message.findAll({ where: { author: auth.id }, raw: true });
    for (let i = 0; i < message.length; i += 1) {
      message[i].createdAt = format(message[i].createdAt, 'dd/MM/yy');
    }
    return res.render('profile', { auth, message });
  }
  return res.redirect('/home');
});

module.exports = router;
