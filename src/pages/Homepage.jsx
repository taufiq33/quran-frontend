import { Link } from "react-router-dom";
import HomepageImage from "../assets/homepage.svg";

export default function Homepage() {
  return (
    <>
      <div className="poppins-regular">
        <div className="pt-4 px-6">
          <h1 className="text-purple-500 grayscale-50 font-bold text-2xl text-center mb-4">
            Quran App
          </h1>
          <p className="text-lg text-stone-500 text-center my-6 tracking-tight">
            Learn Quran and Recite once everyday
          </p>
        </div>

        <div className="flex flex-col px-8 justify-center items-center">
          <img
            src={HomepageImage}
            className="grayscale-25"
            alt="homepage banner"
          />
          <Link
            to="/list-surah"
            className="-mt-10 px-10 py-4 text-center text-stone-100 font-bold bg-amber-500 rounded-2xl max-w-2/3 grayscale-30 tracking-tight"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
