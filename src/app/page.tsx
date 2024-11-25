'use client'

import {ModeToggle} from '@/components/theme/mode-toggle'
import {Button} from '@/components/ui/button'
import {toast} from 'sonner'

export default function Home() {
    return (
        <>
            <ModeToggle/>
            <Button onClick={() => toast.success('My first toast')}>sonner</Button>
        </>
    )
}
