import Swal from 'sweetalert2';

export const SwalError = (text: string = 'Error') => {
  return Swal.fire({
    title: 'Error!',
    text: text,
    icon: 'error',
    confirmButtonText: 'OK',
  });
};

export const SwalWarning = async (
  text: string = 'Warning',
  textButton: string = 'OK',
  cancel: boolean = false
) => {
  return await Swal.fire({
    title: 'Warning!',
    text: text,
    icon: 'warning',
    confirmButtonText: textButton,
    showCancelButton: cancel,
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) return true;
    else return false;
  });
};

export const SwallSuccess = async ({
  title = 'Good',
  text = 'Data has been saved',
}: {
  title?: string;
  text?: string;
}) => {
  return await Swal.fire({
    icon: 'success',
    title,
    text,
  }).then((result) => {
    return result;
  });
};

export const SwallInfo = (text: string) => {
  Swal.fire({
    icon: 'info',
    text: text,
    showConfirmButton: true,
  });
};

export const SwalConfirm = async ({
  text,
}: {
  text?: string;
}): Promise<boolean> => {
  return await Swal.fire({
    title: 'Confirmation',
    text,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    confirmButtonColor: '#3085d6',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) return true;
    else return false;
  });
};
