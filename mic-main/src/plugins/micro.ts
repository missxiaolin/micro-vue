import microApp from '@micro-zoe/micro-app'

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