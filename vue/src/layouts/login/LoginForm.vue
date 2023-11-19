<template>
    <el-form 
        :model="form" 
        status-icon 
        :rules="rules" 
        ref="form" 
        label-position="top"
    >
        <el-form-item label="手机号" prop="phone">
            <el-input type="text" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "LoginForm",
    data() {
        return {
            form: {
                phone: '',
                password: ''
            },
            rules: {
                phone: { required: true, message: '请输入手机号', trigger: 'blur' },
                password: { required: true, message: '请输入密码', trigger: 'blur' },
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>

</style>