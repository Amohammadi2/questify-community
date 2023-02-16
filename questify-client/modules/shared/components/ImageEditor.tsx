import { faArrowCircleRight, faArrowLeft, faArrowRight, faBars, faCheck, faEllipsisV, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Text } from '@nextui-org/react';
import { IModal } from '@utils/modal.interface';
import { FlexColumn, IconButton } from 'modules/app-ui';
import { useState, useCallback, useEffect, useRef } from 'react';
import Cropper from "react-easy-crop";
import UploadBox from './UploadBox';

interface IImageCropperProps extends IModal {
  onImageEdit: (link: string) => void;
  imageLink: string;
}

export default function ImageEditor({ isOpen, onClose, onImageEdit, imageLink } : IImageCropperProps) {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<any>();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>();
  const [uploadBoxOpen, setUploadBoxOpen] = useState<boolean>(true);
  const [targetFile, setTargetFile] = useState<File|null>(null);
  const [img, setImg] = useState<string|null>(null);

  const canvasRef = useRef<HTMLCanvasElement>();
  
  useEffect(()=>{ setImg(imageLink) }, [imageLink]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedArea);
    setCroppedAreaPixels(croppedAreaPixels);
    console.log('CROPPED AREA: ', croppedArea);
    console.log('CROPPED AREA p: ', croppedAreaPixels);
  }, [])

  useEffect(()=>{
    console.log('IMG CHANGED: ', img);
  }, [img])

  useEffect(()=>{
    setImg(targetFile ? URL.createObjectURL(targetFile) : imageLink);
  }, [targetFile])

  const handleFileUpload = useCallback(() => {
    // if (targetFile) {
    //   onImageEdit(URL.createObjectURL(targetFile));
    // }
    const imgInstance = new Image();
    imgInstance.src = URL.createObjectURL(targetFile);
    imgInstance.onload = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { x, y, width, height } = croppedAreaPixels;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(imgInstance, x, y, width, height, 0, 0, width, height);
        onImageEdit(canvas.toDataURL('image/jpg', 1));
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setTargetFile(null);
        onClose();
      }
    }
  }, [targetFile, croppedAreaPixels, canvasRef])

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
      <canvas ref={canvasRef} style={{ position: 'absolute', pointerEvents: 'none', opacity: 0 }}></canvas>
      <Cropper
        image={img}
        crop={crop}
        zoom={zoom}
        aspect={3/3}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        zoomSpeed={0.3}
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
            image
            currentFile={targetFile}
            onFileSet={(file) => setTargetFile(file)}
          />
          <Button css={{ mt: '$6' }} color="secondary" disabled={!targetFile} onPress={()=>handleFileUpload()}>
            <FontAwesomeIcon icon={faUpload} style={{ margin: '0px 5px' }} />
            بارگذاری
          </Button>
        </FlexColumn>
      </FlexColumn>
    </Modal>
  );

}