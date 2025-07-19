import { api } from '../services/api'

export async function statusServiceNFe(options: NFe) {
  try {
    return { success: true, insertedId }
  } catch (e) {
    return { success: false, error: (e as Error).message }
  }
}
