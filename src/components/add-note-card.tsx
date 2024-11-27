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
import {Button} from '@/components/ui/button'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {NoteSchema} from '@/validations/note-schema'
import {useForm} from 'react-hook-form'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createNote} from '@/api/create-note'
import {toast} from 'sonner'
import {Note} from '@/api/find-all-notes'

export function AddNoteCard() {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: '',
      subject: '',
      content: '',
    },
  })

  const {mutateAsync: createNoteFn, isPending} = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] }).then(() => {})
      toast.success('Sua nota foi criada com sucesso!')
      form.reset()
    },
    onError: () => {
      toast.error('Algo deu errado!')
    }
  })

  async function onSubmit(values: z.infer<typeof NoteSchema>) {
    await createNoteFn({...values})
  }

  return (
      <Dialog onOpenChange={() => form.reset()}>
        <DialogTrigger className="flex flex-col p-5 bg-secondary text-left gap-3
          focus-visible:ring-2 outline-none rounded-md ">
            <span className="text-sm font-medium">
            Adicionar uma nota
            </span>

          <p className="text-sm leading-6 text-muted-foreground">
            Registre ideias, lembretes ou informações importantes e tenha tudo organizado em um só lugar.
          </p>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicione uma nota</DialogTitle>
            <DialogDescription>
              Preencha informações sobre a nota.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Título" {...field} />
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
                          <Input placeholder="Assunto" {...field} />
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
                          <Textarea placeholder="Conteúdo" {...field} className={'mx-0 h-32'}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />

              <Button className={'mt-6'} disabled={isPending} type="submit">Criar nota</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  )
}