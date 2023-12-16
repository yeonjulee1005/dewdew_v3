import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const query = getQuery(event)

  const supabasePageCalc = (page:number, pageCount:number, firstRange:boolean): number => {
    return firstRange
      ? (page - 1) * pageCount
      : (page * pageCount) - 1
  }

  const { data, error } = await client
    .from('tech')
    .select('id, title, desc, raw_article, like, update_user_id, created_at, updated_at, deleted')
    .eq('deleted', false)
    .order('created_at', { ascending: false })
    .range(supabasePageCalc(query.page, query.pageCount, true), supabasePageCalc(query.page, query.pageCount, false))

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
