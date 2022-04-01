import { IconName } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import { useMemo } from 'react'
import { Action as IAction, ActionType, Resolves } from '../types/Audit'
import { useToggle } from '../util/hooks'
import { FaIcon } from './FaIcon'
import { Toggler } from './Toggler'
import { Tooltipped } from './Tooltipped'

interface ActionProps {
  action: IAction
}

const actionIcon = (action: ActionType): IconName => {
  switch (action) {
    case 'install':
      return 'download'
    case 'update':
      return 'arrow-up'
    case 'review':
      return 'glasses-round'
  }
}

const parsePath = (path: string): [string, string] => {
  const parts = path.split('>')
  const [first] = parts.splice(0, 1)
  return [first, parts.join(' > ')]
}

const getUniqueResolvers = (resolvers: Resolves[]) => {
  const uniques = new Set<string>()
  for (const resolver of resolvers) {
    const [first] = parsePath(resolver.path)
    uniques.add(first)
  }
  return uniques
}

export const Action = ({ action }: ActionProps) => {
  const [open, toggleOpen] = useToggle(false)

  const uniqueResolvers = useMemo(() => {
    return getUniqueResolvers(action.resolves)
  }, [action.resolves])

  return (
    <li className="flex items-start gap-1 py-1">
      <div
        className={classNames('flex w-32 flex-shrink-0 items-center', {
          'text-blue-500': action.action === 'install',
          'text-green-500': action.action === 'update',
          'text-cyan-600': action.action === 'review',
        })}
      >
        <FaIcon icon={actionIcon(action.action)} className="px-1" />
        <div className="pl-1 font-light uppercase tracking-wide">
          {action.action}
        </div>
      </div>
      <div className="flex flex-col items-start">
        <div className="flex items-center px-2 py-1 font-mono font-light">
          <div className="rounded bg-gray-100 px-2">
            {action.module}
            <span>{action.action !== 'review' && `@${action.target}`}</span>
          </div>
          {action.action === 'install' && action.isMajor && (
            <div className="px-2">
              <Tooltipped tooltip="Major version update">
                <FaIcon
                  icon="diamond-exclamation"
                  className="text-orange-700"
                />
              </Tooltipped>
            </div>
          )}
          <div className="px-2">
            <Toggler open={open} toggle={toggleOpen} />
          </div>
        </div>
        {open && (
          <div className="px-2 text-xs">
            <div className="flex gap-1 py-2">
              <span>Found in</span>
              {Array.from(uniqueResolvers).map((unique) => (
                <span className="bg-gray-100 px-1 font-mono">{unique}</span>
              ))}
            </div>
            <ul className="font-mono">
              {action.resolves.map((path) => {
                const [first, rest] = parsePath(path.path)
                return (
                  <li key={path.path} className="py-1">
                    <span className="font-bold">{first}</span>
                    {rest.length > 0 && <span> &gt; {rest}</span>}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </li>
  )
}
