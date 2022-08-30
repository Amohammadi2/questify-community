import { getNavLayout } from "../modules/app-navigation";
import { BackArrow } from "../modules/app-navigation/components/BackArrow";
import { PostEditor } from "../modules/questions";
import { NextPageWithLayout } from "../utils/next-layout";

const AskQuestion: NextPageWithLayout = () => {
  return (
    <PostEditor onContentEdited={(c)=>null} />
  );
}

AskQuestion.getLayout = getNavLayout({
  navbarContent: <BackArrow />
});

export default AskQuestion;