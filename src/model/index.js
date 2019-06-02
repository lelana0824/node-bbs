const db = require("../database");

const self = {};

self.addUser = async ({ user_name }) => {
  const query = `
    INSERT INTO \`USER\`
    values (null,?,now(),null);
  `;
  await db.raw(query, [user_name]);
};

self.findUser = async ({ user_id }) => {
  const query = `
    SELECT * FROM USER
    WHERE user_id = ?
  `;
  const ret = await db.raw(query, [user_id]);
  return ret[0];
};

self.addContent = async ({ user_id, title, context }) => {
  const query = `
    INSERT INTO CONTENT
    values (null,?, ?, ?,now(),null);
  `;
  await db.raw(query, [user_id, title, context]);
};

self.modifyContent = async ({ context_id, title, context }) => {
  const query = `
    UPDATE CONTENT
    SET title = ?, context = ?
    WHERE context_id = ?;
  `;
  await db.raw(query, [title, context, context_id]);
};

self.deleteContent = async ({ content_id }) => {
  const query = `
    DELETE FROM CONTENT
    WHERE content_id = ? 
  `;
  await db.raw(query, [content_id]);
};

self.findContent = async ({ content_id }) => {
  const query = `
    SELECT * FROM CONTENT CT
    INNER JOIN USER U on U.user_id = CT.user_id
    WHERE CT.content_id = ?
  `;
  const ret = await db.raw(query, [content_id]);
  return ret[0][0];
};

self.findContentList = async () => {
  const query = `
    SELECT * FROM CONTENT CT
    INNER JOIN USER U on U.user_id = CT.user_id
    ORDER BY CT.created_at DESC
  `;
  const ret = await db.raw(query);
  return ret[0];
};

self.addComment = async ({ user_id, content_id, context }) => {
  const query = `
    INSERT INTO COMMENT
    values (null,?, ?, ?,now(),null);
  `;
  await db.raw(query, [user_id, content_id, context]);
};

self.findComment = async ({ content_id }) => {
  const query = `
    SELECT * FROM COMMENT CM
    INNER JOIN USER U on U.user_id = CM.user_id
    WHERE CM.content_id = ?
  `;
  const ret = await db.raw(query, [content_id]);
  return ret[0];
};

self.addSubComment = async ({ user_id, comment_id, context }) => {
  const query = `
    INSERT INTO SUB_COMMENT
    values (null,?, ?, ?,now(),null);
  `;
  await db.raw(query, [user_id, comment_id, context]);
};

self.findSubComment = async ({ comment_id }) => {
  const query = `
    SELECT * FROM SUB_COMMENT SCM
    INNER JOIN USER U on U.user_id = SCM.user_id
    WHERE comment_id = ?
  `;
  const ret = await db.raw(query, [comment_id]);
  return ret[0];
};

module.exports = self;
