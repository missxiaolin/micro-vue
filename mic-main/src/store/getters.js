import { verifySwitch } from '@/utils/utils'

const getters = {
  getmicroApps: (state) => {
    let microApps = state.micro.microApps;
    for (let key in microApps) {
      const nodeCon = state.micro.devService[microApps[key].name];
      if (nodeCon?.debugging && !verifySwitch) {
        microApps[key].url = `${location.protocol}//${
          nodeCon.host || "localhost"
        }:${nodeCon.port}`;
      }
    }
    return microApps;
  },
};

export default getters;
