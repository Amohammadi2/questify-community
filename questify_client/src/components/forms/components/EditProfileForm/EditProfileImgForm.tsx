import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Paper, Avatar, Badge, Button, Grid, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { GET_USER_PROFILE } from '@/graphql/get-user-profile';
import { useRecoilValue } from 'recoil';
import { $profilesApi } from '@/apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '@/hooks/useModal';
import { ImageInput, ImageCropper } from '@/components/image-tools';

export default function EditProfileImgForm() {

  // apis and utils
  const profilesApi = useRecoilValue($profilesApi)

  // initial data loading
  const { loading, error, data, refetch } = useQuery(GET_USER_PROFILE);

  // editable states
  const [profileImg, setProfileImg] = useState<File|null>(null)
  const [croppedProfileImgBlob, setCroppedProfileImgBlob] = useState<Blob|null>()
  
  const profileImgUrl = useMemo(() => {
    if (profileImg)
      return URL.createObjectURL(profileImg)
    return ''
  }, [profileImg])

  const [openCropModal, cropModalState] = useModal()

  
  const  cleanUpImages = () => {
    setProfileImg(null);
    setCroppedProfileImgBlob(null);
  }

  const handleEditProfileImage = () => {
    profilesApi.profilesPartialUpdate({
      id: Number.parseInt(data?.me?.profile?.id||'-1'),
      profileImg: croppedProfileImgBlob
    })
    .then(() => {
      // Todo: update cache instead of reloading from server
      refetch()
      cleanUpImages()
      cropModalState.onClose()
    })
  }

  const handleEditCancelation = () => {
    cleanUpImages()
    cropModalState.onClose()
  }

  const imageCropModal = (
    <Dialog
      open={cropModalState.open}
      onClose={cropModalState.onClose}
    >
      <DialogTitle>
        ویرایش تصویر نمایه
      </DialogTitle>
      <DialogContent>
        {
          profileImg ? 
            (
              <ImageCropper
                imgSrc={profileImgUrl}
                onImageCrop={blob => setCroppedProfileImgBlob(blob)}
              />
            )
            :
            (
              <ImageInput
                value={profileImg}
                onUpload={img => setProfileImg(img)}
              />
            )
        }
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleEditProfileImage}>ذخیره</Button>
        <Button variant="outlined" color="error" onClick={handleEditCancelation}>انصراف</Button>
      </DialogActions>
    </Dialog>
  )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Paper elevation={3} sx={{ width: '100%', py: 2, px: 3 }}>
    {imageCropModal}
    <Grid container direction="row" alignItems="center">
      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<IconButton>
          <FontAwesomeIcon icon={faEdit} onClick={openCropModal} />
        </IconButton>}
      >
        <Avatar alt="User" src={data?.me?.profile?.profileImg || ''} sx={{ width: 56, height: 56 }} />
      </Badge>
      <Typography variant="h5" sx={{ ml: 2 }}>{data?.me?.username}</Typography>
    </Grid>
  </Paper>
  )
}