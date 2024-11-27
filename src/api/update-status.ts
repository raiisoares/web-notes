import {api} from '@/lib/api'
import {Note} from '@/api/find-all-notes'

interface UpdateStatusRequest {
  id: string
}

export async function updateStatus({ id }: UpdateStatusRequest) {
  const response = await api.patch<Note>(`/notes/status`, {id})

  return response.data
}