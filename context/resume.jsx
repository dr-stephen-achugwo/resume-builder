"use client"
import React, { useState, useEffect } from 'react'
import {
   saveResumeToDb,
   getUserResume, 
   getResumeFromDb,
   updateResumeFromDb,
   updateExperienceToDb,
   updateEducationToDb,
   updateSkillsToDb,
   deleteResumeFromDb
   } from '@/actions/resume' // Все асинхронные серверные фукнции связывающие db и context.
import toast from 'react-hot-toast' // Специальные уведомления при действиях(toast)
import { useRouter, useParams, usePathname } from 'next/navigation' // Навигация next-а
import { runAi } from '@/actions/gemini' // Функция с вызовом Gemini.

// Special context and State hook for resume creation
const ResumeContext = React.createContext()

const experienceField = { // Необходимые переменные для Epxerience Schema
  title: "",
  company: "",
  address: "",
  startDate: "",
  endDate: "",
  summary: "",
}

const educationField = {
  name: "",
  address: "",
  qualification: "",
  year: "",
}

const skillField = {
  name: "",
  level: "",
}

const initialState = { // Необходимое состояние и переменные что нужно заполнить с помощью хуков.
    name: "",
    job: "",
    address: "",
    phone: "",
    email: "",
    themeColor: "",
    experience: [experienceField],
    education: [educationField] // Образование и опыт в резюме является отдельной частью.
}

