export const useSkillData = () => {
  const skillTitleList = {
    frontEndTitle: 'FE Skills',
    backEndTitle: 'BE Skills',
    toolsTitle: 'Tools'
  }

  const frontEnd = [
    { title: 'Nuxt3', percent: 90, emoji: '🚀' },
    { title: 'Nuxt2', percent: 90, emoji: '🚀' },
    { title: 'Vue2/3', percent: 85, emoji: '🚀' },
    { title: 'Astro', percent: 25, emoji: '📖' },
    { title: 'React', percent: 25, emoji: '📖' },
    { title: 'Next.js', percent: 20, emoji: '📖' },
    { title: 'TypeScript', percent: 65, emoji: '💻' },
    { title: 'JavaScript', percent: 80, emoji: '🚀' },
    { title: 'SASS/SCSS', percent: 90, emoji: '🚀' },
    { title: 'element-plus', percent: 90, emoji: '🚀' },
    { title: 'Tailwind CSS', percent: 60, emoji: '🚀' },
    { title: 'HTML5', percent: 90, emoji: '🚀' },
    { title: 'CSS3', percent: 80, emoji: '🚀' },
    { title: 'bun', percent: 50, emoji: '💻' },
    { title: 'Swift', percent: 20, emoji: '📖' },
    { title: 'Flutter', percent: 25, emoji: '📖' }
  ]

  const backEnd = [
    { title: 'Supabase', percent: 80, emoji: '🚀' },
    { title: 'Deno', percent: 10, emoji: '📖' },
    { title: 'Docker', percent: 10, emoji: '💻' },
    { title: 'Kubernetes', percent: 5, emoji: '📖' },
    { title: 'Express', percent: 60, emoji: '💻' },
    { title: 'Node.js', percent: 60, emoji: '💻' },
    { title: 'PostgreSQL', percent: 50, emoji: '💻' },
    { title: 'Python', percent: 15, emoji: '📖' }
  ]

  const devOps = [
    { title: 'Vercel', percent: 100, emoji: '🚀' },
    { title: 'Amplitude', percent: 50, emoji: '💻' },
    { title: 'Azure', percent: 85, emoji: '🚀' },
    { title: 'Firebase', percent: 80, emoji: '🚀' },
    { title: 'VS Code', percent: 100, emoji: '🚀' },
    { title: 'Cursor', percent: 87, emoji: '🚀' },
    { title: 'Vim', percent: 75, emoji: '💻' },
    { title: 'GitHub', percent: 90, emoji: '🚀' },
    { title: 'Figma', percent: 80, emoji: '💻' },
    { title: 'Jira', percent: 90, emoji: '🚀' },
    { title: 'Slack', percent: 100, emoji: '🚀' },
    { title: 'Teams', percent: 90, emoji: '🚀' },
    { title: 'Postman', percent: 90, emoji: '🚀' },
    { title: 'Illustration', percent: 70, emoji: '💻' },
    { title: 'XD', percent: 80, emoji: '💻' },
    { title: 'Zeplin', percent: 65, emoji: '💻' }
  ]

  return {
    skillTitleList,
    frontEnd,
    backEnd,
    devOps
  }
}
