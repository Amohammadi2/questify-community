import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@nextui-org/react';
import { useState } from 'react';

const FileDropArea = styled('div', {
  w: '100%',
  h: '200px',
  border: '1px solid $gray600',
  borderRadius: '$md',
  my: '$5',
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.09s ease-out',
  '& > svg': {
    transition: 'all 0.09s ease-out'
  },
  '&:hover': {
    border: '1px solid $primary',
    '& > svg': {
      transform: 'scale(1.2)'
    }
  }
})

interface IFileDropBox {
  onFileSelect: (file: File) => void;
}

export default function FileDropBox({ onFileSelect } : IFileDropBox) {


  const dropHandler = (ev) => {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      const item = ev.dataTransfer.items[0];
      // If dropped items aren't files, reject them
      if (item.kind === 'file') {
        const file = item.getAsFile();
        onFileSelect(file);
      }
      
    } else {
      const file = ev.dataTransfer.files[0];
      onFileSelect(file);
    }
  }
  
  return (
    <>
    <input
      onChange={(e)=>e.target.files && onFileSelect(e.target.files[0])}
      id="file-input"
      type="file"
      style={{ display: 'none' }}
    />
    <label htmlFor="file-input">
      <FileDropArea
        onDrop={dropHandler}
        onDragOver={e=>e.preventDefault()}
      >
        <FontAwesomeIcon
          style={{
            fontSize: '35px',
            color: '#607FFF'
          }}
          icon={faUpload}
          />
      </FileDropArea>
    </label>
    </>
  )
}