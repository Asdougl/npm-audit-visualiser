import { Audit, AuditV2, isAudit, isAuditV2 } from '../types/Audit'

export const readFile = (file: File) =>
  new Promise<Audit | AuditV2>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = (e) => {
      const filestr = e.target?.result
      if (filestr && typeof filestr === 'string') {
        const asJSON = JSON.parse(filestr)
        console.log(asJSON)
        if (isAudit(asJSON) || isAuditV2(asJSON)) {
          resolve(asJSON)
        } else {
          reject(new Error('Invalid Audit format'))
        }
      }
    }
    reader.onerror = reject
  })
