import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dialog, IconButton, Input, Tooltip, Typography } from "@material-tailwind/react";
import { SidebarWithBurgerMenu } from "../../../components/navdash";
import { MagnifyingGlassIcon, PencilIcon, PhoneIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { editarTelefonoRequest, eliminarTelefonoRequest, obtenerTelefonoRequest, registrarTelefonoRequest } from "../../../api/telefonos";

export default function GestionLineasTelefonicas(){

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [tipo, setTipo] = useState('');

    const [adelante,setAdelante]=useState(false);
    const [atras,setAtras]=useState(false);

    const nuevoTelefono=()=>{
        handleOpen();
        reset();
        setTipo('nuevoTelefono');
    }

    const TABLE_HEAD = ["Nombre Institución", "Número Telefónico", ""];
 
    
    const [telefonos, setTelefonos]=useState([]);
    const [filtro, setFiltro]=useState([]);
    const [alerta, setAlerta]=useState(false);
    const [mensajeRegistro,setMensajeRegistro]=useState('');
    const [idTelefono,setIdTelefono]=useState('');
    const [paginas,setPaginas]=useState(1);
    const [pagina,setPagina]=useState(1);
    const [datosbuscados,setDatosbuscados]=useState('');
    
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(()=>{
        async function obtenerTelefonos(){
        try {
            const r= await obtenerTelefonoRequest(pagina,datosbuscados);
            setTelefonos(r.data.docs);
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
    obtenerTelefonos();
    },[])

    const busquedaTelefono=async (e)=>{
        const query = e.target.value.toUpperCase();
        setDatosbuscados(query);      
    }
    useEffect(()=>{
            async function buscado (){
                try {
                    const r= await obtenerTelefonoRequest(pagina,datosbuscados);
                    setTelefonos(r.data.docs);
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
    },[datosbuscados]);

    const agregarTelefono=handleSubmit(async e => {
        try{
            const re=await registrarTelefonoRequest(e);
            const r= await obtenerTelefonoRequest(pagina,datosbuscados);
            setTelefonos(r.data.docs);
            setFiltro(r.data.docs);
            reset();
            setAlerta(true);
            setMensajeRegistro(re.data.msg);
            handleOpen(false);
            setAdelante(r.data.hasNextPage);
            setAtras(r.data.hasPrevPage);
            setPaginas(r.data.totalPages);
            setPagina(r.data.page);
        }
        catch(error){
            handleOpen(false);
            setAlerta(true);
            setMensajeRegistro(error.response.data);
        }
        finally{
            reset();
        }
    })

    const editarTelefono=(e) =>{
        const filtered = telefonos.filter(telefono => 
            telefono._id.toLowerCase().includes(e)
        );
        setTipo("actualizar")
        setValue("institucion",filtered[0].institucion);
        setValue("telefono",filtered[0].telefono);
        handleOpen(true);
    }
    

    const guardarTelefonoEditado=handleSubmit(async e => {
        try{
            const res=await editarTelefonoRequest({_id:idTelefono},e);
            const r= await obtenerTelefonoRequest(pagina,datosbuscados);
            setTelefonos(r.data.docs);
            setFiltro(r.data.docs);
            setAlerta(true);
            setMensajeRegistro(res.data.msg);
            handleOpen(false);
            setAdelante(r.data.hasNextPage);
            setAtras(r.data.hasPrevPage);
            setPaginas(r.data.totalPages);
            setPagina(r.data.page);
        }
        catch(error){
            handleOpen(false);
            setAlerta(true);
            setMensajeRegistro(error.response.data);
        }
        finally{
            reset();
        }
    })

    const eliminarTelefono=(async (_id)=>{
        const cookies=Cookies.get();
            if(cookies.token){
                try{
                    const res=await eliminarTelefonoRequest({_id:_id},cookies.token);
                    const r= await obtenerTelefonoRequest(pagina,datosbuscados);
                    setTelefonos(r.data.docs);
                    setFiltro(r.data.docs);
                    setAlerta(true);
                    setMensajeRegistro(res.data.msg);
                    setAdelante(r.data.hasNextPage);
                    setAtras(r.data.hasPrevPage);
                    setPaginas(r.data.totalPages);
                    setPagina(r.data.page);
                }
                catch(error){
                    console.log(error);
                }
            }
    });


    const [itemmnav,setItemsnav]=useState([])

    useEffect(()=>{
        setItemsnav(Array.from({ length: paginas }, (_, i) => i));
    },[filtro])


    const botonAdelante=async ()=>{
        const r= await obtenerTelefonoRequest(pagina+1,datosbuscados);
        setTelefonos(r.data.docs);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    const botonAtras=async ()=>{
        const r= await obtenerTelefonoRequest(pagina-1,datosbuscados);
        setTelefonos(r.data.docs);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    const navDirecto=async(e)=>{
        const r= await obtenerTelefonoRequest(e , datosbuscados);
        setTelefonos(r.data.docs);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }
    return (
        <div className="flex">
            <SidebarWithBurgerMenu/>
            <div className="lg:ml-80 flex flex-col w-full sm:absolute md:relative lg:overflow-auto">                
                <div className="text-gray-800 text-4xl flex sm:mt-6 lg:mt-0">
                    <div className="sm:w-full sm:flex sm:flex-col sm:mt-10 md:mb-6 sm:justify-center sm:items-center lg:flex-row lg:justify-between lg:w-10/12 lg:mx-auto">
                        <h1 className="sm:text-2xl lg:text-4xl lg:font-extralight flex justify-center items-center">
                            <PhoneIcon className="w-7 mr-3"/>Gestión de Lineas Telefónicas</h1>
                        <Button onClick={nuevoTelefono} className="ml-6 bg-green-800">Registrar Nueva Linea Telefónica</Button>
                    </div>
                    <Dialog
                        size="xs"
                        open={open}
                        handler={handleOpen}
                        className="bg-transparent shadow-none"
                    >
                        <Card className="mx-auto sm:w-full md:w-full lg:w-[40rem]">
                            <form onSubmit={tipo==="nuevoTelefono"?agregarTelefono:guardarTelefonoEditado}>
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        {
                                            tipo==='nuevoTelefono'?
                                                <>Nueva Linea Telefónica</>
                                            :
                                                <>Editar Linea Telefónica</>
                                        }
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        Nombre de la Institución
                                    </Typography>
                                    <Input 
                                        label="Ej.: Bomberos"
                                        type="text"
                                        size="lg"
                                        name="institucion"
                                        {
                                            ...register("institucion",{
                                                required:{
                                                    value:true,
                                                    message:"El nombre de la institución es requerida"
                                                },
                                                pattern:{
                                                    value: /^[A-Z\s]+$/,
                                                    message:"La institución solo puede contener MAYÚSCULAS"
                                                }
                                        })}
                                    />
                                    {errors.institucion && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.institucion.message}</Alert>}

                                    <Typography className="-mb-2" variant="h6">
                                        Teléfono:
                                    </Typography>
                                    <Input 
                                        label="Ej.: 26227659"
                                        type="number"
                                        size="lg"
                                        name="telefono"
                                        {
                                            ...register("telefono",{
                                                required:{
                                                    value: true,
                                                    message:"El número de teléfono es requerido"
                                                }
                                            })
                                        }
                                    />
                                    {errors.telefono && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.telefono.message}</Alert>}
                                    
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
                                            color={
                                                tipo==='nuevoTelefono'?
                                                "green"
                                                :
                                                "amber"
                                            }
                                        >
                                            {
                                                tipo==='nuevoTelefono'?
                                                    <>Agregar</>
                                                :
                                                    <>Actualizar</>
                                            }
                                        </Button>
                                    </div>
                                </CardFooter>
                            </form>
                        </Card>
                    </Dialog>
                </div>
                
                <Alert open={alerta} onClose={() => setAlerta(false)} className="mt-8 ml-8 w-12/12 fixed z-10" style={mensajeRegistro=='Ocurrio un error'?{backgroundColor:'red'}:{backgroundColor:'green'}}>
                    <strong>MENSAJE:</strong>
                    <br />
                    <br />
                    <span>{mensajeRegistro}</span>
                </Alert>
                <div className="w-11/12 mx-auto">
                    <Card className="h-full w-full">
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="flex sm:w-12/12 lg:w-11/12 md:items-center md:justify-end">
                                <div className="flex sm:w-full sm:justify-center shrink-0 gap-2 md:w-max mt-2">
                                    <div className="sm:w-12/12 md:w-72 lg:mb-8">
                                        <Input
                                            label="Buscar Teléfono"
                                            icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                                            onKeyUp={busquedaTelefono}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-x-scroll px-0 sm:w-10/12 mx-auto">
                            <table className="sm:w-10/12 border-2 md:w-11/12 lg:w-full text-left table table-auto mx-auto">
                            <thead>
                                <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
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
                                {filtro.map(({_id,institucion,telefono}, index) => {
                                    const isLast = index === telefono.length - 1;
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
                                                    {institucion}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal w-28"
                                            >
                                                <Chip 
                                                    className="mb-2" 
                                                    color="green"
                                                    value={telefono}
                                                    icon={<PhoneIcon/>}
                                                />
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex justify-center items-center gap-2">
                                                <Tooltip content="Editar Linea Telefónica">
                                                    <IconButton variant="text" className="bg-orange-400 hover:bg-orange-300" onClick={()=> editarTelefono(_id)}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Eliminar Linea Telefónica">
                                                    <IconButton variant="text" className="bg-red-700 hover:bg-red-400" onClick={()=>eliminarTelefono(_id)}>
                                                        <TrashIcon className="h-4 w-4 text-white" />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                    );
                                },
                                )}
                            </tbody>
                            </table>
                        </CardBody>
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 mx-auto w-11/12 mb-6">
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
    )
}