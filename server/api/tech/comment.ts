import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<SupabaseDataBase>(event)

  const query = getQuery(event)

  const { data, error } = await client
    .from('techComment')
    .select('id, tech_id, message, name, password, deleted, created_at, updated_at')
    .eq('tech_id', query.techBlogId)
    .eq('deleted', false)
    .order('created_at', { ascending: false })

  console.log(data)
  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
