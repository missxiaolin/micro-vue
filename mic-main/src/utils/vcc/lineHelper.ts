import { findCodeElemNode, findRawVueInfo } from "./forCode";
import { getRawComponentContent } from "./common";

let currentPostion: any = null,
  currentTarget: any = null,
  preSelectTarget: any = null; // 记录上一次鼠标所在位置

const TOP = 1,
  MIDDLE = 2,
  BOTTOM = 3;

/**
 * @param {*} targetElement
 * @param {*} _currentPointer
 */
export function initContainerForLine(
  targetElement: any,
  _currentPointer = () => {}
) {
  const crossX: any = document.querySelector(".x");
  const currentPointer = (...args: any) => {
    // @ts-ignore
    _currentPointer(...args);
  };

  targetElement.addEventListener("dragover", (event: any) => {
    event.preventDefault();
    drawLine(event);
  });

  targetElement.addEventListener("dragleave", (event: any) => {
    if (event.target === targetElement) {
      targetElement.classList.remove("in-element");
      crossX.style = "display: none;";
    } else {
      clearTargetOutline();
    }
  });

  /**
   * 获得一个元素在父元素中的索引
   * @param {*} element
   * @returns
   */
  function findElementIndex(element: any) {
    // 根据代码结构查找
    const parentElementNode = findCodeElemNode(element.parentElement);
    const lc_id = element.getAttribute("lc_id");
    if (parentElementNode) {
      const parentRawInfo = findRawVueInfo(parentElementNode);

      const attributes = getRawComponentContent(parentRawInfo);

      if (attributes) {
        const childrenArray = attributes.__children;

        const index = childrenArray.findIndex((item: any) => {
          return getRawComponentContent(item).lc_id == lc_id;
        });
        return index;
      }
    }
    return -1;
  }

  // 清除
  function clearTargetOutline() {
    if (preSelectTarget) {
      preSelectTarget.classList.remove("in-element");
    }
  }

  /**
   * 绘制辅助线
   * @param {*} event
   * @returns
   */
  function drawLine(event: any) {
    const realTarget = event.target;

    // 新的逻辑是：只有上下定位辅助线，不再计算左右辅助线
    const directionObj = judgeTopOrBottom(
      realTarget,
      event.clientX,
      event.clientY
    );
    const position = getElCoordinate(realTarget);

    if (directionObj.top && targetElement !== realTarget) {
      // 如果鼠标点在目标的上部分则绘制上部分辅助线
      if (currentPostion === TOP && currentTarget === realTarget) {
        return;
      }
      currentPostion = TOP;
      currentTarget = realTarget;

      clearTargetOutline();

      crossX.style = `top:${position.top}px;width:${position.width}px;left:${position.left}px;display:block;`;

      currentPointer(realTarget.parentElement, findElementIndex(realTarget));
    } else if (directionObj.bottom && targetElement !== realTarget) {
      // 如果鼠标点在目标的下部分，则绘制下部分辅助线
      // 如果鼠标点在目标的下部分，则绘制下部分辅助线
      if (currentPostion === BOTTOM && currentTarget === realTarget) {
        return;
      }
      currentPostion = BOTTOM;
      currentTarget = realTarget;

      clearTargetOutline();

      crossX.style = `top:${position.bottom}px;width:${position.width}px;left:${position.left}px;display:block;`;

      currentPointer(
        realTarget.parentElement,
        findElementIndex(realTarget) + 1
      );
    } else {
      currentPostion = MIDDLE;
      currentTarget = realTarget;

      realTarget.classList.add("in-element");
      preSelectTarget = realTarget;

      crossX.style = `display:none;`;

      currentPointer(realTarget, -1);
    }
  }
}

/**
 * 判断上还是下
 * @param {*} e
 * @param {*} x
 * @param {*} y
 * @returns
 */
function judgeTopOrBottom(e: any, x: any, y: any) {
  const position = getElCoordinate(e);

  const cutDistance = Math.round((position.bottom - position.top) / 3);

  return {
    top: y < position.top + cutDistance,
    middle:
      y >= position.top + cutDistance && y <= position.top + cutDistance * 2,
    bottom: y > position.top + cutDistance * 2,
  };
}

/**
 * 获取一个元素在屏幕上的坐标点
 * @param {*} e
 * @returns
 */
function getElCoordinate(e: any) {
  const rect = e.getBoundingClientRect();
  return rect;
}
