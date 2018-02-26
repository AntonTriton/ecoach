const Koa = require('koa');
const app = new Koa();

let cors = require('koa2-cors');
let db = require('./db')
let User = require('./db/schemas/User')

//const koaRouter = require('koa-router');
//const router = new koaRouter();

// trust proxy
app.proxy = true
// body parser
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
app.use(cors())
//
// // Sessions
// const convert = require('koa-convert') // necessary until koa-generic-session has been updated to support koa@2
// const session = require('koa-generic-session')
// app.keys = ['secret']
// app.use(convert(session()))

const session = require('koa-session')
app.keys = ['your-session-secret']
app.use(session({}, app))
//
let router = require('./routes');
let passport = require('./passport')
app.use(passport.initialize())
app.use(passport.session())

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(function(ctx, next) {
  console.log('1');
  if (ctx.isAuthenticated()) {
    console.log('2');
    return next()
  } else {
    console.log('3');
    ctx.redirect('/')
  }
})

// response
// app.use(ctx => {
//   console.log('ctx');
//   ctx.body = 'Hello Koa';
// });

//app.use(router.routes());

console.log('server2');
app.listen(8000);
