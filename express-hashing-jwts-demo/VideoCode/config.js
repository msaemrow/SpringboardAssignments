/** Common settings for auth-api app. */

const SECRET_KEY = process.env.SECRET_KEY || "fHt$TRcC%25HmE8gC'vD$!Ka%8sOt;~V,XItr+8t+)8;x}O/rSQgGyG7}o^c1')"

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR
};
