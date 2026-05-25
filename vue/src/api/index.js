/**
 * ----- 使用教程 -----
 *
 * 1.导入
 *      import api from "@/api" 或
 *      import * as api from "@/api"
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
import tracker from "@/tracker";

const hostname = "localhost";
const port = 3000;
async function request(url, options = {}) {
  const requestUrl = `http://${hostname}:${port}${url}`;
  const span = tracker.startRequest({
    url: requestUrl,
    method: options.method || "GET",
  });

  try {
    const response = await fetch(requestUrl, options);
    const { code, message, data } = await response.json();

    tracker.endRequest(span, {
      status: response.status,
      ok: response.ok,
      errMsg: message,
    });

    // 200 - 请求成功并弹出相应成功提示, 如果 data.tip 存在
    if (response.ok && data.tip?.length) {
      Vue.prototype.$message.success(data.tip);
    }
    // !200 - 请求失败并弹出相应错误提示
    else if (!response.ok && data?.tip) {
      Vue.prototype.$message.error(data.tip);
      console.log({ code, message, data });
    } else if (!response.ok) {
      Vue.prototype.$message.error(message);
    }

    return data;
  } catch (error) {
    tracker.endRequest(span, {
      status: 0,
      ok: false,
      error,
    });

    Vue.prototype.$message.error("网络请求失败");
    throw error;
  }
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
