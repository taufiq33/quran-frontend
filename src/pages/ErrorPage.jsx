import { useRouteError } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faBan } from "@fortawesome/free-solid-svg-icons";

export default function ErrorPage() {
  const errorObject = useRouteError();
  const isNotFound = errorObject.status === 404;

  return (
    <>
      <Header title="Error" />
      <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
        <FontAwesomeIcon
          icon={isNotFound ? faBan : faCircleExclamation}
          beatFade
          style={{ color: "#B197FC" }}
          className="text-6xl mb-4"
        />
        <p className="text-lg mb-4">
          {isNotFound
            ? "Halaman yg anda minta tidak ditemukan."
            : "Terjadi Kesalahan, silahkan cek koneksi internet Anda."}
        </p>
        {errorObject.statusText && (
          <p className="text-red-500">{errorObject.statusText}</p>
        )}
        {errorObject.message && (
          <p className="text-red-500">{errorObject.message}</p>
        )}
      </div>
      <BottomNavbar />
    </>
  );
}
