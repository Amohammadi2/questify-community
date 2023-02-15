import { ReactNode, useState } from 'react';
import { Text } from '@nextui-org/react';
import FlexColumn from '../FlexColumn';
import LoaderFlex from '../ContentLoader';
import SearchBar from '../SearchBar/SearchBar';

// Review: remove the `dir` property and add a `css` property with
// the type of `@nextui-org/react:CSS` for consistant and complete customizability

interface IListView <T> {
  onSearch?: (s:string)=>void;
  title?: string;
  dir?: 'col' | 'row';
  loading: boolean;
  data: T;
  error: any;
  children: (data: T) => ReactNode | ReactNode[] | null;
  header?: ReactNode | ReactNode[] | null;
  footer?: ReactNode | ReactNode[] | null;
}

/**
 * @deprecated
 */
export default function ListView <T> ({ onSearch, title, dir='col', loading, data, error, children, header, footer } : IListView<T>) {
  
  const [activeTab, setActiveTab] = useState<number>(1);
  
  return (
    <FlexColumn css={{ alignItems: 'center' }}>
      <FlexColumn css={{ maxWidth: '800px', w: '100%', pt: '$10', px:'$3' }}>
        {header}
        {title ? <Text h2 css={{ py: '$5' }}>{title}</Text> : null}
        {
          onSearch
          ? <SearchBar onSearch={onSearch} />
          : null
        }
        <LoaderFlex
          <T>
          data={data}
          loading={loading}
          dir={dir}
          error={error}
        >
          {(data) => children(data)}
        </LoaderFlex>
        {footer}
      </FlexColumn>
    </FlexColumn>
  );
}