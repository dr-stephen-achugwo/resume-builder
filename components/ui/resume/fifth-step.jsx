import React from 'react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { ArrowRight, Plus, X} from 'lucide-react' // Компоненты и иконки.
import { useResume } from '@/context/resume' // Контекст для хранения резюме.

const FifthStep = () => {
  const {
    skillsList,
    handleSkillsChange,
    handleSkillsSubmit,
    addSkill,
    removeSkill
  } = useResume() // Контекст и функции импортируемые из UseResume.

  const skillLevels = [ // Уровни навыков с названиями.
    {label: 'Beginner', value: 1},
    {label: 'Basic', value: 2},
    {label: 'Intermediate', value: 3},
    {label: 'Advanced', value: 4},
    {label: 'Expert', value: 5}
  ]
  
  return (
    /* Div с карточкой добавления навыков и удаления навыков. */ 
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Skills</h2>
      {skillsList?.length > 0 && 
       skillsList?.map((skill, index) => (
        <div key={index} className="mb-10">
       <Input   
        name="name" 
        type="text" 
        placeholder="Skill name" 
        value={skill.name} 
        onChange={(e)=> handleSkillsChange(e, index)}
        className="mb-3" 
        autoFocus /* Skill name компонент. */
       /> 
        <div className="flex space-x-2">
          {skillLevels.map((level) => ( /* Button компонент с информацией о уровне и индексом. */
            <Button
            key={level.value}
            variant={skill.level === level.value ? "secondary" : "link" }
            onClick={() => 
              handleSkillsChange(
                {target: { name: "level", value: level.value} }, 
                index
              )
            }
            >
              {level.label}
            </Button>
          ))}
          </div>
       </div>
      ))}
      <div className="flex justify-between mt-3">
          <Button variant="outline" onClick={addSkill}>
             <Plus size={18} className="mr-2" /> Add
          </Button>

            {skillsList?.length > 1 && (
              <Button variant="outline" onClick={removeSkill}>
                <X size={18} className="mr-2" /> Remove
            </Button>
            )}

            <Button variant="outline" onClick={handleSkillsSubmit}>
              <ArrowRight size={18} className="mr-2" /> Next
            </Button>
       </div>
    </div>
  )
}
          

export default FifthStep
