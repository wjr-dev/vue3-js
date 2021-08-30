/*
 * @Author: your name
 * @Date: 2021-08-23 16:57:31
 * @LastEditTime: 2021-08-30 15:29:23
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue3\.eslintrc.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
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
        singleQuote: true,
        semi: false,
        trailingComma: "es5",
      },
    ],
  },
};