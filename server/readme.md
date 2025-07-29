# 服务端逻辑分层
1. 路由层: 处理当前端请求不同的路径时，执行对应的响应逻辑
2. 控制层: 执行响应逻辑时，调用服务层的某个方法
3. 服务层
4. 数据层

# 框架
koa 

{
  request: {
    method: 'GET',
    url: '/home',
    header: {
      host: 'localhost:3000',
      connection: 'keep-alive',
      'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'sec-fetch-site': 'none',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-user': '?1',
      'sec-fetch-dest': 'document',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,pt;q=0.7,zh-TW;q=0.6'
    }
  },
  response: {
    status: 404,
    message: 'Not Found',
    header: [Object: null prototype] {}
  },
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  originalUrl: '/home',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>'
}

# 项目梳理
- http请求体， http响应体

- 路由: 处理当前端请求不同的路径时，执行对应的响应逻辑

- 使用路由，要将路由中所有的回调都 use 

- 跨域：
 1. https://   192.168.3.1    :3000    /home
      协议          域名         端口      路径
 2. 浏览器自带同源策略：协议，域名，端口都必须一致   （为了保障服务端的安全）
 3. cors 
 4. 创建 mysql 的配置文件


1. 打造登录接口
 - 路由: /user/login
 - 方法: post
 - 请求体: { username, password }
 - 响应体: { code: 1, msg: '登录成功', data: { token: '123456' } }

2. 注册接口
 - 路由: /user/register
 - 方法: post
 - 请求体: { username, password, nickname }
 - 响应体: { code: 1, msg: '注册成功', data: {} }

 - 防 sql 注入 ： username = '%script%alert('123')%/script%'