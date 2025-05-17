import React, { useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  InformationCircleIcon,
  UsersIcon,
  PhoneIcon,
  PresentationChartBarIcon,
  HomeIcon,
  ChevronDownIcon,
  HomeModernIcon,
  CubeIcon,
  VariableIcon,
  InboxIcon
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

export function SidebarWithBurgerMenu() {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const {
    user,
    logout,
    errors: signInErrors
  }=useAuth();
  
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const [openNav, setOpenNav] = useState(window.innerWidth >= 960);

  const usarNavegador=useNavigate();

  const {
      register,
      handleSubmit,
      formState:{errors}
  }=useForm();

  const salir= handleSubmit(async (user)=>{
    try{
      await logout(user);
      usarNavegador('/')
    }
    catch (error){
      alert(error);
    }
  })
  return (
    <>
    {
      openNav?
        <>
          <Card className="h-screen fixed left-0 top-0 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-">
            <div className="mb-2 flex items-center gap-4 p-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3209/3209159.png" alt="brand" className="h-8 w-8" />
              <Typography variant="h5" color="blue-gray">
                C.C.E.S.D.
              </Typography>
            </div>
            <List>
                <ListItem onClick={()=>{
                  usarNavegador('/dashboard')
                }}>
                  <ListItemPrefix>
                    <HomeIcon className="h-6 w-6" />
                  </ListItemPrefix>
                  Home
                </ListItem>
                <hr className="my-2 border-blue-gray-50" />
                <ListItem onClick={()=>{
                  usarNavegador('/perfil')
                }}>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-6 w-6" />
                  </ListItemPrefix>
                  Perfil
                </ListItem>
                <hr className="my-2 border-blue-gray-50" style={user.rol!=='Administrador'? {display:'none'}:null} />
                <ListItem onClick={()=>usarNavegador('/gestiondeusuarios')} style={user.rol!=='Administrador'? {display:'none'}:null}>
                    <ListItemPrefix>
                      <UsersIcon className="h-6 w-6" />
                    </ListItemPrefix>
                  Usuarios
                </ListItem>
                <hr className="my-2 border-blue-gray-50" style={user.rol!=='Administrador'? {display:'none'}:null} />
                <ListItem onClick={()=>usarNavegador('/gestionpaginaprincipal')} style={user.rol!=='Administrador'? {display:'none'}:null}>
                  <ListItemPrefix>
                    <Cog6ToothIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Publicaciones
                </ListItem>
                <hr className="my-2 border-blue-gray-50" style={user.rol!=='Administrador'? {display:'none'}:null}/>
                <Accordion
                  open={open === 2}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                    />
                  }
                  style={user.rol!=='Administrador'? {display:'none'}:null}
                >
                  <ListItem className="p-0" selected={open === 2}>
                    <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                      <ListItemPrefix>
                        <InformationCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="mr-auto font-normal">
                        Información
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                      <List className="p-0">
                        <ListItem onClick={()=>usarNavegador('/gestiondehospitales')}>
                          <ListItemPrefix>
                            <HomeModernIcon className="h-5 w-5" />
                          </ListItemPrefix>
                          Hospitales
                        </ListItem>
                        <ListItem onClick={()=>usarNavegador('/gestiondefarmacias')}>
                          <ListItemPrefix>
                            <CubeIcon className="h-5 w-5" />
                          </ListItemPrefix>
                          Farmacias
                        </ListItem>
                        <ListItem onClick={()=>usarNavegador('/gestiondelaboratorios')}>
                          <ListItemPrefix>
                            <VariableIcon className="h-5 w-5" />
                          </ListItemPrefix>
                          Laboratorios
                        </ListItem>
                        <ListItem onClick={()=>usarNavegador('/gestionlineastelefonicas')}>
                          <ListItemPrefix>
                            <PhoneIcon className="h-5 w-5" />
                          </ListItemPrefix>
                          Lineas Telefónicas
                        </ListItem>
                      </List>
                  </AccordionBody>
                </Accordion>
                <hr className="my-2 border-blue-gray-50" style={user.rol!=='Administrador'? {display:'none'}:null}/>
                <ListItem onClick={()=>{usarNavegador('/reportesadministrador')}} style={user.rol!=='Administrador'? {display:'none'}:null}>
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Reportes
                </ListItem>

                <hr className="my-2 border-blue-gray-50" style={user.rol!=='Administrador'? {display:'none'}:null}/>
                  <ListItem onClick={()=>{usarNavegador('/gestioncomunicados')}} style={user.rol!=='Administrador'? {display:'none'}:null}>
                    <ListItemPrefix>
                      <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Comunicados
                  </ListItem>
                
                <hr className="my-2 border-blue-gray-50" style={user.rol!=='Paciente'? {display:'none'}:null}/>
                <ListItem style={user.rol!=='Paciente'? {display:'none'}:null} onClick={()=>{usarNavegador('/reservadeatencion')}}>
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Reservas Médicas
                </ListItem>


                <hr className="my-2 border-blue-gray-50" style={user.rol!=='Doctor'? {display:'none'}:null}/>
                <ListItem onClick={()=>{usarNavegador('/reservadeatenciondoctor')}} style={user.rol!=='Doctor'? {display:'none'}:null}>
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Reservas Médicas
                </ListItem>

                <hr className="my-2 border-blue-gray-50" style={(user.rol==='Paciente')? {display:'none'}:null}/>
                <ListItem onClick={()=>{usarNavegador('/reportesdoctor')}} style={user.rol!=='Doctor'? {display:'none'}:null}>
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Reportes
                </ListItem>

                <hr className="my-2 border-blue-gray-50" />
                <form onSubmit={salir}>
                <button type="submit" className="appearance-none w-full">
                  <ListItem>
                      <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Log Out
                  </ListItem>
                </button>
              </form>
            </List>
          </Card>
        </>
      : /*CONDICIONAL*/
        <>
          <IconButton 
            className="bg-gray-200 z-50 text-gray-700 hover:bg-blue-gray-500 hover:text-white rounded-none shadow-md mt-4 rounded-r-xl pl-16 fixed flex-row" 
            size="lg" 
            onClick={openDrawer}>
            {
              isDrawerOpen ? (
                <XMarkIcon className="h-8 w-8 stroke-2" />
              ) : (
                <Bars3Icon className="h-8 w-8 stroke-2" />
              )
            }
          </IconButton>
          <Drawer open={isDrawerOpen} onClose={closeDrawer} className="overflow-y-scroll">
            <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
              <div className="mb-7 flex items-center justify-between -mr-4 mt-3">
                <div className="flex justify-center items-center pl-4">
                  <img src="https://cdn-icons-png.flaticon.com/512/3209/3209159.png" alt="brand" className="h-8 w-8" />
                  <Typography variant="h5" color="blue-gray" className="ml-5">
                    C.C.E.S.D.
                  </Typography>
                </div>
                <div>
                  <IconButton 
                    className="bg-red-400 z-50 text-gray-100 hover:bg-gray-500 hover:text-gray-300 rounded-none shadow-md rounded-l-xl pl-20" 
                    size="lg" 
                    onClick={closeDrawer}>
                    {
                      isDrawerOpen ? (
                        <XMarkIcon className="h-8 w-8 stroke-2" />
                      ) : (
                        <Bars3Icon className="h-8 w-8 stroke-2" />
                      )
                    }
                  </IconButton>
                </div>
              </div>
              <List>
                  <ListItem onClick={()=>{
                    usarNavegador('/dashboard')
                  }}>
                    <ListItemPrefix>
                      <HomeIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Home
                  </ListItem>
                  <hr className="my-2 border-blue-gray-50" />

                  <ListItem onClick={()=>{
                    usarNavegador('/perfil')
                  }}>
                    <ListItemPrefix>
                      <UserCircleIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Perfil
                  </ListItem>
                  <hr className="my-2 border-blue-gray-50" style={user.rol!=='Administrador'? {display:'none'}:null} />
                  <ListItem onClick={()=>usarNavegador('/gestiondeusuarios')} style={user.rol!=='Administrador'? {display:'none'}:null}>
                      <ListItemPrefix>
                        <UsersIcon className="h-6 w-6" />
                      </ListItemPrefix>
                    Usuarios
                  </ListItem>
                  <hr className="my-2 border-blue-gray-50" style={user.rol!=='Administrador'? {display:'none'}:null}/>
                  <ListItem onClick={()=>usarNavegador('/gestionpaginaprincipal')} style={user.rol!=='Administrador'? {display:'none'}:null}>
                    <ListItemPrefix>
                      <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Publicaciones
                  </ListItem>
                  <hr className="my-2 border-blue-gray-50" style={user.rol!=='Administrador'? {display:'none'}:null}/>
                  <Accordion
                    open={open === 2}
                    icon={
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                      />
                    }
                    style={user.rol!=='Administrador'? {display:'none'}:null}
                  >
                    <ListItem className="p-0" selected={open === 2}>
                      <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                        <ListItemPrefix>
                          <InformationCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">
                          Información
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                          <ListItem onClick={()=>usarNavegador('/gestiondehospitales')}>
                            <ListItemPrefix>
                              <HomeModernIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Hospitales
                          </ListItem>
                          <ListItem onClick={()=>usarNavegador('/gestiondefarmacias')}>
                            <ListItemPrefix>
                              <CubeIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Farmacias
                          </ListItem>
                          <ListItem onClick={()=>usarNavegador('/gestiondelaboratorios')}>
                            <ListItemPrefix>
                              <VariableIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Laboratorios
                          </ListItem>
                          <ListItem onClick={()=>usarNavegador('/gestionlineastelefonicas')}>
                            <ListItemPrefix>
                              <PhoneIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Lineas Telefónicas
                          </ListItem>
                        </List>
                    </AccordionBody>
                  </Accordion>
                  <hr className="my-2 border-blue-gray-50" style={user.rol!=='Administrador'? {display:'none'}:null}/>
                  <ListItem onClick={()=>{usarNavegador('/reportesadministrador')}} style={user.rol!=='Administrador'? {display:'none'}:null}>
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Reportes
                  </ListItem>

                  <hr className="my-2 border-blue-gray-50" style={user.rol!=='Administrador'? {display:'none'}:null}/>
                  <ListItem onClick={()=>{usarNavegador('/gestioncomunicados')}} style={user.rol!=='Administrador'? {display:'none'}:null}>
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Comunicados
                  </ListItem>
                  
                  <hr className="my-2 border-blue-gray-50" style={user.rol!=='Paciente'? {display:'none'}:null}/>
                  <ListItem style={user.rol!=='Paciente'? {display:'none'}:null} onClick={()=>{usarNavegador('/reservadeatencion')}}>
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Reservas Médicas
                  </ListItem>


                  <hr className="my-2 border-blue-gray-50" style={user.rol!=='Doctor'? {display:'none'}:null}/>
                  <ListItem onClick={()=>{usarNavegador('/reservadeatenciondoctor')}} style={user.rol!=='Doctor'? {display:'none'}:null}>
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Reservas Médicas
                  </ListItem>

                  <hr className="my-2 border-blue-gray-50" style={user.rol==='Paciente'? {display:'none'}:null}/>
                  <ListItem onClick={()=>{usarNavegador('/reportesdoctor')}} style={user.rol!=='Doctor'? {display:'none'}:null}>
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Reportes
                  </ListItem>
                  

                  <hr className="my-2 border-blue-gray-50" />
                  <form onSubmit={salir}>
                  <button type="submit" className="appearance-none w-full">
                    <ListItem>
                        <ListItemPrefix>
                          <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                  </button>
                </form>
              </List>
            </Card>
          </Drawer>
        </>
      }
    </> 
  );
}