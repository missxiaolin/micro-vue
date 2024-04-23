'use strict';

//该文件用于解析HTML，输出为Object对象

Object.defineProperty(exports, '__esModule', { value: true });

const htmlparser2 = require("htmlparser2");

/**
 * @param {*} node 
 * @returns 
 */
function getNodeContent(node) {
    return node[Object.keys(node)[0]];
}

/**
 * 每个节点的表示方法为:
 * {
 *      tagname: {
 *          key1: value1,
 *          key2: value2,
 *          __children: [
 *              {
 *              }
 *          ]
 *      }
 * }
 * @param {*} tagName 
 * @param {*} attributes 
 * @returns 
 */
function generateNewNode(tagName, attributes = {}) {
    // 构建新节点
    const newNode = {};
    newNode[tagName] = attributes;
    attributes.__children = [];
    return newNode;
}

/**
 * 解析
 * @param {*} htmlData 
 * @returns 
 */
function parseHtml(htmlData) {
    return new Promise((resolve, reject) => {
        // 根节点
        const root = generateNewNode('root');
        // 当前访问的节点
        let currentAccessObject = root;
        // 之前访问的节点数组
        let lastAccessStack = [root];

        // options docment: https://github.com/fb55/htmlparser2/wiki/Parser-options
        const parser = new htmlparser2.Parser({
            onopentag(tagname, attributes) {
                const newNode = generateNewNode(tagname, attributes);
                lastAccessStack.push(newNode);
                getNodeContent(currentAccessObject).__children.push(newNode);
                currentAccessObject = newNode;
            },
            ontext(text) {
                if (text.trim()) {
                    getNodeContent(currentAccessObject).__text__ = text.trim();
                }
            },
            onclosetag(tagname) {
                lastAccessStack.pop();
                currentAccessObject = lastAccessStack[lastAccessStack.length - 1];
            },
            onend() {
                resolve(root);
            },

            onerror(error) {
                reject(error);
            }
        });
        parser.write(
            htmlData
        );
        parser.end();
    })
}

/**
 * @param {*} htmlData 
 * @returns 
 */
async function html2Json(htmlData) {
    return await parseHtml(htmlData);
}

exports.html2Json = html2Json;