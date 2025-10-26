/**
 * ----- 使用教程 -----
 *
 * 1.导入
 *      import api from "@/api/api" 或
 *      import * as api from "@/api/api"
 *
 * 2.GET 用法
 *      api.get("http://hostname:port/api/...")
 *      .then(data => {})
 *      .catch(error => {})
 *
 * 3.POST 用法
 *      api.post("http://hostname:port/api/...", data, config)
 *      .then(data => {})
 *      .catch(error => {})
 */
import { Message } from "element-ui";

const hostname = "localhost";
const port = 3000;
async function request(url, options = {}) {
  const response = await fetch(`http://${hostname}:${port}${url}`, options);
  const { code, message, data } = await response.json();
  // 200 - 请求成功并弹出相应成功提示, 如果 data.tip 存在
  if (response.ok && data.tip?.length) {
    Message.success(data.tip);
  }
  // !200 - 请求失败并弹出相应错误提示
  else if (!response.ok && data?.tip) {
    Message.error(data.tip);
    console.log({ code, message, data });
  } else if (!response.ok) {
    Message.error(message);
  }
  return data;
}

export default {
  get: async (url, config) => {
    return await request(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config?.token}`,
      },
    });
  },
  post: async (url, data, config) => {
    return await request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config?.token}`,
      },
      body: JSON.stringify(data),
    });
  },

  patch: async (url, data, config) => {
    return await request(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config?.token}`,
      },
      body: JSON.stringify(data),
    });
  },

  delete: async (url, config) => {
    return await request(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config?.token}`,
      },
    });
  },
};
