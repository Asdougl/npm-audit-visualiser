import { AuditV2 } from '../types/Audit'

interface AuditV2ViewProps {
  audit: AuditV2
}

export const AuditV2View = ({ audit }: AuditV2ViewProps) => {
  return (
    <div>
      <div>NPM Audit V2 coming soon</div>
      <div>Try running the audit with npm version &lt; 8 for now</div>
    </div>
  )
}
