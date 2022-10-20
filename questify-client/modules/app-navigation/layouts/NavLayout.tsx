import { styled } from "@nextui-org/react";
import type { ReactElement, ReactNode } from "react";
import AppSidebar from "../components/AppSidebar";
import Navbar from "../components/Navbar";


const GridContainer = {
  FullScreen: {
    Normal: styled('div', {
      d: 'grid',
      gridTemplateColumns: '60px auto',
      gridTemplateRows: '60px auto',
      gridTemplateAreas: `
        "sidebar navbar"
        "sidebar content"
      `,
      height: '100vh',
      '@xs': {
        gridTemplateColumns: '250px auto'
      }
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

// Todo: This part requires a really deep refactoring of component structure
//       currently we often rely on random placement of logic, style and html
//       to get this piece of shit to work.
//
//       They all have to be organized using reusable, well-defined components

export function NavLayout(props: IAppLayout) {

  const FixedArea = ({ area, children, bg="unset" }) => (
    <div style={{ gridArea: area, position: 'relative' }}>
      <div style={{ position: 'absolute', top: '0', right: 0, height: '100%', width: '100%', overflowY: 'auto', backgroundColor: bg }}>
        {children}
      </div>
    </div>
  );

  if (props.sidebar) {
    return (
      <GridContainer.FullScreen.Normal>
        <FixedArea area="sidebar" bg="rgb(244, 244, 244)">
          {props.sidebar}
        </FixedArea>
        <div style={{ gridArea: 'navbar', position: 'sticky' }}>
          {props.navbar}
        </div>
        <FixedArea area="content">
          {props.children}
        </FixedArea>
      </GridContainer.FullScreen.Normal>
    );
  }
  else {
    return (
      <GridContainer.FullScreen.WithoutSidebar>
        <div style={{ gridArea: 'navbar', backgroundColor: 'blue', position: 'sticky' }}>
          {props.navbar}
        </div>
        <FixedArea area="content">
          {props.children}
        </FixedArea>
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