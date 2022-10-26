import { styled } from "@nextui-org/react";

const EditorToolbarMenuItemUI = styled('div', {
  d: 'flex',
  px: '$2',
  py: '$1',
  '&:hover': {
    bg: '$gray300',
    cursor: 'pointer',
  },
  w: '100%'
});



export default function EditortoolbarMenuItem() {
  return (
    <EditorToolbarMenuItemUI>

    </EditorToolbarMenuItemUI>
  );
}