import microApp from '@micro-zoe/micro-app'
import router from '@/router'
import { getDomain } from '@/utils/cache/cookies'
import { loadScript } from '@/utils/loadScript'


function isPushLogin(data: any) {
  if (data.isPushLogin) {
    router.push('/login')
  }
}

microApp.addDataListener('micro-vie', (data: any) => {
  if (data.scriptUrl) {
    loadScript(data.scriptUrl, data.name, async () => {
      return true
    })
    return
  }
  isPushLogin(data)
})

microApp.addDataListener('micro-cha', (data: any) => {
  isPushLogin(data)
})


const microStart = () => {
  microApp.start({
    'disable-memory-router': true, // 关闭虚拟路由
    // @ts-ignore
    lifeCycles: {
      created () {
      },
      beforemount () {
      },
      mounted () {
        microApp.setData('micro-vie', {getDomain: getDomain})
        microApp.setData('micro-cha', {getDomain: getDomain})
      },
      unmount () {
      },
      error () {
      }
    }})
}


export { microStart }