import React from 'react' // Компонент персональной информации в карточке Resume.
// Мы используем пропсы резюме модели,которые есть в базе данных в этой функции и показываем их.
//Дальше экспортируем в Resume Card.

const PersonalDetails = ({resume}) => {
    // В каждой из элементов отображается один параметр резюме модели.
  return (
    <>
    <h2 className="font-bold text-xl text-center" 
    style={{ color: resume.themeColor}}
    >
        {resume.name}
    </h2>
    <h2 className="text-center text-sm font-medium">{resume.job}</h2>
    <h2 className="text-center text-sm font-medium">{resume.address}</h2>

    <div className="flex justify-between">
        <h2 className="font-normal text-xs">{resume.phone}</h2> 
        <h2 className="font-normal text-xs">{resume.email}</h2>
    </div>

    <hr className="border-[1.5px] my-2" 
    style={{bordercolor: resume.themeColor}}
    />
    </>
  )
}

export default PersonalDetails
