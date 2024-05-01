import Swal, { SweetAlertPosition, SweetAlertResult } from 'sweetalert2';
type Statusicon = 'success' | 'error' | 'warning' | 'info' | 'question';
export class CustomModals {
  static showModal(
    title: string,
    position: SweetAlertPosition = 'center',
  ): Promise<SweetAlertResult> {
    return Swal.fire({ title: title, position: position });
  }

  static showCustomModal(
    title: string,
    icon: Statusicon,
    text?: string,
    position: SweetAlertPosition = 'center',
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      position: position,
    });
  }
  static showModalWithButtons(
    title: string,
    confirmButtonText: string,
    onConfirmFunction: () => void,
    isLoading: boolean,
  ) {
    Swal.fire({
      title: title,
      // showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'red',
      showLoaderOnConfirm: isLoading,
      confirmButtonText: confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirmFunction();
      }
      /* Read more about isConfirmed, isDenied below */
    });
  }
}
