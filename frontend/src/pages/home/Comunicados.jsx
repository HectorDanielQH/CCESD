import { Button, Card, CardBody, CardFooter, CardHeader, IconButton, MobileNav, Navbar, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ccesd from '../../assets/images/ccesd.png';
import { useAuth } from "../../context/AuthContext";
import '../../../styles/mapa.css'
import { obtenerComunicadosPage } from "../../api/comunicado";

export default function Comunicados(){
    const [openNav, setOpenNav] = useState(false);
 
    useEffect(() => {
        window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);
 
    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
            as="li"
            variant="small"
            className="p-1 font-normal text-gray-300"
        >
            <Link to={'/'} className="flex items-center">
            Home
            </Link>
        </Typography>

        <Typography
            as="li"
            variant="small"
            className="p-1 font-normal text-gray-300"
        >
            <Link to={'/hospitales'} className="flex items-center">
                Hospitales
            </Link>
        </Typography>
        <Typography
            as="li"
            variant="small"
            className="p-1 font-normal text-gray-300"
        >
            
            <Link to={'/farmacias'} className="flex items-center">
                Farmacias
            </Link>
        </Typography>
        <Typography
            as="li"
            variant="small"
            className="p-1 font-normal text-gray-300"
        >
            <Link to={'/laboratorios'} className="flex items-center">
                Laboratorios
            </Link>
        </Typography>
        <Typography
            as="li"
            variant="small"
            className="p-1 font-normal text-gray-300"
        >
            <Link to={'/lineastelefonicas'} className="flex items-center">
                Lineas Telefónicas
            </Link>
        </Typography>
        </ul>
    );

    const {isAuthenticated}=useAuth();

    const [comunicados,setComunicados]=useState([]);

    useEffect(()=>{
        async function comunicadosGet() {
            const r=await obtenerComunicadosPage();
            console.log(r.data);
            setComunicados(r.data);
        }
        comunicadosGet();
    },[]);
 

return (
    <div>
        <Navbar className="fixed top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-blue-gray-700 border-none">
            <div className="flex items-center justify-between text-gray-300">
                <Typography
                    as={Link}
                    to={'/'}
                    className="mr-4 cursor-pointer font-medium"
                >
                    <img src={ccesd} className="h-16" alt="logo" />
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    <div className="flex items-center gap-x-4">
                        {
                            isAuthenticated?
                                <Link to={'/dashboard'}>
                                    <Button
                                        variant="text"
                                        className="hidden lg:inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150"
                                    >
                                        <span>Dashboard</span>
                                    </Button>
                                </Link>
                            :
                            <>
                                <Link to={'/login'}>
                                    <Button
                                        variant="text"
                                        className="hidden lg:inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150"
                                    >
                                        <span>Logearme</span>
                                    </Button>
                                </Link>
                                <Link to={'/register'}>
                                    <Button 
                                        variant="gradient"
                                        className="hidden lg:inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150"
                                    >
                                        <span>Registrarme</span>
                                    </Button>
                                </Link>
                            </>
                        }
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                        >
                        {openNav ? (
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>
                        ) : (
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <MobileNav open={openNav}>
                {navList}
                <div className="flex items-center gap-x-1">
                    {
                        isAuthenticated?
                            <Link to={'/dashboard'} className="w-full">
                                <Button fullWidth variant="text" size="sm" className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150">
                                    <span>Dashboard</span>
                                </Button>
                            </Link>
                        :
                        <>
                            <Link to={'/login'} className="w-full">
                                <Button fullWidth variant="text" size="sm" className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150">
                                    <span>Logearme</span>
                                </Button>
                            </Link>
                            <Link to={'/register'} className="w-full">
                                <Button fullWidth variant="gradient" size="sm" className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150">
                                        <span>Registrarme</span>
                                </Button>
                            </Link>
                        </>
                    }
                </div>
            </MobileNav>
        </Navbar>
        <div className="flex flex-col justify-center items-center">
            <div className="mt-20 lg:mt-28">
                <Typography variant="h1" className="sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mt-4 md:mt-10 text-blue-gray-500">COMUNICADOS</Typography>
            </div>
            <div className="flex w-full pb-5 justify-evenly items-start flex-wrap">
                {comunicados.map(({_id, comunicado, imagen, updatedAt}, index)=>(
                    <Card className="w-96 m-8" key={_id}>
                        <CardHeader shadow={false} floated={false} className="h-96">
                            <div className="mb-2 flex items-center justify-center">
                                <Typography color="blue-gray" className="font-medium font-bold">
                                COMUNICADO
                                </Typography>
                                {
                                    new Date(updatedAt).toDateString() === new Date().toDateString() ? (
                                        <Typography color="white" className="font-medium text-xs bg-yellow-900 px-2 rounded-lg ml-5 animate-pulse">
                                            Comunicado de Hoy
                                        </Typography>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                            {imagen && /\.(mp4|webm|ogg)$/i.test(imagen) ? (
                                <video
                                    controls
                                    className="h-full w-full object-cover"
                                    src={`https://backend.infokolla.space/${imagen.split('\\').pop()}`}
                                    alt="card-video"
                                >
                                    Tu navegador no soporta la etiqueta de video.
                                </video>
                            ) : (
                                <img
                                    src={imagen ? `https://backend.infokolla.space/${imagen.split('\\').pop()}` : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"}
                                    alt="card-image"
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </CardHeader>
                        <CardBody>
                        <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" className="font-bold">
                            Fecha
                            </Typography>
                            <Typography color="blue-gray" className="font-medium bg-teal-600 text-white px-3 rounded-lg">
                                {new Date(updatedAt).toLocaleString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                            </Typography>
                        </div>
                        <Typography
                            variant="small"
                            color="black"
                            className="font-normal mt-5"
                        >
                            {
                                comunicado
                            }
                        </Typography>
                        </CardBody>
                  </Card>
                ))}
            </div>
        </div>
    </div>
  );
}