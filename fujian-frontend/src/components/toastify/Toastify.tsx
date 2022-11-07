import { toast } from 'react-toastify';

export interface IToast {
  type: 'success' | 'error' | 'info' | 'default';
  message?: string;
  callback?: () => void;
}

const toastify = ({ type, message, callback }: IToast) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        onOpen: callback,
      });
      break;
    case 'info':
      toast.info(message, {
        onOpen: callback,
      });
      break;
    case 'error':
      toast.error(message, {
        onOpen: callback,
      });
      break;
    default:
      toast(message, {
        onOpen: callback,
      });
      break;
  }
};

export default toastify;
