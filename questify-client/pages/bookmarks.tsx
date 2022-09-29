import { getNavLayout } from "modules/app-navigation";
import { useRequireAuthentication } from "modules/auth/route-protector";
import { BookmarkedQuestionsList } from "modules/questions";
import { NextPageWithLayout } from "utils/next-layout";

const BookmarksPage: NextPageWithLayout = () => {
  useRequireAuthentication();

  return (
    <BookmarkedQuestionsList />
  );
}

BookmarksPage.getLayout = getNavLayout({
  activateSidebar: true
})

export default BookmarksPage;