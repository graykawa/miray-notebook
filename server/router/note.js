const Router = require('@koa/router')
const router = new Router()
const { verify } = require('../utils/jwt.js')
const { findNoteListByType, findNoteDetailById,publishNote} = require('../controllers/index.js')

router.get('/findNoteListByType', verify(), async (ctx) => {
  const { note_type } = ctx.request.query  // 从 url 后面解析参数
  try {
    const res = await findNoteListByType(note_type, ctx.userId)
    if (res.length > 0) {
      ctx.body = {
        code: '1',
        msg: '查找成功',
        data: res
      }
    } else {
      ctx.body = {
        code: '1',
        msg: '暂无数据',
        data: []
      }
    }

  } catch (error) {
    ctx.body = {
      code: '-1',
      msg: '服务器异常',
      data: error
    }
  }

})

//根据笔记id获取当前笔记     
router.get('/findNoteDetailById', verify(), async (ctx) => {
  try {
    const { id } = ctx.request.query
    const res = await findNoteDetailById(id)
    if (res.length) {
      ctx.body = {
        code: '1',
        msg: '查找成功',
        data: { ...res[0], username: ctx.username }
      }
    } else {
      ctx.body = {
        code: '0',
        msg: '查找失败',
        data: []
      }
    }
  } catch (error) {
    ctx.body = {
      code: '-1',
      msg: '服务器异常',
      data: error
    }
  }
})

router.post('/note-publich', verify(), async (ctx) => {
  const { note_title, note_content, note_img, note_type } = ctx.request.body
  const user_id = ctx.userId
  try {
    const res = await publishNote({
      note_title,
      note_content,
      note_img,
      note_type,
      user_id
    })
    if (res.affectedRows > 0) {
      ctx.body = {
        code: '1',
        msg: '发布成功',
        data: res
      }
    } else {
      ctx.body = {
        code: '0',
        msg: '发布失败',
        data: []
      }
    }
  } catch (error) {
    ctx.body = {
      code: '-1',
      msg: '服务器异常',
      data: error
    }
  }
})

module.exports = router

