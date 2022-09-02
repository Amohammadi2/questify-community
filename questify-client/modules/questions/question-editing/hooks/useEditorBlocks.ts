import { useState } from "react";
import { useId } from "../../../utils/useId";

export interface IBlock {
  type: "text" | "file";
  content: object;
}

/**
 * @description exposes APIs to deal with editor blocks client-side
 */
export function useEditorBlocks() {

  const { next } = useId();
  const [editorBlocks, setEditorBlocks] = useState<(IBlock & {id: number})[]>([]);

  const API = {
    blocks: editorBlocks,
    addBlock(block: IBlock) {
      setEditorBlocks([...editorBlocks, {...block, id:next()}]);
    },
    removeBlock(blockId: number) {
      setEditorBlocks(editorBlocks.filter(bl=>bl.id!=blockId));
    },
    updateBlock(blockId, content: object) {
      const affectedBlock = editorBlocks.find((b)=>b.id==blockId);
      if (!affectedBlock)
        throw Error('The updating block with the id of ' + blockId + ' does not exist');
      setEditorBlocks([...editorBlocks.filter(b=>b.id!=blockId), {...affectedBlock, content}]);
    }
  };

  return API;
}