import {api} from '@/lib/api'
import {Note} from '@/api/find-all-notes'

interface CreateNoteRequest {
  title: string
  subject: string
  content: string
}

export async function createNote({title, subject, content}: CreateNoteRequest) {
  const response = await api.post<Note>('/notes', {title, subject, content})

  return response.data
}