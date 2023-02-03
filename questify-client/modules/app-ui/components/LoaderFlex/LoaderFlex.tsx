import { Loading, Text } from "@nextui-org/react";
import { ReactNode } from "react";
import FlexColumn from "../FlexColumn";

// Review: add a `css` property to support full customization

interface ILoaderFlex <T> {
  error: any;
  dir: 'row' | 'col';
  loading: boolean;
  data: T;
  children: (data: T) => ReactNode | ReactNode[];
}

export default function LoaderFlex <T> ({ dir, loading ,data, children, error } : ILoaderFlex<T>) {
  
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
      : data
      ? children(data)
      : (
        <FlexColumn css={{ justifyContent: 'center', my: '$5' }}>
          <Text color="error">{error}</Text>
        </FlexColumn>
      )
      }
    </FlexColumn>
  )
}