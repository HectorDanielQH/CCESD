import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import imagenfondo from "../assets/images/login.jpeg";
export default function PaginaLogin(){
    const {
        register,
        handleSubmit,
        formState:{errors}
    }=useForm();

    const {
        singin , 
        isAuthenticated,
        errors: signInErrors
    }=useAuth();

    const navegacion=useNavigate();

    useEffect(()=>{
        if(isAuthenticated)
            navegacion('/dashboard');
    },[isAuthenticated]);

    const onSubmit= handleSubmit(async (data)=>{
        singin(data)
    })

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-black bg-opacity-75">
            <div className="-z-10 fixed w-screen blur-sm">
                <img src={imagenfondo} className="w-screen" alt="fondo" />
            </div>
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                {
                    (signInErrors).map((error,i) => (
                        <div key={i} className="bg-red-500 p-2 mb-4 text-white">
                            {i} - {error}
                        </div>
                    ))
                }
                <div className="text-2xl font-bold text-gray-200 mb-4 flex justify-between flex-row-reverse"> 
                    <h1>
                        Login
                    </h1> 
                    <Link to={'/'} className="cursor-pointer transition-all 
                        bg-gray-700 text-white px-6 py-2 rounded-md
                        border-green-400
                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-sm">
                        Volver
                    </Link>
                </div>

                <form className="flex flex-col" onSubmit={onSubmit}>
                    <input type="email"
                        {...register('email',{required:true})}
                        className="w-full bg-zinc-700 my-2 text-black px-4 py-2 rounded-sm"
                        placeholder="Email"
                    />
                    {
                        errors.username && <p className="text-red-500">Email es requerido</p>
                    }
                    <input type="password" 
                        {...register('password',{required:true})}
                        className="w-full bg-zinc-700 my-2 text-black px-4 py-2 rounded-sm"
                        placeholder="Password"
                    />
                    {
                        errors.username && <p className="text-red-500">Password es requerido</p>
                    }
                    <button type="submit" className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150">Iniciar Sesión</button>
                </form>

                <div className="flex justify-between mt-4">
                    <p>
                        <span className="text-sm text-gray-400 hover:underline" >Registrarme </span> <Link to={'/register'} className="text-sky-500"> aquí </Link>
                    </p>
                    <ul>
                        <li className="list-disc">
                            Administrador
                            <ul>
                                <li>Usuario: juan@gmail.com</li>
                                <li>Contraseña: 123456789</li>
                            </ul>
                        </li>
                        <li className="list-disc">
                            Doctor
                            <ul>
                                <li>Usuario: laura@gmail.com</li>
                                <li>Contraseña: 123456789</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}