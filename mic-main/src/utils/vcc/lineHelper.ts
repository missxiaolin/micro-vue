let currentPostion: any = null,
  currentTarget: any = null,
  preSelectTarget: any = null; // 记录上一次鼠标所在位置
const TOP = 1,
  MIDDLE = 2,
  BOTTOM = 3;

import { findCodeElemNode, findRawVueInfo } from "./forCode";
import { getRawComponentContent } from "./common";

export function initContainerForLine(targetElement: any, _currentPointer: any) {
  const crossX: any = document.querySelector(".x");

  const currentPointer = (...args: any) => {
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

      if (parentRawInfo) {
        const attributes = getRawComponentContent(parentRawInfo);
        if (attributes) {
          const childrenArray = attributes.__children;

          const index = childrenArray.findIndex((item: any) => {
            return getRawComponentContent(item).lc_id == lc_id;
          });
          return index;
        }
      }
    }
    return -1;
  }

  function clearTargetOutline() {
    if (preSelectTarget) {
      preSelectTarget.classList.remove("in-element");
    }
  }

  function drawLine(event: any) {
    const realTarget = event.target;

    // 2021年03月26日15:56:35 新的逻辑是：只有上下定位辅助线，不再计算左右辅助线
    const directionObj = judgeTopOrBottom(
      realTarget,
      event.clientX,
      event.clientY
    );
    const position = getElCoordinate(realTarget);

    // 如果鼠标点在目标的上部分则绘制上部分辅助线
    if (directionObj.top && targetElement !== realTarget) {
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

// 获取一个元素在屏幕上的坐标点
function getElCoordinate(e: any) {
  const rect = e.getBoundingClientRect();
  return rect;
}

// 判断一个点是否在该元素内
function judgeEleIsContentPoint(e: any, x: any, y: any) {
  const position = getElCoordinate(e);

  return (
    x >= position.left &&
    x <= position.right &&
    y >= position.top &&
    y <= position.bottom
  );
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

// 判断点在元素的方向
function direction(e, x, y) {
  const position: any = getElCoordinate(e);

  // 基本方向判定
  const direction: any = {
    left: x < position.left ? position.left - x : 0,
    right: x > position.right ? x - position.right : 0,
    top: y < position.top ? position.top - y : 0,
    bottom: y > position.bottom ? y - position.bottom : 0,
  };

  // 判定方向更靠近哪个
  let count: any = 0;
  let directionStrArray: any = [];
  for (const key in direction) {
    const element = direction[key];
    if (element) {
      directionStrArray.push(key);
      count++;
    }
  }
  if (count === 2) {
    // 进一步判定更靠近哪个方向
    const num1 = direction[directionStrArray[0]];
    const num2 = direction[directionStrArray[1]];

    direction[directionStrArray[0]] = num1 > num2;
    direction[directionStrArray[1]] = num2 > num1;
  }

  direction.position = position;

  return direction;
}
