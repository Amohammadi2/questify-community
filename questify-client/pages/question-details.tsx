import { getNavLayout } from "modules/app-navigation";
import { BackArrow } from "modules/app-navigation";
import { QuestionDetails } from "modules/questions";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "utils/next-layout";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const questionId = context.query?.qid;
  if (!questionId)
    return {
      notFound: true
    };
  return {
    props: {
      questionId
    }
  };
}

const QuestionDetailsPage: NextPageWithLayout<{questionId:string}> = ({ questionId }) => {
  
  if (!questionId)
    return <Error statusCode={404} />;

  // handle the case of an array
  if (typeof questionId != "string")
    questionId = questionId[0];

  return (
    <QuestionDetails questionId={questionId} />
  );
}

QuestionDetailsPage.getLayout = getNavLayout({
  navbarContent: <BackArrow />,
  activateSidebar: true
})


export default QuestionDetailsPage;