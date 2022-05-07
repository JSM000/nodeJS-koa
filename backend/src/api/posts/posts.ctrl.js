let postId = 1;

const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

exports.write = (ctx) => {
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

exports.list = (ctx) => {
  ctx.body = posts;
};

exports.read = (ctx) => {
  const { id } = ctx.params;
  // 파라미터로 받은 값은 문자열이어서 타입변경을 해주어야한다.
  const post = posts.find((p) => p.id.toString() === id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  ctx.body = post;
};

exports.delete = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (!index) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204;
};

exports.replace = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (!index) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

exports.update = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (!index) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
