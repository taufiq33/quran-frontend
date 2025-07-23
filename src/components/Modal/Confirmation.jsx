import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { appContext } from "../../context/app-context";

export default function Confirmation({
  heading,
  confirmationObject,
  onConfirm,
  onCancel = "default",
  preText = null,
}) {
  const { closeModal } = useContext(appContext);

  return (
    <>
      <div className="p-4 block relative">
        <button
          onClick={closeModal}
          className="cursor-pointer absolute top-0 right-0 p-1 bg-red-700 rounded"
        >
          <FontAwesomeIcon className="text-lg text-white" icon={faClose} />
        </button>
        <h2 className="text-lg mb-2 font-bold">{heading}</h2>
        <p className="mb-2">{preText}</p>

        <div className="text-center p-1 my-2">{confirmationObject.element}</div>

        <div className="flex gap-2">
          {onCancel && (
            <button
              type="cancel"
              className="cursor-pointer px-4 w-full font-bold py-2 bg-red-500 text-white rounded"
              onClick={() => {
                onCancel !== "default" && onCancel();
                closeModal();
              }}
            >
              {confirmationObject.cancelText}
            </button>
          )}
          <button
            type="submit"
            className="cursor-pointer px-4 w-full font-bold py-2 bg-purple-500 text-white rounded"
            onClick={() => {
              onConfirm();
              closeModal();
            }}
          >
            {confirmationObject.confirmText}
          </button>
        </div>
      </div>
    </>
  );
}
