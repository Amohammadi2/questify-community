import { styled } from "@nextui-org/react";

const CategoryItemUI = styled('div', {
  px: '$4',
  py: '$4',
  flexBasis: '33.3%',
  textAlign: 'center',
  cursor: 'pointer',
  transition: '$button',
  userSelect: 'none',
  '&:hover': {
    bg: '$gray300',
  },
  '&.active': {
    bg: '$primaryLight',
    cursor: 'unset'
  }
})

interface ICategoryItemProps {
  active: boolean;
  category: string;
  onSelected: (category: string) => void;
}

export default function CategoryItem({
  active,
  category,
  onSelected
} : ICategoryItemProps) {
  return (
    <CategoryItemUI
      onClick={()=>onSelected(category)}
      className={active ? 'active' : ''}
    >
      {category}
    </CategoryItemUI>
  )
}