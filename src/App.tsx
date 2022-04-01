import { ChangeEvent, useState } from 'react'
import { Audit, AuditV2, isAuditV2Quick } from './types/Audit'
import { readFile } from './util/file'
import { AuditV2View } from './views/AuditV2View'
import { AuditView } from './views/AuditView'

function App() {
  const [audit, setAudit] = useState<Audit | AuditV2 | null>(null)
  const [error, setError] = useState('')

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/json') {
      readFile(file)
        .then((auditFile) => {
          console.log(audit)
          setAudit(auditFile)
          setError('')
        })
        .catch((error) => {
          setError(error.message)
        })
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <div className="flex justify-between py-8">
        <div>
          <h1 className="text-4xl font-bold">NPM Audit Visualizer</h1>
          <h2 className="text-xl">Visualise NPM Audit Reports</h2>
        </div>
        <div>
          {audit && (
            <button
              type="button"
              className="rounded border-2 border-slate-400 px-2 py-1 hover:bg-slate-100 focus:outline-none focus:ring focus:ring-slate-200"
              onClick={() => setAudit(null)}
            >
              Upload New
            </button>
          )}
        </div>
      </div>
      <div className="flex-grow">
        {error && <div>{error}</div>}
        {audit ? (
          isAuditV2Quick(audit) ? (
            <AuditV2View audit={audit} />
          ) : (
            <AuditView audit={audit} />
          )
        ) : (
          <div>
            <input type="file" onChange={uploadFile} />
          </div>
        )}
      </div>
      <div className="container mx-auto flex items-center justify-between py-8">
        <div>
          Made by{' '}
          <a
            href="https://cameronburrows.com.au"
            className="text-blue-500 hover:underline"
          >
            Cameron Burrows
          </a>
        </div>
        <div className="italic">
          <span className="font-semibold">Note</span>: Everything is processed
          locally, nothing leaves your browser
        </div>
      </div>
    </div>
  )
}

export default App
