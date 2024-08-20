import React, { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export interface ImageCropperProps {
  imgSrc?: string;
  onImageCrop: (newImage: Blob|null) => void
}

export default function ImageCropper({ imgSrc, onImageCrop } : ImageCropperProps) {
  const cropperRef = useRef<ReactCropperElement|null>(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper){
      cropper.getCroppedCanvas().toBlob(blob => {
        onImageCrop(blob)
      });
    }
  };

  return (
    <div>
      <Cropper
        src={imgSrc}
        style={{ height: '400px', width: '400px' }}
        crop={handleCrop}
        ref={cropperRef}
        aspectRatio={1}
      />
    </div>
  );
};
