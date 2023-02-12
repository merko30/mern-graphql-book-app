import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ErrorProps {
  error: string;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div className="text-negative bg-red-300 rounded-lg p-2 flex items-center">
      <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
      <p className="font-bold text-sm">{error}</p>
    </div>
  );
};

export default Error;
