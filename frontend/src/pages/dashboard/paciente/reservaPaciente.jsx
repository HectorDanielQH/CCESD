import { useEffect, useState } from "react";
import { SidebarWithBurgerMenu } from "../../../components/navdash";
import { io } from 'socket.io-client';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dialog, IconButton, Input, Radio, Tooltip, Typography } from "@material-tailwind/react";
import { DocumentIcon, EyeIcon, EyeSlashIcon, FireIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, UserIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { obteneratencionPacienteRequest, registrarAtencionRequest } from "../../../api/atencionmedica";
import { FlagIcon, WindowIcon } from "@heroicons/react/24/outline";
import { obtenerPDFRequest } from "../../../api/pdf";
import FileSaver from 'file-saver';

const socket = io('https://backend.infokolla.space/api', {
    transports: ['websocket'],
    withCredentials: true,
});

export default function ReservaAtencion(){
    const [open, setOpen] = useState(false);
    const [accion, setAccion] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();

    const handleOpen = () => setOpen((cur) => !cur);

    const [paginas,setPaginas]=useState(1);
    const [pagina,setPagina]=useState(1);
    const [datosbuscados,setDatosbuscados]=useState('');
    const [filtro, setFiltro]=useState([]);
    const [adelante,setAdelante]=useState(false);
    const [atras,setAtras]=useState(false);

    const agregarAtencion=handleSubmit((async e => {
        try{
            const r=await registrarAtencionRequest(e);
            if(r.status===200){
                socket.emit('atencion',r.data);
                const rs= await obteneratencionPacienteRequest(pagina,datosbuscados);
                setFiltro(rs.data.docs);
                handleOpen();
            }
        }
        catch(error){
            console.log(error)
        }
        finally{
            reset();
        }
    }));

    const editarAtencion=handleSubmit();
    
    
    useEffect(()=>{
        socket.on('notificacionAtencion',async(e)=>{
            const r= await obteneratencionPacienteRequest(pagina,datosbuscados);
            setFiltro(r.data.docs);
            setAdelante(r.data.hasNextPage);
            setAtras(r.data.hasPrevPage);
            setPaginas(r.data.totalPages);
            setPagina(r.data.page);
        });

        return ()=>{
            socket.off('notificacionAtencion');
        }
    },[]);


    useEffect(()=>{
        async function obtenerpaciente(){
            try {
                const r= await obteneratencionPacienteRequest(pagina,datosbuscados);
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
        const r= await obteneratencionPacienteRequest(pagina+1,datosbuscados);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    const botonAtras=async ()=>{
        const r= await obteneratencionPacienteRequest(pagina-1,datosbuscados);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    const navDirecto=async(e)=>{
        const r= await obteneratencionPacienteRequest(e , datosbuscados);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }
    const [itemmnav,setItemsnav]=useState([])

    useEffect(()=>{
        setItemsnav(Array.from({ length: paginas }, (_, i) => i));
    },[filtro])

    const obtenerPDFRequests = async (id) => {
        try {
            const response = await obtenerPDFRequest(id,{ responseType: 'blob' });
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            FileSaver.saveAs(pdfBlob, 'Receta.pdf');
        } catch (error) {
            console.error('Error al descargar el PDF:', error);
        }
    };

    return(
        <div className='flex'>
            <SidebarWithBurgerMenu/>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto sm:w-full md:w-full lg:w-[40rem] sm:overflow-y-scroll md:overflow-y-auto">
                    <form onSubmit={accion==='insertar'?agregarAtencion:editarAtencion}>
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Reservar Atención
                            </Typography>
                            <div className="flex w-full flex-col gap-10">
                                <Typography className="-mb-2" variant="h6">
                                    Tipo de Atención:
                                </Typography>
                                <div className="w-full flex justify-evenly items-center -mt-8">
                                    <Radio 
                                        name="tipoatencion" 
                                        label="Atención Presencial"
                                        value={"presencial"}
                                        {...register("tipoatencion", { 
                                            required:{
                                                value:true,
                                                message: "El tipo de atencion es requerido" 
                                            }
                                        })} 
                                    />
                                    <Radio 
                                        name="tipoatencion"
                                        label="Atención Virtual"
                                        value={"virtual"}
                                        {...register("tipoatencion", { 
                                            required:{
                                                value:true,
                                                message: "El tipo de atencion es requerido"
                                            }
                                        })}     
                                    />
                                </div>
                                {errors.tipoatencion && <span className="text-red-800 -mt-10 bg-red-100">{errors.tipoatencion.message}</span>}
                            </div>
                            <Typography className="-mb-2" variant="h6">
                                Dirección de Domicilio de referencia
                            </Typography>
                            <Input 
                                label="Ej.: Calle Ingavi s/n"
                                type="text"
                                size="lg"
                                name="domicilio"
                                {
                                    ...register("domicilio",{
                                        required:{
                                            value: true,
                                            message:"El domicilio es requerido"
                                        }
                                    })
                                }
                            />
                            {errors.domicilio && <span className="text-red-800 bg-red-100">{errors.domicilio.message}</span>}
                            
                            <Typography className="-mb-2" variant="h6">
                                Número de celular de referencia
                            </Typography>
                            <Input 
                                label="Ej.: 68383838"
                                type="number"
                                size="lg"
                                name="celular"
                                {
                                    ...register("celular",{
                                        required:{
                                            value: true,
                                            message:"El número número de celular requerido"
                                        }
                                    })
                                }
                            />
                            {errors.celular && <span className="text-red-800 bg-red-100">{errors.celular.message}</span>}
                            
                        </CardBody>
                        <CardFooter className="pt-0 flex flex-col items-center justify-between">
                            <div className="flex w-full justify-between mt-5">
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={() => handleOpen(null)}
                                    className="mr-1"
                                >
                                    <span>Cancelar</span>
                                </Button>
                                <Button 
                                    variant="gradient"
                                    type="submit" 
                                >
                                    Agregar
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
            <div className="lg:ml-80 flex flex-col w-full sm:absolute lg:relative lg:overflow-auto">                
                <div className="sm:w-full sm:flex sm:flex-col sm:mt-10 md:mb-6 sm:justify-center sm:items-center lg:flex-row lg:justify-between lg:w-10/12 lg:mx-auto">
                    <h1 className="sm:text-2xl lg:text-4xl lg:font-extralight flex justify-center items-center text-gray-800">
                        <DocumentIcon className="w-7 mr-3"/>Mis Reservas</h1>
                </div>
                <div className="text-gray-800 text-4xl flex sm:mt-6 lg:mt-0">
                    <Card className="w-10/12 mx-auto mt-8">
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                                <div>
                                    <Typography variant="h5" color="blue-gray" className="sm:text-center md:text-start">
                                        RESERVAS RECIENTES
                                    </Typography>
                                    <Typography color="gray" className="mt-1 font-normal sm:text-center">
                                        Si deseas crear más reservas dale click al boton
                                    </Typography>
                                </div>
                                <div className="flex w-full shrink-0 gap-2 md:w-max">
                                    <div style={{display:'none'}} className="w-full md:w-72">
                                        <Input
                                            label="Search"
                                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                        />
                                    </div>
                                    <Button className="flex items-center sm:mx-auto gap-3 bg-green-800" size="sm" onClick={()=>{
                                        setAccion('insertar');
                                        setOpen(true);
                                    }}>
                                        <FireIcon strokeWidth={2} className="h-4 w-4" /> 
                                            Registrar Reserva
                                    </Button>
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
                                            Doctor Asignado
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Estado
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
                                    filtro.map(({_id,nombreDoctor,nombrePaciente,tipoatencion, meet,atendido,receta,celular,createdAt}, index) => {
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
                                                    {
                                                        <Chip value={tipoatencion.toUpperCase()} variant="gradient" color={tipoatencion==='virtual'?"pink":"green"} icon={tipoatencion==='virtual'?<EyeIcon/>:<UserIcon/>} />
                                                    }
                                                    <br />
                                                    {
                                                        tipoatencion==='virtual'?
                                                            meet?
                                                                <Button className="flex items-center gap-3 bg-deep-purple-500" size="sm" onClick={()=>{
                                                                    window.open(`${meet}`);
                                                                }}>
                                                                    <VideoCameraIcon strokeWidth={2} className="h-4 w-4" /> 
                                                                    INGRESA A SALA VIRTUAL
                                                                </Button>
                                                                :
                                                                    <Chip
                                                                        variant="ghost"
                                                                        color="cyan"
                                                                        size="sm"
                                                                        value="AGUARDA CREANDO EL ENLACE"
                                                                        icon={
                                                                        <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-cyan-900 content-['']" />
                                                                        }
                                                                    />
                                                                :
                                                                    <Chip
                                                                        variant="ghost"
                                                                        color="cyan"
                                                                        size="sm"
                                                                        value="AGUARDA EL DOCTOR SE CONTACTARÁ EN BREVE"
                                                                        icon={
                                                                        <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-cyan-900 content-['']" />
                                                                        }
                                                                    />
                                                    }
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal flex flex-col justify-center items-center"
                                            >
                                                {nombreDoctor?
                                                    nombreDoctor
                                                    :
                                                    <Button className="flex items-center gap-3 bg-red-800" size="sm" onClick={()=>{
                                                        socket.emit('atencion',{
                                                            id:_id,
                                                            username:nombrePaciente,
                                                            celular: celular
                                                        })
                                                    }}>
                                                        <FlagIcon strokeWidth={2} className="sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-8 lg:w-8" /> 
                                                            No atendido
                                                            <br />
                                                            Notificar nuevamente
                                                    </Button>
                                                }
                                                {receta?
                                                <Button 
                                                    className="flex items-center gap-3 bg-cyan-500 mt-4" 
                                                    size="sm"
                                                    onClick={()=>obtenerPDFRequests(_id)}>
                                                    <WindowIcon strokeWidth={2} className="h-4 w-4" /> 
                                                    Descargar Receta
                                                </Button>
                                                :null}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {atendido?
                                                    <Chip
                                                        variant="ghost"
                                                        color="green"
                                                        size="sm"
                                                        value="ATENDIDO"
                                                        icon={
                                                        <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                                        }
                                                    />
                                                    :
                                                    <Chip
                                                        variant="ghost"
                                                        color="red"
                                                        size="sm"
                                                        value="PENDIENTE"
                                                        icon={
                                                        <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
                                                        }
                                                    />
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
                                    <td colSpan="6" className="w-full text-center pt-4 text-red-800">
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
    );
}