import { Link, useRouteError } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faBan } from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";

export default function ErrorPage() {
  const errorObject = useRouteError();
  const isNotFound = errorObject.status === 404;

  useTitle(isNotFound ? "Halaman tidak ditemukan" : "Error!");

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
        <div>
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
          <div className="mt-4 flex flex-col gap-2 items-center justify-center">
            <button
              onClick={() => window.location.reload()}
              className="p-2 cursor-pointer hover:bg-purple-500 bg-purple-800 text-white rounded shadow-xl border-1 border-purple-800"
            >
              Refresh
            </button>
            <Link
              to="/list-surah"
              className="p-2 cursor-pointer text-purple-900 font-bold rounded underline "
            >
              Kembali ke daftar surat.
            </Link>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}
