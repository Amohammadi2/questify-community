import { NavLayout, NavLayoutProps } from '../layouts/NavLayout'
import { ReactElement } from 'react'

type NavLayoutOpts = NavLayoutProps;

export default function withNavLayout(component: ReactElement, opts: NavLayoutOpts = { backButton: true }) {
  return (
    <>
      <NavLayout {...opts} />
      {component}
    </>
  )
}


