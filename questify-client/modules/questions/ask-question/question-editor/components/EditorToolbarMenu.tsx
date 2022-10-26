import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@nextui-org/react";
import { ReactNode } from "react";

const EditorToolbarMenuUI = styled('div', {
  d: 'flex',
  flexDirection: 'column',
  minW: '90px'
})

interface IEditorToolbarMenuProps {
  children: ReactNode | ReactNode[];
}

export default function EditorToolbarMenu({ children } : IEditorToolbarMenuProps) {
  return (
    <EditorToolbarMenuUI>
      {children}
    </EditorToolbarMenuUI>
  );
}