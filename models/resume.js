import mongoose,{Schema, model } from 'mongoose'

// Модель для опыта работы
const ExerienceSchema = new Schema ({
    title: String,
    company: String,
    address: String,
    startDate: String,
    endDate: String,
    summary: String
})

// Схема для образования
const EducationSchema = new Schema ({
    name: String,
    address: String,
    qualification: String,
    year: String,
})

// Схема для навыков
const SkillSchema = new Schema ({
    name: String,
    level: String
})

//Создаем модель резюме,для отправления в БД.
const ResumeSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    title: String,
    name: String,
    job: String,
    address: String,
    phone: String,
    email: String,
    themeColor: String,
    summary: String,
    experience:[ExerienceSchema],
    education: [EducationSchema],
    skills:[SkillSchema],
},
{timestamps: true}
)

const Resume = mongoose.models.Resume || model("Resume", ResumeSchema)
export default Resume