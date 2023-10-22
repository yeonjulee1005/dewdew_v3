import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const { data, error } = await client
    .from('main')
    .select('index, textKo, textEn, textType, category')
    .order('index', { ascending: true })

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
