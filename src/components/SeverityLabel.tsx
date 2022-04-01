import { IconName } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import { Severity } from '../types/Audit'
import { FaIcon } from './FaIcon'

interface SeverityLabelProps {
  severity: Severity
}

const severityIcon = (severity: Severity): IconName => {
  switch (severity) {
    case 'info':
      return 'circle-info'
    case 'low':
      return 'chevron-down'
    case 'moderate':
      return 'dash'
    case 'high':
      return 'chevron-up'
    case 'critical':
      return 'chevrons-up'
  }
}

export const SeverityLabel = ({ severity }: SeverityLabelProps) => {
  return (
    <span
      className={classNames('flex w-32 items-center uppercase', {
        'text-gray-400': severity === 'low',
        'text-orange-400': severity === 'moderate',
        'text-red-600': severity === 'high',
        'text-purple-600': severity === 'critical',
      })}
    >
      <FaIcon icon={severityIcon(severity)} className="px-1" />
      <span>{severity}</span>
    </span>
  )
}
