import { Button, Card, IconButton, Input, MobileNav, Navbar, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ccesd from '../../assets/images/ccesd.png';
import { useAuth } from "../../context/AuthContext";
import { HeartIcon, PhoneIcon } from "@heroicons/react/24/solid";
import '../../../styles/mapa.css'
import {obtenerTelefonoPageRequest} from '../../api/telefonos'

export default function LineasTelefonicas(){
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
        <Typography
        as="li"
        variant="small"
        color="text-gray-300"
        className="p-1 font-normal"
      >
        <Link to={'/comunicados'} className="flex items-center">
            Comunicados
        </Link>
      </Typography>
        </ul>
    );

    const {isAuthenticated}=useAuth();

    const [telefonos,setTelefonos]=useState([]);
    const [filtro,setFiltro]=useState([]);

    useEffect(()=>{
        async function telefonosGet() {
            const r=await obtenerTelefonoPageRequest();
            setTelefonos(r.data);
            setFiltro(r.data);
        }
        telefonosGet();
    },[]);


    const filtrar=(e)=>{
        e.target.value=e.target.value.toUpperCase();
        const filtro = e.target.value.toUpperCase();
        const telefonosFiltradas = telefonos.filter(telefono => {
          return telefono.institucion.toUpperCase().includes(filtro);
        });
        setFiltro(telefonosFiltradas);
    }
    const TABLE_HEAD = ["Institución", "Número Telefónico", "Llamar"];

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
            <div className="mt-20 lg:mt-28 mb-10">
                <Typography variant="h1" className="sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mt-4 md:mt-10 text-blue-gray-500">LISTA DE LINEAS TELEFÓNICAS EN LA CIUDAD DE POTOSÍ</Typography>
            </div>
            <div className="w-9/12 sm:flex-col lg:flex-row flex justify-center items-center gap-2 sm:mb-6 md:mb-5">
                <h2 className="text-blue-gray-700 text-right lg:mr-5">
                    <strong>
                        Realiza la busqueda por institucion
                    </strong>
                </h2>
                <Input
                    type="search"
                    label="Busqueda de Lineas Telefónicas"
                    onKeyUp={filtrar}
                />
            </div>
            <div className="flex w-full justify-center items-center flex-wrap">
            <Card className="sm:w-11/12 md:w-10/12 lg:w-8/12">
                <table className="w-full table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                            >
                            {head}
                            </Typography>
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                        {filtro.map(({_id, institucion,telefono}, index)=>(
                            <tr key={_id}>
                                <td className="p-4 border-b border-blue-gray-50">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {institucion}
                                </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50 flex">
                                    <Typography variant="small" color="blue-gray" className="font-normal bg-teal-500 text-white p-2 px-6 rounded-lg flex justify-center items-center">
                                        {telefono}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <a href={`tel:+${telefono}`} className="text-white">
                                        <IconButton className="bg-green-800">
                                            <PhoneIcon className="size-6" />
                                        </IconButton>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            </div>
        </div>
    </div>
  );
}