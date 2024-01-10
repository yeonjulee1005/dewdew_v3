import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const query = getQuery(event)
  const page = query.page ? Number(query.page) : 1
  const pageCount = query.pageCount ? Number(query.pageCount) : 10

  const supabasePageCalc = (page:number, pageCount:number, firstRange:boolean): number => {
    return firstRange
      ? (page - 1) * pageCount
      : (page * pageCount) - 1
  }

  const { data, error } = await client
    .from('tech')
    .select('id, title, desc, raw_article, view_count, like, tags, update_user_id, created_at, updated_at, deleted')
    .eq('deleted', false)
    .order('created_at', { ascending: false })
    .range(supabasePageCalc(page, pageCount, true), supabasePageCalc(page, pageCount, false))

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
