
import { toast } from 'react-toastify';

const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
 };

export const showToastSuccess = (message) => {
  toast.success(message, toastOptions);
};

export const showToastError = (message) => {
  toast.error(message, toastOptions);
};

export const showToastWarning = (message) => {
  toast.warning(message, toastOptions);
};

export const showToastInfo = (message) => {
  toast.info(message, toastOptions);
};
