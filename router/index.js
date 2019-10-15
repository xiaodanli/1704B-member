const router = require('koa-router')();

const query = require('../db/query');

router.get('/api/userlist',async ctx => {
    let data = await query('select * from userlist')
    ctx.body = data;
})

module.exports = router