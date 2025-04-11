"use client"
import React from 'react'

const Experience = ({resume}) => { // Компонент опыта работы для Preview Card.
  return (
    <div className = "my-6">
        <h2 
        className="font-bold text-sm mb-2" 
        style={{color:resume.themeColor}}
        >
        Professional Experience
      </h2>
      <hr style={{borderColor: resume.themeColor }} />

      {resume?.experience && resume.experience.map((exp, index) => {
        return ( 
        <div key={index} className="my-5">
            <h2 className="text-sm font-bold">{exp?.title}</h2>
            <h3 className="text-sm ">{exp?.company}</h3>
            <p className="text-xs text-gray-600">{exp?.address}</p>
            <p className="text-sm">{exp?.startDate}-{exp?.endDate}</p>
        </div>
        )
      })}
    </div>
  )
}

export default Experience