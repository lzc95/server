const router = require('koa-router')()
const jwt =require('jwt-simple')
const User = require('../models/user')
const MD5 = require('../utils/md5')
const Config = require('../config')
const auth =require('./auth')

router.get('/auth', auth)

router.post("/login", async (ctx) => {
  let {username, password} = ctx.request.body
  password = MD5(password)
  // 查找用户是否存在
  await User.findOne({username, password},(err, res) =>{
    if (!err){
      if (res) {
        console.log(res)
        let token = jwt.encode({
          id: res._id,
          exp: (Date.now() + 1000 * 60 * 30) / 1000
        }, Config.secret)

        ctx.body = { 
          code: 0, 
          data:{
            username: res.username
          },
          token
        }
      } else {
        ctx.body = { 
          code: 1,
          msg: '用户不存在'
        }
      }
    } 
  })
})

router.post("/getArticle", auth, async (ctx, next) =>{
     ctx.body="hello luozengchang"
})


module.exports = router
