import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, IconButtonProps } from "@mui/material";

export interface IToolbarButtonProps extends IconButtonProps  {
  icon: IconProp
  isActive?: boolean
}

export function ToolbarButton({ icon, isActive, ...props }: IToolbarButtonProps) {
  return (
    <IconButton {...props} sx={{ width: '36px', height: '36px', fontSize: '18px', mx: .4, color: isActive? 'black' : 'gray' }}>
      <FontAwesomeIcon icon={icon} />
    </IconButton>
  )
}