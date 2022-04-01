import ReactMarkdown from 'react-markdown'
import { Advisory as IAdvisory } from '../types/Audit'
import { useToggle } from '../util/hooks'
import { SeverityLabel } from './SeverityLabel'
import { Toggler } from './Toggler'

interface AdvisoryProps {
  advisory: IAdvisory
}

export const Advisory = ({ advisory }: AdvisoryProps) => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <div className="flex">
      <div>
        <SeverityLabel severity={advisory.severity} />
      </div>
      <div className="px-2">
        <div className="flex gap-1">
          <code className="rounded bg-gray-100 px-2">
            {advisory.module_name}
          </code>
          <div>{advisory.title}</div>
          <div className="px-2">
            <Toggler open={open} toggle={toggleOpen} />
          </div>
        </div>
        {open && (
          <div className="flex flex-col gap-2 px-2 py-2">
            <div className="px-2 py-2">
              {advisory.recommendation} &bull;{' '}
              {advisory.cwe.map((cwe) => (
                <a
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://cwe.mitre.org/data/definitions/${
                    cwe.split('-')[1]
                  }.html`}
                >
                  {cwe}
                </a>
              ))}{' '}
              &bull;{' '}
              <a
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href={advisory.url}
              >
                Github
              </a>
            </div>
            {/* <div className="my-1 ml-1 border-l-4 border-gray-200 pl-4 text-justify italic">
              {advisory.overview}
            </div> */}
            <div className="rounded bg-slate-100 px-4 pt-2 pb-4">
              <ReactMarkdown className="prose">
                {advisory.overview}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
