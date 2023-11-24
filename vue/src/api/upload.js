import api from "./api"
import * as qiniu from "qiniu-js"
import { Message } from "element-ui";
import { v4 } from "uuid"
export const action = "http://upload-z2.qiniup.com"
export const hostname = "http://cdn.takoko.top"
export const bucket = "wutongroad"

// 上传图片
export const uploadQiniuImage = async (file) => {
    try {
        const { uploadToken: token } = await api.get("/api/qiniu/upload-token", { token: localStorage.getItem("token") })
        console.log(token);
        const key = `${new Date().getFullYear()}-${new Date().getMonth() + 1}/${v4()}`
        const putExtra = {}
        const config = {
            useCdnDomain: true,
            region: qiniu.region.z2
        }
        const observable = qiniu.upload(file, key, token, putExtra, config)
        return new Promise((resolve, reject) => {
            const observer = {
                next() {
                    // ...
                },
                error(err) {
                    reject(err)
                },
                complete(res){
                    resolve(res)
                }
            }
            observable.subscribe(observer) // 上传开始
        })
    }
    catch(error) {
        Message.error("没有上传权限")
    }
}