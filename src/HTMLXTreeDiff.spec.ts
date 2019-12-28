/**
 * @jest-environment jsdom
 */

/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 28th December 2019 5:21 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 28th December 2019 11:43 pm                      *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import HTMLXTreeDiff from "./HTMLXTreeDiff";
import EditOption from "./EditOption";

const html1 = `<div>
  <p>yidafu(dov yih)</p>
  <span>x-tree-diff</span>
</div>`;

const html2 =  `<div>
  <p>yidafu(dov yih)</p>
  <code>x-tree-diff</code>
</div>`;

document.body.innerHTML = `
  <div id="div1">${html1}</div>
  <div id="div2">${html2}</div>
`;

const $div1 = document.getElementById('div1') as HTMLElement;
const $div2 = document.getElementById('div2') as HTMLElement;

describe("HTMLXTreeDiff", () => {
  test('diff', () => {
    const xmlDiff = new HTMLXTreeDiff($div1, $div2);
    const { oldTree, newTree } = xmlDiff.diff();
    expect(oldTree.innerHTML).toBe(
`<div op="${EditOption.NOP}">
  <p op="${EditOption.NOP}">yidafu(dov yih)</p>
  <span op="${EditOption.DEL}">x-tree-diff</span>
</div>`);
    expect(newTree.innerHTML).toBe(
`<div op="${EditOption.NOP}">
  <p op="${EditOption.NOP}">yidafu(dov yih)</p>
  <code op="${EditOption.INS}">x-tree-diff</code>
</div>`);
  });
});