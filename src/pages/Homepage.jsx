import { useState } from "react";
import { Link } from "react-router-dom";
import HomepageImage from "../assets/homepage.svg";

export default function Homepage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div className="poppins-regular">
        <div className="pt-4 px-6">
          <h1 className="text-purple-500 grayscale-50 font-bold text-2xl text-center mb-4">
            Al-Quran Digital
          </h1>
          <p className="text-lg text-stone-500 text-center my-6 tracking-tight">
            Pelajari Al-Quran dan baca setiap hari
          </p>
        </div>

        <div className="flex flex-col px-8 justify-center items-center">
          {!imageLoaded && (
            <div className="w-[314px] h-[450px] bg-purple-100 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-purple-300">
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}
          <img
            src={HomepageImage}
            className="grayscale-25"
            alt="homepage banner"
            onLoad={() => setImageLoaded(true)}
          />
          <Link
            to="/list-surah"
            className="-mt-10 px-10 py-4 text-center text-stone-100 font-bold bg-amber-500 rounded-2xl max-w-2/3 grayscale-30 tracking-tight"
          >
            Mulai membaca
          </Link>
        </div>
      </div>
    </>
  );
}
