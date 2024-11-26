import {ModeToggle} from '@/components/theme/mode-toggle'
import {Separator} from '@/components/ui/separator'
import {AddNoteCard} from '@/components/add-note-card'
import {NoteCard} from '@/components/note-card'
import {ScrollArea} from '@/components/ui/scroll-area'

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

          <Separator/>

          <div className="grid grid-cols-3 gap-6">
            <AddNoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
          </div>
        </div>
      </>
  )
}