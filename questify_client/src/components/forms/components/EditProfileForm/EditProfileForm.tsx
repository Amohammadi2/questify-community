import { Container } from '@mui/material';
import EditInfoForm from './EditInfoForm';
import EditProfileImgForm from './EditProfileImgForm';


export default function EditProfileForm() {
  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <EditProfileImgForm />
      <EditInfoForm />
    </Container>
  )
}
