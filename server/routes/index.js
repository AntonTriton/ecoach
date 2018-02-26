const koaRouter = require('koa-router');
const router = koaRouter();

let passport = require('../passport')
let User = require('../db/schemas/User')

router.get('/error', function (ctx, next){
    //this.body = yield render('index.html');
    ctx.body='error'
});
//
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/error'
}));

router.get('/', function (ctx, next) {
  console.log('123');
  ctx.body = 'Hello ooo';
});

// router.get('/registration',  (ctx, next) => {
//     console.log('registration', ctx.body.name);
//     ctx.body = "Good2!"
// });

router.post('/registration',  (ctx, next) => {
  console.log('!!!');
      console.log('registration', ctx.request.body.name);
      ctx.status = 200;
      ctx.body = "Good2!"

      let user = new User({
        name: ctx.request.body.name,
        email: ctx.request.body.email,
        password: ctx.request.body.password, 
        registrationDate: new Date() });

      user.save(function (err, fluffy) {
        if (err) return console.error(err);
        console.log('mongoose save');

        User.find(function (err, users) {
          if (err) return console.error(err);
          console.log(users);
        })
      });
});

module.exports = router
