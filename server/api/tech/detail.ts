import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const query = getQuery(event)

  const { data, error } = await client
    .from('tech')
    .select('id, title, desc, raw_article, view_count, like, update_user_id, created_at, updated_at, deleted')
    .eq('deleted', false)
    .eq('id', query.techBlogId)
    .single()

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
