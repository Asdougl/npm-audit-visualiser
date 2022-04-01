import classNames from 'classnames'
import { FaIcon } from './FaIcon'

interface TogglerProps {
  open: boolean
  toggle: () => void
}

export const Toggler = ({ open, toggle }: TogglerProps) => {
  return (
    <button
      type="button"
      className={
        'rounded-full px-2 hover:bg-slate-100 focus:outline-none focus:ring focus:ring-slate-200'
      }
      onClick={toggle}
    >
      <FaIcon
        className={classNames(
          'transition-transform',
          open ? 'rotate-180' : 'rotate-0'
        )}
        icon="chevron-down"
      />
    </button>
  )
}
