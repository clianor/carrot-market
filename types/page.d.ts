import { ReactElement } from 'react';

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactElement;
  layout?: ComponentType;
};
