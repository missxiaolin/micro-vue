import isEqual from "lodash-es/isEqual";
import { customAlphabet, nanoid } from 'nanoid';

export function getRawComponentKey(__rawVueInfo__: any) {
  return Object.keys(__rawVueInfo__)[0];
}

export function getRawComponentContent(__rawVueInfo__: any) {
  return __rawVueInfo__[getRawComponentKey(__rawVueInfo__)];
}

/**
 * 获得一个数据节点的父节点
 * @param {*} __rawVueInfo__ 
 * @returns 
 */
// @ts-ignore
export function findParentNode(__rawVueInfo__: any) {
  const targetDom = findTargetDom(__rawVueInfo__);
  if (targetDom) {
    const parentDom = findParentDom(targetDom.parentNode);
    return findVueInfo(parentDom);
  } else {
    console.log('没有找到目标DOM节点，数据节点信息:', __rawVueInfo__)
  }
}

/**
 * 将一个节点从其节点中移除
 * @param {*} __rawVueInfo__ 
 */
// @ts-ignore
export function deleteNodeFromParent(__rawVueInfo__: any) {
  const parentNode = findParentNode(__rawVueInfo__);
  const children = getRawComponentContent(parentNode).__children;
  const index = children.findIndex((item: any) => isEquals(item, __rawVueInfo__));
  children.splice(index, 1);
}

/**
 * 获得一个节点对应的数据信息，这个函数不负责向上递归查找
 * @param {*} element 
 * @returns 
 */
// @ts-ignore
export function findVueInfo(element: any) {
  if (element) {
    const lcid = element.attributes.lc_id.nodeValue;
    // 获取源代码结构
    // @ts-ignore
    let rowCode = window.templateSourceMap[lcid];

    if (!rowCode) {
      // 如果不在templateSourceMap，则可能当前的操作是在渲染面板上，这部分数据存放在tree中
      // @ts-ignore
      rowCode = window.tree[lcid];
    }
    return rowCode;
  } else {
    return null;
  }
}

/**
 * 是组件库的组件
 * @param {*} __rawVueInfo__ 
 * @returns 
 */
export function isRawComponents(__rawVueInfo__: any) {
  const lcid = getVueInfoLcid(__rawVueInfo__);
  // @ts-ignore
  return !!window.templateSourceMap[lcid];
}

/**
 * 是已经被拖入面板的组件
 * @param {*} __rawVueInfo__ 
 * @returns 
 */
export function isActiveComponents(__rawVueInfo__: any) {
  const lcid = getVueInfoLcid(__rawVueInfo__);
  // @ts-ignore
  return !!window.tree[lcid];
}

/**
 * 校验两个数据节点是否相等。由于vue代理的存在，用简单===相比的方式已经失效
 * @param {*} o1 
 * @param {*} o2 
 */
export function isEquals(o1: any, o2: any) {
  if (o1 && o2) {
    return getVueInfoLcid(o1) == getVueInfoLcid(o2);
  } else {
    return false;
  }
}

/**
 * 获得一个DOM节点的组件父DOM节点
 * @param {*} parentNode 要传入parentDom
 * @returns 
 */
// @ts-ignore
export function findParentDom(parentNode: any) {
  if (parentNode.attributes && parentNode.attributes.lc_id) {
    return parentNode;
  } else if (parentNode.parentNode) {
    return findParentDom(parentNode.parentNode);
  } else {
    return null;
  }
}

/**
 * 获得一个数据节点的lc_id属性值
 * @param {*} __rawVueInfo__ 
 * @returns 
 */
export function getVueInfoLcid(__rawVueInfo__: any) {
  const lcid = getRawComponentContent(__rawVueInfo__).lc_id;
  return lcid;
}

/**
 * 获得一个数据节点的DOM节点
 * @param {*} __rawVueInfo__ 
 * @returns 
 */
export function findTargetDom(__rawVueInfo__: any) {
  const targetDom = document.querySelector(`[lc_id="${getVueInfoLcid(__rawVueInfo__)}"]`);
  return targetDom;
}

/**
 * 比较两个对象是否完全相等
 */
export function compareTwoObjectIsEqual(o1: any, o2: any) {
  return isEqual(o1, o2);
}

export function isArray(arr: any) {
  return Object.prototype.toString.apply(arr) === "[object Array]";
}

export function isObject(obj: any) {
  return Object.prototype.toString.apply(obj) === "[object Object]";
}

/**
 * @description 生成唯一ID
 */
export function createUniqueId() {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
  return nanoid();
}

/**
* 遍历对象，添加ID
* @param {*} jsonObj
*/
export function ergodic(jsonObj: any) {
  if (jsonObj) {
    for (const key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
        const element = jsonObj[key];

        if (isArray(element)) {
          element.forEach((item: any) => {
            if (isObject(item)) {
              ergodic(item);
              delete item.lc_id;
            }
          });
        } else if (isObject(element)) {
          ergodic(element);
        } else {
        }
      }
    }

    // 添加ID
    if (!jsonObj["lc_id"]) {
      jsonObj["lc_id"] = createUniqueId();
    }
  }
}

/**
 * 从解析后的Vue结构中找到关键的根节点
 * 根节点分包是：template/script/style
 * 
 * @param {*} array 
 * @param {*} propertyName 
 * @returns 
 */
export function findAObject(array: any, propertyName: any) {
  const module = array.find(function (ele: any) {
    return ele[propertyName];
  });
  return module || null;
}