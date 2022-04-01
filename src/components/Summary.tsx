import { Severity } from '../types/Audit'

type VulnerabilitySummary = {
  [severity in Severity]: number
}

interface SummaryProps {
  summary: VulnerabilitySummary
}

export const Summary = ({ summary }: SummaryProps) => {
  return (
    <div className="flex items-center gap-4 pb-2">
      <div className="rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-2">
        Low: {summary.low}
      </div>
      <div className="rounded-lg border-2 border-orange-300 bg-orange-100 px-4 py-2">
        Moderate: {summary.moderate}
      </div>
      <div className="rounded-lg border-2 border-red-300 bg-red-100 px-4 py-2">
        High: {summary.high}
      </div>
      <div className="rounded-lg border-2 border-purple-300 bg-purple-100 px-4 py-2">
        Critical: {summary.critical}
      </div>
    </div>
  )
}
