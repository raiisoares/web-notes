import type {Metadata} from 'next'
import './globals.css'
import {ThemeProvider} from '@/components/theme/theme-provider'
import {Montserrat} from 'next/font/google'
import Provider from '@/lib/react-query'
import {Toaster} from 'sonner'

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Notes app',
    description: 'A web application for notes control.',
    icons: {
        icon: ['/favicon.ico'],
    }
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='pt-br'>
        <body className={`${montserrat} antialiased`}>
        <Provider>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
            >
                {children}
            </ThemeProvider>
            <Toaster richColors />
        </Provider>
        </body>
        </html>
    )
}
