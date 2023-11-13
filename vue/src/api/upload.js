import api from "./api"

export const getUploadConfig = async () => {
    return await api.get("/api/qiniu/upload-token")
}

