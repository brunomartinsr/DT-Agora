import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { validateEmail } from "../utils/validators"

const Signup = () => {

  const [userName, setUserName] = useState("")
  const [emailData, setEmailData] = useState("")
  const [passwordData, setPasswordData] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async () => {
      
      if(!validateEmail(emailData)){
        alert("Email inválido")
        return
      }
      
      const registerData = {
        userName: userName,
        userEmail: emailData,
        userPassword: passwordData
      }
  
      console.log(registerData)
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData),
        });
  

        if(response){
          alert("Usuário cadastrado com sucesso")

          setTimeout(() => {
            navigate('/login')
          }, 600)
        }
        else {
          alert("Insira informações válidas")
        }
      }
      catch (error){
        console.log(error)
      }
    }

  return (
    <div className='bg-gray-900 min-h-screen flex items-center justify-center'>
      <div className='bg-gray-600 w-[60%] h-140 flex rounded-2xl'>
        <fieldset className='w-[50%] h-[100%] flex flex-col items-center justify-center'>
          <h1 className="text-4xl mb-10 text-yellow-300 font-bold">Cadastrar-se</h1>
          <div className='bg-white flex flex-col h-100 w-[70%] mx-auto pt-10 px-5 rounded-2xl shadow-2xl'>
          <label htmlFor="email" className="text-xl">Nome</label>
            <input 
            type="text" 
            id="name" 
            placeholder="Digite o seu nome" 
            className='bg-gray-200 border-gray-800 h-8 rounded-xl'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />

            <label htmlFor="email" className="mt-5 text-xl">E-mail</label>
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
              Cadastrar
            </button>
            <div id="googleSignInDiv" className="mt-5 flex justify-center"></div>
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