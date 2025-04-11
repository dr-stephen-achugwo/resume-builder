"use server"
import db from "@/utils/db"
import Resume from "@/models/resume"
import { currentUser } from "@clerk/nextjs/server"

const checkOwnership = async (resumeId) => { // Проверяем придналежит ли резюме пользователю.
    try {
        // Ищем currentUser через Clerk
        const user = await currentUser()
        const userEmail = user?.emailAddresses[0]?.emailAddress
        if(!userEmail) {
            throw new Error("Resume not found.")
        }
        // ищем резюме по id
        const resume = await Resume.findById(resumeId)
        if(!resume) {
            throw new Error("Resume not found.")
        }
        // Проверяем,придналежит ли резюме пользователю через авторизацию.
        if(resume.userEmail !== userEmail) {
            throw new Error("Unathorized.")
        }
        return true
    } catch(err) {
        throw new Error(err);
    }
}

// Асинхронное создание резюме в БД.
export const saveResumeToDb = async(data) => { 
    try {
        db()
        const user = await currentUser()
        const userEmail = user?.emailAddresses[0]?.emailAddress

        const {_id, ...rest} = data

        const resume = await Resume.create({...rest, userEmail})
        return JSON.parse(JSON.stringify(resume))
    } catch(err) {
        throw new Error(err)
    }
}

export const getUserResume = async () => { // Функция для нахождения резюме пользователей по ID
    try {
        db()
        const user = await currentUser()
        const userEmail = user?.emailAddresses[0]?.emailAddress

        const resumes = await Resume.find({userEmail})
        return JSON.parse(JSON.stringify(resumes))
    } catch(err) {
        throw new Error(err)
    }
}

export const getResumeFromDb = async (_id) => {
    try {
        db()
        const resume = await Resume.findById(_id)
        return JSON.parse(JSON.stringify(resume)) 
    } catch(err) {
        throw new Error
    }
}

export const updateResumeFromDb = async (data) => {
    try {
        db()
        const { _id, ...rest } = data 

        // Проверяем принадлежность вызывая функцию 
        await checkOwnership(_id)

        const resume = await Resume.findByIdAndUpdate(
            _id,
            { ...rest },
            { new: true }
        ) 
        return JSON.parse(JSON.stringify(resume))
    }
    catch(err) {
        throw new Error(err)
    }
}

export const updateExperienceToDb = async (data) => { // Функция для обновления резюме.
    try {
        db() // Вызываем DB специальным методом.
        const {_id, experience} = data
        await checkOwnership(_id) // Проверяем,придналежит ли Резюме User-у.

        const resume = await Resume.findByIdAndUpdate( // Находим резюме по ID и обновляем с помощью функции.
            _id,
            { experience },
            { new: true }
        )
        return JSON.parse(JSON.stringify(resume)) // Возвращаем и превразаем в строку.
    } catch(err) {
        throw new Error(err)
    }
}

export const updateEducationToDb = async (data) => {
    try {
        db() // Вызываем DB специальным методом.
        const {_id, education} = data
        await checkOwnership(_id) // Проверяем,придналежит ли Резюме User-у.

        const resume = await Resume.findByIdAndUpdate( // Находим резюме по ID и обновляем с помощью функции.
            _id,
            { education },
            { new: true }
        )
        return JSON.parse(JSON.stringify(resume)) // Возвращаем и превразаем в строку.
    } catch(err) {
        throw new Error(err)
    }
}

export const updateSkillsToDb = async (data) => { // Точно такая же асинхронная функция для Skills.
    try {
        db() // Вызываем DB специальным методом.
        const {_id, skills} = data
        await checkOwnership(_id) // Проверяем,придналежит ли Резюме User-у.

        const resume = await Resume.findByIdAndUpdate( // Находим резюме по ID и обновляем с помощью функции.
            _id,
            { skills },
            { new: true }
        )
        return JSON.parse(JSON.stringify(resume)) 
    } catch (err) {
        throw new Error(err)
    }
}

export const deleteResumeFromDb = async (_id) => { // Функция удаления резюме.
    try {
        db() // Вызываем DB специальным методом.
        await checkOwnership(_id) // Проверяем,придналежит ли Резюме User-у.

        const resume = await Resume.findByIdAndDelete(_id) // Находим резюме по ID и удаляем с помощью функции.
        return JSON.parse(JSON.stringify(resume)) 
    } catch (err) {
        throw new Error(err)
    }
}