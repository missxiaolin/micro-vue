

export function brotherEleEnum() {
    return [
        {
            name: 'el-option',
            ifInDoc: false // 这个组件是否默认在Dom上展示，如果不展示，则添加后不需要更新Dom，否则需要更新Dom
        }
    ]
}

/**
 * @param {*} __rawVueInfo__ 
 */
export function copyBroCode(__rawVueInfo__) {
    // 初始化原型
    let newDropObj = Object.create(__rawVueInfo__.__proto__);
    // 拷贝内部属性
    Object.assign(newDropObj, JSON.parse(JSON.stringify(__rawVueInfo__)));

    newDropObj.__proto__.parentCodeNode.__children.push(newDropObj);
}