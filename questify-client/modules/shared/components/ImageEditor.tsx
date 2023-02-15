import { faArrowCircleRight, faArrowLeft, faArrowRight, faBars, faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Text } from '@nextui-org/react';
import { IModal } from '@utils/modal.interface';
import { FlexColumn, IconButton } from 'modules/app-ui';
import { useState, useCallback } from 'react';
import Cropper from "react-easy-crop";
import UploadBox from './UploadBox';

interface IImageCropperProps extends IModal {}

export default function ImageEditor({ isOpen, onClose } : IImageCropperProps) {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploadBoxOpen, setUploadBoxOpen] = useState<boolean>(false);
  const [targetFile, setTargetFile] = useState<File|null>(null);


  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeButton
      fullScreen
      css={{
        position: 'relative'
      }}
    >
      <Cropper
        image="/imgs/snow-fall.jpg"
        crop={crop}
        zoom={zoom}
        aspect={3/3}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <FlexColumn
        css={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          borderTopLeftRadius: '$md',
          borderBottomLeftRadius: '$md',
          bg: '$white',
          py: '$5',
          px: '$3',
          pr: '$6',
          maxW: '300px',
          w: '100%',
          clipPath: 'circle(20.5px at calc(100% - 34.5px) 27.5px)',
          transition: 'all 0.3s ease-in-out',
          '&.open': {
            clipPath: 'circle(200%)'
          }
        }}
        className={uploadBoxOpen ? 'open' : ''}
      >
        <FlexColumn
          css={{
            position: 'relative',
            w: '100%',
            minHeight: '40px',
            justifyContent: 'center',
          }}
        >
          <IconButton
            css={{
              top: '0',
              right: '5px',
              position: 'absolute'
            }}
            onClick={()=>setUploadBoxOpen(!uploadBoxOpen)}
          >
            <FontAwesomeIcon icon={uploadBoxOpen ? faArrowRight : faBars} />
          </IconButton>
          <Text h3 css={{ mb: '$5' }}>آپلود تصویر</Text>
          <UploadBox
            currentFile={targetFile}
            onFileSet={(file) => setTargetFile(file)}
          />
          <Button css={{ mt: '$6' }} color="secondary">
            <FontAwesomeIcon icon={faCheck} style={{ margin: '0px 5px' }} />
            تایید
          </Button>
        </FlexColumn>
      </FlexColumn>
    </Modal>
  );

}