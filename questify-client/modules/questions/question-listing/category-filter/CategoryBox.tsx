import { styled } from "@nextui-org/react";
import CategoryItem from './CategoryItem';

const CategoryBoxUI = styled('div', {
  bg: '$gray50',
  d: 'flex',
  justifyContent: 'center',
})

interface ICategoryBoxProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelected: (newCategory: string) => void;
}

export default function CategoryBox({
  categories,
  selectedCategory,
  onCategorySelected
} : ICategoryBoxProps) {
  return (
    <CategoryBoxUI>
      {categories.map(
        c => (
          <CategoryItem
            key={c}
            category={c}
            active={selectedCategory === c}
            onSelected={onCategorySelected}
          />
        )
      )}
    </CategoryBoxUI>
  );
}