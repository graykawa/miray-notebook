const Router = require('@koa/router')
const router = new Router()
const { userLogin } = require('../controllers/index.js')
const { sign, verify, refreshVerify } = require('../utils/jwt.js')

router.prefix('/user')  // 所有的路由都要以 /user 开头

router.post('/login', async (ctx) => {
  // 1. 获取请求体中的账号密码
  // post 请求携带的参数都在请求体中
  const { username, password } = ctx.request.body
  // console.log(username, password);
  // 2. 检验账号密码是否合法
  // 去数据库查询账号密码是否正确

  try {
    const res = await userLogin(username, password)
    if (res.length) {  // 找到了有数据
      let data = {
        id: res[0].id,
        username: res[0].username,
        nickname: res[0].nickname,
        create_time: res[0].create_time
      }
      const access_token = sign(data, '1h')
      const refresh_token = sign(data, '7d')
      
      ctx.body = {
        code: '1',
        msg: '登录成功',
        data: data,
        access_token: access_token,  // 短token
        refresh_token: refresh_token  // 长token
      }
    } else {  // 逻辑性错误
      ctx.body = {
        code: '0',
        msg: '账号或密码错误',
        data: {}
      }
    }
  } catch (error) {  // 程序性错误
    ctx.body = {
      code: '-1',
      msg: '服务器异常',
      data: error
    }
  }

})


// 刷新 token
router.post('/refresh', (ctx) => {
  const { refresh_token } = ctx.request.body 
  // 校验refresh_token是否有效
  const decoded = refreshVerify(refresh_token)
  if (decoded.id) {
    // 创建新的 长短 token
    // console.log(decoded);
    const data = {
      id: decoded.id,
      username: decoded.username,
      nickname: decoded.nickname,
      create_time: decoded.create_time
    }
    const access_token = sign(data, '1h')
    const refresh_token = sign(data, '7d')
    ctx.body = {
      code: '1',
      msg: 'token刷新成功',
      access_token: access_token,
      refresh_token: refresh_token
    }

  } else {  // 长 token 都过期了
    ctx.status = 416
    ctx.body = {
      code: '0',
      msg: '登录失效'
    }
  }

})


// 测试 jwt
router.get('/test', verify(), (ctx) => {
  ctx.body = {
    code: '1',
    msg: '测试成功'
  }
})


module.exports = router