import { Document, Page, Text, StyleSheet, Image, View } from "@react-pdf/renderer";
import Imagen from '../../assets/images/ccesd.png';
export default function PDF(props){

    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#ffffff",
            padding: 50,
        },
        text: {
            fontSize: 10,
            width: 250,
        },
        imagen:{
            width: 50,
            height: 50,
            marginRight: 10,
        },
        primeraseccion:{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        titulo:{
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 20,
            textAlign: 'center',
        },
        nombrecabecera:{
            fontSize: 12,
            fontWeight: 'bold',
            marginVertical: 3,
        },
        fila:{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop:15
        },
        nombrecelda1:{
            fontSize: 10,
            fontWeight: 'bold',
            borderWidth: 1,
            //strech
            borderColor: '#000',
            paddingHorizontal: 10,
            paddingVertical: 5,
            width:40
        },
        nombrecelda2:{
            fontSize: 10,
            fontWeight: 'bold',
            borderWidth: 1,
            borderColor: '#000',
            paddingHorizontal: 10,
            paddingVertical: 5,
            width:250,
            marginLeft: -1,
        },
        nombrecelda3:{
            fontSize: 10,
            fontWeight: 'bold',
            borderWidth: 1,
            borderColor: '#000',
            paddingHorizontal: 10,
            paddingVertical: 5,
            width:150,
            marginLeft: -1,
        },
        nombrecelda4:{
            fontSize: 10,
            fontWeight: 'bold',
            borderWidth: 1,
            borderColor: '#000',
            paddingHorizontal: 10,
            paddingVertical: 5,
            width:150,
            marginLeft: -1,
        },
        filatabla:{
            borderWidth: 1,
            borderColor: '#000',
            width: 512,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop:-1
        },
        
        nombreceldatabla1:{
            fontSize: 10,
            fontWeight: 'bold',
            borderWidth: 0,
            borderColor: '#000',
            paddingHorizontal: 10,
            paddingVertical: 5,
            width:40
        },
        nombreceldatabla2:{
            fontSize: 10,
            fontWeight: 'bold',
            borderWidth: 0,
            borderColor: '#000',
            paddingHorizontal: 10,
            paddingVertical: 5,
            width:250,
            marginLeft: -1,
        },
        nombreceldatabla3:{
            fontSize: 10,
            fontWeight: 'bold',
            borderWidth: 0,
            borderColor: '#000',
            paddingHorizontal: 10,
            paddingVertical: 5,
            width:150,
            marginLeft: -1,
        },
        nombreceldatabla4:{
            fontSize: 10,
            fontWeight: 'bold',
            borderWidth: 0,
            borderColor: '#000',
            paddingHorizontal: 10,
            paddingVertical: 5,
            width:150,
            marginLeft: -1,
        },
        celdafinal:{
            fontSize: 10,
            borderWidth: 1,
            borderColor: '#000',
            color:'red',
            textAlign:'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            width:512,
            marginTop: -1,
        }
    });

    return(
        <Document>
            <Page size={"letter"} style={styles.page}>
                <View style={styles.primeraseccion}>
                    <Image src={Imagen} style={styles.imagen}/>
                    <View >
                        <Text style={styles.text}>
                            CENTRO COORDINADOR DE EMERGENCIAS
                        </Text>
                        <Text style={styles.text}>
                            EN SALUD DEPARTAMENTAL POTOSÍ
                        </Text>
                    </View>                    
                </View>
                <Text style={styles.titulo}>
                    REPORTE MÉDICO POR PACIENTE
                </Text>
                <Text style={styles.nombrecabecera}>
                    Nombre del Paciente: {props.objetos[0]?props.objetos[0].nombrePaciente:'No tiene registros médicos'}
                </Text>
                <Text style={styles.nombrecabecera}>
                    Nombre del Doctor: {props.objetos[0]?props.objetos[0].nombreDoctor:'No tiene registros médicos'}
                </Text>
                <Text style={styles.nombrecabecera}>
                    Fecha de reporte: { new Date().toLocaleDateString() }
                </Text>
                <View style={styles.fila}>
                    <Text style={styles.nombrecelda1}>Nro.</Text>
                    <Text style={styles.nombrecelda2}>Receta Médica</Text>
                    <Text style={styles.nombrecelda3}>Tipo Atención</Text>
                    <Text style={styles.nombrecelda4}>Fecha de Atención</Text>
                </View>
                {
                    props.objetos && props.objetos.length > 0 ? (
                        props.objetos.map((receta, index) => (
                            <View key={index.toString()} style={styles.filatabla}>
                                <Text style={styles.nombreceldatabla1}>{index+1}</Text>
                                <Text style={styles.nombreceldatabla2}>{receta.receta}</Text>
                                <Text style={styles.nombreceldatabla3}>{receta.tipoatencion}</Text>
                                <Text style={styles.nombreceldatabla4}>
                                    { 'Fecha:'+ new Date(receta.createdAt).toLocaleDateString('en-GB')}
                                    { 'Hora:'+new Date(receta.createdAt).toLocaleTimeString('en-GB')}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.celdafinal}>No existen registros médicos</Text>
                    )
                }

            </Page>
        </Document>
    );
}