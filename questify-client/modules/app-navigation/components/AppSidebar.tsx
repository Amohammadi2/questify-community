import { faBookmark, faGears, faHeart, faListCheck, faPeopleGroup, faPowerOff, faProcedures, faQuestionCircle, faSchool, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Spacer, Text } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { Sidebar, SidebarItem, SidebarDivider, SidebarSection } from "./Sidebar";
import { useLogout } from "../../auth/auth-store";
import { accountAtom } from "../../auth/auth-store/states";
import { AppSideBarLink } from "./AppSidebarLink";

export default function AppSidebar() {

  const { logout } = useLogout();
  const account = useRecoilValue(accountAtom);

  const sidebarLinks = [
    { group: 'account', type:'link', link: '/user-account', text: 'تنظیمات حساب کاربری', icon: faGears},
    { group: 'account', type:'action', action: ()=>logout(), text: 'خروج از حساب کاربری', icon: faPowerOff},
    { group: 'app', type: 'link', link: '/school-space', text: 'فضای درون مدرسه ای', icon: faSchool},
    { group: 'app', type: 'link', link: '/community-space', text: 'فضای انجمن ها', icon: faPeopleGroup},
    { group: 'app', type: 'link', link: '/shared-space', text: 'فضای اشتراکی', icon: faShareNodes},
    { group: 'app', type: 'link', link: '/my-questions', text: 'سوالات من', icon: faQuestionCircle},
    { group: 'app', type: 'link', link: '/bookmarks', text: 'پست های ذخیره شده', icon: faBookmark},
    { group: 'app', type: 'link', link: '/in-progress-list', text: 'لیست پیگیری ها', icon: faListCheck},
  ];

  const SidebarProfileSection = () => (
    <SidebarSection>
      <Avatar squared text={account?.username[0].toUpperCase()} size="md" />
      <Spacer x={.4} className="large-only" />
      <Text className="large-only" css={{ color: '$primaryLightContrast', fontSize: '$xl' }}>
        {account?.username}
      </Text>
    </SidebarSection>
  )

  const sidebarItemFactory = (l) => {

    console.log('RENDERING', l);

    if (l.type == "link") {
      return (
        <div key={l.text}>
          <AppSideBarLink appHref={l.link}>
            {({ isActive, go }) => (
              <SidebarItem onClick={()=>go()} icon={<FontAwesomeIcon icon={l.icon} />} text={l.text} isActive={isActive} />
            )}
          </AppSideBarLink>
        </div>
      );
    }
    else if (l.action) { // that's an action button
      return (
        <SidebarItem key={l.text} onClick={() => l.action()} icon={<FontAwesomeIcon icon={l.icon} />} text={l.text} />
      );
    }
  };
  const SidebarAccountActionList = () => (
    <>
      {sidebarLinks.filter(l=>l.group=="account").map(sidebarItemFactory)}
    </>
  );
  const SidebarAppActionList = () => (
    <>
      {sidebarLinks.filter(l=>l.group=="app").map(sidebarItemFactory)}
    </>
  );

  return (
    <Sidebar>
      <SidebarProfileSection />
      <SidebarDivider />
      <SidebarAccountActionList />
      <SidebarDivider />
      <SidebarAppActionList />
    </Sidebar>
  )
}