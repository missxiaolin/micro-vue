import router from '@/router';
import { isSubMicro, serviceRouter, subDispatchNewsToMain } from './subMicro';

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from) => {
    if (isSubMicro) {
        subDispatchNewsToMain({ subDispatch: { fullPath, skeleton: false } });
    }
})