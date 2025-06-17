import { useRef, useContext } from "react";
import { setUsername } from "../helper/local-storage-helper";
import { appContext } from "../context/app-context";

export default function AskUsername() {
  const usernameRef = useRef();
  const { closeModal } = useContext(appContext);
  return (
    <>
      <div className="p-4">
        <h2 className="text-lg mb-2 font-bold">Assalamualaikum</h2>
        <p className="mb-2">Tolong masukkan nama panggilan kamu ya..</p>

        <input
          type="text"
          placeholder="Nama panggilan kamu"
          className="w-full p-1 border rounded mb-4"
          ref={usernameRef}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 w-full font-bold py-2 bg-purple-500 text-white rounded"
            onClick={() => {
              setUsername(usernameRef.current.value);
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
