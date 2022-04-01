import { Severity } from '../types/Audit'
import { FaIcon } from './FaIcon'

type VulnerabilitySummary = {
  [severity in Severity]: number
}

interface SummaryProps {
  summary: VulnerabilitySummary
}

export const Summary = ({ summary }: SummaryProps) => {
  return (
    <div className="flex items-center gap-4 pb-2">
      <div className="rounded border border-gray-400 bg-gray-50 px-4 py-1 font-light text-gray-400">
        <FaIcon icon="chevron-down" className="" /> LOW: {summary.low}
      </div>
      <div className="rounded border border-orange-400 bg-orange-50 px-4 py-1 font-light text-orange-400">
        <FaIcon icon="dash" className="" /> MODERATE: {summary.moderate}
      </div>
      <div className="rounded border border-red-600 bg-red-50 py-1 px-4 font-light text-red-600">
        <FaIcon icon="chevron-up" className="" /> HIGH: {summary.high}
      </div>
      <div className="rounded border border-purple-600 bg-purple-50 px-4 py-1 font-light text-purple-600">
        <FaIcon icon="chevrons-up" className="" /> CRITICAL: {summary.critical}
      </div>
    </div>
  )
}
