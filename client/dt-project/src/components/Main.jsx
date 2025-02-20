import React, {use, useState} from 'react'
import RecommendedChallenges from './RecommendedChallenges'
import OtherChallenges from './OtherChallenges'

const Main = ({ challenges }) => {
  const [filterArea, setFilterArea] = useState("")
  const [filterLanguage, setFilterLanguage] = useState("")
  const [filterDifficulty, setFilterDifficulty] = useState("")
  const [filterValues, setFilterValues] = useState({})

  const handleClick = () => {
    setFilterValues({
      area: filterArea,
      language: filterLanguage,
      difficulty: filterDifficulty
    })
  }

  return (
    <main className=' min-h-screen'>
        <div className='bg-white rounded-2xl w-[80%] mx-auto mt-20 p-4 flex'>
          <div className='flex flex-col w-[75%]'>
            <RecommendedChallenges challenges={challenges}/>
            <OtherChallenges filters={filterValues}/>
          </div>
          <div className=' bg-gray-100 shadow-xl rounded-2xl w-[20%] p-3 ml-10 mt-10 h-85 sticky top-10'>
            <div className='border-b'>
              <h1 className='text-lg font-semibold text-center'>Filtrar</h1>
            </div>
            <div className=' flex flex-col gap-2 mt-5'>
              <h1 className='mt-2'>Area</h1>
              <select className='w-full border rounded-md'
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value)}
              >
                <option value=""></option>
                <option value="Frontend">Front-End</option>
                <option value="Backend">Back-End</option>
                <option value="Fullstack">Fullstack</option>
              </select> 
              
              <h1 className='mt-2'>Linguagem</h1>
              <select className='w-full border rounded-md'
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
              >
              <option value=''></option>
                <option value='python'>Python</option>
                <option value='javascript'>JavaScript</option>
                <option value='java'>Java</option>
                <option value='csharp'>C#</option>
              </select> 
              
              <h1 className='mt-2'>Dificuldade</h1>
              <select className='w-full border rounded-md'
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
              >
                <option value=""></option>
                <option value="Fácil">Fácil</option>
                <option value="Médio">Médio</option>
                <option value="Difícil">Difícil</option>
              </select> 
            </div>
            <div className='text-center'>
              <button className="`w-32 font-bold mt-4 py-1 px-4 shadow-2xl rounded-md transition bg-yellow-500 text-gray-800 hover:bg-yellow-700 hover:text-gray-200 cursor-pointer"
              type='button'
              onClick={handleClick}
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>
    </main>
  )
}

export default Main