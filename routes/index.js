const router = require('koa-router')()
const jwt =require('jwt-simple')
const User = require('../models/user')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post("/auth", async (ctx) => {
  
  const {username} = ctx.request.body
  let secret= "secret"
  try {
      // 查找用户是否存在
     await User.findOne({username},(err,res) =>{
       if(err){
         console.log(err,'19')
       }
       else{
        ctx.body ={ code: 1, data: res }
       }
      });
  } catch (e) {
    ctx.body ={ code: 1, data: "登陆失败" }
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
