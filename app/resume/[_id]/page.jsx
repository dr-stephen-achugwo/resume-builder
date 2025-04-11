import React from 'react'
import { getResumeFromDb } from '@/actions/resume'
import PersonalDetails from '@/components/ui/preview/personal-details'
import Summary from '@/components/ui/preview/summary'
import Experience from '@/components/ui/preview/experience'
import Education from '@/components/ui/preview/education'
import Skills from '@/components/ui/preview/skills'

export async function generateMetadata({ params }) { // Специальная функция с генерацией метададнных для SEO оптимизации.
  const resume = await getResumeFromDb(params._id);

  return {
    title: `${resume.name} - Resume`,
    description: resume.summary,
    openGraph: {
      title: `${resume.name} - Resume`,
      description: resume.summary,
      images: ["/logo.svg"],
    },
  };
}

export default async function ResumePage({params}) { // Асинхронная функция для дисплея страницы с Резюме.
  const resume = await getResumeFromDb(params._id)

  return (
<div className="m-20">
    <PersonalDetails resume={resume} />
    <Summary resume={resume} />
    <Experience resume={resume} />
    <Education resume={resume} />
    <Skills resume={resume} />
</div>
  )
}


