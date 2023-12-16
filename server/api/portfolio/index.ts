import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const { data, error } = await client
    .from('portfolio')
    .select('orderIndex!inner(index), title, desc, url, image, thumbnail, alt, deleted')
    .eq('deleted', false)
    .order('orderIndex(index)', { ascending: true })

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
