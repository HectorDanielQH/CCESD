import { Alert, Button, Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react";
import { SidebarWithBurgerMenu } from "../../components/navdash";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { actualizarContrasenaRequest, actualizarCorreoElectronicoRequest, actualizarUsernameRequest } from "../../api/user";
import { useState } from "react";

export default function Perfil(){
    const {
        user,
        actualizaruser,
        errors: signInErrors
    }=useAuth();

    const {
        register,
        handleSubmit,
        formState:{errors}
    }=useForm({
        defaultValues: {
            username: user.username,
            email: user.email,
        }
    });

    const [nombreUsuario, setNombreUsuario]=useState(false);
    const [correoUsuario, setCorreoUsuario]=useState(false);
    const [passwordUsuario, setPasswordUsuario]=useState(false);

    const onSubmit = handleSubmit( async (data) => {
        try {
            const r = await actualizarUsernameRequest(data.username , user.email);
            setNombreUsuario(true);
            await actualizaruser(r.data);
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    });

    const onSubmitCorreo=handleSubmit(async (data)=>{
        try {
            const r=await actualizarCorreoElectronicoRequest(data.email , user.email);
            setCorreoUsuario(true);
            await actualizaruser(r.data);
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    });

    const actualizarcontrasena=handleSubmit(async (data)=>{
        try {
            const r = await actualizarContrasenaRequest(data.password , user.email);
            setPasswordUsuario(true);
            await actualizaruser(r.data.id);
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    });


    return(
        <div className="flex">
            <SidebarWithBurgerMenu/>
            <div className="lg:ml-80 sm:absolute md:relative w-full sm:overflow-y-scroll lg:overflow-auto flex flex-col justify-start items-center ">
                <h1 className="sm:px-16 sm:text-center text-blue-gray-800 text-3xl ml-5 my-9 font-light border-2 rounded-lg py-1 px-48 shadow-lg">
                    MI PERFIL
                </h1>
                <Alert className="bg-cyan-500 w-5/6 shadow-md" open={nombreUsuario} onClose={() => setNombreUsuario(false)}>
                    Nombre de Usuario actualizado Correctamente
                </Alert>
                <Card className="w-5/6 bg-gray-50 rounded-none rounded-r-3xl my-5">
                    <form className="w-full" onSubmit={onSubmit}>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2 font-body">
                                Nombre de Usuario ✍️
                            </Typography>
                            <Input
                                size="lg"
                                type="text"
                                placeholder="Ej.: Fulano de Tal"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                {...register('username', { required: 'Username is required' })}
                            />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button type="submit" className="bg-cyan-500">Guardar</Button>
                        </CardFooter>
                    </form>
                </Card>
                <Alert className="bg-pink-600 w-5/6 shadow-md" open={correoUsuario} onClose={() => setCorreoUsuario(false)}>
                    Correo actualizado Correctamente
                </Alert>
                <Card className="w-5/6 bg-gray-50 rounded-none rounded-l-3xl my-5">
                    <form className="w-full" onSubmit={onSubmitCorreo}>
                        <CardBody>
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                Correo Electronico ✍️
                            </Typography>
                            <Input
                                size="lg"
                                type="email"
                                placeholder="Ej.: fulano@gmail.com"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                {...register('email', { required: 'email is required' })}
                            />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button type="submit" className="bg-pink-600">Guardar</Button>
                        </CardFooter>
                    </form>
                </Card>
                <Alert className="bg-orange-700 w-5/6 shadow-md" open={passwordUsuario} onClose={() => setPasswordUsuario(false)}>
                    Password actualizado Correctamente
                </Alert>
                <Card className="w-5/6 bg-gray-50 rounded-none rounded-r-3xl my-5">
                    <form className="w-full" onSubmit={actualizarcontrasena}>
                        <CardBody>
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                Contraseña ✍️
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Ej.: 8 caracteres"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}

                                {...register('password')}
                            />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button type="submit" className="bg-orange-700">Guardar</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}