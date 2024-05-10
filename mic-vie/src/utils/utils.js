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
    if (!RegArr.length) return '';
  
    RegArr.forEach((item) => {
      const key = item.slice(1, -1);
      if (currentNode[key]) {
        url = url.replace(item, currentNode[key]);
      } else {
        url = url.replace(item, '*');
      }
    });
  
    return url;
  }