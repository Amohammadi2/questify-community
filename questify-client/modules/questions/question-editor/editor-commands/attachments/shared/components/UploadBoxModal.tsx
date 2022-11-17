import { Modal, Text } from '@nextui-org/react';
import { ReactNode } from 'react';

interface IUploadBoxModal {
  open?: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode | ReactNode[];
}

export default function UploadBoxModal({ open=false, onClose, title, subtitle='', children } : IUploadBoxModal) {
  return (
    <Modal
      css={{
        px: '$5',
        py: '$3'
      }}
      open={open}
      onClose={onClose}
    >
      <Text h3 css={{ my: '$3' }}>{title}</Text>
      <Text>{subtitle}</Text>
      {children}
    </Modal>
  );
}