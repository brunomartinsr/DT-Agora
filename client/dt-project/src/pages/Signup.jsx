import React from 'react'

const Signup = () => {
  return (
    <div className='bg-gray-900 min-h-screen flex items-center justify-center'>
      <div className='bg-gray-600 w-[60%] h-140 flex rounded-2xl'>
        <fieldset className='w-[50%] h-[100%] flex flex-col items-center justify-center'>
          <h1 className="text-5xl mb-10 text-yellow-300 font-bold">Login</h1>
          <div className='bg-white flex flex-col h-100 w-[70%] mx-auto pt-10 px-5 rounded-2xl shadow-2xl'>
            <label htmlFor="email" className="text-xl">Login</label>
            <input 
            type="text" 
            id="email" 
            placeholder="Digite o seu e-mail" 
            className='bg-gray-200 border-gray-800 h-8 rounded-xl'
            value={emailData}
            onChange={(e) => setEmailData(e.target.value)}
            />

            <label htmlFor="password" className="mt-5 text-xl">Senha</label>
            <input 
            type="password" 
            id="password" 
            placeholder="Digite a senha" 
            className='bg-gray-200 border-gray-800 h-8 rounded-xl'
            value={passwordData}
            onChange={(e) => setPasswordData(e.target.value)}
            />

            <button
              type='button'
              className='w-[90%] font-bold mt-10 mx-auto py-2 px-4 rounded-md transition shadow-2xl bg-yellow-500 text-gray-800 hover:bg-yellow-700 hover:text-gray-200 cursor-pointer'
              onClick={handleSubmit}
            >
              Entrar
            </button>
            <div id="googleSignInDiv" className="mt-5 flex justify-center"></div>
            <a href="./Signup.jsx" className="mt-3 mx-auto text-amber-600 underline hover:text-amber-400">Cadastrar-se</a>
          </div>
        </fieldset>

        <fieldset className="bg-gray-700 rounded-r-2xl w-[50%]">
          <h1 className="logo font-sans font-bold text-4xl flex flex-col relative mt-20">
            <span className="text-white text-7xl ml-15 mb-4">{'{'}</span>
            <span className="text-green-600 text-9xl ml-20">DT</span>
            <span className="text-yellow-500 text-7xl ml-30">Agora</span>
            <span className="text-white text-7xl ml-15">{'}'}</span>
          </h1>
        </fieldset>
        
      </div>
    </div>

  )
}

export default Signup