import { Card, styled } from "@nextui-org/react";

const ItemCard = styled(Card, {
  '&': {
    transition: 'all 0.1s ease-out',
    py: '$5',
    px: '$8',
    my: '$3',
    backgroundColor: '$gray400',
    flexDirection: 'row',
    'span': {
      'px': '$5',
      'color': '$g'
    }
  },
  '&:hover': {
    transform: 'translateY(-5px) scale(1.04)'
  }
});

export default ItemCard;