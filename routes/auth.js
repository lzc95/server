const Config = require('../config')
const jwt =require('jwt-simple')

let auth = async (ctx,next) => {
  // 获取请求头 authorization
  let authorization = ctx.header.authorization
  // 如果存在，则获取 token
  if (authorization) {
      let token = authorization.split(" ")[1]
      try {
          // 对 token 进行校验
          jwt.decode(token, Config.secret)
          ctx.body={
            code:0
          }
          next();
      } catch (e) {
         ctx.response.status = 401
         ctx.body={
          code: -1
         }
      }
  } else {
    ctx.response.status = 401
    ctx.body = {
      code: -1
     }
  }
}
module.exports= auth

