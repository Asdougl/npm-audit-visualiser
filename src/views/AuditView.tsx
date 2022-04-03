import { Action } from '../components/Action'
import { Advisory } from '../components/Advisory'
import { Summary } from '../components/Summary'
import { Audit } from '../types/Audit'

interface AuditViewProps {
  audit: Audit
}

export const AuditView = ({ audit }: AuditViewProps) => {
  return (
    <div>
      <Summary summary={audit.metadata.vulnerabilities} />
      <div className="py-2">
        <h3 className="pb-2 text-3xl font-semibold">Actions</h3>
        <div>
          {audit.actions.map((action) => (
            <Action key={action.action + action.module} action={action} />
          ))}
        </div>
      </div>
      <div className="py-2">
        <h3 className="pb-2 text-3xl font-semibold">Advisories</h3>
        <div className="flex flex-col gap-2">
          {Object.keys(audit.advisories).map((key) => {
            const value = audit.advisories[key]

            return <Advisory key={key} advisory={value} />
          })}
        </div>
      </div>
    </div>
  )
}
