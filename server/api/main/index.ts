import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const { data, error } = await client
    .from('main')
    .select('orderIndex!inner(index), text_type, category, textTitle(ko, en), textDescription(ko, en)), deleted')
    .eq('deleted', false)
    .order('orderIndex(index)', { ascending: true })

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
