import { faBookmark, faGears, faListCheck, faMailBulk, faPeopleGroup, faPowerOff, faQuestionCircle, faSchool, faShareNodes, faUsersRays } from "@fortawesome/free-solid-svg-icons";
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
    { group: 'account', type:'link', link: '/user-account', text: 'حساب کاربری', icon: faGears},
    { group: 'account', type:'action', action: ()=>logout(), text: 'خروج از سیستم', icon: faPowerOff},
    { group: 'app', type: 'link', link: '/communities', text: 'انجمن ها', icon: faPeopleGroup},
    { group: 'app', type: 'link', link: '/my-questions', text: 'سوالات من', icon: faQuestionCircle},
    { group: 'app', type: 'link', link: '/bookmarks', text: 'ذخیره شده', icon: faBookmark},
    { group: 'app', type: 'link', link: '/in-progress-list', text: 'پیگیری ها', icon: faListCheck},
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
      {sidebarLinks
      .filter(l=>l.group=="app")
      .filter((l) => {
        try {
          return l.role==="MANAGER" 
          ? account?.schoolRoles.map(s=>s.role==="MANAGER").reduce((p,c)=>p||c)
          : true
        }
        catch {
          return false
        }
      }
      )
      .map(sidebarItemFactory)}
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