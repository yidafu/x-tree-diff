/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th December 2019 1:21 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th December 2019 1:21 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable no-param-reassign */

import EditOption from './EditOption';
import md4 from './md4';
import { typeOf } from './utils';

const tMDSym = Symbol('tMD');
const nMDSym = Symbol('nMD');

export enum NodeType {
  ELEMENT = 'ELEMENT',
  TEXT = '#TEXT',
}


interface IBaseParam {
  index: number;
  type: NodeType;
}

interface INodeParam extends IBaseParam {
  label: string;
  type: NodeType.ELEMENT;
}

interface ITextParam extends IBaseParam {
  type: NodeType.TEXT;
  value: string;
}

export type IXTreeConstructorParam = INodeParam | ITextParam;

export default class XTree {
  /**
   * node tag name
   *
   * @type {string}
   * @memberof XTree
   */
  public label = '';

  /**
   * node type element or text
   *
   * @type {string}
   * @memberof XTree
   */
  public type: NodeType;

  /**
   * text value
   *
   * @type {string}
   * @memberof XTree
   */
  public value = '';

  /**
   *
   *
   * @type {number}
   * @memberof XTree
   */
  public index: number;

  private [nMDSym]: string;
  /**
   * node message digest
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  public get nMD(): string {
    if (!this[nMDSym]) {
      this[nMDSym] = md4(this.label + this.value);
    }
    return this[nMDSym];
  }

  private [tMDSym]: string;
  /**
   * tree message digest
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  public get tMD(): string {
    if (!this[tMDSym]) {
      let tMD = this.nMD;
      this.children.forEach((child) => {
        tMD = child.tMD;
      });
      this[tMDSym] = md4(tMD);
    }
    return this[tMDSym];
  }

  /**
   *
   *
   * @type {XTree}
   * @memberof XTree
   */
  public nPtr: XTree | null = null;

  /**
   *
   *
   * @type {EditOption}
   * @memberof XTree
   */
  public Op: EditOption | null = null;


  /**
   * index label
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  public get lLabel(): string {
    return `.${this.label}[${this.index}]`;
  }

  /**
   * node indentifer
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  public get nId(): string {
    if (this.pPtr) {
      return `${this.pPtr.nId}${this.lLabel}`;
    }
    return `${this.lLabel}`;
  }

  private children: XTree[] = [];

  public pPtr: XTree | null = null;

  constructor(param: IXTreeConstructorParam) {
    this.index = param.index;
    this.type = param.type;
    if (param.type === NodeType.ELEMENT) {
      this.label = param.label;
    } else {
      this.label = NodeType.TEXT;
      this.value = param.value;
    }
  }

  public append(child: XTree): void {
    if (child instanceof XTree) {
      child.pPtr = this;
      this.children.push(child);
    } else {
      throw TypeError(`child should be XTree, not ${typeOf(child)}`);
    }
  }

  public forEach(callback: (node: XTree, index: number, thisArg: XTree) => void): void {
    this.children.forEach((child) => {
      callback(child, child.index, this);
    });
  }

  public hasChildren(): boolean {
    return this.children.length !== 0;
  }
}
