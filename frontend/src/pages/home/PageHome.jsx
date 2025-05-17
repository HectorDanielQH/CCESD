import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Carousel,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";


import img1 from '../../assets/images/img1.png';
import img2 from '../../assets/images/img2.png';
import img3 from '../../assets/images/img3.png';
import img4 from '../../assets/images/img4.png';
import img5 from '../../assets/images/img5.png';
import img6 from '../../assets/images/img6.png';
import ccesd from '../../assets/images/ccesd.png';
import telefono from '../../assets/images/phone-symbol-of-an-auricular-inside-a-circle_icon-icons.com_56478-svg.png';
import video from '../../assets/videos/ccesd.mp4'
import { useAuth } from "../../context/AuthContext";
import { obtenerArchivosRequest } from "../../api/subirArchivos";
 
export default function PageHome() {
  const [openNav, setOpenNav] = useState(false);
  const [valores,setValores]=useState([]);
  const [imagen1,setImagen1]=useState("");
  const [imagen2,setImagen2]=useState("");
  const [videos,setVideos]=useState("");
  const [razon,setRazon]=useState("");
  const [carrusel1,setCarrusel1]=useState("");
  const [carrusel2,setCarrusel2]=useState("");
  const [carrusel3,setCarrusel3]=useState("");
  const [carrusel4,setCarrusel4]=useState("");
  const [carrusel5,setCarrusel5]=useState("");
  const [carrusel6,setCarrusel6]=useState("");
  useEffect(()=>{
    async function archivosGet() {
        const r=await obtenerArchivosRequest();
        if(r.data){
            setValores(r.data);
            setCarrusel1("https://backend.infokolla.space/api/"+r.data.cabecera1);
            setCarrusel2("https://backend.infokolla.space/api/"+r.data.cabecera2);
            setCarrusel3("https://backend.infokolla.space/api/"+r.data.cabecera3);
            setCarrusel4("https://backend.infokolla.space/api/"+r.data.cabecera4);
            setCarrusel5("https://backend.infokolla.space/api/"+r.data.cabecera5);
            setCarrusel6("https://backend.infokolla.space/api/"+r.data.cabecera6);
            setImagen1("https://backend.infokolla.space/api/"+r.data.img1);
            setImagen2("https://backend.infokolla.space/api/"+r.data.img2);
            setVideos("https://backend.infokolla.space/api/"+r.data.video);
            setRazon(r.data.razondeser);
        }
    }
    archivosGet();
  },[]);

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
        color="text-gray-300"
        className="p-1 font-normal"
      >
        <Link to={'/hospitales'} className="flex items-center">
          Hospitales
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="text-gray-300"
        className="p-1 font-normal"
      >
        <Link to={'/farmacias'} className="flex items-center">
          Farmacias
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="text-gray-300"
        className="p-1 font-normal"
      >
        <Link to={'/laboratorios'} className="flex items-center">
            Laboratorios
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="text-gray-300"
        className="p-1 font-normal"
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
        <div className="flex justify-center items-center">
            <Carousel
                className="rounded-xl sm:top-28 sm:w-11/12 md:w-11/12 lg:w-10/12 xl:w-8/12 relative z-10"
                transition={{ type: "mirror", duration: 2 }}
                autoplay={true}
                autoplayDelay={4000}
                loop={true}
            >
                <img
                    src={carrusel1 ? carrusel1 : img1}
                    alt="image 1"
                    className="h-full w-full object-cover"
                />
                <img
                    src={carrusel2 ? carrusel2 : img2}
                    alt="image 2"
                    className="h-full w-full object-cover"
                />
                <img
                    src={carrusel3 ? carrusel3 : img3}
                    alt="image 3"
                    className="h-full w-full object-cover"
                />
                <img
                    src={carrusel4 ? carrusel4 : img4}
                    alt="image 4"
                    className="h-full w-full object-cover"
                />
                <img
                    src={carrusel5 ? carrusel5 : img5}
                    alt="image 5"
                    className="h-full w-full object-cover"
                />
                <img
                    src={carrusel6 ? carrusel6 : img6}
                    alt="image 6"
                    className="h-full w-full object-cover"
                />
            </Carousel>
        </div>

        <div className="sm:mt-44 md:mt-44 lg:mt-44 lg:w-6/12 lg:mx-auto w-full h-full bg-white bg-opacity-75 flex justify-center items-center z-30 relative">
            <Button
                size="lg"
                variant="gradient"
                color="red"
                className="sm:text-lg sm:w-10/12 sm:mx-auto md:items-center md:justify-center animate-bounce group relative flex items-center gap-3 overflow-hidden pr-[8rem]"
                onClick={()=>{
                    const phoneNumber = "+59163725757";
                    window.location.href = `tel:${phoneNumber}`;
                }}
            >
                Centro Coordinador de Emergencia
                <br />
                en Salud Departamental
                <span className="sm:w-3/12 sm:px-2 md:w-1/5 absolute right-0 grid h-full w-28 place-items-center bg-red-600 transition-colors group-hover:bg-red-700">
                    <img src={telefono} alt="metamask" className="sm:h-10 h-20" />
                </span>
            </Button>
        </div>
        
        <div className="sm:mt-12 md:mt-14 w-full flex justify-center items-center">
            <Card
                shadow={false}
                className="sm:w-11/12 sm:-mt-5 relative grid w-3/4 items-end justify-center overflow-hidden text-center"
                >
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://cdn-3.expansion.mx/dims4/default/c9bf642/2147483647/strip/true/crop/748x595+0+0/resize/1200x955!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F46%2F7f%2F75eb82014108a890c6f6ba0f0820%2Fia-medicina-salud.jpg')] bg-cover bg-center"
                >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
                <CardBody className="relative px-6 md:px-12">
                    <Typography
                    variant="h2"
                    color="white"
                    className="sm:text-3xl sm:pb-4 lg:text-5xl font-medium leading-[1.5]"
                    >
                        Razon de ser
                    </Typography>
                    <Typography variant="h5" className="sm:text-xs md:text-[18px] lg:text-[1.5rem] lg:text-xl md:text-base md:font-normal mb-4 text-gray-200 text-justify">
                        {
                            razon?
                            razon
                            :
                            <>
                                Architecto fugit possimus molestiae blanditiis nulla sunt repellaArchitecto fugit possimus molestiae blanditiis nulla sunt repella Architecto fugit possimus molestiae blanditiis nulla sunt repella Architecto fugit possimus molestiae blanditiis nulla sunt repella  Architecto fugit possimus molestiae blanditiis nulla sunt repella Architecto fugit possimus molestiae blanditiis nulla sunt repella Architecto fugit possimus molestiae blanditiis nulla sunt repella Architecto fugit possimus molestiae blanditiis nulla sunt repella Architecto fugit possimus molestiae blanditiis nulla sunt repellat, deserunt quam corporis nemo magnam sint neque placeat nostrum sapiente cum? Doloremque, sunt quasi ad asperiores dicta harum obcaecati maxime ullam rerum illo provident ipsa porro est dolorum sapiente quidem quia ut similique, id laborum nihil. Quidem, ratione eligendi sed corporis perferendis maiores iste quo, provident omnis voluptatem quibusdam sunt quos voluptatum est saepe nulla molestiae corrupti minima excepturi laboriosam? Saepe consectetur culpa voluptas quas, laborum atque recusandae quod iusto, molestiae suscipit ad praesentium! Dolores accusamus pariatur alias cupiditate quos, architecto excepturi error dolorum eos culpa quidem ratione odit repellendus saepe corrupti. Officia culpa distinctio unde soluta, aperiam eveniet deserunt consequuntur.
                            </>
                        }
                    </Typography>
                    <Avatar
                        size="xl"
                        variant="circular"
                        alt="tania andrew"
                        className="border-2 border-white"
                        src={ccesd}
                    />
                </CardBody>
                </Card>
        </div>
        <div className="sm:h-full sm:pb-8 sm:mt-10 sm:flex sm:flex-col sm:justify-center sm:items-center sm:my-3 md:w-full md:flex md:flex-row md:flex-wrap md:gap-10 h-screen mx-auto bg-fixed bg-no-repeat bg-cover" style={{backgroundImage:"url(https://www.cmourense.org/data/blog/5280/images/original/3009/imagen.jpg)"}}>
            <Card className="sm:w-11/12 md:w-5/12 mt-6 w-1/5">
                <CardHeader color="blue-gray" className="relative h-48 sm:mt-4">
                    <img
                        src="https://d1ih8jugeo2m5m.cloudfront.net/2021/12/mision-de-una-empresa.jpg"
                        alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="">
                        Misión
                    </Typography>
                    <Typography>
                        The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                </CardFooter>
            </Card>
            <Card className="sm:w-11/12 md:w-5/12 mt-6 w-1/5">
                <CardHeader color="blue-gray" className="relative h-48 sm:mt-4">
                    <img
                    src="https://opticasflorida.com/wp-content/uploads/2020/05/vision-periferica.jpg"
                    alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="">
                        Visión
                    </Typography>
                    <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2 min by
                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                    night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                </CardFooter>
            </Card>
            <Card className="sm:w-11/12 md:w-5/12 mt-6 w-1/5">
                <CardHeader color="blue-gray" className="relative h-48 sm:mt-4">
                    <img
                    src="https://www.caosyciencia.com/wp-content/uploads/2023/07/objetivos-de-la-investigacion-1024x683.jpg"
                    alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="">
                        Objetivos
                    </Typography>
                    <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2 min by
                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                    night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                </CardFooter>
            </Card>       
        </div>

        <div className="flex flex-col justify-center items-center my-10">
            <div className="sm:text-4xl sm:my-0 text-7xl font-bold my-20 text-[#1e0e4b] text-center">
                Nuestros <span className="text-[#7747ff]">Servicios</span>
            </div>
            <video className=" sm:mt-5 sm:w-11/12 md:w-8/12 w-3/5 rounded-lg" src={videos?videos:video}  autoPlay loop muted />
            <div className="sm:flex-col sm:mt-5 md:flex-wrap md:flex-row flex justify-evenly mt-20 items-center">
                <img
                    className="sm:w-11/12 md:w-5/12 sm:mt-5 w-2/5 object-cover object-center rounded-xl"
                    src={imagen1?imagen1:img1}
                    alt="nature image"
                />
                <img
                    className="sm:w-11/12 md:w-5/12 sm:mt-5 w-2/5 object-cover object-center rounded-xl"
                    src={imagen2?imagen2:img2}
                    alt="nature image"
                />
            </div>
        </div>

        <footer className="w-full bg-white p-8">
            <div className="flex flex-wrap items-start justify-center gap-y-6 gap-x-12 bg-white text-center">
                <ul className="flex flex-wrap items-start">
                <li>
                    <Typography
                    as="h1"
                    color="blue-gray"
                    className="text-lg font-bold transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                    Contactos
                    </Typography>

                    <Typography
                    as="p"
                    color="blue-gray"
                    className="font-normal text-left transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                    Horario de atención 24 horas y 365 días del año
                    <br />
                    Ubicación: Camino a Cantumarca Esq. Montes s/n Zona Bracamonte
                    <br />
                    Telf.: 6120852
                    <br />
                    Linea Whatsapp: 69632676
                    <br />
                    Nro. Piloto gratuito: 168
                    </Typography>
                </li>
                </ul>
            </div>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2235.1458322628196!2d-65.76765309146533!3d-19.58226267327086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f94df93401781b%3A0x1959e236406f5c1f!2sCRUEM%20Centro%20regulador%20de%20urgencias%20y%20emergencias!5e0!3m2!1ses-419!2sbo!4v1717660274834!5m2!1ses-419!2sbo"
                className="sm:w-full sm:mt-5 w-4/5 m-auto"
                height="450" 
                style={{border:"0"}} 
                allowfullscreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            <hr className="sm:w-11/12 my-8 border-blue-gray-50" />
            <Typography color="blue-gray" className="text-center font-normal">
                &copy; 2025 - Potosí - Bolivia (DIPLOMADO FULL STACK)
            </Typography>
        </footer>
    </div>
  );
}