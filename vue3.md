## eslint

首先在项目安装依赖

```shell
yarn add @vue/eslint-config-prettier babel-eslint eslint eslint-plugin-prettier eslint-plugin-vue prettier -D    
```

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
        // singleQuote: none,
        // semi: false,
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



