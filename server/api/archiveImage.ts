import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const year = getQuery(event).year

  const { data, error } = await client
    .from('archiveImage')
    .select('title, years, url, deleted')
    .eq('years', year)
    .eq('deleted', false)

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
