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
async function request(url, options = {}) {
  const response = await fetch(`${process.env.DEVELOPMENT_SERVER}/${url}`, options);

  if (!response.ok) {
    throw new Error(`请求失败, 状态码为: ${response.status}`);
  }

  return response.json();
}

export default api = () => {
  return {
    get: async (url) => {
      return request(url);
    },
    post: async (url, data, config) => {
      return request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.token}`
        },
        body: JSON.stringify(data),
      });
    },

    patch: async (url, data, config) => {
      return request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/jtson',
          'Authorization': `Bearer ${config.token}`
        },
        body: JSON.stringify(data),
      });
    },

    delete: async (url, config) => {
      return request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.token}`
        }
      })
    } 
  }
}