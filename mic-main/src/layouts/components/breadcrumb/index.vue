<template>
  <div class="flex flex-row justify-between">
    <el-breadcrumb class="app-breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noRedirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <span v-else>
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import {
  ref,
  watch,
  computed,
  getCurrentInstance,
  defineComponent,
  onMounted,
} from "vue";
import { type RouteLocationMatched, useRoute, useRouter } from "vue-router";
import { constantRoutes } from "../../../router/index";
import { compile } from "path-to-regexp";
const rRoute = [...constantRoutes]

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { proxy }: any = getCurrentInstance();
    /** 定义响应式数据 breadcrumbs，用于存储面包屑导航信息 */
    const breadcrumbs = ref<any>([]);

    /** 获取面包屑导航信息 */
    const getBreadcrumb = () => {
      let r: any = []
      rRoute.forEach((item: any) => {
        if (item.children && item.children.length > 0) {
          item.children.forEach((v: any) => {
            if (route.path.indexOf(v.path) > -1) {
              r.push(item)
              r.push(v)
            }
          })
          return
        } else {
          if (item.path.indexOf(route.path) > -1) {
            r.push(item)
          }
        }
        
      })
      breadcrumbs.value = r.filter(
        (item: any) => item.meta?.title && item.meta?.breadcrumb !== false
      );
    };

    /** 编译路由路径 */
    const pathCompile = (path: string) => {
      const toPath = compile(path);
      return toPath(route.params);
    };

    /** 处理面包屑导航点击事件 */
    const handleLink = (item: RouteLocationMatched) => {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect as string);
        return;
      }
      router.push(pathCompile(path));
    };

    /** 监听路由变化，更新面包屑导航信息 */
    watch(
      () => route.path,
      (path: any) => {
        getBreadcrumb();
      }
    );

    onMounted(() => {
      getBreadcrumb();
    });

    return {
      breadcrumbs,
      handleLink,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner span {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: var(--v3-navigationbar-height);
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
