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
  
  export function NoteCard() {
    const form = useForm()
    const [readOnly, setReadOnly] = useState<boolean>(true)
  
    return (
        <Dialog>
          <DialogTrigger className="text-left flex flex-col p-5 gap-3 overflow-hidden border
            hover:ring-2 focus-visible:ring-2 rounded-md">
            <span className="text-sm font-medium">
              Título da nota
            </span>
  
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
              há 2 dias
              </span>
  
              <Badge>Concluído</Badge>
            </div>
  
            <p className="h-[120px] text-sm leading-6 text-muted-foreground text-ellipsis overflow-hidden line-clamp-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda consequuntur distinctio,
              impedit nisi numquam omnis temporibus. Ad at aut eum itaque maiores, molestias neque nisi quam tempora
              undeeeeeeeeee voluptate.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda consequuntur distinctio,
              impedit nisi numquam omnis temporibus. Ad at aut eum itaque maiores, molestias neque nisi quam tempora
              unde voluptate.
            </p>
  
          </DialogTrigger>
  
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Título da nota</DialogTitle>
              <DialogDescription>
                Veja detalhes e atualize sua nota.
              </DialogDescription>
            </DialogHeader>
  
            <Form {...form}>
              <form onSubmit={() => ({})} className="space-y-5">
                <FormField
                    control={form.control}
                    name="title"
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
                    name="message"
                    render={({field}) => (
                        <FormItem className={'h-40'}>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Mensagem" {...field} readOnly={readOnly} className={'mx-0 h-32'}/>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                    )}
                />
  
                <div className={'flex gap-8'}>
                  <FormField
                      control={form.control}
                      name="created_at"
                      render={({field}) => (
                          <FormItem className={'w-full'}>
                            <FormLabel>Data de criação</FormLabel>
                            <FormControl>
                              <Input type={'date'} readOnly={readOnly} {...field} />
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
  
                  <FormField
                      control={form.control}
                      name="status"
                      render={({field}) => (
                          <FormItem className={'w-full'}>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <Input placeholder="Status" readOnly={readOnly} {...field} />
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