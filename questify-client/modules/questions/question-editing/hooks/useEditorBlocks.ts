import { useState } from "react";
import { useId } from "../../../utils/useId";

interface IBlock {
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
    updateBlock(blockId, block:IBlock) {
      setEditorBlocks([...editorBlocks.filter(bl=>bl.id!=blockId), {...block, id:blockId }])
    }
  };

  return API;
}