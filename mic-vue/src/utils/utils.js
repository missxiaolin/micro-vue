import { isArray, isObject } from "@vue/shared";

/**
 * @param {*} origin
 * @param {*} target
 * @returns
 */
export const deepClone = (origin, target) => {
  const tar = target || {};
  for (const key in origin) {
    if (Object.prototype.hasOwnProperty.call(origin, key)) {
      if (typeof origin[key] === "object" && typeof origin[key] !== null) {
        tar[key] = isArray(origin[key]) ? [] : {};
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }

  return tar;
};

/**
 * 解析字符串，例如'xx?a={a}&b={b}' ==> 'xx?a=123&b=456'
 * @param fullPath 需要解析的url
 * @param currentNode 参与解析对象
 * @returns 解析后url
 */
export function extUrl(fullPath, currentNode = {}) {
  let url = fullPath;
  let RegArr = url.match(/\{(.+?)\}/g) || [];
  if (!RegArr.length) return "";

  RegArr.forEach((item) => {
    const key = item.slice(1, -1);
    if (currentNode[key]) {
      url = url.replace(item, currentNode[key]);
    } else {
      url = url.replace(item, "*");
    }
  });

  return url;
}

/**
 * 指定长度和基数
 * @param {*} len
 * @param {*} radix
 * @returns
 */
export function uuid(len, radix) {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}

