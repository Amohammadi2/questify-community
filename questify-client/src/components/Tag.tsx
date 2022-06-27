import { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 5px',
      backgroundColor: 'rgb(240,240,240)',
      borderRadius: '12px',
      cursor: 'pointer'
    }}>
      {children}
    </span>
  );
}