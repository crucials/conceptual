import { ReactNode } from 'react'
import { AppShell, createTheme, MantineProvider } from '@mantine/core'
import Sidebar from '@/components/sidebar'
import { useLoadedIdeas } from '@/hooks/loaded-ideas'

const theme = createTheme({})

export default function RootLayout({ children }: { children: ReactNode }) {
    useLoadedIdeas()

    return (
        <MantineProvider theme={theme}>
            <AppShell navbar={{ width: 300, breakpoint: '' }}>
                <Sidebar />

                <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
        </MantineProvider>
    )
}
