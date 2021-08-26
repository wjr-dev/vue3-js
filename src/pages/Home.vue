<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <div class="box">
    <span>{{ count }}</span>
  </div>
  <el-button type="primary" @click="increment">主要按钮</el-button>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import { onMounted } from 'vue'
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex'
import { mockGet } from '@/api'

const store = useStore()
const count = computed(() => store.state.count)


const increment = () => {
  store.commit('increment')
}

const incrementDispatch = () => {
  store.dispatch('increment')
}
onMounted(async () => {
  try {
    const res = await mockGet()
    console.log(res, 'res');
  } catch (error) {
    console.error(error);
  }
})
// fetch('/api/get').then(res => {
//   console.log(res)
// })

</script>

<style lang="scss" scoped>
.box {
  span {
    color: $text-color;
  }
}
</style>
