const Koa = require('koa');

const app = new Koa();

const koaStatic = require('koa-static');

const router = require('./router');

const path = require('path');

const bodyparser = require('koa-bodyparser');

// const test = require('./test/test');

//__dirname和process.cwd()

// console.log("app",__dirname)

// console.log("app cwd",process.cwd())

app.use(koaStatic(path.join(process.cwd(),'public')));

app.use(bodyparser());

app.use(router.routes()); //启动路由

app.use(router.allowedMethods());

app.listen(3000,() => {
    console.log("服务启动成功")
})