'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {useForm} from 'react-hook-form'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {useState} from 'react'
import {format, formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {NoteSchema} from '@/validations/note-schema'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {deleteNote} from '@/api/delete-note'
import {toast} from 'sonner'
import {updateStatus} from '@/api/update-status'
import {Note} from '@/api/find-all-notes'
import {EditOnDetails} from '@/components/edit-on-details'
import {updateNote} from '@/api/update-note'

interface NoteCardProps {
  note: Note
}

export function NoteCard({note}: NoteCardProps) {
  const [readOnly, setReadOnly] = useState<boolean>(true)
  const [noteStatus, setNoteStatus] = useState<boolean>(note.status)
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: note.title,
      subject: note.subject,
      content: note.content,
    },
  })

  const {mutateAsync: deleteNoteFn, isPending: isDeleting} = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.setQueryData(['notes'], (oldNotes: any) => {
        return oldNotes.filter((n: any) => n.id !== note.id)
      })
      toast.success('Sua nota foi deletada com sucesso!')
      setIsOpen(false)
    },
    onError: () => {
      toast.error('Algo deu errado ao excluir a nota!')
    },
  })

  const {mutateAsync: updateStatusFn, isPending: isUpdatingStatus} = useMutation({
    mutationFn: updateStatus,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({queryKey: ['notes']}).then(() => {
      })
      toast.success('Sua nota foi marcada como concluída!')
      setNoteStatus(newNote.status)
    },
    onError: () => {
      toast.error('Algo deu errado ao atualizar o status da nota!')
    },
  })

  const {mutateAsync: updateNoteFn, isPending: isUpdatingNote} = useMutation({
    mutationFn: updateNote,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({queryKey: ['notes']}).then(() => {
      })
      toast.success('Sua nota foi atualizada com sucesso!')
      setReadOnly((prevState) => !prevState)
      form.setValue('title', newNote.title)
      form.setValue('subject', newNote.subject)
      form.setValue('content', newNote.content)
    },
    onError: () => {
      toast.error('Algo deu errado ao atualizar sua nota!')
    },
  })

  function onHandleEdit() {
    setReadOnly((prevState) => !prevState)
  }

  async function onSubmit(values: z.infer<typeof NoteSchema>) {
    await updateNoteFn({id: note.id, data: {...values}})
  }

  async function onDelete(id: string) {
    await deleteNoteFn({id})
  }

  async function onUpdateStatus(id: string) {
    await updateStatusFn({id})
  }

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="text-left flex flex-col p-5 gap-3 overflow-hidden border
            hover:ring-2 focus-visible:ring-2 rounded-md">
            <span className="text-sm font-medium">
              {note.title}
            </span>

          <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {formatDistanceToNow(note.created_at, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>

            <Badge variant={note.status ? 'default' : 'destructive'}>
              {note.status ? 'Concluído' : 'Não concluído'}
            </Badge>
          </div>

          <p className="h-[120px] text-sm leading-6 text-muted-foreground text-ellipsis overflow-hidden line-clamp-5">
            {note.content}
          </p>

        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{note.title}</DialogTitle>
            <DialogDescription>{note.subject}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Título" readOnly={readOnly}  {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="subject"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Assunto</FormLabel>
                        <FormControl>
                          <Input placeholder="Assunto" readOnly={readOnly} {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="content"
                  render={({field}) => (
                      <FormItem className={'h-40'}>
                        <FormLabel>Conteúdo</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Conteúdo" {...field} readOnly={readOnly} className={'mx-0 h-32'}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />

              <div className={'flex gap-8'}>
                <div className="w-full">
                  <FormLabel>Data de criação</FormLabel>
                  <Input
                      type="text"
                      readOnly
                      value={format(new Date(note.created_at), 'dd/MM/yyyy', {locale: ptBR})}
                  />
                </div>

                <div className="w-full">
                  <FormLabel>Status</FormLabel>
                  <Input
                      type="text"
                      readOnly
                      value={noteStatus ? 'Concluído' : 'Não concluído'}
                  />
                </div>
              </div>

              <div className={'flex w-full justify-between'}>
                {readOnly ?
                    <>
                      <Button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => onHandleEdit()}>
                        Atualizar nota
                      </Button>

                      <Button
                          type="button"
                          disabled={isDeleting || isUpdatingStatus}
                          variant={'outline'}
                          onClick={() => onUpdateStatus(note.id)}>
                        Atualizar status
                      </Button>

                      <Button
                          type="button"
                          disabled={isDeleting || isUpdatingStatus}
                          variant={'destructive'}
                          onClick={() => onDelete(note.id)}>
                        Deletar nota
                      </Button>
                    </>
                    :
                    <EditOnDetails disable={isUpdatingNote} handleEdit={onHandleEdit}/>
                }
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  )
}