# Vue3 + Vite + Vue-Router 4.x + Vuex 4.x + Element-Plus + Axios + Mockjs 项目搭建

## Vite配置

1. 配置 base 公共基础路径， `vite.config.js`

```javascript
export default defineConfig({
  base: '/components', // 配置后项目访问路径为 "http://localhost:3000/components/"
})

```

2. 配置 alias 别名， `vite.config.js`

```javascript
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置后使用可以@代替src路径
    },
  },
})

```

3. 配置 proxy 代理， `vite.config.js`

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:64368',
        changeOrigin: true,
      },
    },
  },
})

```



## eslint

首先在项目安装依赖

`yarn add @vue/eslint-config-prettier babel-eslint eslint eslint-plugin-prettier eslint-plugin-vue prettier -D`

`package.json`

```json
{
  "scripts": {
    "lint": "eslint \"src/**/*.{js,vue}\""
  },
  "devDependencies": {
    "@vue/eslint-config-prettier": "^6.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-prettier": "^3.1.3",
    "eslint-plugin-vue": "^7.0.0-0",
    "prettier": "^1.19.1"
  }
}
```

然后配置`lint`规则，`.eslintrc.js`

```javascript
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "warn",
      {
        singleQuote: none,
        semi: false,
        trailingComma: "es5",
      },
    ],
  },
};

```

然后修`prettier`的默认格式化规则，`prettier.config.js`

```javascript
module.exports = {
  semi: false, // 行末不跟分号
  trailingComma: 'all', // 有尾随逗号
  arrowParens: 'avoid', // 箭头函数单个参数不加分号
  singleQuote: true, // 使用单引号
  printWidth: 110, // 换行长度
}

```

根目录下新建`.vscode/settings.json`

```
{
  // VScode主题配置
  "editor.tabSize": 2,
  "editor.lineHeight": 24,
  "javascript.updateImportsOnFileMove.enabled": "always", // 移动文件或者修改文件名时，是否自动更新引用了此文件的所有文件。
  // 每次保存是否自动格式化文件
  "editor.formatOnSave": false,
  // 每次保存的时候将代码按格式进行修复
  "editor.codeActionsOnSave": {
    // 自动引入缺少的库
    "source.addMissingImports": true,
    // 为代码及Eslint添加自动修复功能
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  // 针对.vue、.ts 和 .tsx 文件开启 ESLint 的 autoFix
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "typescript",
    "typescriptreact"
  ]
}

```



## Vue-Router 4.x

安装依赖，`yarn add vue-router@4`，`package.json`

```json
{
  "dependencies": {
    "vue-router": "4",
  },
}

```

在src目录创建router文件夹，在文件夹中创建index.js文件，`router/routes.js`

```javascript
import Home from '@/pages/Home.vue'

export default [
  { path: '/', component: Home },
  { path: '/about', component: () => import('@/pages/About.vue') },
]

```

在src目录创建`router`文件夹，在文件夹中创建`index.js`文件，`router/index.js`

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default createRouter({
  history: createWebHashHistory(),
  routes,
})

```

`src/App.vue`，添加<router-view>

```vue
<template>
  <router-view></router-view>
</template>

```

`src/main.js`，use(router)

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

```



## Vuex 4.x

安装依赖，`yarn add vuex@next`，`package.json`

```json
{
  "dependencies": {
    "vuex": "^4.0.2"
  },
}

```

在src目录创建`store`文件夹，在文件夹中创建`index.js`文件，`store/index.js`

```javascript
import { createStore } from 'vuex'

// 创建一个新的 store 实例
export default createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions:{
    increment ({ commit }) {
      commit('increment')
    }
  }
})

```

`main.js`中引入`store`，`main.js`

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')

```

组件中使用，使用 `useStore()`  获取实例

```vue
<template>
  <div @click="increment">{{ count }}</div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex'

const store = useStore() // 获取 store 实例
const count = computed(() => store.state.count)

const increment = () => {
  store.commit('increment')
}

const incrementDispatch =()=>{
  store.dispatch('increment')
}

</script>

```



## Element-Plus

安装依赖，`yarn add element-plus`，`package.json`

```json
{
  "dependencies": {
    "element-plus": "^1.0.2-beta.71",
  },
}

```

`main.js`中引入，`main.js`

```javascript
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css' // 这里官网给的 import 'element-plus/dist/index.css' 是错的

createApp(App).use(ElementPlus).mount('#app')

```



## Axios

安装依赖，`yarn add axios`，`package.json`

