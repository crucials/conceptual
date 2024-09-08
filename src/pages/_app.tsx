import '@/styles/normalize.css'
import '@mantine/core/styles.css'
import '@mantine/tiptap/styles.css'

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/stores'
import RootLayout from '@/components/root-layout'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
        </Provider>
    )
}
