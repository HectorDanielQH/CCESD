import { Alert, Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Textarea, Typography } from "@material-tailwind/react";
import { SidebarWithBurgerMenu } from "../../../components/navdash";
import { ArrowLeftIcon, ArrowRightIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { eliminarComunicadoRequest, guardarComunicadoRequest, obtenerComunicadosRequest } from "../../../api/comunicado";

export default function GestionComunicados(){
    const [alerta,setAlerta]=useState(false);
    const [active, setActive] = useState(1);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
 
    const [openalerta, setOpenalerta] = useState(true);


    const getItemProps = (index) =>({
        variant: comunicadoactual === index ? "filled" : "text",
        color: "green",
        onClick: () => setActive(index),
        className: "rounded-full",
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();
    
    const next = async () => {
        if (!adelante) return;
        setActive(comunicadoactual);
        const r = await obtenerComunicadosRequest(comunicadosiguiente);
        setNumcomunicados(r.data.totalPages);
        setAtras(r.data.hasPrevPage);
        setAdelante(r.data.hasNextPage);
        setComunicados(r.data.docs);
        setComunicadoactual(r.data.page);
        setComunicadosiguiente(r.data.nextPage);
    };
    
    const prev = async () => {
        if (!atras) return;
        setActive(comunicadoactual);
        const r = await obtenerComunicadosRequest(comunicadosiguiente);
        setNumcomunicados(r.data.totalPages);
        setAtras(r.data.hasPrevPage);
        setAdelante(r.data.hasNextPage);
        setComunicados(r.data.docs);
        setComunicadoactual(r.data.page);
        setComunicadosiguiente(r.data.nextPage);
    };


    const guardarcomunicado=handleSubmit(async data => {
        const formData = new FormData();
        formData.append("comunicado", data.comunicado);
        formData.append("imagen", data.imagen[0]);

        try {
            const response = await guardarComunicadoRequest(formData);
            reset();
            handleOpen();
            setAlerta(true);
            setOpenalerta(true);
            const r = await obtenerComunicadosRequest()
            setNumcomunicados(r.data.totalPages);
            setAtras(r.data.hasPrevPage);
            setAdelante(r.data.hasNextPage);
            setComunicados(r.data.docs);
            setComunicadoactual(r.data.page);
            setComunicadosiguiente(r.data.nextPage);
        } catch (error) {
            console.error('Error al guardar el comunicado:', error);
        }
    });

    //para la tabla
    const [numcomunicados, setNumcomunicados]=useState(0);
    const [atras, setAtras]=useState(false);
    const [adelante, setAdelante]=useState(false);
    const [comunicados, setComunicados]=useState([]);
    const [comunicadoactual, setComunicadoactual]=useState(0);
    const [comunicadosiguiente, setComunicadosiguiente]=useState(0);
    useEffect(() => {
        async function archivos() {
            const response = await obtenerComunicadosRequest()
            setNumcomunicados(response.data.totalPages);
            setAtras(response.data.hasPrevPage);
            setAdelante(response.data.hasNextPage);
            setComunicados(response.data.docs);
            setComunicadoactual(response.data.page);
            setComunicadosiguiente(response.data.nextPage);
        }
        archivos();
    },[])
    

    const eliminarcomunicado=async (_id)=>{
        try{
            const response = await eliminarComunicadoRequest({_id:_id});
            const r = await obtenerComunicadosRequest()
            setNumcomunicados(r.data.totalPages);
            setAtras(r.data.hasPrevPage);
            setAdelante(r.data.hasNextPage);
            setComunicados(r.data.docs);
            setComunicadoactual(r.data.page);
            setComunicadosiguiente(r.data.nextPage);
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div className="flex flex-row">
            <SidebarWithBurgerMenu/>
            <div className="lg:ml-80 flex flex-col w-full sm:absolute md:relative lg:overflow-auto justify-center items-center">
                <div className="text-gray-800 flex flex-col text-4xl flex sm:mt-6 lg:mt-7">
                    <h1 className="text-black">Gestion de comunicados</h1>
                    <Button onClick={handleOpen} variant="gradient" color="green" className="mt-5 mb-2">
                        <span className="ml-2 flex justify-center items-center">
                            <PlusCircleIcon className="h-6 w-6 mr-4" />
                            AGREGAR COMUNICADO
                        </span>
                    </Button>
                    {
                        alerta?
                            <Alert color="blue" open={openalerta} onClose={() => setOpenalerta(false)}>
                                Comunicado guardado correctamente
                            </Alert>
                        :
                        <></>
                    }
                </div>
                <Dialog
                    open={open}
                    handler={handleOpen}
                    animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <form onSubmit={guardarcomunicado}>
                        <DialogHeader>Agrega un comunicado!!!</DialogHeader>
                        <DialogBody>
                            <Textarea
                                label="Ingresa lo que dirá el comunicado"
                                type="text"
                                size="lg"
                                name="comunicado"
                                {
                                    ...register("comunicado",{
                                        required:{
                                            value: true,
                                            message:"El comunicado es requerido"
                                        }
                                    })
                                }
                            >
                            </Textarea>
                            {errors.comunicado && <Alert className="text-red-800 rounded-lg bg-red-100 py-1 mb-3">{errors.comunicado.message}</Alert>}
                            <Input
                                label="Ingresa la imagen del comunicado"
                                type="file"
                                size="lg"
                                name="imagen"
                                {
                                    ...register("imagen",{
                                        required:{
                                            value: true,
                                            message:"El video y/o imagen es requerida"
                                        }
                                    })
                                }
                            />
                            {errors.imagen && <Alert className="text-red-800 rounded-lg bg-red-100 py-1 mt-2">{errors.imagen.message}</Alert>}
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancelar</span>
                            </Button>
                            <Button variant="gradient" color="green" type="submit">
                                <span>Confirmar</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
                <div className="flex items-center gap-4 mt-5">
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full"
                        onClick={prev}
                        disabled={!atras}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> 
                        Atras
                    </Button>
                    <div className="flex items-center gap-2">
                    {
                        Array.from({ length: numcomunicados }, (_, i) => (
                            <IconButton key={i} {...getItemProps(i + 1)}>
                                {i + 1}
                            </IconButton>
                        ))
                    }
                    </div>
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full"
                        onClick={next}
                        disabled={!adelante}
                    >
                        Adelante
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Button>
                </div>
                
                {
                    comunicados.map(({ _id, comunicado, imagen, updatedAt }, index) => {
                        return (
                            <Card key={_id} className="w-full max-w-[48rem] flex-row my-6">
                                <CardHeader
                                    shadow={false}
                                    floated={false}
                                    className="m-0 w-2/5 shrink-0 rounded-r-none"
                                >
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
                                    <div>
                                        <Button size="small" color="red" className="my-5 mr-3" onClick={()=>eliminarcomunicado(_id)}>
                                            <span>Borrar</span>
                                        </Button>
                                    </div>
                                    <Typography variant="h6" color="gray" className="mb-4 uppercase">
                                        Fecha de subida: {new Date(updatedAt).toLocaleString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </Typography>
                                    <Typography variant="h4" color="blue-gray" className="mb-2">
                                        {"Comunicado"}
                                    </Typography>
                                    <Typography color="gray" className="mb-8 font-normal">
                                        {comunicado || "Like so many organizations these days, Autodesk is a company in transition. It was until recently a traditional boxed software company selling licenses. Yet its own business model disruption is only part of the story"}
                                    </Typography>
                                </CardBody>
                            </Card>
                        );
                    })}
            </div>
        </div>
    );
}