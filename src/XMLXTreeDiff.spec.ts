import XMLXTreeDiff, { ROOT_LABEL } from "./XMLXTreeDiff";
import EditOption from "./EditOption";

const xmlStr = `<Meta>
  <Author>yidafu(dov yih)</Author>
  <Title>x-tree-diff</Title>
</Meta>`;

const xmlStr2 =  `<Meta>
<Author>yidafu(dov yih)</Author>
<Name>x-tree-diff</Name>
</Meta>`;

describe("XMLXTreeDiff", () => {
  test('parse xml', () => {
    const xmlDiff = new XMLXTreeDiff(xmlStr, xmlStr);
    const xTree = xmlDiff.buildXTree(xmlStr);
    expect(xTree.label).toBe(ROOT_LABEL);
    expect(xTree.getChild(0)?.getChild(0)?.getChild(0)?.value).toBe('yidafu(dov yih)');
  });

  test('diff', () => {
    const xmlDiff = new XMLXTreeDiff(xmlStr, xmlStr2);
    const { oldTree, newTree } = xmlDiff.diff();
    expect(oldTree).toBe(`<Meta op="${EditOption.NOP}"><Author op="${EditOption.NOP}">yidafu(dov yih)</Author><Title op="${EditOption.DEL}">x-tree-diff</Title></Meta>`)
    expect(newTree).toBe(`<Meta op="${EditOption.NOP}"><Author op="${EditOption.NOP}">yidafu(dov yih)</Author><Name op="${EditOption.INS}">x-tree-diff</Name></Meta>`)
  });
});