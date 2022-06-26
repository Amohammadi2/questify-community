import { Box, Grid, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "../../components/QuestionCard";
import { centeredFlexbox } from "../../styles/utils";
import { QuestionContainer } from "../../components/QuestionContainerGrid";
import { ListMetaGrid } from "../../components/ListMetaGrid";
import { AskQuestionInput } from "../../components/AskQuestionInput";


export function SchoolSpacePageUI({ isAuth }: { isAuth: boolean }) {
  const navigate = useNavigate();

  if (!isAuth)
    return (
      <Box sx={{ ...centeredFlexbox, height: "100%" }}>
        <Typography mb={3} sx={{ maxWidth: "400px" }} color="text.secondary">
          فضای مدرسه متعلق به دانش آموزان مدارسی است که ثبت نام کرده اند. جهت
          دسترسی به این بخش لطفا وارد اکانت خود شوید
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={(e) => navigate("/login")}
        >
          ورود به اکانت
        </Button>
      </Box>
    );

  return (
    <>
      <Grid container direction="row">
        <Grid item sx={{ width: "500px", pt: 1 }}>
          <ListMetaGrid />
        </Grid>
        <QuestionContainer item>
          <Grid container direction="column">
            <QuestionCard />
            <QuestionCard />
            <QuestionCard />
            <QuestionCard />
          </Grid>
        </QuestionContainer>
      </Grid>
      <AskQuestionInput
        label="سوال درون مدرسه ای ..."
        placeholder="عنوان را وارد کنید ..."
      />
    </>
  );
}