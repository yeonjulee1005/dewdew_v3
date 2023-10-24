import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const { data, error } = await client
    .from('archiveIndex')
    .select('index, title, deleted, archiveImage(title, years, url)')
    .eq('deleted', false)

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
