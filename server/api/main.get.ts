import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const { data, error } = await client
    .from('main')
    .select('index, textType, category, textTitle(textKo, textEn), textDescription(textKo, textEn))')
    .order('index', { ascending: true })

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
