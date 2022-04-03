import classNames from 'classnames'
import { ChangeEvent, DragEvent, useState } from 'react'
import { FaIcon } from './FaIcon'

interface UploadProps {
  uploadFile: (file: File | undefined) => void
}

export const Upload = ({ uploadFile }: UploadProps) => {
  const [dragging, setDragging] = useState(false)

  const uploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    uploadFile(file)
  }

  const uploadDrop = (e: DragEvent<HTMLInputElement>) => {
    const dataTransfer = e.dataTransfer
    const file = dataTransfer.files[0]
    uploadFile(file)
  }

  return (
    <div className="group relative">
      <input
        type="file"
        onChange={uploadChange}
        className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
        onDrop={uploadDrop}
        accept="application/json"
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
      />
      <div
        className={classNames(
          'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 shadow group-hover:bg-slate-50',
          dragging ? 'border-slate-500' : 'border-slate-200'
        )}
      >
        <div className="pb-6 text-8xl text-slate-400">
          <FaIcon icon="file-plus" />
        </div>
        <div className="text-lg font-semibold text-slate-500">
          {!dragging ? (
            <>
              Drag your audit files here or{' '}
              <span className="text-blue-400">browse</span>
            </>
          ) : (
            <span className="text-blue-400">Drop to analyze</span>
          )}
        </div>
      </div>
    </div>
  )
}
