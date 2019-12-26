/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th December 2019 9:05 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th December 2019 9:05 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { xTreeDiff } from './index';
import XTree, { NodeType } from './XTree';


const a1 = new XTree({
  label: 'a',
  type: NodeType.ELEMENT,
  index: 1,
});

const b1 = new XTree({
  label: 'b',
  type: NodeType.ELEMENT,
  index: 1,
});

const h2 = new XTree({
  label: 'h',
  type: NodeType.ELEMENT,
  index: 2,
});
const c1 = new XTree({
  label: 'c',
  type: NodeType.ELEMENT,
  index: 1,
});
const f2 = new XTree({
  label: 'f',
  type: NodeType.ELEMENT,
  index: 2,
});
const h3 = new XTree({
  label: 'h',
  type: NodeType.ELEMENT,
  index: 3,
});
const text1 = new XTree({
  type: NodeType.TEXT,
  value: 'text1',
  index: 1,
});
const text2 = new XTree({
  type: NodeType.TEXT,
  value: 'text2',
  index: 2,
});
const text3 = new XTree({
  type: NodeType.TEXT,
  value: 'text3',
  index: 1,
});
const h_4_2 = new XTree({
  type: NodeType.ELEMENT,
  label: 'h',
  index: 2,
});


const T_old = a1;
T_old.append(b1);
T_old.append(h2);
b1.append(c1);
b1.append(f2);
b1.append(h3);
c1.append(text1);
c1.append(text2);
f2.append(text3);
f2.append(h_4_2);


const a1_2 = new XTree({
  label: 'a',
  type: NodeType.ELEMENT,
  index: 1,
});

const b1_2 = new XTree({
  label: 'b',
  type: NodeType.ELEMENT,
  index: 1,
});

const h2_2 = new XTree({
  label: 'h',
  type: NodeType.ELEMENT,
  index: 2,
});
const c1_2 = new XTree({
  label: 'c',
  type: NodeType.ELEMENT,
  index: 1,
});
const f2_2 = new XTree({
  label: 'f',
  type: NodeType.ELEMENT,
  index: 2,
});
const h3_2 = new XTree({
  label: 'h',
  type: NodeType.ELEMENT,
  index: 3,
});

const text1_2 = new XTree({
  type: NodeType.TEXT,
  value: 'text1',
  index: 1,
});
const text2_2 = new XTree({
  type: NodeType.TEXT,
  value: 'text2',
  index: 2,
});
const text3_2 = new XTree({
  type: NodeType.TEXT,
  value: 'text3',
  index: 1,
});
const i_2_4_2 = new XTree({
  label: 'i',
  type: NodeType.ELEMENT,
  index: 2,
});

const T_new = a1_2;

T_new.append(b1_2);
T_new.append(h2_2);
b1_2.append(c1_2);
b1_2.append(f2_2);
b1_2.append(h3_2);
c1_2.append(text1_2);
c1_2.append(text2_2);
f2_2.append(text3_2);
f2_2.append(i_2_4_2);

describe('xTreeDiff', () => {
  test('example', () => {
    xTreeDiff(T_old, T_new);
    expect(T_old.nPtr).toBe(T_new);
  });
});
