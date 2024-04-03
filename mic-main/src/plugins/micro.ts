import microApp from '@micro-zoe/micro-app'

const microStart = () => {
  microApp.start({
    // @ts-ignore
    lifeCycles: {
      created () {
        console.log('created 全局监听')
      },
      beforemount () {
        console.log('beforemount 全局监听')
      },
      mounted () {
        console.log('mounted 全局监听')
      },
      unmount () {
        console.log('unmount 全局监听')
      },
      error () {
        console.log('error 全局监听')
      }
    }})
}


export { microStart }