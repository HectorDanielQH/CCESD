import { useEffect, useState } from "react";
import { SidebarWithBurgerMenu } from "../../components/navdash";
import { useAuth } from "../../context/AuthContext";
import { DocumentIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardFooter, CardHeader, Dialog, Input, Typography } from "@material-tailwind/react";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import { listatotalpacientes, pdfListaDoctor, pdfListaPacienteDoctor, pdfListaporDoctor } from "../../api/pdf";
import { PDFDownloadLink} from "@react-pdf/renderer";
import PDF from "../../pdfReact/Doctor/doctor";
import PDFGeneral from "../../pdfReact/Doctor/doctorGeneral";
import PDFadministrador from "../../pdfReact/Administrador/doctor";
import PDFadministradorlista from "../../pdfReact/Administrador/doctorlista";
import PDFGeneralAdministrador from "../../pdfReact/Administrador/doctorGeneral";

export default function ReportesAdministrador(){
    const {user} = useAuth();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [pacientes,setPacientes] = useState([]);
    
    useEffect(() => {
        async function cargarPacientes() {
            const r = await listatotalpacientes();
            const pacientesUnicos = new Map();
            r.data.forEach(element => {
                if (!pacientesUnicos.has(element.idPaciente)) {
                    pacientesUnicos.set(element.idPaciente, {
                        value: element.idPaciente,
                        label: element.nombrePaciente
                    });
                }
            });

            setPacientes(Array.from(pacientesUnicos.values()));
        }

        cargarPacientes();
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();


    useEffect(() =>{
        if(!open){
            reset();
            setActivardescarga(true);
        }
    }, [open]);



    const [datospdfdoctor,setDatospdfdoctor]=useState([]);
    const obtenerReportePaciente=handleSubmit((async e => {
        try{
            const r=await pdfListaPacienteDoctor(e.paciente,e.fechainicio,e.fechafin);
            setDatospdfdoctor(r.data);
        } catch (error) {
            console.error('Error al descargar el PDF:', error);
        }
    }));

    const [activardescarga,setActivardescarga]=useState(true);

    //SEGUNDO REPORTE

    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2((cur) => !cur);
    const [activardescarga2,setActivardescarga2]=useState(true);
    const [datospdfdoctor2,setDatospdfdoctor2]=useState([]);


    const {
        register: registerForm1,
        handleSubmit: handleSubmitForm1,
        reset: resetForm1,
        setValue: setValueForm1,
        formState: { errors: errorsForm1 }
    } = useForm();
    
    const obtenerReportePacientes=handleSubmitForm1((async e => {
        try{
            const r=await pdfListaDoctor(e.fechainicio,e.fechafin);
            setDatospdfdoctor2(r.data);
        } catch (error) {
            console.error('Error al descargar el PDF:', error);
        }
    }));

    useEffect(() =>{
        if(!open2){
            resetForm1();
            setActivardescarga2(true);
        }
    }, [open2]);

    //DOCTORES

    const [open3, setOpen3] = useState(false);
    const handleOpen3 = () => setOpen3((cur) => !cur);

    const [doctores,setDoctores] = useState([]);
    
    useEffect(() => {
        async function cargaDoctores() {
            const r = await listatotalpacientes();
            const doctoresUnicos = new Map();
            r.data.forEach(element => {
                if (!doctoresUnicos.has(element.idDoctor)) {
                    doctoresUnicos.set(element.idDoctor, {
                        value: element.idDoctor,
                        label: element.nombreDoctor
                    });
                }
            });

            setDoctores(Array.from(doctoresUnicos.values()));
        }

        cargaDoctores();
    }, []);

    const {
        register: registerForm2,
        handleSubmit: handleSubmitForm2,
        reset: resetForm2,
        setValue: setValueForm2,
        formState: { errors: errorsForm2 }
    } = useForm();

    useEffect(() =>{
        if(!open3){
            resetForm2();
            setActivardescarga3(true);
        }
    }, [open3]);



    const [datospdfdoctor3,setDatospdfdoctor3]=useState([]);
    const obtenerReporteporDoctor=handleSubmitForm2((async e => {
        try{
            const r=await pdfListaporDoctor(e.doctor,e.fechainicio,e.fechafin);
            console.log(r.data);
            setDatospdfdoctor3(r.data);
        } catch (error) {
            console.error('Error al descargar el PDF:', error);
        }
    }));

    const [activardescarga3,setActivardescarga3]=useState(true);


    return(
        <div>
            <SidebarWithBurgerMenu/>
            <div className="lg:ml-80 flex flex-col sm:absolute md:relative lg:overflow-auto">                
                <div className="text-gray-800 text-4xl flex flex-col mt-6">
                    <div className="sm:w-full sm:flex sm:flex-col sm:mt-10 md:mb-6 sm:justify-center sm:items-center lg:flex-row lg:justify-between lg:w-10/12 lg:mx-auto">
                        <h1 className="sm:text-2xl lg:text-4xl lg:font-extralight flex">
                            <DocumentIcon className="w-10 mr-3"/>
                            Reportes de pacientes
                        </h1>
                    </div>

                    <Dialog
                        size="xs"
                        open={open}
                        handler={handleOpen}
                        className="bg-transparent shadow-none"
                    >
                        <form onSubmit={obtenerReportePaciente}>
                            <Card className="mx-auto w-full max-w-[24rem]">
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        Generador de Reportes
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        Selecciona al paciente
                                    </Typography>
                                    <Select 
                                        options={pacientes} 
                                        className="selection:border-gray-600"
                                        placeholder="Selecciona al paciente"
                                        required
                                        onChange={(selectedOption) => {
                                            setValue("paciente", selectedOption.value);
                                        }}
                                    />
                                    <input 
                                        type="hidden"
                                        {
                                            ...register("paciente")
                                        }  
                                    />
                                    <Typography className="-mb-2" variant="h6">
                                        Selecciona la Fecha de Inicio
                                    </Typography>
                                    <Input 
                                        label="Password" 
                                        size="lg" 
                                        type="date"
                                        required
                                        {
                                            ...register("fechainicio",{
                                                required:{
                                                    value: true,
                                                    message:"La fecha de inicio es requerido"
                                                }
                                            })
                                        }  
                                    />

                                    <Typography className="-mb-2" variant="h6">
                                        Selecciona la Fecha de Fin
                                    </Typography>

                                    <Input 
                                        label="Password" 
                                        size="lg" 
                                        type="date"
                                        required
                                        {
                                            ...register("fechafin",{
                                                required:{
                                                    value: true,
                                                    message:"La fecha de finalizacion es requerido"
                                                }
                                            })
                                        }
                                    />
                                    
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button onClick={()=>setActivardescarga(false)} className="bg-green-800" type="submit" fullWidth>
                                        Generar Reporte
                                    </Button>
                                    <Button className="bg-pink-500 mt-4 p-0" fullWidth disabled={activardescarga}>
                                        <PDFDownloadLink document={<PDFadministrador objetos={datospdfdoctor}/>} fileName="reportepacientes.pdf" style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            padding:10,
                                            margin:0
                                        }}>
                                            {({ blob, url, loading, error }) =>
                                                loading ? 'Creando documento...' : 'Descargar'
                                            }
                                        </PDFDownloadLink>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </Dialog>



                    <Dialog
                        size="xs"
                        open={open3}
                        handler={handleOpen3}
                        className="bg-transparent shadow-none"
                    >
                        <form onSubmit={obtenerReporteporDoctor}>
                            <Card className="mx-auto w-full max-w-[24rem]">
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        Generador de Reportes
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        Selecciona al Doctor
                                    </Typography>
                                    <Select 
                                        options={doctores} 
                                        className="selection:border-gray-600"
                                        placeholder="Selecciona al Doctor"
                                        required
                                        onChange={(selectedOption) => {
                                            setValueForm2("doctor", selectedOption.value);
                                        }}
                                    />
                                    <input 
                                        type="hidden"
                                        {
                                            ...registerForm2("doctor")
                                        }  
                                    />
                                    <Typography className="-mb-2" variant="h6">
                                        Selecciona la Fecha de Inicio
                                    </Typography>
                                    <Input 
                                        label="Password" 
                                        size="lg" 
                                        type="date"
                                        required
                                        {
                                            ...registerForm2("fechainicio",{
                                                required:{
                                                    value: true,
                                                    message:"La fecha de inicio es requerido"
                                                }
                                            })
                                        }  
                                    />

                                    <Typography className="-mb-2" variant="h6">
                                        Selecciona la Fecha de Fin
                                    </Typography>

                                    <Input 
                                        label="Password" 
                                        size="lg" 
                                        type="date"
                                        required
                                        {
                                            ...registerForm2("fechafin",{
                                                required:{
                                                    value: true,
                                                    message:"La fecha de finalizacion es requerido"
                                                }
                                            })
                                        }
                                    />
                                    
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button onClick={()=>setActivardescarga3(false)} className="bg-green-800" type="submit" fullWidth>
                                        Generar Reporte
                                    </Button>
                                    <Button className="bg-pink-500 mt-4 p-0" fullWidth disabled={activardescarga3}>
                                        <PDFDownloadLink document={<PDFadministradorlista objetos={datospdfdoctor3}/>} fileName="reportedoctores.pdf" style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            padding:10,
                                            margin:0
                                        }}>
                                            {({ blob, url, loading, error }) =>
                                                loading ? 'Creando documento...' : 'Descargar'
                                            }
                                        </PDFDownloadLink>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </Dialog>



                    <Dialog
                        size="xs"
                        open={open2}
                        handler={handleOpen2}
                        className="bg-transparent shadow-none"
                    >
                        <form onSubmit={obtenerReportePacientes}>
                            <Card className="mx-auto w-full max-w-[24rem]">
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        Generador de Reportes
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        Selecciona la Fecha de Inicio
                                    </Typography>
                                    <Input 
                                        label="Password" 
                                        size="lg" 
                                        type="date"
                                        required
                                        {
                                            ...registerForm1("fechainicio",{
                                                required:{
                                                    value: true,
                                                    message:"La fecha de inicio es requerido"
                                                }
                                            })
                                        }  
                                    />

                                    <Typography className="-mb-2" variant="h6">
                                        Selecciona la Fecha de Fin
                                    </Typography>

                                    <Input 
                                        label="Password" 
                                        size="lg" 
                                        type="date"
                                        required
                                        {
                                            ...registerForm1("fechafin",{
                                                required:{
                                                    value: true,
                                                    message:"La fecha de finalizacion es requerido"
                                                }
                                            })
                                        }
                                    />
                                    
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button onClick={()=>setActivardescarga2(false)} className="bg-green-800" type="submit" fullWidth>
                                        Generar Reporte
                                    </Button>
                                    <Button className="bg-pink-500 mt-4 p-0" fullWidth disabled={activardescarga2}>
                                        <PDFDownloadLink document={<PDFGeneralAdministrador objetos={datospdfdoctor2}/>} fileName="reportepacientes.pdf" style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            padding:10,
                                            margin:0
                                        }}>
                                            {({ blob, url, loading, error }) =>
                                                loading ? 'Creando documento...' : 'Descargar'
                                            }
                                        </PDFDownloadLink>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </Dialog>

                    <div className="w-11/12 mx-auto flex flex-wrap justify-around">
                        <Card className="w-96">
                            <CardHeader shadow={false} floated={false} className="h-96">
                                <img
                                    src="https://brandandhealth.com/wp-content/uploads/2017/09/Tipos-de-pacientes-y-co%CC%81mo-tratar-a-cada-uno-de-ellos-scaled.jpeg"
                                    className="h-full w-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <div className="mb-2 flex items-center justify-between">
                                <Typography color="blue-gray" className="font-medium">
                                    Obtener reporte por pacientes
                                </Typography>
                                <Typography color="blue-gray" className="font-medium">
                                    
                                </Typography>
                                </div>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-normal opacity-75"
                                >
                                    En esta sección puedes obtener reportes por pacientes
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button
                                    ripple={false}
                                    fullWidth={true}
                                    onClick={handleOpen}
                                    className="bg-pink-700 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                >
                                    Generar Reporte
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="w-96">
                            <CardHeader shadow={false} floated={false} className="h-96">
                                <img
                                    src="https://cdn.euroinnova.edu.es/img/subidasEditor/doctor-5871743_640-1610073541.webp"
                                    alt="card-image"
                                    className="h-full w-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <div className="mb-2 flex items-center justify-between">
                                <Typography color="blue-gray" className="font-medium">
                                    Obtener reporte las atenciones por Doctores
                                </Typography>
                                <Typography color="blue-gray" className="font-medium">
                                    
                                </Typography>
                                </div>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-normal opacity-75"
                                >
                                    En esta sección puedes obtener reportes de todas las atenciones que realizaron los Doctores
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button
                                    ripple={false}
                                    fullWidth={true}
                                    onClick={handleOpen3}
                                    className="bg-pink-700 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                >
                                    Generar Reporte
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="w-96">
                            <CardHeader shadow={false} floated={false} className="h-96">
                                <img
                                    src="https://d2lcsjo4hzzyvz.cloudfront.net/blog/wp-content/uploads/2021/08/26182000/Urgencias.jpg"
                                    alt="card-image"
                                    className="h-full w-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <div className="mb-2 flex items-center justify-between">
                                <Typography color="blue-gray" className="font-medium">
                                    Obtener reporte de todas las atenciones
                                </Typography>
                                <Typography color="blue-gray" className="font-medium">
                                    
                                </Typography>
                                </div>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-normal opacity-75"
                                >
                                    En esta sección puedes obtener reportes de todas las atenciones que realizaron todos los Doctores
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button
                                    ripple={false}
                                    fullWidth={true}
                                    onClick={handleOpen2}
                                    className="bg-pink-700 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                >
                                    Generar Reporte
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}