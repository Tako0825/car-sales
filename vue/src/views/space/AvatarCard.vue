<template>
  <!-- 更换我的头像 -->
  <main
    class="w-full h-auto bg-white p-6 rounded-lg flex flex-col items-center gap-6"
  >
    <UploadAvatar :avatar="getUser?.avatar ? generateDownloadURL(getUser?.avatar) : defaultAvatar" />
    <el-button @click="handleUploadAvatar" type="primary" :disabled="!getFile"
      >点击上传</el-button
    >
  </main>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import UploadAvatar from "@/views/home/user-area/UploadAvatar.vue";
import { createNamespacedHelpers } from "vuex";
import { generateDownloadURL, uploadFile } from "@/util/upload";
const {
  mapGetters: mapUserGetters,
  mapMutations: mapUserMutations,
  mapActions: mapUserActions,
} = createNamespacedHelpers("userArea");
export default {
  name: "AvatarCard",
  components: { UploadAvatar },
  data() {
    return {
      defaultAvatar: process.env.VUE_APP_DEFAULT_AVATAR
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
    ...mapUserGetters(["getFile"]),
  },
  methods: {
    generateDownloadURL,
    ...mapMutations(["setUser"]),
    ...mapUserMutations(["setFile"]),
    ...mapUserActions(["updateAvatar", "fetchUser"]),
    // 处理 - 上传头像
    async handleUploadAvatar() {
      if (this.getFile) {
        const { key } = await uploadFile(this.getFile);
        this.setFile(null);
        // 1. 更换头像
        await this.updateAvatar({
          id: this.getUser.id,
          data: {
            avatar: key,
          },
        });
        // 2. 刷新头像状态
        const user = await this.fetchUser(this.getUser.id);
        this.setUser(user);
      }
    },
  },
};
</script>

<style></style>
