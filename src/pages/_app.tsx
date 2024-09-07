import '@/styles/normalize.css'
import '@mantine/core/styles.css'

import type { AppProps } from 'next/app'
import { AppShell, createTheme, MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import Sidebar from '@/components/sidebar'
import { store } from '@/stores'

const theme = createTheme({})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider theme={theme}>
            <AppShell navbar={{ width: 300, breakpoint: '' }}>
                <Provider store={store}>
                    <Sidebar />

                    <AppShell.Main>
                        <Component {...pageProps} />
                    </AppShell.Main>
                </Provider>
            </AppShell>
        </MantineProvider>
    )
}
