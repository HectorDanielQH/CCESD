import { useEffect, useState } from "react";
import { SidebarWithBurgerMenu } from "../../../components/navdash";
import { io } from 'socket.io-client';
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Textarea, Tooltip, Typography } from "@material-tailwind/react";
import { DocumentIcon, EyeIcon, MagnifyingGlassIcon, PhoneIcon, PlusIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { obteneratencionPacienteDoctorRequest, registrarAtencionDoctorRequest, registrarAtencionRecetaDoctorRequest, registrarAtencionVirtualDoctorRequest } from "../../../api/atencionmedica";
import { useForm } from "react-hook-form";

const socket = io('https://backend.infokolla.space/api/', {
    transports: ['websocket'],
    withCredentials: true,
});

export default function ReservaAtencionDoctor(){

    const [mensaje,setMensaje]=useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [alerta,setAlerta]=useState(0);
    const [msgalerta,setMsgAlerta]=useState("");

    const [openAlerta,setOpenAlerta]=useState(false);

    const [paginas,setPaginas]=useState(1);
    const [pagina,setPagina]=useState(1);
    const [datosbuscados,setDatosbuscados]=useState('');
    const [filtro, setFiltro]=useState([]);
    const [adelante,setAdelante]=useState(false);
    const [atras,setAtras]=useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();



    useEffect(()=>{
        socket.on('mensaje',(e)=>{
            setMensaje(e); 
            handleOpen();
        });

        return ()=>{
            socket.off('mensaje');
        }
    },[])

    const aceptarTrabajo = async () => {
        try {
            const response = await registrarAtencionDoctorRequest(mensaje.id);
            if(response.status===200){
                setAlerta(1)
                const r= await obteneratencionPacienteDoctorRequest(pagina,datosbuscados);
                setFiltro(r.data.docs);
                setAdelante(r.data.hasNextPage);
                setAtras(r.data.hasPrevPage);
                setPaginas(r.data.totalPages);
                setPagina(r.data.page);
            }
            else{
                setAlerta(2)
            }
            setMsgAlerta(response.data.mensaje)
            setOpenAlerta(true);
            if(response.status===200){
                socket.emit("notificarPaciente",true);
                handleOpen();
            }
            else{
                if(response.status===202){
                    handleOpen();
                }
            }
        } catch (error) {
            console.error('Error registrando atención del doctor:', error);
        }
    };

    useEffect(()=>{
        async function obtenerpaciente(){
        try {
            const r= await obteneratencionPacienteDoctorRequest(pagina,datosbuscados);
            setFiltro(r.data.docs);
            setAdelante(r.data.hasNextPage);
            setAtras(r.data.hasPrevPage);
            setPaginas(r.data.totalPages);
            setPagina(r.data.page);
        }
        catch(error){
            console.log(error);
        }
    }
    obtenerpaciente();
    },[])
    


    const botonAdelante=async ()=>{
        const r= await obteneratencionPacienteDoctorRequest(pagina+1,datosbuscados);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    const botonAtras=async ()=>{
        const r= await obteneratencionPacienteDoctorRequest(pagina-1,datosbuscados);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    const navDirecto=async(e)=>{
        const r= await obteneratencionPacienteDoctorRequest(e , datosbuscados);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }
    const [itemmnav,setItemsnav]=useState([])

    useEffect(()=>{
        setItemsnav(Array.from({ length: paginas }, (_, i) => i));
    },[filtro]);



    //SEGUNDO MODAL

    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(!open2);
    const [idSolicitud,setIdSolicitud]=useState('');
    const [mensajeenlace,setMensajeEnlace]=useState("");
    const [openAlerta2,setOpenAlerta2]=useState(false);


    const agregarenlacevirtual=handleSubmit((async e => {
        try{
            const res=await registrarAtencionVirtualDoctorRequest(e);
            console.log(res.data.mensaje);
            setMensajeEnlace(res.data.mensaje)
            setOpenAlerta2(true);
            const r= await obteneratencionPacienteDoctorRequest(pagina,datosbuscados);
            setFiltro(r.data.docs);
            setAdelante(r.data.hasNextPage);
            setAtras(r.data.hasPrevPage);
            setPaginas(r.data.totalPages);
            setPagina(r.data.page);
            socket.emit("notificarPaciente",true);
            handleOpen2();
        }
        catch(error){
            console.log(error)
        }
        finally{
            reset();
            setIdSolicitud('');
        }
    }));


    /* TERCER MODAL */


    const {
        register: registerForm3,
        handleSubmit: handleSubmitForm3,
        reset: resetForm3,
        setValue: setValueForm3,
        formState: { errors: errorsForm3 }
    } = useForm();


    const [open3, setOpen3] = useState(false);
    const handleOpen3 = () => setOpen3(!open3);
    const [idSolicitud3,setIdSolicitud3]=useState('');
    const [mensajeenlace3,setMensajeEnlace3]=useState("");
    const [openAlerta3,setOpenAlerta3]=useState(false);

    const recetarDoctor=handleSubmitForm3((async e => {
        try{
            const res=await registrarAtencionRecetaDoctorRequest(e);
            setMensajeEnlace3(res.data.mensaje)
            setOpenAlerta3(true);
            const r= await obteneratencionPacienteDoctorRequest(pagina,datosbuscados);
            setFiltro(r.data.docs);
            setAdelante(r.data.hasNextPage);
            setAtras(r.data.hasPrevPage);
            setPaginas(r.data.totalPages);
            setPagina(r.data.page);
            socket.emit("notificarPaciente",true);
            handleOpen3();
        }
        catch(error){
            console.log(error)
        }
        finally{
            resetForm3();
            setIdSolicitud3('');
        }
    }));

    /**CUARTO MODAL */
    const [open4, setOpen4] = useState(false);
    const handleOpen4 = () => setOpen4(!open4);
    const [mensajeenlace4,setMensajeEnlace4]=useState("");

    /**BUSQUEDA */
    const busquedaPaciente=async (e)=>{
        const query = e.target.value.toUpperCase();
        setDatosbuscados(query);      
    }

    useEffect(()=>{
        async function buscado(){
            try {
                const r= await obteneratencionPacienteDoctorRequest(pagina,datosbuscados);
                setFiltro(r.data.docs);
                setAdelante(r.data.hasNextPage);
                setAtras(r.data.hasPrevPage);
                setPaginas(r.data.totalPages);
                setPagina(r.data.page);
            }
            catch(error){
                console.log(error);
            }
        }
        buscado();
    },[datosbuscados])
    

    

    return(
        <div className='flex'>
            <SidebarWithBurgerMenu/>
            <Dialog open={open4} size="xs" handler={handleOpen4}>
                    <div className="flex items-center justify-between">
                        <DialogHeader className="flex flex-col items-start">
                            <Typography className="mb-1" variant="h4">
                                Receta del paciente
                            </Typography>
                        </DialogHeader>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5"
                            onClick={handleOpen4}
                        >
                            <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <DialogBody>
                    <Typography className="mb-5 -mt-7" color="gray" variant="lead" style={{ whiteSpace: 'pre-line' }}>
                        {mensajeenlace4 ? mensajeenlace4 : ''}
                    </Typography>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="gradient" color="red" onClick={handleOpen4}>
                            Cerrar
                        </Button>
                    </DialogFooter>
            </Dialog>






            <Dialog open={open3} size="xs" handler={handleOpen3}>
                <form onSubmit={recetarDoctor}>
                    <div className="flex items-center justify-between">
                        <DialogHeader className="flex flex-col items-start">
                            <Typography className="mb-1" variant="h4">
                                Recetar a Paciente
                            </Typography>
                        </DialogHeader>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5"
                            onClick={handleOpen3}
                        >
                            <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <DialogBody>
                        <Typography className="mb-5 -mt-7 " color="gray" variant="lead">
                            Ingresa la receta médica
                        </Typography>
                        <div className="grid gap-6">
                            <input 
                                type="hidden" 
                                value={idSolicitud3}
                                {
                                    ...registerForm3("id",{
                                        required:{
                                            value: true,
                                            message:"El enlace de la reunión virtual es requerido"
                                        }
                                    })
                                } 
                            />
                            <Textarea
                                label="Ingresa la receta médica" 
                                placeholder="Ingresa la receta médica" 
                                {
                                    ...registerForm3("recetamedica", {
                                        required: {
                                            value: true,
                                            message: "La receta médica es requerida"
                                    }
                                })}  
                            />
                        </div>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="text" color="red" onClick={handleOpen3}>
                            Cancelar Envio
                        </Button>
                        <Button variant="gradient" color="green" type="submit">
                            Enviar
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>







            <Dialog open={open2} size="xs" handler={handleOpen2}>
                <form onSubmit={agregarenlacevirtual}>
                    <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        <Typography className="mb-1" variant="h4">
                            Agregar enlace
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen2}
                    >
                        <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </div>
                    <DialogBody>
                        <Typography className="mb-5 -mt-7 " color="gray" variant="lead">
                            Ingresa el enlace generado por google meet
                        </Typography>
                        <div className="grid gap-6">
                            <Typography className="-mb-1" color="blue-gray" variant="h6">
                                Enlace de reunión
                            </Typography>
                            <input 
                                type="hidden" 
                                value={idSolicitud}
                                {
                                    ...register("id",{
                                        required:{
                                            value: true,
                                            message:"El enlace de la reunión virtual es requerido"
                                        }
                                    })
                                } 
                            />
                            <Input 
                                label="Inserta el enlace" 
                                placeholder="https://meet.google...." 
                                {
                                    ...register("enlacereunion",{
                                        required:{
                                            value: true,
                                            message:"El enlace de la reunión virtual es requerido"
                                        }
                                    })
                                }    
                            />
                        </div>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="text" color="red" onClick={handleOpen2}>
                            Cancelar Envio
                        </Button>
                        <Button variant="gradient" color="green" type="submit">
                            Enviar
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>



            <Dialog open={open} handler={handleOpen} >
                <DialogHeader>Alerta alguien necesita tu atencion!!!</DialogHeader>
                <DialogBody>
                    DESEAS AYUDAR A:
                    <br />
                    Nombre: {mensaje?mensaje.username:null}
                    <br />
                    Celular: {mensaje?mensaje.celular:null}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>No, estoy ocupado</span>
                    </Button>
                    <Button variant="gradient" onClick={aceptarTrabajo} color="green">
                        <span>Si</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <div className="lg:ml-80 flex flex-col w-full sm:absolute lg:relative lg:overflow-auto">                
                {
                    alerta===1?
                        <div className="flex w-full flex-col mt-8 gap-2">
                            <Alert color="blue" open={openAlerta}
                                onClose={() => setOpenAlerta(false)}
                                animate={{
                                mount: { y: 0 },
                                unmount: { y: 100 },
                                }}>
                                    {msgalerta}
                            </Alert> 
                        </div>
                    :
                        alerta===2?
                            <div className="flex w-full flex-col mt-8 gap-2">
                                <Alert color="red" open={openAlerta}
                                    onClose={() => setOpenAlerta(false)}
                                    animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 100 },
                                    }}>
                                        {msgalerta}
                                </Alert> 
                            </div>
                        :
                        null
                }
                {
                    mensajeenlace!==""?
                        <div className="flex w-full flex-col mt-8 gap-2">
                            <Alert color="green" open={openAlerta2}
                                onClose={() => {
                                    setOpenAlerta2(false)
                                    setMensajeEnlace('');
                                }}
                                animate={{
                                mount: { y: 0 },
                                unmount: { y: 100 },
                                }}>
                                    {mensajeenlace}
                            </Alert> 
                        </div>       
                    :
                    null
                }
                {
                    mensajeenlace3!==""?
                        <div className="flex w-full flex-col mt-8 gap-2">
                            <Alert color="green" open={openAlerta3}
                                onClose={() => {
                                    setOpenAlerta3(false)
                                    setMensajeEnlace3('');
                                }}
                                animate={{
                                mount: { y: 0 },
                                unmount: { y: 100 },
                                }}>
                                    {mensajeenlace3}
                            </Alert> 
                        </div>       
                    :
                    null
                }
                
                <div className="flex flex-col w-full sm:absolute lg:relative lg:overflow-auto sm:mt-10 md:mt-4">                
                    <div className="sm:w-full sm:flex sm:flex-col sm:mt-10 md:mb-6 sm:justify-center sm:items-center lg:flex-row lg:justify-between lg:w-10/12 lg:mx-auto">
                        <h1 className="sm:text-2xl lg:text-4xl lg:font-extralight flex justify-center items-center text-gray-800">
                            <DocumentIcon className="w-7 mr-3"/>GESTIÓN DE RESERVAS</h1>
                    </div>
                    <div className="text-gray-800 text-4xl flex sm:mt-0 lg:mt-0">
                        <Card className="w-10/12 mx-auto">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                                    <div>
                                        <Typography variant="h5" color="blue-gray">
                                            RESERVAS DE PACIENTES
                                        </Typography>
                                        <Typography color="gray" className="mt-1 font-normal">
                                            Puedes buscar por nombre de paciente
                                        </Typography>
                                    </div>
                                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                                        <div className="sm:w-full md:w-72 lg:mb-8">  
                                            <Input
                                                label="Nombre de Paciente"
                                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                                onKeyUp={busquedaPaciente}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="overflow-x-scroll px-0 sm:w-10/12 mx-auto">
                                <table className="sm:w-10/12 border-2 md:w-11/12 lg:w-full text-left table table-auto mx-auto">
                                <thead>
                                    <tr>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                id
                                            </Typography>
                                        </th>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                Tipo de solicitud
                                            </Typography>
                                        </th>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                Paciente
                                            </Typography>
                                        </th>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                Medio de comunicación
                                            </Typography>
                                        </th>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                Fecha
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filtro.length>0?
                                        
                                            filtro.map(({_id,nombrePaciente,tipoatencion,celular,meet,receta,createdAt}, index) => {
                                            const isLast = index === _id.length - 1;
                                            const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";
                            
                                            return (
                                            <tr key={_id}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">                                            
                                                        <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-bold"
                                                        >
                                                            {index+1}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">                                            
                                                        <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-bold"
                                                        >
                                                            {tipoatencion}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {nombrePaciente?nombrePaciente:'No designado'}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal flex flex-col items-center justify-center"
                                                    >
                                                        {tipoatencion==='virtual'?
                                                            meet?
                                                                <Button className="flex items-center gap-3 bg-purple-600" size="sm" onClick={()=>{
                                                                    window.open(`${meet}`);
                                                                }}>
                                                                    <VideoCameraIcon strokeWidth={2} className="sm:h-10 sm:w-10 md:h-8 md:w-8 lg:h-4 lg:w-4 xl:h-4 xl:w-4" /> 
                                                                    INGRESA A SALA VIRTUAL
                                                                </Button>
                                                            :
                                                                <Button 
                                                                    className="flex items-center gap-3 bg-cyan-600"
                                                                    size="sm"
                                                                    onClick={()=>{
                                                                        setIdSolicitud(_id)
                                                                        handleOpen2()
                                                                    }}>
                                                                    <PlusIcon strokeWidth={2} className="sm:h-10 sm:w-10 md:h-8 md:w-8 lg:h-4 lg:w-4 xl:h-4 xl:w-4" /> 
                                                                    AGREGAR ENLACE
                                                                </Button>
                                                            :
                                                                <Button className="flex items-center gap-3 bg-green-800" size="sm" onClick={()=>{
                                                                    window.open(`https://web.whatsapp.com/send?phone=591${celular}`);
                                                                }}>
                                                                    <PhoneIcon strokeWidth={2} className="sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-4 lg:w-4 xl:h-4 xl:w-4" /> 
                                                                    {celular}
                                                                </Button>
                                                        }
                                                        {
                                                            tipoatencion==='virtual'?
                                                                receta?
                                                                <Button 
                                                                    className="flex items-center gap-3 bg-pink-700 mt-4" 
                                                                    size="sm"
                                                                    onClick={()=>{
                                                                        setMensajeEnlace4(receta);
                                                                        handleOpen4();
                                                                    }}>
                                                                        <EyeIcon strokeWidth={2} className="sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-4 lg:w-4 xl:h-4 xl:w-4" /> 
                                                                    Ver receta
                                                                </Button>
                                                                :
                                                                <Button 
                                                                    className="flex items-center gap-3 bg-orange-800 mt-4" 
                                                                    size="sm"
                                                                    onClick={()=>{
                                                                        setIdSolicitud3(_id);
                                                                        handleOpen3();
                                                                    }}>
                                                                        <DocumentIcon strokeWidth={2} className="sm:h-10 sm:w-10 md:h-8 md:w-8 lg:h-4 lg:w-4 xl:h-4 xl:w-4" /> 
                                                                    RECETAR
                                                                </Button>
                                                                :
                                                                null
                                                        }
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {new Date(createdAt).toLocaleDateString('es-ES', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric'
                                                        })}
                                                        <br />
                                                        {new Date(createdAt).toLocaleTimeString('es-ES', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit'
                                                        })}
                                                    </Typography>
                                                </td>
                                            </tr>
                                            );
                                        },
                                        )
                                        :
                                        <tr>
                                            <td colSpan="6" className="w-full text-center pt-3 text-2xl text-red-800">
                                                NO EXISTEN REGISTROS
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            </CardBody>
                            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                                <Button onClick={botonAtras} variant="outlined" size="sm" disabled={atras === false} >
                                    Anterior
                                </Button>
                                <div className="flex items-center gap-2">
                                    {
                                        itemmnav.map((itemnum)=>(
                                            <IconButton onClick={()=>navDirecto(itemnum+1)} key={itemnum+1} variant="outlined" size="sm" className={(itemnum+1)===pagina?"bg-pink-400 text-white":null}>
                                                {itemnum+1}
                                            </IconButton>
                                        ))
                                    }
                                </div>
                                <Button onClick={botonAdelante} variant="outlined" size="sm" disabled={adelante === false}>
                                    Adelante
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}