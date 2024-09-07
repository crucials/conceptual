import '@/styles/normalize.css'
import '@mantine/core/styles.css'

import type { AppProps } from 'next/app'
import { AppShell, createTheme, MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { store } from '@/stores'
import Sidebar from '@/components/sidebar'

const theme = createTheme({})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider theme={theme}>
            <Provider store={store}>
                <AppShell navbar={{ width: 300, breakpoint: '' }}>
                    <Sidebar />

                    <AppShell.Main>
                        <Component {...pageProps} />
                    </AppShell.Main>
                </AppShell>
            </Provider>
        </MantineProvider>
    )
}
