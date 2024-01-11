export const useQuery = () => {
  const config = useRuntimeConfig()

  const weatherQuery = <T extends string, D extends number>(date: T, time: T, nx: D, ny: D) => {
    const searchParams = new URLSearchParams([
      ['serviceKey', config.public.dataPortalApiKey],
      ['pageNo', '1'],
      ['numOfRows', '100'],
      ['dataType', 'json'],
      ['base_date', date.toString()],
      ['base_time', time.toString()],
      ['nx', nx.toString()],
      ['ny', ny.toString()]
    ])

    return '?' + searchParams.toString()
  }

  return {
    weatherQuery
  }
}
