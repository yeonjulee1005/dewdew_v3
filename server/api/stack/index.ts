import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const { data, error } = await client
    .from('stackLogo')
    .select('orderIndex!inner(index), title, url, deleted')
    .eq('deleted', false)
    .order('orderIndex(index)', { ascending: true })

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
