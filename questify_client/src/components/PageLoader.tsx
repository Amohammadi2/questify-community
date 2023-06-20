import { CircularProgress, Stack } from "@mui/material";

export default function PageLoader({ fixed=false } : { fixed?: boolean }) {
  return (
    <Stack sx={{
      position: fixed ? 'fixed' : 'static',
      left: '50%',
      transform: 'translateX(-50%)',
      mt: 3,
    }}>
      <CircularProgress />
    </Stack>
  )
}