import { pbkdf2Sync } from "crypto";
import { createHash, randomBytes } from "crypto";

export const padding = (
  data: string,
  max: number = 8,
  pad: string = "0"
): string => {
  const len = data.length;
  if (len < max) {
    const repeat = pad.repeat(max - len);
    return repeat + data;
  }
  return data;
};

export const sha256 = (data: Buffer): Buffer => {
  return createHash("sha256")
    .update(data)
    .digest();
};

export const getCheckSum = (buf: Buffer, max): string => {
  const tmp: Buffer = sha256(buf).slice(0, 1);
  return bufToBinary(tmp).slice(0, max);
};

export const bufToBinary = (buf: Buffer): string => {
  return Array.from(buf)
    .map(v => padding(v.toString(2)))
    .join("");
};

export const toUtf8 = (data: string): Buffer => {
  const nor: string = data.normalize("NFKD");
  return Buffer.from(nor, "utf8");
};

export const pbkdf2 = (password: Buffer, salt: Buffer) => {
  return pbkdf2Sync(password, salt, 2048, 64, "sha512");
};
