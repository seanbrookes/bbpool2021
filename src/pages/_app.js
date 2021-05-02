import { PoolContextProvider } from '../data/PoolContextProvider';

const Main = ({ Component, pageProps }) => {
  return (
    <PoolContextProvider>
      <Component {...pageProps} />
    </PoolContextProvider>
  );
};

export default Main;
