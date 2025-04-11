"use client"
import PersonalDetails from "@/components/ui/preview/personal-details"// Личная информация.
import Summary from "@/components/ui/preview/summary" // Превью резюме.
import Experience from "@/components/ui/preview/experience"
import Education from "@/components/ui/preview/education"
import Skills from "@/components/ui/preview/skills"
import { Button } from "@/components/ui/button"
import {UserPen, Download, Trash} from "lucide-react" // Иконки для Overlay
import Link from "next/link"
import { useRouter } from "next/navigation" // Хук роутера Next-а.
import { useResume } from "@/context/resume" // Контекст.
// Превью карточка для Dashboard-а.

export default function ResumeCard({resume}) { // Специальная карточка резюме с пропом из  БД
   const { deleteResume } = useResume()
   const router = useRouter() // Навигация на страницы.
    return (
        <div 
         className="relative shadow-lg w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto" 
         style={{borderColor: resume?.themeColor}}
        >
         <div className="line-clamp-3">
         <PersonalDetails resume={resume} />
         </div>
         <div className="line-clamp-4">
         <Summary resume={resume} />
         </div>
         <div className="line-clamp-4">
         <Experience resume={resume} />
         </div>
         <div className="line-clamp-4">
         <Education resume={resume} />
         </div>
         <div className="line-clamp-4">
            <Skills resume={resume} />
         </div>
         <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
         {/* Добавили Overlay с кнопками.*/}
            <div className="flex space-x-4">
               <Button onClick={() => router.push(`/dashboard/resume/edit/${resume._id}`)}>
                  <UserPen />
               </Button>
               <Button onClick={() => router.push(`/dashboard/resume/download/${resume._id}`)}>
                  <Download />
               </Button>
               <Button onClick={() => deleteResume(resume._id)}>
                  <Trash />
               </Button>
            </div>
         </div>
        </div>
    )
}