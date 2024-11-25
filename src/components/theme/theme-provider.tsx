'use client'

import dynamic from 'next/dynamic'

const NextThemesProvider = dynamic(
    () => import('next-themes').then((e) => e.ThemeProvider), {
        ssr: false,
    }
)

import React from 'react'

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}