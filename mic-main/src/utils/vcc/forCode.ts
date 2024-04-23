import { isObject, isArray, getRawComponentKey } from "./common";
// @ts-ignore
import presetAttribute from "../../libs/presetAttribute";
// const cryptoRandomString = require("crypto-random-string");
const cryptoRandomString = (obj: any) => {

}

/**
 * 这里需要将o2作为o1的子值 这里使用回调方法而不是用Promise的原因为需要严格保证外部的调用时序
 */
export function merge(
  o1: any,
  o2: any,
  currentPointPositionAfterIndex = -1,
  onFinish = () => {}
) {
  if (o1 && o2) {
    if (!o1["__children"]) {
      o1["__children"] = [];
    }
    // 更新结构关系，将插入到指定的位置
    if (currentPointPositionAfterIndex > -1) {
      o1["__children"].splice(currentPointPositionAfterIndex, 0, o2);
    } else {
      o1["__children"].push(o2);
    }
    onFinish();

    // 这里踩了一个坑，所有的对象的默认属性__proto__都指向同一个对象，会引起意外的问题
    o2.__proto__ = { parentCodeNode: o1 };
  }
}

/**
 * 将预生成的ID替换，否则当有两个组件挂在同一个树上时，后一个会将前一个的属性覆盖
 * @param {*} codeObj
 * @param {*} html
 * @returns
 */
export function replaceRowID(codeObj: any, html: any) {
  // 生成一个唯一的ID，使Code和Dom一一对应，与原代码脱离关系
  let newHtml = html;
  function deep(obj: any) {
    if (isObject(obj)) {
      for (const key in obj) {
        // @ts-ignore
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          if (key == "lc_id") {
            const oldID = obj[key];
            const newID = cryptoRandomString({
              length: 10,
              type: "base64",
            });
            newHtml = newHtml.replace(oldID, newID);
            obj[key] = newID;
          } else if (isObject(element)) {
            deep(element);
          } else if (isArray(element)) {
            element.forEach((item: any) => deep(item));
          }
        }
      }
    }
  }
  deep(codeObj);
  return newHtml;
}

/**
 * @param {*} target
 * @returns
 */
export function generateRawInfo(target: any) {
  if (target.attributes.lc_id) {
    // 获取源代码结构
    // @ts-ignore
    const rowCode = window.templateSourceMap[target.attributes.lc_id.nodeValue];
    return rowCode;
  } else if (target.__vue__) {
    // 代表这是一个Vue组件组成的元素，这里的逻辑渐渐不再使用
    // @ts-ignore
    const temp = findVueInfo(target.__vue__.$vnode);
    return temp;
  } else {
    // 这是一个普通的元素
    const temp = {
      [target.localName]: {
        __text__: target.innerText,
        class: target.className,
      },
    };
    return temp;
  }
}

// 特殊分隔符
export function getSplitTag() {
  return "@#$!";
}

/**
 * 在这里维护一棵以ID为KEY的树
 * @param {*} codeObj
 */
export function updateLinkTree(codeObj: any) {
  // @ts-ignore
  if (!window.tree) {
    // @ts-ignore
    window.tree = {};
  }

  // @ts-ignore
  if (!window.treeWithID) {
    const innerObj: any = {};
    Object.defineProperty(window, "treeWithID", {
      get: function () {
        return innerObj;
      },
      set: function (newValue) {
        // @ts-ignore
        innerObj = newValue;
      },
    });
  }

  flatCodeObj(codeObj);
}

/**
 * @param {*} codeObj
 */
export function flatCodeObj(codeObj: any) {
  function deep(object: any) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        // 如果对__children的子属性遍历时，它内部的元素需要指向外层的节点作为父节点
        if (
          object.hasOwnProperty("__key__") &&
          object["__key__"] === "__children" &&
          isObject(element)
        ) {
          delete object["__key__"];
        }

        if (key === "lc_id" && object.hasOwnProperty("__key__")) {
          const outerKey = object["__key__"];
          const newObj: any = {
            [outerKey]: object,
          };

          // 这个关系也需要链接
          newObj.__proto__ = object.__proto__;
          delete object.__key__;
          // @ts-ignore
          window.tree[element] = newObj;

          // 这个备份用于生成兄弟组件时获取原始代码所用，需要保留ID的信息才可以实现DOM与代码对象的关联
          const copy = Object.create(newObj.__proto__);
          Object.assign(copy, JSON.parse(JSON.stringify(newObj)));
          // @ts-ignore
          window.treeWithID[element] = copy;
        } else if (key === "__children") {
          object.__children.forEach((child: any) => {
            child["__key__"] = key;
            deep(child);
          });
        } else if (isObject(element)) {
          element["__key__"] = key;
          deep(element);
        }
      }
    }
  }

  deep(codeObj);
}

/**
 * 获取这个元素所对应的代码结构
 * @param {*} element
 * @returns
 */
// @ts-ignore
export function findRawVueInfo(element) {
  // 这里对于form这样的怪物来说会导致指向错乱的问题
  // if (element.__rawVueInfo__) {
  //   return element.__rawVueInfo__;
  // } else
  // @ts-ignore
  if (window.tree[element.attributes.lc_id.nodeValue]) {
    // @ts-ignore
    return window.tree[element.attributes.lc_id.nodeValue];
  } else {
    return findRawVueInfo(element.parentNode);
  }
}

/**
 * 放入容器
 * @param {*} vueInfo
 */
export function insertPresetAttribute(vueInfo: any) {
  const key = getRawComponentKey(vueInfo);
  const value = vueInfo[key];
  // 后续饿了么组件会有问题需要替换
  const presetAttr = presetAttribute[key];
  if (presetAttr) {
    for (const key in presetAttr) {
      if (presetAttr.hasOwnProperty(key)) {
        // 将原先的属性做新增或者替换操作
        const element = presetAttr[key];
        value[key] = element;
      }
    }
  }
}

/**
 * 寻找实际的可以代表整个复合组件Dom，这是个核心方法，根据某个元素查找实际的以Vue组件为单位的最小元素
 * @param {*} element
 * @returns
 */
// @ts-ignore
export function findCodeElemNode(element: any) {
  if (element.attributes && element.attributes.lc_id) {
    return element;
  } else if (element.parentNode) {
    return findCodeElemNode(element.parentNode);
  } else {
    return null;
  }
}

/**
 * 使生成的代码不携带ID属性
 * @param {*} codeObj
 */
export function removeAllID(codeObj: any) {
  function deep(obj: any) {
    if (isObject(obj)) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          if (key == "lc_id" || key == "lc-mark") {
            delete obj[key];
          } else if (isObject(element)) {
            deep(element);
          } else if (isArray(element)) {
            element.forEach((item: any) => deep(item));
          }
        }
      }
    }
  }

  deep(codeObj);
}
