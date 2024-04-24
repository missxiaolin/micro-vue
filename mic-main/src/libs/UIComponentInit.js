// 其它UI组件库应该在这里集成
function loadVant() {
//   (() => import("vant/lib/index.css"))();
//   const vantLoadPromise = (() => import("vant"))();
//   return vantLoadPromise;
}

export default function loadCompontents() {
  return Promise.all([loadVant()]);
}
