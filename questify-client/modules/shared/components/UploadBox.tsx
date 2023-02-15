import { DragEventHandler, ChangeEventHandler, useCallback } from 'react';
import { faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Text } from "@nextui-org/react";
import { FlexColumn, FlexRow } from "modules/app-ui";

interface IUploadBoxProps {
  onFileSet: (file: File | null) => void;
  currentFile: File | null;
}

export default function UploadBox({ currentFile, onFileSet } : IUploadBoxProps) {

  const handleFileDrop: DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          onFileSet(file);
        }
      });
    } else {
      [...e.dataTransfer.files].forEach((file, i) => {
        onFileSet(file);
      });
    }
  }, [currentFile, onFileSet])

  const handleFileSelect: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    e.preventDefault();
    if (e.target.files.length) {
      onFileSet(e.target.files[0]);
    }
  }, [currentFile, onFileSet])

  return (
    <FlexColumn
      css={{
        w: '100%',
        h: '300px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid $secondary',
        borderRadius: '$md',
        px: '$10',
      }}
      onDragOver={(e)=>e.preventDefault()}
      onDrop={handleFileDrop}
    >
      {!currentFile ? (
        <label style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon
            icon={faUpload}
            style={{ fontSize: '25px' }}
          />
          <Text>
            کلیک کنید یا تصویر مد نظر را به اینجا کشیده و رها کنید
          </Text>
          <input type="file" style={{position: 'fixed', pointerEvents: 'none', opacity: 0}} onChange={handleFileSelect} />
        </label>
      ) : (
        <FlexColumn
          css={{
            alignItems: 'center',
            py: '$3',
            px: '$5'
          }}
          
        >
          <span>{currentFile.name}</span>
          <Button onClick={()=>onFileSet(null)} css={{ mt: '$3' }} size="sm" color="error">
            <FontAwesomeIcon
              style={{ margin: '0px 4px' }}
              icon={faTimes}
            />
            <span>حذف</span>
          </Button>
        </FlexColumn>
      )}
    </FlexColumn>
  )
}