'use client'

import {ModeToggle} from '@/components/theme/mode-toggle'
import {Separator} from '@/components/ui/separator'
import {AddNoteCard} from '@/components/add-note-card'
import {NoteCard} from '@/components/note-card'
import {useQuery} from '@tanstack/react-query'
import {findAllNotes} from '@/api/find-all-notes'

export default function Home() {
  const {data} = useQuery({
    queryKey: ['notes'],
    queryFn: findAllNotes,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  return (
      data &&
      <>
          <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
              <div className={'flex items-center justify-between'}>
                  <h1 className={'text-muted-foreground'}> {'</>'} Web Notes</h1>

                  <ModeToggle/>
              </div>

              <h2 className="text-muted-foreground text-3xl font-semibold tracking-tight">
                  Gerencie suas notas...
              </h2>

              <Separator/>

              <div className="grid grid-cols-3 gap-6">
                  <AddNoteCard/>

                {data?.map((note) => (
                    <NoteCard key={note.id} note={note}/>
                ))}
              </div>
          </div>
      </>
  )
}