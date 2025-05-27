import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <div className="poppins-regular">
        <div className="pt-4 px-6">
          <h1 className="text-purple-500 grayscale-50 font-bold text-2xl text-center mb-4">
            Oppss!!
          </h1>
          <p className="text-lg text-stone-500 text-center my-6 tracking-tight">
            Halaman yang Anda minta tidak ditemukan.
          </p>
        </div>

        <div className="flex flex-col px-8 justify-center items-center">
          <img
            src="https://placehold.co/600x400?text=Not%20Found!"
            alt="Notfound banner"
          />
          <Link
            to="/surah"
            className="-mt-10 p-4 text-center text-stone-100 font-bold bg-amber-700 rounded-2xl max-w-2/3 grayscale-30 tracking-tight"
          >
            Kembali ke halaman surat.
          </Link>
        </div>
      </div>
    </>
  );
}
