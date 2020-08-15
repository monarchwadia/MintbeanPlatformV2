import config from "../utils/config";
import * as bcrypt from "bcrypt";
const SALT_ROUNDS = config.bcryptSaltRounds();

export default {
  hash: async password => bcrypt.hash(password, SALT_ROUNDS),
  compare: async (password, hash) => bcrypt.compare(password, hash),
  objToBase64: obj => Buffer.from(JSON.stringify(obj)).toString("base64")
};
