const router = require('koa-router')();

const query = require('../db/query');

//查询成员列表
router.get('/api/userlist',async ctx => {
    //1.  0  2. 2  

    let {pagenum=1,limit=4} = ctx.query;

    let startIndex = (pagenum-1)*limit; //0   2

    //limit 开始的索引,每页展示的条数

    let data = await query(`select * from userlist order by create_time asc limit ${startIndex},${limit}`);

    let count = await query('select count(*) from userlist');

    let total = Math.ceil(count.data[0]['count(*)']/limit);
    
    if(data.data.length){
        ctx.body = {code:1,data:data.data,total}
    }else{
        ctx.body = {code:0,msg:'暂无数据'}
    }  
})

//添加成员信息
router.post('/api/add',async ctx => {
    let {username,age,phone,sex,address,idCard} = ctx.request.body;

    console.log(idCard)

   

    //查  select * from userlist where idCard=?

    //query('select * from userlist where idCard=?',[idCard])



    let sql = 'insert into userlist (name,phone,age,sex,address,idCard,create_time) values (?,?,?,?,?,?,?)';

    if(!username || !age || !phone || !sex || !address || !idCard){
        return ctx.body = {code:2,msg:'缺少参数'}
    }

    //查询此人是否添加

    let isData = await query('select * from userlist where idCard=?',[idCard])  //[]

    if(isData.data.length){
        //存在
        return ctx.body = {code:3,msg:'此人已存在'}
    }else{
        //不存在
        let create_time = new Date();

        let data = await query(sql,[username,phone,age,sex,address,idCard,create_time]);

        if(data.msg === 'success'){
            ctx.body =  {code:1,msg:'添加成功'}
        }else{
            ctx.body = {code:0,msg:'添加失败'}
        }
    }   
})

//删除成员  id

router.get('/api/del',async ctx => {
    let {id} = ctx.query;
    let sql = 'delete from userlist where id=?';
    let res = await query(sql,[id]);

    if(res.msg === 'error'){
        ctx.body = {code:0,msg:'删除失败'}
    }else{
        ctx.body = {code:1,msg:'删除成功'}
    }
})

//修改  id  
router.post('/api/update',async ctx => {
    let {username,age,phone,sex,address,idCard,id} = ctx.request.body;

    if(!username || !age || !phone || !sex || !address || !idCard || !id){
        return ctx.body = {code:2,msg:'缺少参数'}
    }

    let sql = "update userlist u set u.name=?,u.age=?,u.phone=?,u.address=?,u.idCard=?,u.sex=? where id=?";

    let res = await query(sql,[username,age,phone,address,idCard,sex,id]);
    if(res.msg === 'error'){
        ctx.body = {code:0,msg:'修改失败'}
    }else{
        ctx.body = {code:1,msg:'修改成功'}
    }
})



module.exports = router

//delete from userlist where id=?

//update userlist u set u.name=?,u.age=?,... where id=?


//sql语句

//查询：select * from <表名>  where  字段名=?

//查询总数：select count(*) from userlist

//order by 字段名 desc(降序)  排序

//添加：insert into <表名> (字段1，字段2，....) values (?,?....)

//删除：delete from <表名> where 字段名=?

//修改: update <表名> <别名> set 别名.字段名1=?,别名.字段名2=?...  where 字段1=?

