"use client"
import React from 'react'
import { useResume } from '@/context/resume'
import SkeletonCard from '@/components/ui/cards/skeleton-card'
import ResumeCard from '@/components/ui/cards/resume-card'

const Dashboard = () => {
  const { resumes } = useResume()

  if(!resumes?.length) {
    return (
      <div>
        <p className="text-center my-5">Loading...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
      {resumes?.map((resume) => (
        <ResumeCard key={resumes._id} resume={resume} />
        ))}
    </div>
  )
}

export default Dashboard
