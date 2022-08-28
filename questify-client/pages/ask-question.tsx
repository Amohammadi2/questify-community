import { Input } from "@nextui-org/react";
import { getNavLayout } from "../modules/app-navigation";
import { BackArrow } from "../modules/app-navigation/components/BackArrow";
import { NextPageWithLayout } from "../utils/next-layout";

const AskQuestion: NextPageWithLayout = () => {
  return (
    <Input labelPlaceholder="عنوان را وارد کنید" />
  );
}

AskQuestion.getLayout = getNavLayout({
  navbarContent: <BackArrow />
});

export default AskQuestion;