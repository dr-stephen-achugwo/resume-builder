import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useResume } from '@/context/resume'
import { Button } from '@/components/ui/button'
import { Brain, Loader2Icon } from 'lucide-react'
import { runAi } from '@/actions/gemini'
import toast from 'react-hot-toast'

const SecondStep = () => {
  // контекст
  const {resume, setResume, updateResume, setStep } = useResume() // Тут вызываются функции из useResume контекста.
  // локальное состояние
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => { // Сабмит хэндлер с информацией.
    e.preventDefault()
    updateResume() // Сохраняем резюме.
    setStep(3) // Сохраняем резюме и переходим на 3 шаг.
  }

  const handleGenerate = async () => { // Асинхронный Event Handler для геренации резюме.
    setLoading(true) // Меняем состояние при нажатии.
    if(!resume.job) {
      toast.error("Please,fill the information form and write more about yourself.")
      setLoading(false)
      return
    }

    const responce = await runAi(`Generate a resume summary with following details: ${JSON.stringify(
      resume // Переводим все в JSON формат и строку для запроса в Gemini.
    )}` // Вызываем ответ от Gemini.
  )
  setResume({ ...resume, summary: responce}) // Summary это ответ из gemini.js.
  setLoading(false)
  }

  return (
  <div 
    className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <div className="flex-justify-between">
      <h2 className="text-2xl font-bold mb-5" style={{color: resume.themeColor}}>Summary</h2>  

      <Button 
      variant="destructive" 
      onClick={handleGenerate} 
      disabled={loading}
      >
        { loading ? ( 
          <Loader2Icon size={18} className="mr-2 animate-spin" />
          ) : ( 
          <Brain size={18} className="mr-2" /> 
          )}
        Click to Generate!
      </Button>
      </div>

     <Textarea 
        onChange={e => setResume({ ...resume,summary:e.target.value })}
        value={resume.summary}
        className="mb-3"
        placeholde="Write a Little description of yourself."
        rows="10"
        required
        />

        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Next</Button>
        </div>  
  </div>
  )
}

export default SecondStep
