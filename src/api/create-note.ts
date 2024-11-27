import {api} from '@/lib/api'

interface CreateNoteRequest {
  title: string
  subject: string
  content: string
}

export async function createNote({title, subject, content}: CreateNoteRequest) {
  await api.post('/notes', {title, subject, content})
}