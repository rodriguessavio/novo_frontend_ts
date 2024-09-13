import { toast } from "react-toastify";

function notify(message, type) {
  if (type === "error") {
    toast.error(message);
  } else if (type === "success") {
    toast.success(message);
  } else if (type === "info") {
    toast.info(message);
  }
}

export default notify;