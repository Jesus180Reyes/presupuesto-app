/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { CustomTable, Status } from "../components/layouts/custom_table/CustomTable"
import { GastosResponse } from "../../datasources/entities/gastos_interfaces"
import {  useEffect, useState } from "react"
import { PrimaryButton } from "../components/shared/button/PrimaryButton"
import { CustomTextfieldComponent } from "../components/shared/input/CustomTextfieldComponent"
import { useForm } from "../hooks/form/useForm"
import { CustomModals } from "../../config/modals/custom_modals"

export const HomePage = () => {
    const [gastos, setgastos] = useState<GastosResponse>();
    const [status, setstatus] = useState<Status>(Status.notStarted)
    const [hasInputError, setHasInputError] = useState<boolean>(false)
    const [onAddGasto, setOnAddGasto] = useState<boolean>(false)
    const [onPdfDownload, setOnPdfDownload] = useState<boolean>(false)
    const {values,handleChange,resetForm} = useForm({
        nombre: '',
        total: '',
        fecha:''
    });
    const {values: emailValue, handleChange: emailChange, resetForm: resetEmailInput}  = useForm({email: ''})
    const createGasto = async() => {
        if(values.nombre.length === 0 || values.total.length === 0 || values.fecha.length === 0)return setHasInputError(true);
        try {
            setstatus(Status.inProgress)
            await axios.post('https://presupuesto-backend.onrender.com/api/presupuesto/',values);
            CustomModals.showCustomModal('Gasto Creado Exitosamente', 'success');
            setstatus(Status.done);
            resetForm();
            setHasInputError(false)
            await getGastos()
        } catch (error:any) {
            setstatus(Status.notStarted);
            setHasInputError(false)
            CustomModals.showCustomModal('Ups Hubo un error', 'error', error.message);
            console.error(error);
            
        }

    }
    const downloadPdf = async() => {
      if(emailValue.email.length === 0) return setHasInputError(true);
      try {
        setstatus(Status.inProgress);
        await axios.post('https://presupuesto-backend.onrender.com/api/presupuesto/pdf',{to:emailValue.email} );
        setstatus(Status.done);
        resetEmailInput();
        setHasInputError(false)
        CustomModals.showCustomModal('Reporte creado exitosamente', 'success', `El reporte se envio al correo: ${emailValue.email}`);
      } catch (error: any) {
        setstatus(Status.notStarted);
        CustomModals.showCustomModal('Ups Hubo un error', 'error', error.message);
        setHasInputError(false)
        console.error(error);
        
      }
    }
    const getGastos = async():Promise<GastosResponse> => {
            setstatus(Status.inProgress)
            const resp = await axios.get<GastosResponse>('https://presupuesto-backend.onrender.com/api/presupuesto/')
            const data = resp.data;
            setgastos(data);
            setstatus(Status.done)
            return data;

    }
    useEffect(() => {
      getGastos();
    
      
    }, []);
    const colums = ['Nombre de Gasto', 'Total', 'Fecha Realizada'];
    
  return (
    <>
    <div className="flex flex-col items-start m-4 p-2 justify-center">
        <h1 className="">Tabla de Gastos</h1>
        <PrimaryButton onClick={() => setOnAddGasto(!onAddGasto)} title={"Agregar Gasto"}/>
        <PrimaryButton onClick={() => setOnPdfDownload(!onPdfDownload)} title={"Descargar PDF"}/>
        {
            onAddGasto && 
            <div className="w-[100%] mt-5">
        <CustomTextfieldComponent value={values.nombre} errorMsg="El nombre es obligatorio" error={ values.nombre.length <=0 &&hasInputError} name="nombre" title={"Ingresar Nombre"} onChange={handleChange}/>
        <CustomTextfieldComponent value={values.total} errorMsg="El Monto total es obligatorio" error={values.total.length <=0 && hasInputError}  name="total" typeInput="number" title={"Ingresar Total Gastado"} onChange={handleChange}/>
        <CustomTextfieldComponent value={values.fecha} errorMsg="La Fecha es obligatorio" error={ values.fecha.length <=0  &&hasInputError} name="fecha" typeInput="datetime-local" title={"Ingresar Fecha"} onChange={handleChange}/>
        <PrimaryButton onClick={createGasto} disabled={status === Status.inProgress} title={"Crear Gasto"}/>
        </div>
        }
        {
            onPdfDownload && 
            <div className="w-[100%] mt-5">
        <CustomTextfieldComponent value={emailValue.email} errorMsg="El correo es Obligatorio" error={ emailValue.email.length <=0  &&hasInputError} name="email" typeInput="email" title={"Ingresa tu correo Electronico"} onChange={emailChange}/>
        <PrimaryButton onClick={downloadPdf} disabled={status === Status.inProgress} title={"Enviar"}/>
        </div>
        }
        <CustomTable columns={colums} status={status}>
        {...gastos?.gastos.map((e, i) => {
          return (
            <>
              <tr
                key={i}
                className='m-10 h-[50px]  hover:bg-[#F1F1F1] cursor-pointer'
              >
                <td>{e.nombre}</td>
                <td>{e.total}</td>
                <td className="overflow-auto">{e.fecha.toString()}</td>
               
              </tr>
            </>
          );
        }) ?? []}

        </CustomTable>
    </div>
    </>
  )
}
