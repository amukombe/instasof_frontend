export type Kpis = {
  totalVolume: string
  activeMerchants: number
  transactionsToday: number
  totalVolumeDeltaPct: number
  activeMerchantsDeltaPct: number
  transactionsTodayDeltaPct: number
}

export type Module = {
  key: string
  name: string
  description: string
}

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5099'

export async function fetchKpis(): Promise<Kpis> {
  const r = await fetch(`${API_BASE}/api/dashboard/kpis`)
  if (!r.ok) throw new Error(`Failed to fetch KPIs: ${r.status}`)
  return r.json()
}

export async function fetchModules(): Promise<Module[]> {
  const r = await fetch(`${API_BASE}/api/dashboard/modules`)
  if (!r.ok) throw new Error(`Failed to fetch modules: ${r.status}`)
  return r.json()
}
