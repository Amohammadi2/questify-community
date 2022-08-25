import { styled } from "@nextui-org/react";
import type { NextPage } from "next";
import type { ComponentType, ReactElement, ReactNode } from "react";
import { Sidebar } from "..";


const GridContainer = {
  FullScreen : {
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

export function AppLayout(props: IAppLayout) {

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
        <Sidebar css={{ gridArea: 'sidebar', position: 'sticky' }}>
          {props.sidebar}
        </Sidebar>
        <div style={{ gridArea: 'navbar', backgroundColor: 'blue', position: 'sticky' }}>
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

export function getAppLayout(props: Omit<IAppLayout, 'children'>) {
  return (page: ReactElement) => (
    <AppLayout {...props}>
      {page}
    </AppLayout>
  ) as ReactNode;
}