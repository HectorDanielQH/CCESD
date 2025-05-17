import { Router } from "express";
import { login, logout, register, profile, verifyToken } from "../controllers/auth.controller.js";
import { usuarios, registrarusuarios, eliminarusuarios, editarusuarios } from "../controllers/usuarios.controller.js";
import { actualizarnombreusuario, actualizarcorreoelectronico, actualizarcontrasena } from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { resgisterSchema, loginSchema } from "../schemas/auth.schema.js";
import { resgistrarHospital, obtenerHospitales, eliminarHospital, editarHospital, obtenerHospitalesPage} from "../controllers/hospital.controller.js";
import { editarFarmacia, eliminarFarmacia, obtenerFarmacia, obtenerFarmaciaPage, resgistrarFarmacia } from "../controllers/farmacia.controller.js";
import { editarLaboratorio, eliminarLaboratorio, obtenerLaboratorios, obtenerLaboratoriosPage, resgistrarLaboratorio } from "../controllers/laboratorio.controller.js";

import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import path from "path";

import multer from "multer";
import { obtenerArchivos, resgistrarArchivo } from "../controllers/archivos.controller.js";
import { editarTelefono, eliminarTelefono, obtenerTelefono, obtenerTelefonoPage, resgistrarTelefono } from "../controllers/lineastelefonicas.js";
import { obtenerAtencion, obtenerAtencionDoctor, registrarAtencion, registrarAtencionDoctor, registrarAtencionRecetaDoctor, registrarAtencionVirtualDoctor } from "../controllers/reserva.controller.js";
import { pdfListaDoctor, pdfListaPacienteDoctor, pdfReceta } from "../controllers/pdf.controller.js";
import { pacientesPorDoctor, registrarhorario } from "../controllers/doctor.controller.js";
import { pacientepordoctor, pacientesTotal } from "../controllers/atencion.controller.js";
import { comunicadopagina, editarComunicado, eliminarComunicado, obtenerComunicados, registrarComunicado } from "../controllers/comunicados.controller.js";

const router=Router();

router.post('/register', validateSchema(resgisterSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout',authRequired, logout);

router.get('/profile/:_id', authRequired, profile);

/*GESTION DE USUARIOS*/
router.get('/obtenerusuarios', authRequired , usuarios);
router.post('/registrarusuarios', authRequired , registrarusuarios);
router.delete('/eliminarusuarios/:_id', authRequired , eliminarusuarios);
router.put('/editarusuarios/:_id', authRequired , editarusuarios);

/*Actualizar perfil*/
router.put('/actualizarnombreusuario', authRequired , actualizarnombreusuario);
router.put('/actualizarcorreoelectronico', authRequired , actualizarcorreoelectronico);
router.put('/actualizarcontrasena', authRequired , actualizarcontrasena);


/*Hospitales*/
router.post('/registrarhospital',authRequired, resgistrarHospital);
router.get('/obtenerhospitales', authRequired, obtenerHospitales);
router.delete('/eliminarhospital/:_id',authRequired, eliminarHospital);
router.put('/editarhospital/:_id',authRequired,editarHospital);

router.get('/obtenerhospitalespage', obtenerHospitalesPage);

/*Farmacias*/
router.post('/registrarfarmacia',authRequired, resgistrarFarmacia);
router.get('/obtenerfarmacias', authRequired, obtenerFarmacia);
router.delete('/eliminarfarmacia/:_id',authRequired, eliminarFarmacia);
router.put('/editarfarmacia/:_id',authRequired,editarFarmacia);

router.get('/obtenerfarmaciaspage', obtenerFarmaciaPage);


/*Linas Telefonicas*/
router.post('/registrartelefono',authRequired, resgistrarTelefono);
router.get('/obtenertelefono', authRequired, obtenerTelefono);
router.delete('/eliminartelefono/:_id',authRequired, eliminarTelefono);
router.put('/editartelefono/:_id',authRequired,editarTelefono);

router.get('/obtenertelefonopage', obtenerTelefonoPage);

/*Laboratorios*/
router.post('/registrarlaboratorio',authRequired, resgistrarLaboratorio);
router.get('/obtenerlaboratorios', authRequired, obtenerLaboratorios);
router.delete('/eliminarlaboratorio/:_id',authRequired, eliminarLaboratorio);
router.put('/editarlaboratorio/:_id',authRequired,editarLaboratorio);

router.get('/obtenerlaboratoriospage', obtenerLaboratoriosPage);

/**SUBIDA DE ARCHIVOS */

const storage= multer.diskStorage({
    destination: function (req, file, cb){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const uploadDir = path.join(__dirname, '../..', 'public/uploads');
        fs.ensureDirSync(uploadDir);
        return cb(null,"./public/uploads")
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload=multer({storage});

router.post('/subirArchivo',authRequired,
  upload.fields([
    {name:'archivo', maxCount:1}, 
    {name:'archivo2', maxCount:1},
    {name:'archivo3', maxCount:1}, 
    {name:'archivo4', maxCount:1},
    {name:'archivo5', maxCount:1}, 
    {name:'archivo6', maxCount:1},
    {name:'video', maxCount:1}, 
    {name:'servicios1', maxCount:1},
    {name:'servicios2', maxCount:1}, 
]),resgistrarArchivo);

router.get('/obtenerarchivos', obtenerArchivos);

//PACIENTE
//PACIENTE RESERVA ATENCION
router.post('/registraratencion', authRequired, registrarAtencion);
router.post('/registraratenciondoctor', authRequired, registrarAtencionDoctor);
router.post('/registraratencionvirtualdoctor', authRequired, registrarAtencionVirtualDoctor);
router.post('/registraratencionrecetadoctor', authRequired, registrarAtencionRecetaDoctor);
//
router.get('/obteneratencionpaciente', authRequired, obtenerAtencion);
router.get('/obteneratencionpacientedoctor', authRequired, obtenerAtencionDoctor);
//PDF

/**REPORTE DE PDF*/
router.get('/recetamedica/:id',authRequired,pdfReceta);


//*GENERADOR DE PDF DE DOCTOR*/
router.get('/obtenerpacientes',authRequired,pacientesPorDoctor);
router.get('/pdflistapaciente',authRequired,pdfListaPacienteDoctor);
router.get('/pdflista',authRequired,pdfListaDoctor);

////////ADMINISTRADOR/////////////////////
router.get('/listatotalpacientes',authRequired,pacientesTotal);
router.get('/pdflistarpordoctor',authRequired,pacientepordoctor);
//////////REGISTRAR HORARIO DOCTOR//////////////////////
router.post('/registrarhorario',authRequired,registrarhorario);

///////////COMUNICADOS////////////////////
router.get('/obtenercomunicadospage', comunicadopagina);


router.get('/obtenercomunicados', authRequired, obtenerComunicados);
router.post('/registrarcomunicado',authRequired, upload.fields([{ name: 'comunicado' }, { name: 'imagen' }]),registrarComunicado);  
router.put('/editarcomunicado/:_id', authRequired,
  upload.fields([{ name: 'comunicado' }, { name: 'imagen' }])
  , editarComunicado);
router.delete('/eliminarcomunicado/:_id', authRequired, eliminarComunicado);

//////////////////////////////////////////////////////
router.get('/verify', verifyToken);

export default router; 