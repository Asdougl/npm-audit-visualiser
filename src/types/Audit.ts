export interface Resolves {
  id: number
  path: string
  dev: boolean
  optional: boolean
  bundled: boolean
}

export type ActionType = 'install' | 'update' | 'review'

interface ActionBase {
  action: ActionType
  resolves: Resolves[]
  module: string
}

interface ActionInstall extends ActionBase {
  action: 'install'
  isMajor: boolean
  target: string
}

interface ActionUpdate extends ActionBase {
  action: 'update'
  depth: number
  target: string
}

interface ActionReview extends ActionBase {
  action: 'review'
}

export type Action = ActionInstall | ActionUpdate | ActionReview

export type Severity = 'info' | 'low' | 'moderate' | 'high' | 'critical'

export interface Finding {
  version: string
  paths: string[]
}

export interface Advisory {
  findings: Finding[]
  metadata: unknown
  vulnerable_versions: string
  module_name: string
  severity: Severity
  github_advisory_id: string
  cves: string[]
  access: string
  patched_versions: string
  cvss: {
    score: number
    vectorString: string
  }
  updated: string
  recommendation: string
  cwe: string[]
  found_by: unknown
  deleted: unknown
  id: 1064582
  references: string
  reported_by: unknown
  title: string
  npm_advisory_id: unknown
  overview: string
  url: string
}

interface AdvisoryMap {
  [key: string]: Advisory
}

export interface Audit {
  actions: Action[]
  advisories: AdvisoryMap
  metadata: {
    vulnerabilities: {
      info: number
      low: number
      moderate: number
      high: number
      critical: number
    }
    dependencies: number
    devDependencies: number
    optionalDependencies: number
    totalDependencies: number
  }
  muted: unknown[]
  runId: string
}

export const isAudit = (test: any): test is Audit => {
  return (
    typeof test === 'object' &&
    test.hasOwnProperty('actions') &&
    Array.isArray(test.actions) &&
    test.hasOwnProperty('advisories') &&
    typeof test.advisories === 'object' &&
    test.hasOwnProperty('metadata') &&
    typeof test.metadata === 'object' &&
    test.hasOwnProperty('muted') &&
    Array.isArray(test.muted) &&
    test.hasOwnProperty('runId') &&
    typeof test.runId === 'string'
  )
}

interface Via {
  source: number
  name: string
  dependency: string
  title: string
  url: string
  severity: Severity
  range: string
}

interface Fix {
  name: string
  version: string
  isSemVerMajor: boolean
}

interface PackageAudit {
  name: string
  severity: Severity
  isDirect: boolean
  via: (string | Via)[]
  effects: string[]
  range: string
  nodes: string[]
  fixAvailable: Fix | boolean
}

export interface MetadataV2 {
  dependencies: {
    prod: number
    dev: number
    optional: number
    peer: number
    peerOptional: number
    total: number
  }
  vulnerabilities: {
    info: number
    low: number
    moderate: number
    high: number
    critical: number
    total: number
  }
}

export const isMetadataV2 = (test: any): test is MetadataV2 => {
  return (
    typeof test === 'object' &&
    test.hasOwnProperty('dependencies') &&
    typeof test.dependencies === 'object' &&
    test.hasOwnProperty('vulnerabilities') &&
    typeof test.vulnerabilities === 'object'
  )
}

export interface AuditV2 {
  auditReportVersion: 2
  metadata: MetadataV2
  vulnerabilities: {
    [packageName: string]: PackageAudit
  }
}

export const isAuditV2 = (test: any): test is AuditV2 => {
  return (
    typeof test === 'object' &&
    test.hasOwnProperty('auditReportVersion') &&
    test.auditReportVersion === 2 &&
    test.hasOwnProperty('metadata') &&
    isMetadataV2(test.metadata) &&
    test.hasOwnProperty('vulnerabilities') &&
    typeof test.metadata === 'object'
  )
}

export const isAuditV2Quick = (test: Audit | AuditV2): test is AuditV2 => {
  return test.hasOwnProperty('auditReportVersion')
}
