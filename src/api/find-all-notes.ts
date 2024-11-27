import {api} from '@/lib/api'

export interface Note {
  id: string
  title: string
  subject: string
  content: string
  created_at: string
  status: boolean
}

export type FindAllNotesResponse = Note[]

export async function findAllNotes(): Promise<FindAllNotesResponse> {
  const response = await api.get<FindAllNotesResponse>('/notes')
  return response.data
}
