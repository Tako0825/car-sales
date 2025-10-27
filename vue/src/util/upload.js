import * as qiniu from "qiniu-js";
import { v4 } from "uuid";
import { HmacSHA1, enc } from "crypto-js";
import api from "../api";

const domainName = process.env.VUE_APP_QINIU_CDN_URL; // 加速域名
const accessKey = process.env.VUE_APP_QINIU_ACCESS_KEY; // ACCESS_KEY
const secretKey = process.env.VUE_APP_QINIU_SECRET_KEY; // SECRET_KEY

// 上传文件
export const uploadFile = async (file) => {
  const { uploadToken: token } = await api.get("/api/qiniu/upload-token", {
    token: localStorage.getItem("token"),
  });
  const key = generateKey();
  const putExtra = {};
  const config = {
    useCdnDomain: true,
    region: qiniu.region.z2,
  };
  const observable = qiniu.upload(file, key, token, putExtra, config);
  return new Promise((resolve) => {
    const observer = {
      complete(res) {
        const key = "/" + res.key;
        const downloadURL = generateDownloadURL(key);
        resolve({
          downloadURL,
          key,
        });
      },
    };
    observable.subscribe(observer);
  });
};

// 生成有效下载地址
export const generateDownloadURL = (url) => {
  const e = generateE();
  const baseURL = domainName + url;
  const urlWithE = `${baseURL}?e=${e}`;
  const sign = HmacSHA1(urlWithE, secretKey);
  const signBase64 = sign
    .toString(enc.Base64)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const token = [accessKey, signBase64].join(":");
  const downloadURL = `${baseURL}?e=${e}&token=${token}`;
  return downloadURL;
};

// 生成文件名
const generateKey = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const key = 'car-sales/' + [year, month, day].join("-") + "/" + v4();
  return key;
};

// 生成过期时间戳
const generateE = () => {
  const duration = 300 * 1000; // 有效时间 300 秒
  const timestamp = Date.now();
  const e = (timestamp + duration).toString().slice(0, -3);
  return e;
};
