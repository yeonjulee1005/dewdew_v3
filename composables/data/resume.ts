export const useResumeData = () => {
  const resumeKoList = [
    {
      icon: 'i-heroicons-academic-cap',
      label: '학력',
      slot: 'educate',
      description: '[2006.03 ~ 2013.02] 경희대학교(서울) 물리학과 학사 졸업'
    },
    {
      icon: 'i-heroicons-building-office',
      label: '[2024.02 ~ Current] 이구구',
      slot: 'career',
      description: [
        'CTO / Co-Founder'
      ]
    },
    {
      icon: 'i-heroicons-building-office',
      label: '[2022.04 ~ 2024.02] 가제트코리아',
      slot: 'career',
      description: [
        'FE Tech Lead',
        '유심사 웹서비스 FE 개발리드 및 유지보수 (Nuxt3, Pinia, Element-Plus, VueUse 등 이용)',
        '유심사 백오피스 서비스 FE 개발리드 및 유지보수 (Nuxt3, Pinia, Element-Plus, VueUse 등 이용)',
        '유심사 파트너스 백오피스 서비스 FE 개발리드 및 유지보수 (Nuxt3, Pinia, Element-Plus, VueUse 등 이용)',
        '유심사 대시보드 서비스 FE 개발리드 및 유지보수 (Nuxt3, Pinia, Element-Plus, VueUse 등 이용)',
        '가제트코리아 웹사이트 FE/BE 개발 총괄 및 유지보수 (Nuxt3, Supabase, Pinia, Element-Plus, VueUse 등 이용)',
        '가제트코리아 웹사이트 백오피스 FE/BE 개발 총괄 및 유지보수 (Nuxt3, Supabase, Pinia, Element-Plus, VueUse 등 이용)'
      ]
    },
    {
      icon: 'i-heroicons-building-library',
      label: '[2021.09 ~ 2022.4] 아브로소프트코리아',
      slot: 'career',
      description: [
        'FE Developer',
        '클라우드 기반 CAD 서비스 개발 진행 (Nuxt2, Element 이용)',
        '노무인사관리플랫폼 개발 진행 (Nuxt2 이용)',
        '아브로소프트코리아 웹사이트 유지보수 (PHP 이용)'
      ]
    },
    {
      icon: 'i-heroicons-building-office-2',
      label: '[2020.08 ~ 2021.9] 두원',
      slot: 'career',
      description: [
        'FE Developer',
        '두원실업 웹사이트 유지보수 (PHP 이용)',
        '오리젠 웹사이트 유지보수 (PHP 이용)',
        '아카나 웹사이트 유지보수 (PHP 이용)'
      ]
    },
    {
      icon: 'i-heroicons-building-storefront',
      label: '[2018.07 ~ 2021.9] 비트로드',
      slot: 'career',
      description: [
        'Team Leader',
        '자사몰 스토어 웹사이트 유지보수 (PHP 이용)',
        '엔터테인먼트 웹사이트 개발 및 유지보수 (PHP 이용)'
      ]
    },
    {
      icon: 'i-heroicons-building-office',
      label: '[2017.04 ~ 2017.6] 인베니아',
      slot: 'career',
      description: [
        'Developer',
        '검사기 장비 구동 소프트웨어 제작 및 프로젝트 참여',
        '웹페이지 유지보수 (PHP 이용)'
      ]
    },
    {
      icon: 'i-heroicons-building-library',
      label: '[2016.01 ~ 2017.1] 베가',
      slot: 'career',
      description: [
        'Developer',
        '플라즈마 구동 소프트웨어 제작 및 프로젝트 참여',
        '웹페이지 유지보수 (PHP 이용)'
      ]
    }
  ]

  const resumeEnList = [
    {
      icon: 'i-heroicons-academic-cap',
      label: 'Education',
      slot: 'educate',
      description: '[2006.03 ~ 2013.02] Graduated with a Bachelor degree in Physics from Kyung Hee University (Seoul)'
    },
    {
      icon: 'i-heroicons-building-office',
      label: '[2022.04 ~ Current] Gadget Korea',
      slot: 'career',
      description: [
        'FE Tech Lead',
        'FE Tech Lead for USIMSA web service and maintenance (Using Nuxt3, Pinia, Element-Plus, VueUse, etc.)',
        'FE Tech Lead for USIMSA back-office service and maintenance (Using Nuxt3, Pinia, Element-Plus, VueUse, etc.)',
        'FE Tech Lead for USIMSA partners back-office service and maintenance (Using Nuxt3, Pinia, Element-Plus, VueUse, etc.)',
        'FE Tech Lead for USIMSA dashboard service and maintenance (Using Nuxt3, Pinia, Element-Plus, VueUse, etc.)',
        'FE/BE development and maintenance for Gadget Korea website (Using Nuxt3, Supabase, Pinia, Element-Plus, VueUse, etc.)',
        'FE/BE development and maintenance for Gadget Korea back-office website (Using Nuxt3, Supabase, Pinia, Element-Plus, VueUse, etc.)'
      ]
    },
    {
      icon: 'i-heroicons-building-library',
      label: '[2021.09 ~ 2022.4] Avrosoft Korea',
      slot: 'career',
      description: [
        'FE Developer',
        'Development of cloud-based CAD service (Using Nuxt2, Element)',
        'Development of HR management platform (Using Nuxt2)',
        'Maintenance of Avrosoft Korea website (Using PHP)'
      ]
    },
    {
      icon: 'i-heroicons-building-office-2',
      label: '[2020.08 ~ 2021.9] Doowon',
      slot: 'career',
      description: [
        'FE Developer',
        'Maintenance of Doowon Industries website (Using PHP)',
        'Maintenance of Origen website (Using PHP)',
        'Maintenance of Akaana website (Using PHP)'
      ]
    },
    {
      icon: 'i-heroicons-building-storefront',
      label: '[2018.07 ~ 2021.9] Beatroad',
      slot: 'career',
      description: [
        'Team Leader',
        'Maintenance of our own store website (Using PHP)',
        'Development and maintenance of entertainment website (Using PHP)'
      ]
    },
    {
      icon: 'i-heroicons-building-office',
      label: '[2017.04 ~ 2017.6] Invenia',
      slot: 'career',
      description: [
        'Developer',
        'Participation in the production of inspection equipment operating software and projects',
        'Web page maintenance (Using PHP)'
      ]
    },
    {
      icon: 'i-heroicons-building-library',
      label: '[2016.01 ~ 2017.1] Bega',
      slot: 'career',
      description: [
        'Developer',
        'Development and participation in plasma drive software projects',
        'Web page maintenance (Using PHP)'
      ]
    }
  ]

  return {
    resumeKoList,
    resumeEnList
  }
}
