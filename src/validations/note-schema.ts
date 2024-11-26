import {z} from 'zod'

export const NoteSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  subject: z.string().min(1, 'O assunto é obrigatório'),
  content: z.string().min(1, 'O conteúdo é obrigatório'),
})