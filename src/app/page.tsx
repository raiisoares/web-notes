
'use client'

import {ModeToggle} from '@/components/theme/mode-toggle'
import {Separator} from '@/components/ui/separator'
import {AddNoteCard} from '@/components/add-note-card'

export default function Home() {
  return (
      <>
        <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
          <div className={'flex items-center justify-between'}>
            <h1 className={'text-muted-foreground'}> {'</>'} Web Notes</h1>

            <ModeToggle/>
          </div>

          <h2 className="text-muted-foreground text-3xl font-semibold tracking-tight">
            Gerencie suas notas...
          </h2>

          <Separator className="bg-slate-700"/>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            <AddNoteCard/>
          </div>
        </div>
      </>
  )
} 

