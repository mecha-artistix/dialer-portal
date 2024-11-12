import { StatusType } from "@/types/server_response";
import { Info, ShieldAlert, AlertTriangle, CheckCircle } from "lucide-react";
// import { CheckCircledIcon } from "@radix-ui/react-icons";

interface ServerResponseProps {
  type: StatusType;
  message?: string;
}

export const ServerResponse: React.FC<ServerResponseProps> = ({ type, message }) => {
  if (!message) return null;
  let classNames = "";
  let IconComponent = null;
  switch (type) {
    case "success":
      classNames = `bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100`;
      IconComponent = <CheckCircle className="size-4" />;
      break;
    case "error":
      classNames = `bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100`;
      IconComponent = <AlertTriangle className="size-4" />;
      break;
    case "info":
      classNames = `bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100`;
      IconComponent = <Info className="size-4" />;
      break;
    case "warning":
      classNames = `bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100`;
      IconComponent = <ShieldAlert className="size-4" />;
      break;
    default:
      classNames = `bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100`;
      IconComponent = <Info className="size-4" />;
      break;
  }

  return (
    <div className={`${classNames} rounded-md flex items-center gap-x-2 text-sm  p-2`}>
      {IconComponent}
      <p>{message}</p>
    </div>
  );
};

/*


      className={`${
        type == "success" ? "bg-emerald-500/15 text-emerald-500" : "bg-destructive/15 text-destructive"
      }  rounded-md flex items-center gap-x-2 text-sm  p-2`}


        
  switch (type) {
    case "success":
      classNames = `bg-emerald-500/15 text-emerald-500`;
      IconComponent = <CheckCircledIcon className="size-4" />;
      break;
    case "error":
      classNames = `bg-destructive/15 text-destructive`;
      IconComponent = <ExclamationTriangleIcon className="size-4" />;
      break;
    case "info":
      classNames = `bg-destructive/15 text-destructive`;
      IconComponent = <Info className="size-4" />;
      break;
    case "warning":
      classNames = `bg-amber-500 text-destructive`;
      IconComponent = <ShieldAlert className="size-4" />;
      break;

    default:
      classNames = `bg-emerald-500/15 text-emerald-500`;
      break;
  }

*/
