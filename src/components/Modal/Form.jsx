import { useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { appContext } from "../../context/app-context";

export default function Form({
  heading,
  preText,
  inputObject,
  additionalButton = [],
}) {
  const inputRef = useRef();
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

        <input
          type="text"
          placeholder={inputObject.placeholder}
          className="w-full p-1 border rounded mb-4"
          ref={inputRef}
          defaultValue={inputObject.defaultValue || ""}
        />
        <div className="flex gap-2">
          {additionalButton.map((button, index) => (
            <button
              key={index}
              type="button"
              className={`cursor-pointer px-4 w-full font-bold py-2 rounded ${button.className}`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
          <button
            type="submit"
            className="cursor-pointer px-4 w-full font-bold py-2 bg-purple-500 text-white rounded"
            onClick={() => {
              inputObject.onSubmit(inputRef.current.value);
              closeModal();
            }}
          >
            Simpan
          </button>
        </div>
      </div>
    </>
  );
}
