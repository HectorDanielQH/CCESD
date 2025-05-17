import { useForm } from "react-hook-form";
import { SidebarWithBurgerMenu } from "../../../components/navdash";
import { Alert, Button, Carousel, Input, Textarea, Typography } from "@material-tailwind/react";
import { guardarArchivosRequest } from "../../../api/subirArchivos";
import { useEffect, useState } from "react";
import img1 from '../../../assets/images/img1.png';
import img2 from '../../../assets/images/img2.png';
import img3 from '../../../assets/images/img3.png';
import img4 from '../../../assets/images/img4.png';
import img5 from '../../../assets/images/img5.png';
import img6 from '../../../assets/images/img6.png';

export default function GestionPublicaciones(){
    const [image,setImage]=useState(null);
    const [image2,setImage2]=useState(null);
    const [image3,setImage3]=useState(null);
    const [image4,setImage4]=useState(null);
    const [image5,setImage5]=useState(null);
    const [image6,setImage6]=useState(null);
    const [video,setVideo]=useState(null);
    const [servicios1,setServicios1]=useState(null);
    const [servicios2,setServicios2]=useState(null);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        watch,
        formState: { errors }
    } = useForm({
        mode: "onChange",
    });

    const watchedFields = watch();

    useEffect(()=>{
        const file = getValues('archivo')?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        const file2 = getValues('archivo2')?.[0];
        if (file2) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage2(reader.result);
            };
            reader.readAsDataURL(file2);
        }

        const file3 = getValues('archivo3')?.[0];
        if (file3) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage3(reader.result);
            };
            reader.readAsDataURL(file3);
        }

        const file4 = getValues('archivo4')?.[0];
        if (file4) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage4(reader.result);
            };
            reader.readAsDataURL(file4);
        }

        const file5 = getValues('archivo5')?.[0];
        if (file5) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage5(reader.result);
            };
            reader.readAsDataURL(file5);
        }

        const file6 = getValues('archivo6')?.[0];
        if (file6) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage6(reader.result);
            };
            reader.readAsDataURL(file6);
        }


        const videos = getValues('video')?.[0];
        if (videos) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideo(reader.result);
            };
            reader.readAsDataURL(videos);
        }


        const servicio1 = getValues('servicios1')?.[0];
        if (servicio1) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setServicios1(reader.result);
            };
            reader.readAsDataURL(servicio1);
        }


        const servicio2 = getValues('servicios2')?.[0];
        if (servicio2) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setServicios2(reader.result);
            };
            reader.readAsDataURL(servicio2);
        }
    },[watchedFields])

    const subirDatos=(handleSubmit(async (data) =>{
        const formData = new FormData();
        formData.append("archivo", data.archivo[0]);
        formData.append("archivo2", data.archivo2[0]);
        formData.append("archivo3", data.archivo3[0]);
        formData.append("archivo4", data.archivo4[0]);
        formData.append("archivo5", data.archivo5[0]);
        formData.append("archivo6", data.archivo6[0]);
        formData.append("razondeser", data.razondeser);
        formData.append("video", data.video[0]);
        formData.append("servicios1", data.servicios1[0]);
        formData.append("servicios2", data.servicios2[0]);
        try {
            const response = await guardarArchivosRequest(formData,data.razondeser);
            console.log(response.data)
            reset();
            setImage(null);
            setImage2(null);
            setImage3(null);
            setImage4(null);
            setImage5(null);
            setImage6(null);
            setVideo(null);
            setServicios1(null);
            setServicios2(null);
        } catch (error) {
        console.error("Error al subir el archivo:", error);
        }
    }))
    return (
        <div className="flex">
            <SidebarWithBurgerMenu/>
            <div className="lg:ml-80 flex flex-col w-full sm:absolute md:relative lg:overflow-auto">                
                <h1 className="text-blue-gray-800 font-light w-full text-4xl text-center mt-10">
                    MODIFICACIÓN DE LA PÁGINA PRINCIPAL
                </h1>
                <h2 className="bg-pink-600 rounded-lg w-10/12 sm:text-2xl py-4 mx-auto font-semibold text-4xl text-center mt-10">
                    Carrusel de Imágenes
                </h2>
                <div className="flex justify-center items-center">
                    <Carousel 
                        className="rounded-xl sm:w-5/6 md:w-4/5 lg: relative top-12"
                        transition={{type: "mirror", duration: 2 }}
                        autoplay={true}
                        autoplayDelay={'4000'} 
                        loop={true}
                    >

                        <img
                            src={img1}
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src={img2}
                            alt="image 2"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src={img3}
                            alt="image 3"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src={img4}
                            alt="image 4"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src={img5}
                            alt="image 5"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src={img6}
                            alt="image 6"
                            className="h-full w-full object-cover"
                        />
                    </Carousel>
                </div>
                <form onSubmit={subirDatos} className="mt-24">
                    <div className="flex lg:flex-row lg:gap-4 sm:flex-col sm:w-10/12 sm:justify-between sm:items-center m-auto">
                        <div className="flex flex-col sm:w-11/12 sm:mb-8 sm:p-8 rounded-2xl shadow-md bg-gray-50 md:w-full">
                            <Typography variant="h4" className="text-pink-600 sm:text-lg sm:text-center">
                                Imagen del carrusel (1)
                            </Typography>
                            <div className="flex justify-center items-center my-4">
                                {image && <img src={image} alt="Preview" className="mt-4 w-[500px] h-[400px]" />}
                            </div>
                            <Input 
                                label="Selecciona una Imagen"
                                type="file"
                                size="md"
                                name="archivo"
                                className="w-full"
                                {
                                    ...register("archivo",{
                                        required:{
                                            value: true,
                                            message:"El archivo es requerido"
                                        }
                                    })
                                }
                            />
                            {errors.archivo && <Alert className="text-red-800 mt-5 rounded-lg bg-red-100 py-1">{errors.archivo.message}</Alert>}
                        </div>

                        <div className="flex flex-col sm:w-11/12 sm:mb-8 sm:p-8 rounded-2xl shadow-md bg-gray-50 md:w-full">
                            <Typography variant="h4" className="text-pink-600 sm:text-lg sm:text-center">
                                Imagen del carrusel (2)
                            </Typography>

                            <div className="flex justify-center items-center my-4">
                                {image2 && <img src={image2} alt="Preview" className="mt-4 w-[500px] h-[400px]" />}
                            </div>
                            <Input 
                                label="Selecciona una Imagen"
                                type="file"
                                size="md"
                                name="archivo2"
                                className="w-full"
                                {
                                    ...register("archivo2",{
                                        required:{
                                            value: true,
                                            message:"El archivo es requerido"
                                        }
                                    })
                                }
                            />

                            {errors.archivo2 && <Alert className="text-red-800 mt-5 rounded-lg bg-red-100 py-1">{errors.archivo2.message}</Alert>}
                        </div>
                        
                    </div>
                    
                    <div className="flex lg:flex-row lg:gap-4 sm:flex-col sm:w-10/12 sm:justify-between sm:items-center m-auto">
                        <div className="flex flex-col sm:w-11/12 sm:mb-8 sm:p-8 rounded-2xl shadow-md bg-gray-50 md:w-full">
                            <Typography variant="h4" className="text-pink-600 sm:text-lg sm:text-center">
                                Imagen del carrusel (3)
                            </Typography>

                            <div className="flex justify-center items-center my-4">
                                {image3 && <img src={image3} alt="Preview" className="mt-4 w-[500px] h-[400px]" />}
                            </div>
                            <Input 
                                label="Selecciona una Imagen"
                                type="file"
                                size="md"
                                name="archivo3"
                                className="w-full"
                                {
                                    ...register("archivo3",{
                                        required:{
                                            value: true,
                                            message:"El archivo es requerido"
                                        }
                                    })
                                }
                            />
                            {errors.archivo3 && <Alert className="text-red-800 mt-5 rounded-lg bg-red-100 py-1">{errors.archivo3.message}</Alert>}
                        </div>

                        <div className="flex flex-col sm:w-11/12 sm:mb-8 sm:p-8 rounded-2xl shadow-md bg-gray-50 md:w-full">
                            <Typography variant="h4" className="text-pink-600 sm:text-lg sm:text-center">
                                Imagen del carrusel (4)
                            </Typography>
                            
                            <div className="flex justify-center items-center my-4">
                                {image4 && <img src={image4} alt="Preview" className="mt-4 w-[500px] h-[400px]" />}
                            </div>
                            <Input 
                                label="Selecciona una Imagen"
                                type="file"
                                size="md"
                                name="archivo4"
                                className="w-full"
                                {
                                    ...register("archivo4",{
                                        required:{
                                            value: true,
                                            message:"El archivo es requerido"
                                        }
                                    })
                                }
                            />
                            {errors.archivo4 && <Alert className="text-red-800 mt-5 rounded-lg bg-red-100 py-1">{errors.archivo4.message}</Alert>}
                        </div>
                    </div>

                    
                    <div className="flex lg:flex-row lg:gap-4 sm:flex-col sm:w-10/12 sm:justify-between sm:items-center m-auto">
                        <div className="flex flex-col sm:w-11/12 sm:mb-8 sm:p-8 rounded-2xl shadow-md bg-gray-50 md:w-full">
                            <Typography variant="h4" className="text-pink-600 sm:text-lg sm:text-center">
                                Imagen del carrusel (5)
                            </Typography>

                            <div className="flex justify-center items-center my-4">
                                {image5 && <img src={image5} alt="Preview" className="mt-4 w-[500px] h-[400px]" />}
                            </div>
                            <Input 
                                label="Selecciona una Imagen"
                                type="file"
                                size="md"
                                name="archivo5"
                                className="w-full"
                                {
                                    ...register("archivo5",{
                                        required:{
                                            value: true,
                                            message:"El archivo es requerido"
                                        }
                                    })
                                }
                            />
                            {errors.archivo5 && <Alert className="text-red-800 mt-5 rounded-lg bg-red-100 py-1">{errors.archivo5.message}</Alert>}
                        </div>

                        <div className="flex flex-col sm:w-11/12 sm:mb-8 sm:p-8 rounded-2xl shadow-md bg-gray-50 md:w-full">
                            <Typography variant="h4" className="text-pink-600 sm:text-lg sm:text-center">
                                Imagen del carrusel (6)
                            </Typography>

                            <div className="flex justify-center items-center my-4">
                                {image6 && <img src={image6} alt="Preview" className="mt-4 w-[500px] h-[400px]" />}
                            </div>
                            <Input 
                                label="Selecciona una Imagen"
                                type="file"
                                size="md"
                                name="archivo6"
                                className="w-full"
                                {
                                    ...register("archivo6",{
                                        required:{
                                            value: true,
                                            message:"El archivo es requerido"
                                        }
                                    })
                                }
                            />

                            {errors.archivo6 && <Alert className="text-red-800 mt-5 rounded-lg bg-red-100 py-1">{errors.archivo6.message}</Alert>}
                        </div>
                    </div>

                    <h2 className="bg-cyan-500 rounded-lg w-10/12 sm:text-2xl py-4 mx-auto font-semibold text-4xl text-center">
                        Razon de Ser
                    </h2>

                    <div className="flex sm:w-full justify-center items-center m-auto">
                        <div className="flex flex-col w-10/12 sm:mt-10">
                            <Textarea
                                color="gray" 
                                label="Ej.: La razon de ser de la entidad es cuidar..."
                                name="razondeser" 
                                {
                                    ...register("razondeser",{
                                        required:{
                                            value: true,
                                            message:"La Razón de Ser es requerida"
                                        }
                                    })
                                }
                                
                            />
                            {errors.razondeser && <Alert className="text-red-800 mt-5 rounded-lg bg-red-100 py-1">{errors.razondeser.message}</Alert>}                                    
                        </div>
                    </div>       

                    <h2 className="bg-orange-600 rounded-lg w-10/12 sm:text-2xl py-4 mx-auto font-semibold text-4xl text-center mt-10">
                        Nuestros Servicios
                    </h2>

                    <div className="flex lg:flex-row lg:gap-4 sm:flex-col sm:w-10/12 sm:justify-between sm:items-center m-auto">
                        <div className="flex flex-col sm:w-11/12 sm:mb-8 sm:p-8 rounded-2xl shadow-md bg-gray-50 md:w-full">
                            <Typography variant="h4" className="text-orange-800 sm:text-lg sm:text-center">
                                Video Publicitario
                            </Typography>

                            <div className="flex justify-center items-center mb-6">
                                {video && <video src={video} controls alt="Preview" className="w-[500px] h-[400px]" />}
                            </div>
                            <Input 
                                label="Selecciona una Imagen"
                                type="file"
                                size="md"
                                name="video"
                                className="w-full"
                                {
                                    ...register("video",{
                                        required:{
                                            value: true,
                                            message:"El archivo es requerido"
                                        }
                                    })
                                }
                            />

                            {errors.video && <Alert className="text-red-800 mt-5 rounded-lg bg-red-100 py-1">{errors.video.message}</Alert>}
                        </div>

                        <div className="flex flex-col sm:w-11/12 sm:mb-8 sm:p-8 rounded-2xl shadow-md bg-gray-50 md:w-full">
                            <Typography variant="h4" className="text-orange-800 sm:text-lg sm:text-center">
                                Imagen Publicitaria (1)
                            </Typography>
                            
                            <div className="flex justify-center items-center mb-6">
                                {servicios1 && <img src={servicios1} alt="Preview" className="mt-4 w-[500px] h-[400px]" />}
                            </div>
                            <Input 
                                label="Selecciona una Imagen"
                                type="file"
                                size="md"
                                name="servicios1"
                                className="w-full"
                                {
                                    ...register("servicios1",{
                                        required:{
                                            value: true,
                                            message:"El archivo es requerido"
                                        }
                                    })
                                }
                            />

                            {errors.servicios1 && <Alert className="text-red-800 mt-5 rounded-lg bg-red-100 py-1">{errors.servicios1.message}</Alert>}

                        </div>
                    </div>

                    
                    <div className="flex sm:flex-col w-10/12 justify-between items-center m-auto">
                        <div className="flex flex-col sm:w-11/12 sm:mb-8 sm:p-8 rounded-2xl shadow-md bg-gray-50 md:w-full">
                            <Typography variant="h4" className="text-orange-800 sm:text-lg sm:text-center">
                                Imagen Publicitaria (2)
                            </Typography>

                            <div className="flex justify-center items-center my-4">
                                {servicios2 && <img src={servicios2} alt="Preview" className="mt-4 w-[500px] h-[400px]" />}
                            </div>
                            <Input 
                                label="Selecciona una Imagen"
                                type="file"
                                size="md"
                                name="servicios2"
                                className="w-full"
                                {
                                    ...register("servicios2",{
                                        required:{
                                            value: true,
                                            message:"El archivo es requerido"
                                        }
                                    })
                                }
                            />

                            {errors.servicios2 && <Alert className="text-red-800 mt-5 rounded-lg bg-red-100 py-1">{errors.servicios2.message}</Alert>}
                        </div>
                    </div>

                    <div className="w-full flex justify-end items-end">
                        <Button
                            className="my-12 text-lg sm:mr-12 w-64 py-4 bg-green-900 animate-bounce hover:bg-green-600"
                            type="submit"
                        >
                            Actualizar Página
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}