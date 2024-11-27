import {Button} from '@/components/ui/button'

interface EditOnDetailsProps {
  disable: boolean
  handleEdit: () => void
  form?: string
}

export function EditOnDetails({disable, handleEdit, form}: EditOnDetailsProps) {
  return (
      <div className={'flex items-center justify-end gap-4'}>
        <Button disabled={disable} onClick={handleEdit} variant={'destructive'} className={'w-28 gap-1 font-semibold'}>
          Cancelar
        </Button>

        <Button disabled={disable} type={'submit'} form={form} className={'w-28 gap-1 font-semibold'}>
          Salvar
        </Button>
      </div>
  )
}