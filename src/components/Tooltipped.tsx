import { FC } from 'react'

interface TooltippedProps {
  tooltip: string
}

export const Tooltipped: FC<TooltippedProps> = ({ children, tooltip }) => {
  return (
    <div className="group relative">
      {children}
      <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-slate-200 px-2 py-1 font-sans text-xs font-semibold shadow-lg group-hover:block">
        <div className="">{tooltip}</div>
      </div>
    </div>
  )
}
