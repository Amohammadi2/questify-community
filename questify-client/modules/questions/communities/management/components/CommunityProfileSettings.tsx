import { useState, useEffect } from 'react';
import { Avatar } from "@nextui-org/react";
import { FlexColumn, FlexRow } from "modules/app-ui";
import { useCommunityProfile } from "../hooks/useCommunityProfile";
import { EditableTextField } from '../../../../shared/components/EditableTextField';
import ImageEditor from 'modules/shared/components/ImageEditor';
import { ICommunityProfileSettingsProps } from './CommunitySettings';

export function CommunityProfileSettings({ communityId }: ICommunityProfileSettingsProps) {

  const { data, loading, error } = useCommunityProfile(communityId);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [profileImg, setProfileImg] = useState<string>('');
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setProfileImg(data.profileImg);
    }
  }, [data]);

  return (
    <FlexRow css={{ mb: '$15' }}>
      <ImageEditor
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)} />
      <Avatar
        squared
        text={name}
        src={profileImg}
        size="xl"
        css={{
          flexShrink: 0,
          w: '80px',
          h: '80px',
          '@sm': {
            w: '120px',
            h: '120px'
          },
          cursor: 'pointer'
        }}
        zoomed
        onClick={() => setIsCropperOpen(true)} />
      <FlexColumn
        css={{
          flexGrow: 1,
          px: '$4', justifyContent: 'center',
          '@sm': {
            px: '$10'
          }
        }}
      >
        <EditableTextField
          header
          content={name}
          onEditRequest={(n) => {
            if (!n)
              return false;
            setName(n);
            return true;
          }} />
        <EditableTextField
          content={description}
          onEditRequest={(d) => {
            if (!d)
              return false;
            setDescription(d);
            return true;
          }} />
      </FlexColumn>
    </FlexRow>
  );
}
