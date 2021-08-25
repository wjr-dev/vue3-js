<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <div>{{ count }}</div>
  <el-button type="primary" @click="increment">主要按钮</el-button>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex'
import { mockGet } from "@/api";

const store = useStore()
const count = computed(() => store.state.count)

const increment = () => {
  store.commit('increment')
}

const incrementDispatch = () => {
  store.dispatch('increment')
}
try {
  const res = await mockGet()
  console.log(res, 'res');
} catch (error) {
  console.error(error);
}
// fetch('/api/get').then(res => {
//   console.log(res)
// })

</script>

<style lang="scss" scoped>
</style>
