import { faFileText, faPenSquare, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Grid, styled, Text } from "@nextui-org/react";

interface ISelectorProps {
  onCellSelected: (cellType: string) => void
}

const CellTypeBoxUI = styled('div', {
  d: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '80px',
  height: '85px',
  bg: '$gray50',
  boxShadow: '$sm',
  mx: '$6',
  borderRadius: '$lg',
  transition: '0.1s ease-out',
  userSelect: 'none',
  '& :is(svg)': {
    transition: '0.1s ease-out',
    transform: 'translateY(18px)'
  },
  '& .subscript-text': {
    transition: '0.2s ease-out',
    opacity: '0',
    transform: 'translateY(20px)'
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '$xl',
    ':is(svg)': {
      transform: 'translateY(5px)'
    },
    '.subscript-text': {
      opacity: '1',
      transform: 'translateY(-6px)'
    }
  },
  '&:active': {
    bg: '$gray200',
    transform: 'scale(.9)'
  },
})

const MainBox = styled('div', {
  justifyContent: 'center',
  alignItems: 'center',
  d: 'flex',
  px: '$5',
  py: '$8',
  borderRadius: '$md'
})

const CellTypeBox = ({ text, icon, onClick }) => (
  <CellTypeBoxUI onClick={onClick}>
    <FontAwesomeIcon icon={icon} style={{fontSize: '30px'}} />
    <Text size="$sm" className="subscript-text">{text}</Text>
  </CellTypeBoxUI>
)

export default function CellTypeSelector({ onCellSelected }: ISelectorProps) {
  return (
    <Grid.Container direction="row" justify="center" alignItems="center">
      <MainBox>
        <CellTypeBox icon={faPenToSquare} text="متن" onClick={()=>onCellSelected("text")} />
        <CellTypeBox icon={faFileText} text="فایل" onClick={()=>onCellSelected("file")} />
      </MainBox>
    </Grid.Container>
  )
}