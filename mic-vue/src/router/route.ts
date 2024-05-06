/*
 * @LastEditTime: 2021-09-02 16:02:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mic-main\src\router\route.ts
 */

// @ts-ignore
import r from './r.json'

const routes: any = [];

// @ts-ignore
r.forEach((item: any) => {
    routes.push({
        path: item.path,
        name: item.pageName,
        component: () => import(`../views/${item.pageName}.vue`),
    })
})

export default routes;
