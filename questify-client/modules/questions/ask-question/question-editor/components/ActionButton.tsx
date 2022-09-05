import { styled, Button } from "@nextui-org/react";

// :Hack: We are using `!important` to override the width property
const ActionButton = styled(Button, {
  width: '100% !important',
  my: '$2',
  mx: '$2',
  '@xs': {
    width: 'auto !important',
  }
});

export default ActionButton;