import http from "./http"
//请求示例
//get
export function mockGet(params) {
  return http({ url: "/api/get", method: "get", params, })
}
// post
export function mockPost(params) {
  return http({ url: "/api/post", method: "post", params, })
}
