import { styled } from "@nextui-org/react";
import type { ReactElement, ReactNode } from "react";
import AppSidebar from "../components/AppSidebar";
import Navbar from "../components/Navbar";


const GridContainer = {
  FullScreen: {
    Normal: styled('div', {
      d: 'grid',
      gridTemplateColumns: '250px auto',
      gridTemplateRows: '60px auto',
      gridTemplateAreas: `
        "sidebar navbar"
        "sidebar content"
      `,
      height: '100vh'
    }),
    WithoutSidebar: styled('div', {
      d: 'grid',
      gridTemplateColumns: 'auto',
      gridTemplateRows: '60px auto',
      gridTemplateAreas: `
        "navbar"
        "content"
      `,
      height: '100vh'
    })
  }
}

interface IAppLayout {
  navbar: ReactNode;
  sidebar?: ReactNode;
  children: ReactElement;
};

export function NavLayout(props: IAppLayout) {

  const ContentFragment = () => (
    <div style={{ gridArea: 'content', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '0', right: 0, height: '100%', width: '100%', overflowY: 'auto' }}>
        {(props.children as unknown as ReactNode)}
      </div>
    </div>
  );

  if (props.sidebar) {
    return (
      <GridContainer.FullScreen.Normal>
        <div style={{ gridArea: 'sidebar', position: 'sticky' }}>
          {props.sidebar}
        </div>
        <div style={{ gridArea: 'navbar', position: 'sticky' }}>
          {props.navbar}
        </div>
        <ContentFragment />
      </GridContainer.FullScreen.Normal>
    );
  }
  else {
    return (
      <GridContainer.FullScreen.WithoutSidebar>
        <div style={{ gridArea: 'navbar', backgroundColor: 'blue', position: 'sticky' }}>
          {props.navbar}
        </div>
        <ContentFragment />
      </GridContainer.FullScreen.WithoutSidebar>
    );
  }
}


export function getNavLayout({ navbarContent = <></>, activateSidebar = false }: {
  navbarContent?: ReactNode | ReactNode[], activateSidebar?: boolean
} = {}) {
  return (page: ReactElement) => (
    <NavLayout
      navbar={<Navbar>{navbarContent}</Navbar>}
      sidebar={activateSidebar ? <AppSidebar /> : null}
    >
      {page}
    </NavLayout>
  ) as ReactNode;
}