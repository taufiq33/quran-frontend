import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        style={{ color: "#B197FC" }}
        className="scale-400"
      />
    </div>
  );
}
