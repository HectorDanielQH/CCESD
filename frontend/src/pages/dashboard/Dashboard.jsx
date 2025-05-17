import {SidebarWithBurgerMenu} from '../../components/navdash.jsx'
import Imagen from '../../assets/images/ccesd.png'
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { useAuth } from '../../context/AuthContext.jsx';
export default function Dashboard(){
    const {user} = useAuth();
    return (
        <div className='flex'>
            <SidebarWithBurgerMenu/>
            <figure className="lg:ml-80 sm:fixed lg:relative h-screen w-full flex justify-center items-center">
                <img
                    className="h-2/3 rounded-xl object-cover object-center opacity-30"
                    src={Imagen}
                    alt="nature image"
                />
                {
                    user.rol==='Doctor'?
                        user.horarios?
                            <Card className="mt-6 w-96 fixed top-0 md:left-5 lg:left-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                    HORARIO A ATENCION ASIGNADO
                                    </Typography>
                                    <Typography className='whitespace-pre-wrap text-left'>
                                        {user.horarios}
                                    </Typography>
                                </CardBody>
                            </Card>
                        :
                        <Card className="mt-6 w-96 fixed top-0 md:left-5 lg:left-96">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2 text-red-700">
                                HORARIO A ATENCION AUN NO ASIGNADO
                                </Typography>
                            </CardBody>
                        </Card>
                    :
                    <></>
                }
                <figcaption 
                    className="
                        border-t-4 
                        border-t-teal-500
                        absolute 
                        sm:flex-col-reverse 
                        sm:justify-center 
                        sm:items-center 
                        md:flex-row
                        md:justify-between
                        md:items-center
                        bottom-8 left-2/4 
                        flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                    <div className='sm:flex sm:flex-col sm:justify-center sm:items-center sm:mt-4'>
                        <Typography 
                            variant="h5" 
                            color="blue-gray" 
                            className='sm:text-sm'>
                            {user.username}
                        </Typography>
                        <Typography color="gray" className="mt-2 font-normal sm:text-sm">
                            {new Date().getDay()}/{new Date().getMonth()}/{new Date().getFullYear()}, {new Date().getHours()}:{new Date().getMinutes()}:{new Date().getSeconds()} 
                        </Typography>
                    </div>
                    <Typography variant="h6" color="blue-gray" className='sm:text-md'>
                        {user.rol}
                    </Typography>
                </figcaption>
            </figure>
        </div>
    );
}