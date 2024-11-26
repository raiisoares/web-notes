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
  
  export function AddNoteCard() {
    const form = useForm()
  
    return (
        <Dialog>
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
              <form onSubmit={() => ({})} className="space-y-5">
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
                    name="message"
                    render={({field}) => (
                        <FormItem className={'h-40'}>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Mensagem" {...field} className={'mx-0 h-32'}/>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                    )}
                />
  
                <Button type="submit">Criar nota</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
    )
  }