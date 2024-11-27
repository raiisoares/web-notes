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

interface NoteCardProps {
  note: {
    id: string
    title: string
    subject: string
    content: string
    created_at: string
    status: boolean
  }
}

export function NoteCard({note}: NoteCardProps) {
  const [readOnly, setReadOnly] = useState<boolean>(true)
  const form = useForm()
  // const form = useForm<z.infer<typeof NoteSchema>>({
  //   resolver: zodResolver(NoteSchema),
  //   defaultValues: {
  //     title: '',
  //     subject: '',
  //     content: '',
  //   },
  // })
  //
  // async function onSubmit(values: z.infer<typeof NoteSchema>) {
  //   console.log(values)
  // }

  return (
      <Dialog>
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

            <Badge>Concluído</Badge>
          </div>

          <p className="h-[120px] text-sm leading-6 text-muted-foreground text-ellipsis overflow-hidden line-clamp-5">
            {note.content}
          </p>

        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{note.title}</DialogTitle>
            <DialogDescription>
              {note.subject}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={() => ({})} className="space-y-5">
              <FormField
                  control={form.control}
                  name="title"
                  defaultValue={note.title}
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Título" readOnly={readOnly} {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="subject"
                  defaultValue={note.subject}
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
                  defaultValue={note.content}
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
                <FormField
                    control={form.control}
                    name="created_at"
                    defaultValue={format(new Date(note.created_at), 'dd/MM/yyyy', {locale: ptBR})}
                    render={({field}) => (
                        <FormItem className={'w-full'}>
                          <FormLabel>Data de criação</FormLabel>
                          <FormControl>
                            <Input type={'text'} readOnly={true} {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    defaultValue={note.status ? 'Concluído' : 'Não concluído'}
                    render={({field}) => (
                        <FormItem className={'w-full'}>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <Input placeholder="Status" readOnly={true} {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                    )}
                />
              </div>

              <div className={'flex w-full justify-between'}>
                <Button type="submit">Atualizar nota</Button>
                <Button type="button" variant={'outline'}>Atualizar status</Button>
                <Button type="button" variant={'destructive'}>Deletar nota</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  )
}