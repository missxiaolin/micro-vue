import microApp from '@micro-zoe/micro-app'
import router from '@/router'


function isPushLogin(data: any) {
  if (data.isPushLogin) {
    router.push('/login')
  }
}

microApp.addDataListener('micro-vie', (data: any) => {
  isPushLogin(data)
})

microApp.addDataListener('micro-cha', (data: any) => {
  isPushLogin(data)
})



const microStart = () => {
  microApp.start({
    // @ts-ignore
    lifeCycles: {
      created () {
      },
      beforemount () {
      },
      mounted () {
      },
      unmount () {
      },
      error () {
      }
    }})
}


export { microStart }