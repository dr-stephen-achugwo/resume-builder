"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useResume } from '@/context/resume'
import ResumeCard from '@/components/ui/cards/resume-card'
import toast from 'react-hot-toast'

// https://cdn-icons-png.flaticon.com/128/9131/9131795.png // Download
// https://cdn-icons-png.flaticon.com/128/10550/10550076.png // Share
// https://cdn-icons-png.flaticon.com/128/446/446991.png // Print
// Страница загрузки.
const DownloadPage = ({ params }) => {
  // Контекст 
  const {resumes} = useResume()
  // State
  const [currentResume, setCurrentResume] = React.useState(null)

  React.useEffect(() => {
    if (resumes?.length && params?._id) {
      const resume = resumes.find((r) => r._id === params._id);
      setCurrentResume(resume || null);
    }
  }, [resumes, params._id]);

  const printResume= () => { // Функция Print открывает резюме в Blank.
    const newWindow = window.open(`/resume/${currentResume._id}`, "_blank")

    newWindow.onload = () => { // Используем метод SetTimeout и принтим резюме.
      setTimeout(() => {
        newWindow.print()
      }, 300)
    }
  }

  return (
    <div className="flex jusitfy-center items-center min-h-screen mx-5 my-20 overflow-auto">
        <div className="text-center w-full md:w-1/3">
            <h2 className="font-bold text-lg">Congratulations!Your Resume succesfully created!</h2>
            <p>You can download,print or share it with anyone.</p>

            <div className="flex justify-between my-20">
              <div className="flex flex-col items-center">
                <Image 
                src="https://cdn-icons-png.flaticon.com/128/9131/9131795.png"
                width={50}
                height={50}
                />
                <Button className="my-3">Download</Button>
              </div>
              <div className="flex flex-col items-center">
                <Image 
                src="https://cdn-icons-png.flaticon.com/128/446/446991.png"
                width={50}
                height={50}
                />
                <Button onClick={printResume} className="my-3">Print</Button>
              </div>
              <div className="flex flex-col items-center">
                <Image 
                src="https://cdn-icons-png.flaticon.com/128/10550/10550076.png"
                width={50}
                height={50}
                />
                <Button onClick={() => {
                  navigator.clipboard.writeText( /* При нажатии,копирует ссылку на резюме. */
                    `${window.location.origin}/resume/${currentResume._id}`
                  )
                  toast.success("Link copied to clipboard to share!"
                  )
                }} className="my-3">Share</Button>
              </div>
            </div>
            {currentResume ? <ResumeCard resume={currentResume} /> : null}
            <div className="mb-10"></div>
        </div>
    </div>
  )
}

export default DownloadPage
