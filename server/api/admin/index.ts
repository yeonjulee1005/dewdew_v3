import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<SupabaseDataBase>(event)
  const query = getQuery(event)

  const { data, error } = await client
    .from('profiles')
    .select('admin')
    .eq('id', query.userId ?? String(user?.id))
    .eq('deleted', false)
    .single()

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
