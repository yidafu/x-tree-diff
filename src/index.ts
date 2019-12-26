/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th December 2019 1:18 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th December 2019 1:20 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import XTree from './XTree';
import { XTreeDFTraverse, XTreeBFTraverse } from './utils';
import EditOption from './EditOption';

/** @types {Map<string, XTree>}  all the nodes with unique tMD in T_new are registered to N_Htable  */
const N_Htable = new Map<string, XTree>();
/** @types {Map<string, XTree>}  all the nodes with non-unique tMD in T_old are registered to O_Htable  */
const O_Htable = new Map<string, XTree[]>();
const M_List = new Map<XTree, XTree>();

function matchNode(node1: XTree, node2: XTree, op: EditOption): void {
  node1.Op = op;
  node2.Op = op;
  node1.nPtr = node2;
  node2.nPtr = node1;
}

function initHtable(
  root: XTree, callback: (node: XTree, tMD_map: Map<string, number>) => void,
): Map<string, number> {
  const tMD_map = new Map<string, number>();
  XTreeDFTraverse(root, (node) => {
    if (tMD_map.has(node.tMD)) {
      tMD_map.set(node.tMD, (tMD_map.get(node.tMD) as number) + 1);
    } else {
      tMD_map.set(node.tMD, 1);
    }
  });

  XTreeDFTraverse(root, node => callback(node, tMD_map));
  return tMD_map;
}

// TODO: step 4 seem wrong
export function xTreeDiff(T_old: XTree, T_new: XTree): void {
  // step 1 match identical subtree with 1-to-1 correspondence
  initHtable(T_old, (node, old_tMD_map) => {
    const isNonUnique = old_tMD_map.get(node.tMD) !== 1;
    if (isNonUnique) {
      if (O_Htable.has(node.tMD)) {
        const nonUniqueArr = O_Htable.get(node.tMD) as XTree[];
        nonUniqueArr.push(node);
      } else {
        O_Htable.set(node.tMD, [node]);
      }
    }
  });

  initHtable(T_new, (node, new_tMD_map) => {
    const isUnique = new_tMD_map.get(node.tMD) === 1;
    if (isUnique) {
      N_Htable.set(node.tMD, node);
    }
  });

  XTreeDFTraverse(T_old, (N_node): boolean => {
    if (!O_Htable.has(N_node.tMD)) {
      if (N_Htable.has(N_node.tMD)) {
        const M_node = N_Htable.get(N_node.tMD) as XTree;
        matchNode(N_node, M_node, EditOption.NOP);
        M_List.set(N_node, M_node);
        return true;
      }
    }
    return false;
  });

  // step 2 propagete matching upward

  // eslint-disable-next-line no-restricted-syntax
  for (const [A, B] of M_List) {
    let pA: XTree = A.pPtr as XTree;
    let pB: XTree = B.pPtr as XTree;
    while (true) {
      if (pA === null && pB === null) {
        break;
      }
      if (pA.nPtr === null && pB.nPtr === null) {
        if (pA.label === pB.label) {
          matchNode(pA, pB, EditOption.NOP);
          pA = pA.pPtr as XTree;
          pB = pB.pPtr as XTree;
        } else {
          matchNode(A, B, EditOption.MOV);
          break;
        }
      } else {
        if (pA.pPtr !== null && pA.nPtr !== pB) {
          matchNode(A, B, EditOption.MOV);
          break;
        } else if (pB.pPtr !== null && pB.nPtr !== pA) {
          matchNode(A, B, EditOption.MOV);
          break;
        }
        break;
      }
    }
  }
  // step 3 match remaining nodes

  XTreeDFTraverse(T_old, (nodeA) => {
    if (nodeA.nPtr !== null) {
      const cA: XTree[] = [];
      nodeA.forEach((child) => {
        if (child.nPtr === null) {
          cA.push(child);
        }
      });
      const nodeB = nodeA.nPtr;
      const cB: XTree[] = [];
      // eslint-disable-next-line no-unused-expressions
      nodeB?.forEach((child): void => {
        if (child.nPtr === null) {
          cB.push(child);
        }
      });

      for (let bIdx = 0; bIdx < cB.length; bIdx++) {
        const aIdx = cA.findIndex(chidA => chidA.tMD === cB[bIdx].tMD);
        if (aIdx !== -1) {
          matchNode(cA[aIdx], cB[bIdx], EditOption.NOP);
        } else {
          const aLabelIdx = cA.findIndex(childA => childA.label !== cB[bIdx].label);
          if (cA[aLabelIdx].value === cB[bIdx].value) {
            matchNode(cA[aLabelIdx], cB[bIdx], EditOption.NOP);
          } else {
            matchNode(cA[aLabelIdx], cB[bIdx], EditOption.UPD);
          }
        }
      }
    }
  });

  // step 4  determine node for addition and deletion
  XTreeBFTraverse(T_old, (node) => {
    if (node.nPtr === null) {
      node.Op = EditOption.DEL;
    }
  });
  XTreeBFTraverse(T_new, (node) => {
    if (node.nPtr === null) {
      node.Op = EditOption.INS;
    }
  });
}
