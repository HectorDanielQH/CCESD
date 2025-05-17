import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaLogin from "./pages/PaginaLogin";
import PaginaRegistro from "./pages/PaginaRegistro";
import Dashboard from "./pages/dashboard/Dashboard"
import { AuthProvider } from "./context/AuthContext";
import PageHome from "./pages/home/PageHome";
import ProtectedRoute from "./ProtectedRoutes";
import GestionUsuarios from "./pages/dashboard/administrador/gestionUsuarios";
import GestionHospitales from "./pages/dashboard/administrador/gestionHospitales";
import Perfil from "./pages/dashboard/Perfil";
import Hospitales from "./pages/home/Hospitales";
import GestionFarmacias from "./pages/dashboard/administrador/gestionFarmacias";
import Farmacias from "./pages/home/Farmacias";
import Laboratorio from "./pages/home/Laboratorio";
import GestionLabotatorios from "./pages/dashboard/administrador/gestionLaboratorios";
import GestionPublicaciones from "./pages/dashboard/administrador/gestionPublicaciones";
import GestionLineasTelefonicas from "./pages/dashboard/administrador/gestionLineasTelefonicas";
import LineasTelefonicas from "./pages/home/LineasTelefonicas";
import ReservaAtencion from "./pages/dashboard/paciente/reservaPaciente";
import ReservaAtencionDoctor from "./pages/dashboard/doctor/reservaPaciente";
import ReportesDoctor from "./pages/dashboard/ReportesDoctor";
import ReportesAdministrador from "./pages/dashboard/ReportesAdministrador";
import GestionComunicados from "./pages/dashboard/administrador/gestionComunicados";
import Comunicados from "./pages/home/Comunicados";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PageHome/>}/>
          <Route path='/login' element={<PaginaLogin/>}/>
          <Route path='/register' element={<PaginaRegistro/>}/>
          <Route path='/hospitales' element={<Hospitales/>}/>
          <Route path='/farmacias' element={<Farmacias/>}/>
          <Route path='/laboratorios' element={<Laboratorio/>}/>
          <Route path='/lineastelefonicas' element={<LineasTelefonicas/>}/>
          <Route path='/comunicados' element={<Comunicados/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/perfil' element={<Perfil/>}/>          
            <Route path='/gestiondeusuarios' element={<GestionUsuarios/>}/>
            <Route path='/gestiondehospitales' element={<GestionHospitales/>}/>
            <Route path='/gestiondefarmacias' element={<GestionFarmacias/>}/>
            <Route path='/gestiondelaboratorios' element={<GestionLabotatorios/>}/>
            <Route path='/gestionpaginaprincipal' element={<GestionPublicaciones/>}/>
            <Route path='/gestionlineastelefonicas' element={<GestionLineasTelefonicas/>}/>
            <Route path='/reservadeatencion' element={<ReservaAtencion/>}/>
            <Route path='/reservadeatenciondoctor' element={<ReservaAtencionDoctor/>}/>
            <Route path='/reportesdoctor' element={<ReportesDoctor/>}/>
            <Route path='/reportesadministrador' element={<ReportesAdministrador/>}/>
            <Route path='/gestioncomunicados' element={<GestionComunicados/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
