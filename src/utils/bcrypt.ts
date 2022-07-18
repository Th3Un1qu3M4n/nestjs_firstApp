import * as bcrypt from 'bcrypt';

export function encodePasswrod(rawPwd: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPwd, salt);
}

export function comparePassword(rawPwd: string, hashPwd: string) {
  return bcrypt.compareSync(rawPwd, hashPwd);
}
