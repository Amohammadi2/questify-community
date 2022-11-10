import { getNavLayout } from "modules/app-navigation";
import { useAuthGuard } from "modules/auth/route-protector";
import { BookmarkedQuestionsList } from "modules/questions";
import { NextPageWithLayout } from "utils/next-layout";

const BookmarksPage: NextPageWithLayout = () => {
  useAuthGuard();

  return (
    <BookmarkedQuestionsList />
  );
}

BookmarksPage.getLayout = getNavLayout({
  activateSidebar: true
})

export default BookmarksPage;