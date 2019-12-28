# X-Tree Diff

A implementation for *X-tree Diff: An Efficient Change Detection Algorithm for Tree-structured Data*.

Paper link: <https://link.springer.com/chapter/10.1007/3-540-45036-X_74>.


## install

```shell
npm install --save @dov/x-tree-diff
# or
yarn add @dov/x-tree-diff
```

## Usage

```ts
import { XMLXTreeDiff } from '@dov/x-tree-diff'

const xmlStr = `<Meta>
  <Author>yidafu(dov yih)</Author>
  <Title>x-tree-diff</Title>
</Meta>`;

const xmlStr2 =  `<Meta>
<Author>yidafu(dov yih)</Author>
<Name>x-tree-diff</Name>
</Meta>`;

const xmlDiff = new XMLXTreeDiff(xmlStr, xmlStr2);
const { oldTree, newTree } = xmlDiff.diff();
/*
oldTree:
<Meta op="0">
  <Author op="0">yidafu(dov yih)</Author>
  <Title op="2">x-tree-diff</Title>
</Meta>

newTree:
<Meta op="0">
  <Author op="0">yidafu(dov yih)</Author>
  <Name op="1">x-tree-diff</Name>
</Meta>
*/
```

## Advanced Usage

if you want to implement your own Tree Struct Diff，you should implement `XTreeDiff` class -- two method you need impl `buildXTree` `dumpXTree`.

```ts
abstract class XTreeDiff<T> {
  public abstract buildXTree(rawTree: T): XTree;

  public abstract dumpXTree(xTree: XTree): T;
}
```

see `src/XMLXTreeDiff.ts` for more detail.

## API

Implement:

+ `XMLXTreeDiff` xml impl
+ `HTMLXTreeDiff` Dom impl

Othor:

+ `XTreeDiff` abstract class. Implemetn core `X-Tree Diff` alogrithm
+ `XTree` core data struct
+ `EditOption`, five option: `NOP`,`INS`,`DEL`,`UPD`,`MOV`
