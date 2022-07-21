<template>
  <div class="bg-slate-50 h-full p-3">
    <van-form
      @submit="onSubmit"
      class="border-solid border-1 border-slate-100 shadow-lg rounded-lg bg-white overflow-hidden"
    >
      <van-cell-group>
        <van-field
          v-model="form.username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div class="m-5">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({ username: '', password: '' })

const onSubmit = () => {}
</script>
