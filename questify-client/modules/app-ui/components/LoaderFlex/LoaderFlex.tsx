import { Loading, Text } from "@nextui-org/react";
import { ReactNode } from "react";
import FlexColumn from "../FlexColumn";

interface ILoaderFlex <T> {
  dir: 'row' | 'col';
  loading: boolean;
  data: T;
  children: (data: T) => ReactNode | ReactNode[];
}

export default function LoaderFlex <T> ({ dir, loading ,data :d1, children } : ILoaderFlex<T>) {
  
  console.log('RENDERING DATA: ', d1);
  
  return (
    <FlexColumn
      css={{ flexDirection: dir == 'col' ? 'column' : 'row' }}
    >
      {loading 
      ? (
        <FlexColumn css={{ justifyContent: 'center', my: '$5' }}>
          <Loading size="md" />
          <Text color="$gray800" css={{ textAlign: 'center' }}>درحال بارگذاری...</Text>
        </FlexColumn>
      )
      : children(d1)}
    </FlexColumn>
  )
}