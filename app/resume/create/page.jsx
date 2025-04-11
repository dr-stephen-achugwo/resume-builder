"use client"
import React from 'react'
import { useResume }  from '@/context/resume'
import SecondStep from '@/components/ui/resume/second-step'
import ThirdStep from '@/components/ui/resume/third-step'
import FourthStep from '@/components/ui/resume/fourth-step'
import FifthStep from '@/components/ui/resume/fifth-step'
import ResumeNav from '@/components/ui/nav/resume-nav'
import FirstStepCreate from '@/components/ui/resume/first-step-create'
// Специальный create mode для резюме.Потом снавигируем в edit mode.
import PreviewCard from '@/components/ui/cards/preview-card'

const ResumeCreatePage = () => {
     // now using the context
     const { step, resume } = useResume()
  return ( 
    <div className="flex flex-col lg:flex-row  h-screen overflow-y-auto">
      
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center lg:items-center">
      <PreviewCard />
      </div> 
      
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex lg:justify-center lg:items-start">
      <ResumeNav />
        {step === 1 && <FirstStepCreate />}
        {step === 2 && <SecondStep />}
        {step === 3 && <ThirdStep />}
        {step === 4 && <FourthStep />}
        {step === 5 && <FifthStep />}
        </div>
    </div>
  )
}

export default ResumeCreatePage
