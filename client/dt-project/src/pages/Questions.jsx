import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Questions = () => {
  const [languageInSystem, setLanguageInSystem] = useState([])
  const [experience, setExperience] = useState("");
  const [language, setLanguage] = useState("");
  const [challenges, setChallenges] = useState("");
  const [step, setStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false); 
  const navigate = useNavigate();
  const totalSteps = 4;
  const progress = ((step - 1) / (totalSteps - 2)) * 70 + 5;

  useEffect(() => {
    const getRegisteredLanguages = async () => {
      try {
        const response = await fetch('http://localhost:3000/languages')

        if(response.ok){
          const result = await response.json()
          setLanguageInSystem(result)
        }
      } catch(error) {
        console.log(error)
      }
    }

    getRegisteredLanguages()
    }, [])
    

  const handleStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericExperience = Number(experience);
    const answers = {
      answer1: numericExperience,
      answer2: language,
      answer3: challenges,
    };

    try {
      const response = await fetch('http://localhost:3000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        const result = await response.json();
        
        setIsExiting(true);

        setTimeout(() => {
          navigate('/home', { state: { challenges: result } });
        }, 600); 
      } else {
        console.log("Falha ao enviar os dados", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-gray-700 flex flex-col items-center justify-center min-h-screen'>
      <div className="mb-10 text-7xl font-bold text-yellow-500">
        <span className="text-white">{'{'}</span>
        <span className="text-green-600">DT</span>
        <span className="text-white">:</span>
        <span className="text-yellow-500">Agora</span>
        <span className="text-white">{'}'}</span>
      </div>
      <AnimatePresence mode='wait'>
        {!isExiting && (
          <motion.form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 border-3 border-yellow-600 p-6 w-[40%] bg-white shadow-2xl rounded-2xl overflow-hidden h-110'
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
        
          <h2 className='text-3xl font-bold text-center text-blue-900 mb-4 border-b-2 border-blue-500 pb-3'>
              Procurando desafios
              <motion.span
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.5, 1], delay: 0.2 }}
              >
                .
              </motion.span>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.5, 1], delay: 0.4 }}
              >
                .
              </motion.span>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.5, 1], delay: 0.6 }}
              >
                .
              </motion.span>
            </h2>


            <div className='w-full bg-gray-300 h-5 rounded-full overflow-hidden relative'>
              <motion.div
                className='bg-yellow-500 h-full'
                initial={{ width: '10%' }}
                animate={{ width: isExiting ? '100%' : `${progress}%` }} 
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }} 
              />
              <span className='absolute inset-0 flex justify-center items-center text-sm font-bold text-white'>
                {step - 1} / {totalSteps - 1}
              </span>
            </div>

            <AnimatePresence mode='wait'>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {step === 1 && (
                  <fieldset>
                    <div className='flex flex-col h-50'>
                      <legend className='text-xl border-b-2 border-blue-200'>
                        A quanto tempo você está na área de desenvolvimento?
                      </legend>
                      {[
                        { value: '0', label: 'Menos de 1 ano' },
                        { value: '1', label: '1 a 2 anos' },
                        { value: '3', label: '3 a 5 anos' },
                        { value: '6', label: '6 a 10 anos' },
                        { value: '11', label: 'Mais de 10 anos' },
                      ].map((option, index) => (
                        <label key={index} className='pt-3'>
                          <input
                            type='radio'
                            name='experience'
                            value={option.value}
                            onChange={(e) => setExperience(e.target.value)}
                            className='accent-yellow-400'
                          />{' '}
                          {option.label}
                        </label>
                      ))}
                    </div>
                    <div className='flex justify-end mt-4'>
                      <button
                        type='button'
                        className={`w-32 font-bold mt-4 py-2 px-4 rounded-md transition ${
                          experience
                            ? "bg-yellow-500 text-gray-800 hover:bg-yellow-700 hover:text-gray-200 cursor-pointer"
                            : "bg-gray-400 text-gray-600 opacity-50 cursor-not-allowed"
                        }`}
                        onClick={handleStep}
                        disabled={!experience}
                      >
                        Confirmar
                      </button>
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset>
                    <div className='flex flex-col h-50'>
                      <legend className='text-xl border-b-2 border-blue-200'>
                        Qual é a sua linguagem dominante?
                      </legend>
                      <select
                        name='language'
                        onChange={(e) => setLanguage(e.target.value)}
                        className='border border-blue-400 rounded-md mt-3 w-full p-2'
                      >
                        <option value=''>Selecionar</option>
                        {languageInSystem.map((languageName) => (
                          <option value={languageName.language}>{languageName.language}</option>
                        ))}
                      </select>
                    </div>
                    <div className='flex justify-end mt-4'>
                      <button
                        type='button'
                        className={`w-32 font-bold mt-4 py-2 px-4 rounded-md transition ${
                          language
                            ? "bg-yellow-500 text-gray-800 hover:bg-yellow-700 hover:text-gray-200 cursor-pointer"
                            : "bg-gray-400 text-gray-600 opacity-50 cursor-not-allowed"
                        }`}
                        onClick={handleStep}
                        disabled={!language}
                      >
                        Confirmar
                      </button>
                    </div>
                  </fieldset>
                )}

                {step === 3 && (
                  <fieldset>
                    <div className='flex flex-col h-50'>
                      <legend className='text-xl border-b-2 border-blue-200'>
                        Já fez desafios técnicos em entrevistas reais?
                      </legend>
                      {['sim', 'não', 'ja tentei'].map((value, index) => (
                        <label key={index} className='pt-3'>
                          <input
                            type='radio'
                            name='challenges'
                            value={value}
                            onChange={(e) => setChallenges(e.target.value)}
                            className='accent-yellow-400'
                          />{' '}
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </label>
                      ))}
                    </div>
                    <div className='flex justify-end mt-4'>
                      <button
                        type='submit'
                        className={`w-32 font-bold mt-4 py-2 px-4 rounded-md transition ${
                          challenges
                            ? "bg-yellow-500 text-gray-800 hover:bg-yellow-700 hover:text-gray-200 cursor-pointer"
                            : "bg-gray-400 text-gray-600 opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!challenges}
                      >
                        Enviar
                      </button>
                    </div>
                  </fieldset>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Questions;
