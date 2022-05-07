const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
    query: ctx.query,
  };
};

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.read);
posts.delete('/:id', postsCtrl.delete);
// 해당 포스트 전체를 새로 덮어씀 (전달한 값에 없는 데이터는 사라짐)
posts.put('/:id', postsCtrl.replace);
// 해당 포스트의 일부를 수정함 (기존 데이터는 유지되고 전달한 값만 수정됨.)
posts.patch('/:id', postsCtrl.update);
module.exports = posts;