const ResumeProvider = ({ children }) => {
  // Состояния
    const [resume, setResume] = useState(initialState)
    const [resumes, setResumes] = useState([])
    const [step, setStep] = useState(1)
    // Experience состояния.
    const [experienceList, setExperienceList] = useState([experienceField])
    const [experienceLoading, setExperienceLoading] = useState({})
    // Education состояния 
    const [educationList, setEducationList] = useState([educationField])
    // Skills состояния 
    const [skillsList, setSkillsList] = useState({skillField})
    // Хуки роутера
     const router = useRouter() 
     const {_id} = useParams() // Добавляем id резюме в контекст.
     const pathname = usePathname() 

    // Сохраняем резюме в localStorage.Если уже есть,меняем его с помощью кастомного хука для стейта.
    useEffect(() => {
      const savedResume = localStorage.getItem('resume')
    if (savedResume) {
      setResume(JSON.parse(savedResume))
    }
    }, [])

    useEffect(() => { // Если есть id в базе данных,берем резюме и дисплеим.
      if(_id) {
        getResume(_id) // Получаем id и меняем состояние.
      }
    }, [_id]) // id это зависимость.

    useEffect(() => {
      if(pathname?.includes("/resume/create")) {
        setResume(initialState) // Если мы находимся на resume/createБ
        // то резюме переходит в начальное состояние
        setStep(1) // Автоматически на первом шагу.
      }
    }, [pathname]) // pathname-зависимость.

    useEffect(() => {
      getUserResumes() // Используем GetUserResumes функцию для получения резюме.
    }, [])

    const saveResume = async () => { // Асинхронная функция для DB.
      try {
        const data = await saveResumeToDb(resume) // Вызываем функцию вместе с пропом резюме
        setResume(data)
        localStorage.removeItem('resume') // Удаляем резюме из локального хранилища при сохранении.
        toast.success("Resume saved!Move to another step✅")
         router.push(`dashboard/resume/edit/${data._id}`)
         setStep(2)// Меняем состояние и переходим на страницу редакции
      } catch(err) {
        console.error(err)
        toast.error("Failed to save resume❎")
      }
    }

    const getUserResumes = async () => { // Получаем резюме из БД с помощью GET.
      try {
        const data = await getUserResume() // Вызываем функцию из Actions
        setResumes(data)
      } catch(err) {
        console.log("Failed to get resumes")
        toast.error("Failed to get resumes")
      }
    }

    const getResume = async () => { // Получаем резюме с базы данных.
      try {
        const data = await getResumeFromDb(_id)
        setResume(data)
      } catch(err) {
        toast.error('Failed to get resume')
      }
    }

    const updateResume = async () => { // Редактируем резюме и обновляем.UPDATE
      try {
        const data = await updateResumeFromDb(resume)
        setResume(data) // Добавляем информацию в резюме.Сохраняем в таком виде.
        toast.success("Resume updated.") // Уведомление об успехе.
      } catch(err) {
        console.error(err)
        toast.error("Failed to Update resume.")
      }
    }


    // experience
    const updateExperience = async(experienceList) => { // Функция вызывается в Submit.
      try {
        const data = await updateExperienceToDb({...resume, experience: experienceList}) // Обновляем опыт работы в DB.
        setResume(data) // Обновляем данные.
        toast.success("Succesfully updated experience!")
      } catch(err) {
        console.error(err)
        toast.error("Failed to update experience")
      }
    }
    // Для опыта работы и обновления резюме.
    useEffect(() => {
      if(resume.experience) {
        setExperienceList(resume.experience)
      }
    }, [resume])

    const handleExperienceChange = (e, index) => { // Event handler для изменения опыта работы.
      const newEntries = [...experienceList]
      const { name, value } = e.target 
      newEntries[index][name] = value
      setExperienceList(newEntries) // Обновляем значение опыта работы новой переменной.
    }

    const handleExperienceSubmit = () => { // Event handler для отправки опыта в БД.
      updateExperience(experienceList)
      setStep(4)
    }

    const addExperience = () => { // Добавление опыта работы. Create операция.
      const newExperience = { ...experienceField}
      setExperienceList([...experienceList, newExperience])
      setResume((prevState) => ({ // Обновляем резюме и сохраняем прошлое состояние.
        ...prevState,
        education: [...experienceList, newExperience],
      }))
    }

    const removeExperience = () => { // Удаление опыта работы.Delete функция.
    if(experienceList.length === 1 ) return // Мы не можем удалить единственный опыт работы.
    const newEntries = experienceList.slice(0, experienceList.length - 1)  // Слайсим все элементы кроме последнего.
    setExperienceList(newEntries) // Обновляем Experience List новым переменным.
    // Обновить БД.
    updateExperience(newEntries) // Обновляем опыт работы.
    }

    const handleExperienceGenerateWithAi = async (index) => { // Асинхронный Event Handler для запросов в Gemini.
      setExperienceLoading((prevState) => ({ ...prevState, [index]: true})) // На основе индекса состояние меняется.

      const selectedExperience = experienceList[index] // Выбираем опыт работы.
      if(!selectedExperience || !selectedExperience.title){ // Мы не можем отправить промпт если нету Job Title.
        toast.error("Please enter the job title.") 
        setExperienceLoading((prevState) => ({ ...prevState, [index]: false }))
        return
      }
      const jobTitle = selectedExperience.title // Выбираем Job title.
      const jobSummary = selectedExperience.summary || ""

      try { // Отправляем асинхронный запрос в Gemini.
        const responce = await runAi(`Generate a list of duties and responsibilities in HTML bullet points for the job title "${jobTitle}" ${jobSummary}`)
        // Функция runAi и prompt для запроса.
        const updatedExperienceList = experienceList.slice() // 
        updatedExperienceList[index] = { ...selectedExperience, summary: responce}

        setExperienceList(updatedExperienceList) // Обновляем опыт работы с помощью нового переменного.
        setResume((prevState) => ({ // Обновляем резюме новой информацией и состоянием.
          ...prevState,
          experience: updatedExperienceList,
        }))
      } catch(err) {
      console.error(err) // При ошибке выводим тост с ошибкой.
      toast.error("Failed to generate job description")  
      } finally {
        setExperienceLoading((prevState) => ({ ...prevState, [index]: false }))
      }
    }

    // Education section
    useEffect(()=> {
      if (resume.education) {
        setEducationList(resume.education)
      }
    },[resume])

    const updateEducation = async (educationList) => { // Асихронная функция для обновления образования<div className=""></div>
      try {
        const data = await updateEducationToDb({ // Вызываем функцию из actions для обновления в БД.
          ...resume, // Параметры что обрабатываются функцией из другого модуля.
          education: educationList
        })
        setResume(data) // Обновляем резюме с новой информацией.
        toast.success("Education updated.")
      } catch(err) {
        console.error(err)
        toast.error("Failed to update education.")
      }
    }

    const handleEducationChange = (e, index) => { // Изменение данных об образовании через переменную.Как в опыте.
      const newEntries = [...educationList]
      const { name, value } = e.target 
      newEntries[index][name] = value
      setEducationList(newEntries)
    }

    const handleEducationSubmit = () => { // Функция Submit-а,что обновляет данные в БД.
      updateEducation(educationList)
      setStep(5) // Навигируем на след. шаг.
    }

    const addEducation = () => { // Добавление образования. Create операция.
      const newEducation = { ...educationField}
      setEducationList([...educationList, newEducation])
      setResume((prevState) => ({ // Обновляем резюме и сохраняем прошлое состояние.
        ...prevState,
        education: [...educationList, newEducation],
      }))
    }

    const removeEducation = () => { // Удаление образования.Delete запрос.
    if(educationList.length === 1 ) return // Мы не можем удалить единственный degree.
    const newEntries = educationList.slice(0, educationList.length - 1)  // Слайсим все элементы кроме последнего.
    setEducationList(newEntries) // Обновляем Education List новым переменным.
    // Обновить БД.
    updateEducation(newEntries)
    }

    // Skills context.
    useEffect(() => {
      if(resume.skills) {
        setSkillsList(resume.skills) // Обновляем Skill лист.
      }
    }, [resume])

    const updateSkills = async (skillsList) => { // Асинхронная функция для обновления навыков
      // Добавляем валидацию навыков
        const invalidSkills = skillsList.filter(
          (skill) => !skill.name || !skill.level) 
          // Инициализируем неправильные скиллы,в которых не указаны параметры name и level.
        if(invalidSkills.length > 0) {
          toast.error("Please,fill the special areas of skills.") // Выводим ошибку.
          return // Выдаем ошибку если чего то не хватает в Input.
        }
        try {
          const data = await updateSkillsToDb({
            ...resume, // Деструктурируем резюме.
            skills: skillsList
          }) // Обновляем навыки
          setResume(data)
          toast.success("Skills succesfully updated!") 
        } catch(err) {
          console.error(err)
          toast.error("Failed to update skills.")
      }
    }

    const handleSkillsChange = (e, index) => { // Функция для изменения навыков.
      const newEntries = [...skillsList]
      const { name, value } = e.target 
      newEntries[index][name] = value
      setSkillsList(newEntries)
    }

    const handleSkillsSubmit = () => { // Функция для обновления навыков и навигацией в страницу загрузки.
      updateSkills(skillsList)
      router.push(`/dashboard/resume/download/${resume._id}`) // Роутинг в другую страницу.
    }

    const addSkill = () => { // Добавление навыка.
      const newSkill = { ...skillField}
      setSkillsList([...skillsList, newSkill])
      setResume((prevState) => ({ // Обновляем резюме и сохраняем прошлое состояние.
        ...prevState,// Предыдущее состояние.
        skills: [...skillsList, newSkill], // обновление навыков.
      }))
    }

    const removeSkill = () => {
      if(skillsList.length === 1 ) return // Мы не можем удалить единственный добавленный навык.
      const newEntries = skillsList.slice(0, skillsList.length - 1)  // Слайсим все элементы кроме последнего.
      setSkillsList(newEntries) // Обновляем Skills List новым переменным.
      // Обновить БД.
      updateSkills(newEntries) // Обновляем навыки вызывая функцию updateSkills
    }

  const deleteResume = async (_id) => { // Асинхронная функция удаления резюме из Dashboard-а по id.
      try {
        await deleteResumeFromDb(_id) // Функция из серверных контроллеров.
        setResumes(resumes.filter((resume) => resume.id !== _id)) // Хук контекста
        toast.success("Resume deleted.") // Уведомление из React hot toast.
    } catch(err) {
      console.error(err)
      toast.error("Failed to delete resume")
    }
  }

  return (
    /* Context Provider с функциями и переменными что импортируются */
    <ResumeContext.Provider value={{ 
      step, 
      setStep, 
      resume, 
      setResume, 
      saveResume, 
      resumes,
      updateResume,
      experienceList,
      experienceLoading,
      handleExperienceChange,
      handleExperienceSubmit,
      addExperience,
      removeExperience,
      handleExperienceGenerateWithAi,
      educationList,
      handleEducationChange,
      handleEducationSubmit,
      addEducation,
      removeEducation,
      skillsList,
      handleSkillsChange,
      handleSkillsSubmit,
      addSkill,
      removeSkill,
      deleteResume
      }}
      >
        {children}
        </ResumeContext.Provider>
  )
}

export const useResume = () => React.useContext(ResumeContext)

export default ResumeProvider