import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dialog, IconButton, Input, Tooltip, Typography } from "@material-tailwind/react";
import { SidebarWithBurgerMenu } from "../../../components/navdash";
import { CloudIcon, HomeIcon, MagnifyingGlassIcon, MoonIcon, PencilIcon, PhoneIcon, SunIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { editarFarmaciaRequest, eliminarFarmaciaRequest, obtenerFarmaciaRequest, registrarFarmaciaRequest } from "../../../api/farmacias";
import { Map, Marker, ZoomControl } from "pigeon-maps";


export default function GestionFarmacias(){

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [tipo, setTipo] = useState('');

    const [adelante,setAdelante]=useState(false);
    const [atras,setAtras]=useState(false);

    const nuevaFarmacia=()=>{
        handleOpen();
        reset();
        setTipo('nuevaFarmacia');
        setLatlng([0,0]);
    }

    const TABLE_HEAD = ["Nombre de la Farmacia", "Ubicación", "Teléfono", "Horarios de Visita",""];
 
    
    const [farmacias, setFarmacias]=useState([]);
    const [filtro, setFiltro]=useState([]);
    const [alerta, setAlerta]=useState(false);
    const [mensajeRegistro,setMensajeRegistro]=useState('');
    const [idFarmacia,setIdFarmacia]=useState('');
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
        async function obtenerFarmacias(){
        try {
            const r= await obtenerFarmaciaRequest(pagina,datosbuscados);
            console.log(r.data);
            setFarmacias(r.data.docs);
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
    obtenerFarmacias();
    },[])

    const busquedaFarmacia=async (e)=>{
        const query = e.target.value.toUpperCase();
        setDatosbuscados(query);      
    }
    useEffect(()=>{
            async function buscado (){
                try {
                    const r= await obtenerFarmaciaRequest(pagina,datosbuscados);
                    setFarmacias(r.data.docs);
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

    const agregarFarmacia=handleSubmit(async e => {
        try{
            const re=await registrarFarmaciaRequest(e);
            const r= await obtenerFarmaciaRequest(pagina,datosbuscados);
            setFarmacias(r.data.docs);
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

    const editarFarmacia=(e) =>{
        const filtered = farmacias.filter(farmacia => 
            farmacia._id.toLowerCase().includes(e)
        );
        setTipo("actualizar")
        setValue("farmacia",filtered[0].farmacia);
        setValue("ubicación",filtered[0].ubicación);
        setValue("telefono",filtered[0].telefono);
        setValue("turnomañana",filtered[0].horariosatencion.turnomañana);
        setValue("turnotarde",filtered[0].horariosatencion.turnotarde);
        setValue("turnonoche",filtered[0].horariosatencion.turnonoche);
        setIdFarmacia(filtered[0]._id);
        setLatlng(filtered[0].ubicación);
        handleOpen(true);
    }
    

    const guardarFarmaciaEditada=handleSubmit(async e => {
        try{
            const res=await editarFarmaciaRequest({_id:idFarmacia},e);
            const r= await obtenerFarmaciaRequest(pagina,datosbuscados);
            setFarmacias(r.data.docs);
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

    const eliminarFarmacia=(async (_id)=>{
        const cookies=Cookies.get();
            if(cookies.token){
                try{
                    const res=await eliminarFarmaciaRequest({_id:_id},cookies.token);
                    const r= await obtenerFarmaciaRequest(pagina,datosbuscados);
                    setFarmacias(r.data.docs);
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
        const r= await obtenerFarmaciaRequest(pagina+1,datosbuscados);
        setFarmacias(r.data.docs);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    const botonAtras=async ()=>{
        const r= await obtenerFarmaciaRequest(pagina-1,datosbuscados);
        setFarmacias(r.data.docs);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    const navDirecto=async(e)=>{
        const r= await obtenerFarmaciaRequest(e , datosbuscados);
        setFarmacias(r.data.docs);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    /*PARA EL MAPA*/
    const [center, setCenter] = useState([-19.58361, -65.75306])
    const [zoom, setZoom] = useState(14)
    const [latlng,setLatlng]=useState([0,0]);

    return (
        <div className="flex">
            <SidebarWithBurgerMenu/>
            <div className="lg:ml-80 flex flex-col w-full sm:absolute md:relative lg:overflow-auto">                
                <div className="text-gray-800 text-4xl flex sm:mt-6 lg:mt-0">
                    <div className="sm:w-full sm:flex sm:flex-col sm:mt-10 md:mb-6 sm:justify-center sm:items-center lg:flex-row lg:justify-between lg:w-10/12 lg:mx-auto">
                        <h1 className="sm:text-2xl lg:text-4xl lg:font-extralight flex justify-center items-center">
                            <HomeIcon className="w-7 mr-3"/>Gestión de Farmacias</h1>
                        <Button onClick={nuevaFarmacia} className="ml-6 bg-green-800">Registrar Nueva Farmacia</Button>
                    </div>
                    <Dialog
                        size="xs"
                        open={open}
                        handler={handleOpen}
                        className="bg-transparent shadow-none"
                    >
                        <Card className="mx-auto sm:w-full md:w-full lg:w-[40rem] h-[60vh] overflow-y-scroll">
                            <form onSubmit={tipo==="nuevaFarmacia"?agregarFarmacia:guardarFarmaciaEditada}>
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        {
                                            tipo==='nuevaFarmacia'?
                                                <>Nueva Farmacia</>
                                            :
                                                <>Editar Farmacia</>
                                        }
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        Nombre de la Farmacia
                                    </Typography>
                                    <Input 
                                        label="Ej.: Farmacia Económica"
                                        type="text"
                                        size="lg"
                                        name="farmacia"
                                        {
                                            ...register("farmacia",{
                                                required:{
                                                    value:true,
                                                    message:"El nombre de la farmacia es requerida"
                                                },
                                                pattern:{
                                                    value: /^[A-Z\s]+$/,
                                                    message:"La farmacia solo puede contener MAYÚSCULAS"
                                                }
                                        })}
                                    />
                                    {errors.farmacia && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.farmacia.message}</Alert>}


                                    <Typography className="-mb-2" variant="h6">
                                        Ubicación:
                                    </Typography>
                                    <div className="flex flex-col justify-between items-center">
                                        <Map 
                                            height={500}
                                            center={center} 
                                            zoom={zoom} 
                                            onBoundsChanged={({ center, zoom }) => { 
                                            setCenter(center) 
                                            setZoom(zoom) 
                                            }}     
                                            onClick={(e)=>(setValue("ubicación", e.latLng), setLatlng(e.latLng))}
                                            metaWheelZoom={true}
                                        >
                                            <Marker width={100} color={'#c31432'}  anchor={latlng} />
                                            <ZoomControl />
                                        </Map>
                                        <Input 
                                            label="Selecciona la ubicacion en el mapa"
                                            type="text"
                                            size="md"
                                            name="ubicación"
                                            disabled
                                            className="w-full"
                                            {
                                                ...register("ubicación",{
                                                    required:{
                                                        value: true,
                                                        message:"La ubicación es requerida"
                                                    }
                                                })
                                            }
                                        />
                                    </div>
                                    {errors.ubicación && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.ubicación.message}</Alert>}


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
                                    
                                    
                                    <Typography className="-mb-2" variant="h5">
                                        Horarios de visita:
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        Turno mañana:
                                    </Typography>
                                    <Input 
                                        label="Ej.: 10:00 a.m. - 11:00 a.m."
                                        type="text"
                                        size="lg"
                                        name="turnomañana"
                                        {
                                            ...register("turnomañana",{
                                                required:{
                                                    value: true,
                                                    message:"El turno de visita es requerido"
                                                }
                                            })
                                        }
                                    />
                                    {errors.turnomañana && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.turnomañana.message}</Alert>}
                                    

                                    
                                    <Typography className="-mb-2" variant="h6">
                                        Turno Tarde :
                                    </Typography>
                                    <Input 
                                        label="Ej.: 14:00 p.m. - 16:00 p.m."
                                        type="text"
                                        size="lg"
                                        name="turnotarde"
                                        {
                                            ...register("turnotarde",{
                                                required:{
                                                    value: true,
                                                    message:"El turno de visita es requerido"
                                                }
                                            })
                                        }
                                    />
                                    {errors.turnotarde && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.turnotarde.message}</Alert>}
                                    

                                    
                                    <Typography className="-mb-2" variant="h6">
                                        Turno Noche :
                                    </Typography>
                                    <Input 
                                        label="Ej.: 18:30 p.m. - 19:00 p.m."
                                        type="text"
                                        size="lg"
                                        name="turnonoche"
                                        {
                                            ...register("turnonoche",{
                                                required:{
                                                    value: true,
                                                    message:"El turno de visita es requerido"
                                                }
                                            })
                                        }
                                    />
                                    {errors.turnonoche && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.turnonoche.message}</Alert>}
                                    
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
                                                tipo==='nuevaFarmacia'?
                                                "green"
                                                :
                                                "amber"
                                            }
                                        >
                                            {
                                                tipo==='nuevaFarmacia'?
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
                                            label="Search"
                                            icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                                            onKeyUp={busquedaFarmacia}
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
                                {filtro.map(({_id,farmacia,ubicación,telefono,horariosatencion}, index) => {
                                    const isLast = index === farmacias.length - 1;
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
                                                {farmacia}
                                            </Typography>
                                        </div>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="w-40 font-normal truncate overflow-hidden whitespace-nowrap"
                                            >
                                                <Map 
                                                    height={300}
                                                    center={ubicación} 
                                                    zoom={16} 
                                                    onBoundsChanged={({ center, zoom }) => { 
                                                        setCenter(center) 
                                                        setZoom(zoom) 
                                                    }} 
                                                >
                                                    <Marker width={80} color={'#c31432'}  anchor={ubicación} />
                                                    <ZoomControl />
                                                </Map>
                                            </Typography>
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
                                            <Chip className="mb-2" icon={<SunIcon/>} color="amber" value={`Mañanas: ${horariosatencion.turnomañana}`} />
                                            <Chip className="mb-2" icon={<CloudIcon/>} color="pink" value={`Tardes: ${horariosatencion.turnotarde}`} />
                                            <Chip className="mb-2" icon={<MoonIcon/>} color="indigo" value={`Noches: ${horariosatencion.turnonoche}`} />
                                        </td>
                                        
                                        <td className={classes}>
                                            <div className="flex justify-center items-center gap-2">
                                                <Tooltip content="Editar Farmacia">
                                                    <IconButton variant="text" className="bg-orange-400 hover:bg-orange-300" onClick={()=> editarFarmacia(_id)}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Eliminar Farmacia">
                                                    <IconButton variant="text" className="bg-red-700 hover:bg-red-400" onClick={()=>eliminarFarmacia(_id)}>
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