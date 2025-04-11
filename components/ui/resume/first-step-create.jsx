import React from 'react'
import { Button } from '@/components/ui/button'
import  { Input } from '@/components/ui/input'
import { useResume } from '@/context/resume'
import { useUser, SignInButton } from '@clerk/nextjs'

const FirstStepCreate = () => {
  // adding the context 
  const { resume, setResume, saveResume } = useResume()

 // Хуки для проверки аутентификации
 const { isSignedIn } = useUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    saveResume()
    // update resume
    // Sending resume as form data to DB 
    // Navigating to next step component
  }

  // Функция сохраняющая значения инпутов при логине
  const handleChange = e => {
    const {name, value } = e.target

    // Обновляем состояние резюме
    setResume((prevState) => { 
    const updatedResume = {...prevState, [name]: value }
    // сохраняем обновленное резюме в Local storage браузера
    localStorage.setItem('resume', JSON.stringify(updatedResume))
    return updatedResume
  })
  }

  return (
    // Form card
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
    <h2 className="text- 2x1 font-bold mb-5">Personal Information</h2>
    <form onSubmit={handleSubmit}>
    <Input name="name" className="mb-3" 
    onChange={handleChange}
    value={resume.name}
    placeholder="Your name"
    type="text"
    autoFocus
    required
    />
        <Input name="job" className="mb-3" 
    onChange={handleChange}
    value={resume.job}
    placeholder="Your company"
    type="text"
    autoFocus
    required
    />
       <Input name="address" className="mb-3" 
    onChange={handleChange}
    value={resume.address}
    placeholder="Your address"
    type="text"
    autoFocus
    required
    />
       <Input name="phone" className="mb-3" 
    onChange={handleChange}
    value={resume.phone}
    placeholder="Phone number"
    type="number"
    autoFocus
    required
    />
       <Input name="email" className="mb-3" 
    onChange={handleChange}
    value={resume.email}
    placeholder="Your email"
    type="text"
    autoFocus
    required
    />

    <div className="flex justify-end">
    {!isSignedIn ? (<SignInButton>
      <Button>
        Sign in to save
      </Button>
    </SignInButton>) : (
      <Button onClick={handleSubmit}>Save</Button>
      )} 
    </div>
    </form>
   </div>
  )
}

export default FirstStepCreate
