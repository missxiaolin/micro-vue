import isEqual from "lodash/isEqual";
import cryptoRandomString from "crypto-random-string";

/**
 * @param {*} __rawVueInfo__ 
 * @returns 
 */
export function getRawComponentKey(__rawVueInfo__: any) {
    return Object.keys(__rawVueInfo__)[0];
}

/**
 * @param {*} __rawVueInfo__ 
 * @returns 
 */
export function getRawComponentContent(__rawVueInfo__: any) {
    return __rawVueInfo__[getRawComponentKey(__rawVueInfo__)];
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
            jsonObj["lc_id"] = cryptoRandomString({ length: 10, type: "base64" });
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