const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const db = require("./model");
const koaBody = require('koa-body');

const bodyParser = () => {
  return koaBody({ multipart: true });
};

const app = new Koa();
const router = new Router();
app.use(cors());


// user
const addUser = async ctx => {
  const { user_name } = ctx.request.body;
  const ret = await db.addUser({ user_name });

  ctx.body = ret;
};

router.post("/add/user", bodyParser(), addUser);

const findUser = async ctx => {
  const { user_id } = ctx.request.query;
  const ret = await db.findUser({ user_id });

  ctx.body = ret;
}

router.get("/find/user", findUser);


// content

const addContent = async ctx => {
  const { user_id, title, context } = ctx.request.body;
  const ret = await db.addContent({ user_id, title, context });

  ctx.body = ret;
};

router.post("/add/content", bodyParser(), addContent);

const modifyContent = async ctx => {
  const { context_id, title, context } = ctx.request.body;
  const ret = await db.modifyContent({ context_id, title, context });

  ctx.body = ret;
};

router.post("/modify/content", bodyParser(), modifyContent);

const deleteContent = async ctx => {
  const { content_id } = ctx.request.body;
  const ret = await db.deleteContent({ content_id });

  ctx.body = ret;
};

router.post("/delete/content", bodyParser(), deleteContent);

const findContent = async ctx => {
  const { content_id } = ctx.request.query;
  const ret = await db.findContent({ content_id });

  ctx.body = ret;
}

router.get("/find/content", findContent);

const findContentList = async ctx => {
  const ret = await db.findContentList();

  ctx.body = ret;
}

router.get("/find/content_list", findContentList);


// comment 

const addComment = async ctx => {
  const { user_id, content_id, context } = ctx.request.body;
  const ret = await db.addComment({ user_id, content_id, context });

  ctx.body = ret;
};

router.post("/add/comment", bodyParser(), addComment);

const findComment = async ctx => {
  const { content_id } = ctx.request.query;
  const ret = await db.findComment({ content_id });

  ctx.body = ret;
}

router.get("/find/comment", findComment);


// sub comment

const addSubComment = async ctx => {
  const { user_id, comment_id, context } = ctx.request.body;
  const ret = await db.addSubComment({ user_id, comment_id, context });

  ctx.body = ret;
};

router.post("/add/sub_comment", bodyParser(), addSubComment);

const findSubComment = async ctx => {
  const { comment_id } = ctx.request.query;
  const ret = await db.findSubComment({ comment_id });

  ctx.body = ret;
}

router.get("/find/sub_comment", findSubComment);


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
