import React from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {useResume} from '@/context/resume'
import { ArrowRight, Plus, X, Loader2Icon, Brain } from 'lucide-react'

// Третий шаг с Опытом работы.
const ThirdStep = () => {
  const {
    experienceList,
    experienceLoading,
    handleExperienceChange,
    handleExperienceSubmit,
    addExperience,
    removeExperience,
    handleExperienceGenerateWithAi
  } = useResume() // С помощью контекста передаем нужные функции в компоненты страницы.
  
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Experience</h2>

      {experienceList?.length > 0 && experienceList?.map((experience, index) => (
        <div key={index} className="mb-10">
          <Input /* Название компании */
          name="title" 
          type="text" 
          placeholder="Job title" 
          onChange={(e) => handleExperienceChange(e, index)} 
          value={experience.title}
          className="mb-3"
          />
          <Input /* Название компании */
          name="company" 
          type="text" 
          placeholder="Company name" 
          onChange={(e) => handleExperienceChange(e, index)} 
          value={experience.company}
          className="mb-3"
          />
          <Input /* Адрес Компании */
          name="address" 
          type="text" 
          placeholder="Work address" 
          onChange={(e) => handleExperienceChange(e, index)} 
          value={experience.address}
          className="mb-3"
          />
         <Input /* Компонент Input о начале работы в компании */
          name="StartDate" 
          type="text" 
          placeholder="Date of Start" 
          onChange={(e) => handleExperienceChange(e, index)} 
          value={experience.startDate}
          className="mb-3"
          />
          <Input  /* Дата конца работы в компании */
          name="endDate" 
          type="text" 
          placeholder="Date of Leaving" 
          onChange={(e) => handleExperienceChange(e, index)} 
          value={experience.endDate}
          className="mb-3"
          />
          <div className="fles justify-end"> 
            <Button 
            variant="destructive" 
            onClick={() => handleExperienceGenerateWithAi(index)}
            disabled={experienceLoading[index]}>
              {experienceLoading[index] ? (
                <Loader2Icon size={18} className="mr-2" /> 
              ) : (
                  <Brain size={18} className="mr-2" />
              )}
              Generate with Ai
              </Button> 
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-3">
        <Button variant="outline" onClick={addExperience}>
          <Plus size={18} className="mr-2" /> Add
        </Button>

        {experienceList?.length > 1 && (
           <Button variant="outline" onClick={removeExperience}>
           <X size={18} className="mr-2" /> Remove
         </Button>
        )}
        
        <Button variant="outline" onClick={handleExperienceSubmit}>
           <ArrowRight size={18} className="mr-2" /> Next
         </Button>
      </div>
    </div>
  )
}

export default ThirdStep
