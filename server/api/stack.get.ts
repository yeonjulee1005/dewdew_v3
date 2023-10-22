import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const { data, error } = await client
    .from('stackLogo')
    .select('*')

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
