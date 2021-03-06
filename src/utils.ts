/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th December 2019 3:31 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th December 2019 3:31 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import XTree from './XTree';

export function typeOf(obj: any): string {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

export type visitorFn = (node: XTree) => boolean | void;
/**
 * Depth-First pre-order Traverse
 *
 * @export
 * @param {XTree<T>} root
 * @param {(node: XTree<T>) => boolean} visitor
 */
export function XTreeDFTraverse<T>(root: XTree<T>, visitor: visitorFn): void {
  if (!root) return;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop() as XTree;
    const stop = visitor(node);
    if (!stop && node.hasChildren()) {
      node.forEach((child) => {
        stack.push(child);
      });
    }
  }
}

/**
 * Breadth-First pre-order Traverse
 *
 * @export
 * @param {XTree<T>} root
 * @param {(node: XTree<T>) => boolean} visitor don't visit children if visitor return true
 * @returns {void}
 */
export function XTreeBFTraverse<T>(root: XTree<T>, visitor: visitorFn): void {
  if (!root) return;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift() as XTree<T>;
    const stop = visitor(node);
    if (!stop && node.hasChildren()) {
      node.forEach(child => queue.push(child));
    }
  }
}
