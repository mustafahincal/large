import CryptoJS from "crypto-js";

export const hashPassword = (password: string) =>
  CryptoJS.HmacSHA512(password, process.env.PASSWORD_KEY as string).toString();
