import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const query = getQuery(event)

  const { data, error } = await client
    .from('pageMenu')
    .select('orderIndex!inner(index), title, icon, menu_type, url, image_url, deleted')
    .eq('menu_type', query.menuType)
    .eq('deleted', false)
    .order('orderIndex(index)', { ascending: true })

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
