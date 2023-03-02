import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BtnSideIcon({ icon } : {icon: IconProp}) {
  return (
    <FontAwesomeIcon
      icon={icon}
      style={{ marginLeft: '5px' }}
    />
  )
}