const Koa = require('koa')
const app = new Koa()
const userRouter = require('./router/user.js')
const cors = require('@koa/cors')
const { bodyParser } = require('@koa/bodyparser')

app.use(cors())  // 告诉浏览器，允许前端跨域请求我
app.use(bodyParser());  // 辅助 koa 解析请求体中的数据



// app.use(async (ctx) => {
//   console.log(ctx);
//   if (ctx.request.url === '/home') {
//     ctx.body = 'hello koa'
//   } else if (ctx.request.url === '/login') {
//     ctx.body = '登录需要的数据'
//   }
// })

// app.use((ctx, next) => {
//   console.log(1);
//   next()
// })
// app.use((ctx, next) => {
//   console.log(2);
// })


// 1. 被 app.use 调用的函数，中一定拥有参数 ctx
// 2. userRouter.routes() 就是 user.js 中的所有的路由的回调函数
app.use(userRouter.routes(), userRouter.allowedMethods())


app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})