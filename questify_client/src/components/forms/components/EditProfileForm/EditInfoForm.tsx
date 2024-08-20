import { $profilesApi } from '@/apis';
import { GET_USER_PROFILE } from '@/graphql/get-user-profile';
import { useQuery } from '@apollo/client';
import { Paper, TextField, Button, Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function EditInfoForm() {

  const navigate = useNavigate()
  const profilesApi = useRecoilValue($profilesApi)
  const { loading, error, data, refetch } = useQuery(GET_USER_PROFILE);

  const [biography, setBiography] = useState<string | null | undefined>(data?.me?.profile?.bio);
  const [email, setEmail] = useState<string | null | undefined>(data?.me?.email);

  const handleSave = useCallback(() => {
    profilesApi.profilesPartialUpdate({
      id: Number.parseInt(data?.me?.profile?.id||'-1'),
      bio: biography,
      email: email||''
    })
    .then(() => {
      // Todo: update cache instead of reloading from server
      refetch()
    })
  }, [profilesApi, data?.me?.profile?.id, biography, email])

  // syncing mechanism
  useEffect(() => { setBiography(data?.me?.profile?.bio) }, [data?.me?.profile?.bio])
  useEffect(() => { setEmail(data?.me?.email) }, [data?.me?.email])

  const anyChanges = (
    data?.me?.email !== email ||
    data?.me?.profile?.bio !== biography
  )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Paper elevation={3} sx={{ my: 3, py: 2, px: 3 }}>
      <TextField
        label="Biography"
        value={biography}
        onChange={(e) => setBiography(e.target.value)}
        fullWidth
        sx={{ mt: 2 }} />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{ mt: 2 }} />
      <Grid container sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleSave()} disabled={!anyChanges} sx={{ mr: 1 }}>
          ذخیره تغییرات
        </Button>
        <Button variant="contained" color="error" sx={{ mr: 1 }} onClick={() => navigate(-1)}>
          انصراف
        </Button>
      </Grid>
    </Paper>
  )
}
