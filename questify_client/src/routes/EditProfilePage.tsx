import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Paper, Avatar, Badge, TextField, Button, Grid, Container, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { GET_USER_PROFILE } from '@/graphql/get-user-profile';
import { useRecoilValue } from 'recoil';
import { $profilesApi } from '@/apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import ImageCropper from '@/components/ImageCropper';
import { ImageInput } from '@/components/forms/components/ImageInput';


function EditProfilePage() {

  // apis and utils
  const navigate = useNavigate()
  const profilesApi = useRecoilValue($profilesApi)

  // initial data loading
  const { loading, error, data, refetch } = useQuery(GET_USER_PROFILE);

  // editable states
  const [biography, setBiography] = useState<string | null | undefined>(data?.me?.profile?.bio);
  const [email, setEmail] = useState<string | null | undefined>(data?.me?.email);
  const [profileImg, setProfileImg] = useState<File|null>(null)
  const [croppedProfileImgBlob, setCroppedProfileImgBlob] = useState<Blob|null>()
  
  const profileImgUrl = useMemo(() => {
    if (profileImg)
      return URL.createObjectURL(profileImg)
    return ''
  }, [profileImg])

  // syncing mechanism
  useEffect(() => { setBiography(data?.me?.profile?.bio) }, [data?.me?.profile?.bio])
  useEffect(() => { setEmail(data?.me?.email) }, [data?.me?.email])

  const handleSave = () => {
    profilesApi.profilesPartialUpdate({
      id: Number.parseInt(data?.me?.profile?.id||'-1'),
      bio: biography,
      email: email||''
    })
    .then(() => {
      // Todo: update cache instead of reloading from server
      refetch()
    })
  }

  const anyChanges = (
    data?.me?.email !== email ||
    data?.me?.profile?.bio !== biography
  )

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
    <Container maxWidth="md" sx={{ mt: 3 }}>
      {imageCropModal}
      <Paper elevation={3} sx={{width: '100%', py: 2, px: 3 }}>
        <Grid container direction="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={
              <IconButton>
                <FontAwesomeIcon icon={faEdit} onClick={openCropModal} />
              </IconButton>
            }
          >
            <Avatar alt="User" src={data?.me?.profile?.profileImg||''} />
          </Badge>
          <Typography variant="h5" sx={{ ml: 2 }}>{data?.me?.username}</Typography>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ my: 3, py:2, px: 3 }}>
        <TextField
          label="Biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          fullWidth
          sx={{ mt: 2}}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mt: 2}}
        />
        <Grid container sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => handleSave()} disabled={!anyChanges} sx={{ mr: 1 }}>
            ذخیره تغییرات
          </Button>
          <Button variant="contained" color="error" sx={{ mr: 1 }} onClick={()=>navigate(-1)}>
            انصراف
          </Button>
        </Grid>
      </Paper>
    </Container>
  )
}

export default EditProfilePage;