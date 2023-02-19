import { Avatar, Text } from "@nextui-org/react";
import { FlexColumn } from "modules/app-ui";
import { EditableTextField, ImageEditor } from "modules/shared";
import { useState } from "react";
import BorderedBox from "../ui/BorderedBox";


export default function UserProfileSettings() {

  const [profileImg, setProfileImg] = useState<string|null>('/imgs/snow-fall.jpg');
  const [username, setUsername] = useState('اشکان محمدی');
  const [biography, setBiography] = useState<string|null>('از فرط تواضع به تو ای درگه حاجات، در زهد تو دوریم همه از دار مکافات / مقصود دلم چون که گدایی به در توست، بی بهرگی ام از غم دنیا چه منافات؟');
  const [editorOpen, setEditorOpen] = useState<boolean>(false);

  return (
    <>
      <ImageEditor
        isOpen={editorOpen}
        imageLink={profileImg}
        onClose={()=>setEditorOpen(false)}
        onImageEdit={(newProfImg) => setProfileImg(newProfImg)}
      />
      <BorderedBox
        css={{
          '@sm': {
            w: '300px'
          }
        }}
      >
        <FlexColumn css={{ alignItems: 'center' }}>
          <Avatar
            text={username}
            src={profileImg}
            css={{
              w: '230px',
              h: '230px',
              cursor: 'pointer'
            }}
            zoomed
            onClick={()=>setEditorOpen(true)}
          />
        </FlexColumn>
        <Text color="$gray800" css={{textAlign:'center'}}>دنبال کننده: 132 نفر</Text>
          <EditableTextField
            bold
            content={username}
            onEditRequest={(newUserName)=>{setUsername(newUserName);return true;}}
          />
          <EditableTextField
            multiline
            content={biography}
            onEditRequest={(newBio)=>{setBiography(newBio);return true;}}
          />
      </BorderedBox>
    </>
  )
}