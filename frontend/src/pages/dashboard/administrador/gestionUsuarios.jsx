import { SidebarWithBurgerMenu } from "../../../components/navdash";
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dialog, IconButton, Input, Radio, Textarea, Tooltip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TrashIcon, MagnifyingGlassIcon, PencilIcon, LinkIcon, SwatchIcon, KeyIcon, UserIcon, InboxIcon, UsersIcon, PlusIcon, ClockIcon } from "@heroicons/react/24/solid";
import { editarUsuariosRequest, eliminarUsuariosRequest, obtenerUsuariosRequest, registrarUsuariosRequest } from "../../../api/gestionusuarios";
import Cookies from "js-cookie";
import { registrarhorario } from "../../../api/agregarhorario";

export default function GestionUsuarios(){

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [tipo, setTipo] = useState('');

    const [adelante,setAdelante]=useState(false);
    const [atras,setAtras]=useState(false);

    const nuevoUsuario=()=>{
        handleOpen();
        reset()
        setTipo('nuevoUsuario')
    }

    const TABLE_HEAD = ["Nombre del Usuario", "Email", "Contraseña", "Rol","Horarios de Atencion",""];
 

    
    const [usuarios, setUsuarios]=useState([]);
    const [filtro, setFiltro]=useState([]);
    const [alerta, setAlerta]=useState(false);
    const [mensajeRegistro,setMensajeRegistro]=useState('');
    const [idUsuario,setIdUsuario]=useState('');
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
        async function obtenerUsuarios(){
        try {
            const r= await obtenerUsuariosRequest(pagina,datosbuscados);
            setUsuarios(r.data.docs);
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
    obtenerUsuarios();
    },[])

    const busquedaUsuarios=async (e)=>{
        const query = e.target.value.toUpperCase();
        setDatosbuscados(query);      
    }
    useEffect(()=>{
            async function buscado (){
                try {
                    const r= await obtenerUsuariosRequest(pagina,datosbuscados);
                    setUsuarios(r.data.docs);
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

    const agregarUsuario=handleSubmit(async e => {
        try{
            const re=await registrarUsuariosRequest(e);
            const r= await obtenerUsuariosRequest(pagina,datosbuscados);
            setUsuarios(r.data.docs);
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

    const editarUsuario=(e) =>{
        const filtered = usuarios.filter(usuario => 
            usuario._id.toLowerCase().includes(e)
        );
        setTipo("actualizar")
        setValue("username",filtered[0].username);
        setValue("email",filtered[0].email);
        setValue("rol",filtered[0].rol);
        setIdUsuario(filtered[0]._id)
        handleOpen(true);
    }
    

    const guardarUsuarioEditado=handleSubmit(async e => {
        try{
            const res=await editarUsuariosRequest({_id:idUsuario},e);
            const r= await obtenerUsuariosRequest(pagina,datosbuscados);
            setUsuarios(r.data.docs);
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

    const eliminarUsuario=(async (_id)=>{
        const cookies=Cookies.get();
            if(cookies.token){
                try{
                    const res=await eliminarUsuariosRequest({_id:_id},cookies.token);
                    const r= await obtenerUsuariosRequest(pagina,datosbuscados);
                    setUsuarios(r.data.docs);
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
        const r= await obtenerUsuariosRequest(pagina+1,datosbuscados);
        setUsuarios(r.data.docs);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    const botonAtras=async ()=>{
        const r= await obtenerUsuariosRequest(pagina-1,datosbuscados);
        setUsuarios(r.data.docs);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    const navDirecto=async(e)=>{
        const r= await obtenerUsuariosRequest(e , datosbuscados);
        setUsuarios(r.data.docs);
        setFiltro(r.data.docs);
        setAdelante(r.data.hasNextPage);
        setAtras(r.data.hasPrevPage);
        setPaginas(r.data.totalPages);
        setPagina(r.data.page);
    }

    //HORARIOS DE ATENICON DEL DOCTOR

    const {
        register: register1,
        handleSubmit: handleSubmit1,
        reset: reset1,
        setValue: setValue1,
        formState: { errors: errors1 }
    } = useForm();

    const [open3, setOpen3] = useState(false);
    const handleOpen3 = () => setOpen3((cur) => !cur);

    const [tipo3, setTipo3] = useState(true);
    const [nombreDoctor, setNombreDoctor]=useState('');
    const [idDoctor, setIddoctor]=useState('');
    
    const agregarHorario=async (id, nombre)=>{
        setTipo3(true);
        reset1();
        setNombreDoctor(nombre);
        setValue1("id", id);
        handleOpen3();
    };

    const editarHorario=async (id, nombre)=>{
        const filtered = usuarios.filter(usuario => 
            usuario._id.includes(id)
        );
        setTipo3(false);
        setNombreDoctor(nombre);
        setValue1("id", id);
        setValue1("horarioatencion",filtered[0].horarios);
        handleOpen3();
    };

    const agregarHorarioDoctor = handleSubmit1(async e =>{
        try{
            const res=await registrarhorario(e);
            const r= await obtenerUsuariosRequest(pagina,datosbuscados);
            setUsuarios(r.data.docs);
            setFiltro(r.data.docs);
        }
        catch(error){
            console.log(error);
        }
        finally{
            reset1();
            handleOpen3();
        }
    });
    const editarHorarioDoctor= handleSubmit1(async(e)=>{
        try{
            const res=await registrarhorario(e);
            const r= await obtenerUsuariosRequest(pagina,datosbuscados);
            setUsuarios(r.data.docs);
            setFiltro(r.data.docs);
        }
        catch(error){
            console.log(error);
        }
        finally{
            reset1();
            handleOpen3();
        }
    });
    
    return (
        <div className="flex">
            <SidebarWithBurgerMenu/>
            <div className="lg:ml-80 flex flex-col w-full sm:absolute md:relative lg:overflow-auto">                
                <div className="text-gray-800 text-4xl flex mt-6">
                    <div className="sm:w-full sm:flex sm:flex-col sm:mt-10 md:mb-6 sm:justify-center sm:items-center lg:flex-row lg:justify-between lg:w-10/12 lg:mx-auto">
                        <h1 className="sm:text-2xl lg:text-4xl lg:font-extralight flex">
                            <UsersIcon className="w-10 mr-3"/>
                            Gestión de Usuarios
                        </h1>
                        <Button onClick={nuevoUsuario} className="bg-green-800">Registrar Usuarios</Button>
                    </div>

                    <Dialog
                        size="xs"
                        open={open3}
                        handler={handleOpen3}
                        className="bg-transparent shadow-none"
                    >
                        <Card className="mx-auto w-full max-w-[30rem]">
                            <form onSubmit={tipo3?agregarHorarioDoctor:editarHorarioDoctor}>
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        {
                                            tipo3?
                                                <>Nuevo Horario</>
                                            :
                                                <>Editar Horario</>
                                        }
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        Ingresa los Horarios del Doctor {nombreDoctor}
                                    </Typography>
                                    
                                    <Textarea 
                                        label="Ej.: Turno mañana: 08:00 - 12:00"
                                        type="text"
                                        size="lg"
                                        name="horarioatencion"
                                        {
                                            ...register1("horarioatencion",{
                                                required:{
                                                    value:true,
                                                    message:"El horario de atención es requerido"
                                                },
                                        })}
                                    />
                                    {errors1.horarioatencion && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors1.horarioatencion.message}</Alert>}
                                </CardBody>
                                <CardFooter className="pt-0 flex flex-col">
                                    <div className="flex w-full justify-between mt-5">
                                        <Button
                                            variant="text"
                                            color="red"
                                            onClick={() => handleOpen3(null)}
                                            className="mr-1"
                                        >
                                            <span>Cancelar</span>
                                        </Button>
                                        <Button 
                                            variant="gradient"
                                            type="submit" 
                                        >
                                            {
                                                tipo3===true?
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


                    <Dialog
                        size="xs"
                        open={open}
                        handler={handleOpen}
                        className="bg-transparent shadow-none"
                    >
                        <Card className="mx-auto w-full max-w-[30rem]">
                            <form onSubmit={tipo==="nuevoUsuario"?agregarUsuario:guardarUsuarioEditado}>
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        {
                                            tipo==='nuevoUsuario'?
                                                <>Nuevo Usuario</>
                                            :
                                                <>Editar Usuario</>
                                        }
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        Nombre Completo
                                    </Typography>
                                    <Input 
                                        label="Ej.: Juan Mamani"
                                        type="text"
                                        size="lg"
                                        name="username"
                                        {
                                            ...register("username",{
                                                required:{
                                                    value:true,
                                                    message:"El nombre de usuario es requerido"
                                                },
                                                pattern:{
                                                    value: /^[A-Z\s]+$/,
                                                    message:"El nombre de usuario solo puede contener MAYÚSCULAS"
                                                }
                                        })}
                                    />
                                    {errors.username && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.username.message}</Alert>}
                                    <Typography className="-mb-2" variant="h6">
                                        E-mail
                                    </Typography>
                                    <Input 
                                        label="Ej.: persona@gmail.com"
                                        type="email"
                                        size="lg"
                                        name="email"
                                        {
                                            ...register("email",{
                                                required:{
                                                    value: true,
                                                    message:"El email es requerido"
                                                }
                                            })
                                        }
                                    />
                                    {errors.email && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.email.message}</Alert>}
                                    <Typography className="-mb-2" variant="h6">
                                        Contraseña
                                    </Typography>
                                    <Input 
                                        label="Ej.: 12345678" 
                                        type="password" 
                                        size="lg"
                                        name="password"
                                        {...register("password",{
                                            required:{
                                                value:true,
                                                message:"La contraseña es requerida"
                                            }
                                        })}
                                    />
                                    {errors.password && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.password.message}</Alert>}
                                </CardBody>
                                <CardFooter className="pt-0 flex flex-col">
                                    <div className="flex flex-col">
                                        <Typography className="" variant="h6">
                                            Rol
                                        </Typography>
                                        <br />
                                        <div className="w-full flex sm:flex-wrap md:flex-row sm:items-center sm:justify-center items-center -mt-8  sm:-ml-2">
                                            <Radio 
                                                name="rol" 
                                                label="Admin."
                                                value={'Administrador'}
                                                {...register("rol", { 
                                                    required:{
                                                        value:true,
                                                        message: "El rol es requerido" 
                                                    }
                                                })} 
                                            />
                                            <Radio 
                                                name="rol" 
                                                label="Doctor"
                                                value={'Doctor'}
                                                {...register("rol", { 
                                                    required:{
                                                        value:true,
                                                        message: "El rol es requerido" 
                                                    }
                                                })}     
                                            />
                                            <Radio 
                                                name="rol"
                                                label="Paciente" 
                                                value={'Paciente'}
                                                {...register("rol", { 
                                                    required:{
                                                        value:true,
                                                        message: "El rol es requerido" 
                                                    }
                                                })}     
                                            />
                                        </div>
                                        {errors.rol && <Alert className="text-red-800 rounded-lg bg-red-100 py-1">{errors.rol.message}</Alert>}
                                    </div>
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
                                            {
                                                tipo==='nuevoUsuario'?
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
                <Alert open={alerta} onClose={() => setAlerta(false)} className="mt-8 w-10/12 mx-auto" style={mensajeRegistro=='El correo ya existe'?{backgroundColor:'red'}:{backgroundColor:'green'}}>
                    {mensajeRegistro}
                </Alert>
                <div className="w-11/12 mx-auto">
                    <Card className="h-full w-full">
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="flex sm:w-12/12 lg:w-11/12 md:items-center md:justify-end">
                                <div className="flex sm:w-full sm:justify-center shrink-0 gap-2 md:w-max mt-2">
                                    <div className="sm:w-12/12 md:w-72 lg:mb-8">
                                        <Input
                                            label="Buscar Usuarios"
                                            icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                                            onKeyUp={busquedaUsuarios}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-x-scroll px-0 sm:w-10/12 mx-auto">
                            <table className="sm:w-10/12 border-2 md:w-11/12text-left table table-auto mx-auto">
                            <thead>
                                <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                        <Typography
                                            variant="small-caps"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-80"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                                </tr>
                            </thead>

                            <tbody>
                                {filtro.map(({_id,username,email,password,horarios,rol}, index) => {
                                    const isLast = index === usuarios.length - 1;
                                    const classes = isLast
                                    ? "p-4 w-8/12"
                                    : "p-4 border-b border-blue-gray-50";
                    
                                    return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <div className="flex items-center justify-center gap-3 w-40 text-center">
                                                <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                                >
                                                    {username}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                <Chip 
                                                    value={email} 
                                                    variant="gradient" 
                                                    icon={<SwatchIcon />}
                                                    color="cyan" 
                                                />
                                                
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center justify-center gap-3 w-96 text-center">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    <Chip 
                                                        value={password} 
                                                        variant="gradient" 
                                                        icon={<KeyIcon />}
                                                        color="amber" 
                                                        className="font-light text-wrap break-all"
                                                    />
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="text-center">
                                                <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={rol}
                                                icon={<UserIcon/>}
                                                color={
                                                    rol === "Administrador"
                                                    ? "green"
                                                    : rol === "Doctor"
                                                    ? "amber"
                                                    : "red"
                                                }
                                                />
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <div className="text-center w-80">
                                                {
                                                    rol=="Doctor"?
                                                        horarios?
                                                            <div className="flex flex-row">
                                                                <Chip
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    value={horarios}
                                                                    icon={<ClockIcon/>}
                                                                    color={"amber"}
                                                                    className="mr-3 whitespace-pre-wrap text-left"
                                                                />
                                                                <Tooltip content="Editar horario">
                                                                    <IconButton variant="text" className="bg-pink-400 hover:bg-pink-300 text-white" onClick={()=> editarHorario(_id,username)}>
                                                                        <PencilIcon className="h-4 w-4" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
                                                        :
                                                        <Tooltip content="Agregar horario">
                                                            <IconButton variant="text" className="bg-green-400 hover:bg-green-300" onClick={()=> agregarHorario(_id,username)}>
                                                                <PlusIcon className="h-4 w-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    :
                                                    <></>
                                                }
                                            </div>
                                        </td>
                                        
                                        <td className={`${classes}`}>
                                            <div className="flex justify-center items-center gap-2">
                                                <Tooltip content="Editar Usuario">
                                                    <IconButton variant="text" className="bg-orange-400 hover:bg-orange-300" onClick={()=> editarUsuario(_id)}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Eliminar Usuario">
                                                    <IconButton variant="text" className="bg-red-700 hover:bg-red-400" onClick={()=>eliminarUsuario(_id)}>
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
    );
}