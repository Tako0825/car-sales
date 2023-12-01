<template>
    <!-- 更换我的头像 -->
    <main class="w-full h-auto bg-white p-6 rounded-lg flex flex-col items-center gap-6">
        <UploadAvatar :avatar="getUser?.avatar"/>
        <el-button @click="handleUploadAvatar" type="primary" :disabled="!getFile">点击上传</el-button>
    </main>
</template>

<script>

import { hostname } from "@/api/upload"
import { uploadQiniuImage } from "@/api/upload"
import { mapGetters, mapMutations } from "vuex"
import UploadAvatar from "@/views/home/user-area/UploadAvatar.vue"
import { createNamespacedHelpers } from "vuex"
const { mapGetters: mapUserGetters, mapMutations: mapUserMutations,  mapActions: mapUserActions } = createNamespacedHelpers("userArea")
export default {
    name: "AvatarCard",
    components: { UploadAvatar },
    computed: {
        ...mapGetters([
            "getUser"
        ]),
        ...mapUserGetters([
            "getFile"
        ]),
    },
    methods: {
        ...mapMutations([
            "setUser"
        ]),
        ...mapUserMutations([
            "setFile"
        ]),
        ...mapUserActions([
            "updateAvatar", "fetchUser"
        ]),
        // 处理 - 上传头像
        async handleUploadAvatar() {
            if(this.getFile) {
                const { key } = await uploadQiniuImage(this.getFile)
                this.setFile(null)
                // 1. 更换头像
                await this.updateAvatar({
                    id: this.getUser.id,
                    data: {
                        avatar: `${hostname}/${key}`
                    }
                })
                // 2. 刷新头像状态
                const user = await this.fetchUser(this.getUser.id)
                this.setUser(user)
            }
        },
    }
}
</script>

<style>

</style>