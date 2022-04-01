import { useState } from 'react'

type Toggler = (status?: any | boolean) => void
export const useToggle = (initial: boolean = false): [boolean, Toggler] => {
  const [open, setOpen] = useState(initial)

  const toggle: Toggler = (status) => {
    if (typeof status === 'boolean') {
      setOpen(status)
    } else {
      setOpen((curr) => !curr)
    }
  }

  return [open, toggle]
}
