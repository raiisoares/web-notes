import {api} from '@/lib/api'

interface DeleteNoteRequest {
  id: string
}

export async function deleteNote({ id }: DeleteNoteRequest) {
  await api.delete(`/notes/${id}`)
}