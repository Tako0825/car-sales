<template>
    <main>
        <!-- 上传头像文件 -->
        <el-upload
            list-type="picture-card"
            :action="action"
            :show-file-list="false"
            :http-request="handleUpload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <img :src="previewUrl||'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" alt="当前头像展示">
        </el-upload>
    </main>
</template>

<script>
import { hostname, action } from "@/api/upload"
import { createNamespacedHelpers } from "vuex"
const { mapMutations } = createNamespacedHelpers("userArea")
export default {
    name: "UploadAvatar",
    data() {
        return {
            action,
            hostname,
            dialogVisible: false,
            previewUrl: '',
        }
    },
    methods: {
        ...mapMutations([
            "setFile"
        ]),
        // 上传图片前...约束
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 上传图片后...预览图片
        handleAvatarSuccess(res, file) {
            this.previewUrl = URL.createObjectURL(file.raw);
        },
        // 上传图片
        async handleUpload(upload) {
            this.setFile(upload.file)
        }
    }
}
</script>

<style>

</style>