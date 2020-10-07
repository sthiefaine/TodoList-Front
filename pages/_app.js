import '../styles/globals.css'
import Page from '../components/Page'

import { Provider } from 'react-redux';
import { useStore } from '../redux/store';

function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <Provider store={store}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </Provider>
  )
}

export default MyApp
