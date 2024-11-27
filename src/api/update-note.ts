import {api} from '@/lib/api'
import {Note} from '@/api/find-all-notes'

interface UpdateNoteRequest {
  id: string,
  data: {
    title: string
    subject: string
    content: string
  }
}

export async function updateNote({id, data}: UpdateNoteRequest) {
  const response = await api.patch<Note>('/notes', {id, data: {...data}})

  return response.data
}