```json
{
  "dependencies": {
    "axios": "^0.21.1",
  },
}

```

新建`api`文件夹，新建`api/instance.js`

```javascript
import axios from 'axios'
import {
    ElLoading,
    ElMessage
} from 'element-plus';
//创建axios的一个实例 
var instance = axios.create({
    baseURL: import.meta.env.VITE_APP_URL, //接口统一域名
    timeout: 6000, //设置超时
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;',
    }
})
let loading;
//正在请求的数量
let requestCount = 0
//显示loading
const showLoading = () => {
    if (requestCount === 0 && !loading) {
        loading = ElLoading.service({
            text: "Loading  ",
            background: 'rgba(0, 0, 0, 0.7)',
            spinner: 'el-icon-loading',
        })
    }
    requestCount++;
}
//隐藏loading
const hideLoading = () => {
    requestCount--
    if (requestCount == 0) {
        loading.close()
    }
}

//请求拦截器 
instance.interceptors.request.use((config) => {
    showLoading()
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    const token = window.localStorage.getItem('token');
    token && (config.headers.Authorization = token)
    //若请求方式为post，则将data参数转为JSON字符串
    if (config.method === 'POST') {
        config.data = JSON.stringify(config.data);
    }
    return config;
}, (error) =>
    // 对请求错误做些什么
    Promise.reject(error));

//响应拦截器
instance.interceptors.response.use((response) => {
    hideLoading()
    //响应成功
    return response.data;
}, (error) => {
    console.error(error)
    //响应错误
    if (error.response && error.response.status) {
        const status = error.response.status
        switch (status) {
            case 400:
                message = '请求错误';
                break;
            case 401:
                message = '请求错误';
                break;
            case 404:
                message = '请求地址出错';
                break;
            case 408:
                message = '请求超时';
                break;
            case 500:
                message = '服务器内部错误!';
                break;
            case 501:
                message = '服务未实现!';
                break;
            case 502:
                message = '网关错误!';
                break;
            case 503:
                message = '服务不可用!';
                break;
            case 504:
                message = '网关超时!';
                break;
            case 505:
                message = 'HTTP版本不受支持';
                break;
            default:
                message = '请求失败'
        }
        ElMessage.error(message);
        return Promise.reject(error);
    }
    return Promise.reject(error);
});

export default instance;

```

新建`api/http.js`

```javascript
import instance from "./instance"
/**
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} params    请求的参数
 * @param {Object} config  请求的配置
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */

export default ({
    method,
    url,
    data,
    config
}) => {
    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, data, { ...config })
    } else if (method == 'get') {
        return instance.get(url, {
            params: data,
            ...config
        })
    } else if (method == 'delete') {
        return instance.delete(url, {
            params: data,
            ...config
        })
    } else if (method == 'put') {
        return instance.put(url, data, { ...config })
    } else {
        console.error('未知的method' + method)
        return false
    }
}

```

新建`index.js`

```javascript
import http from "./http"

//请求示例
//get
function mockGet(params) {
  return http({ url: "/api/get", method: "get", params, })
}
// post
function mockPost(params) {
  return http({ url: "/api/post", method: "post", params, })
}

export default{
  mockGet,
  mockPost
}

```

组件中调用接口

```javascript
<script setup>
import { mockGet } from "@/api";

try {
  const res = await mockGet()
  console.log(res, 'res');
} catch (error) {
  console.error(error);
}

</script>


```



## Mockjs

安装依赖，`package.json`

`yarn add mockjs` 

`yarn add vite-plugin-mock -D`

```json
{
  "dependencies": {
    "mockjs": "^1.1.0",
  },
  "devDependencies": {
    "vite-plugin-mock": "^2.9.6"
  }
}

```

 `vite.config.js`

```javascript
import { viteMockServe } from 'vite-plugin-mock'

export default ({ command }) => {
  return {
    plugins: [
      viteMockServe({
        mockPath: 'mock',  // 指定 mock 数据文件夹路径
        supportTs: false,  // 启用 ts
        // command === serve: 由开发服务器调用的插件
        // command === build: 由 Rollup 调用的插件
        localEnabled: command === 'serve',
      }),
    ],
  }
}

```

在项目根目录创建mock文件夹，在文件夹中创建test.js文件，`mock/test.js`

```javascript
export default [
  {
    url: '/api/get',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          name: 'vben',
        },
      }
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise(resolve => {
        req.on('data', chunk => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    },
  },
]

```

组件中使用 fetch 测试

```vue
<script setup>

fetch('/api/get').then(res => {
  console.log(res)
})

</script>

```

