export default function Tentang() {
  return (
    <div className="poppins-regular flex flex-col gap-1">
      <div className="section-tampilan bg-white p-2 border-transparent shadow-md m-2 rounded-xl">
        <div className="section-body p-2">
          <div className="max-w-2xl mx-auto p-6 mt-10 text-gray-800 poppins-regular">
            <h1 className="text-2xl font-semibold text-center mb-6">
              Tentang Aplikasi ini
            </h1>
            <ul className="space-y-4">
              <li>
                <strong>Dibuat oleh:</strong>{" "}
                <a
                  href="https://t.me/taufiq_h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  Taufiq Hidayat
                </a>
              </li>
              <li>
                <strong>Teknologi:</strong> ReactJS, React Router v7,
                TailwindCSS
              </li>
              <li>
                <strong>Link Repositori:</strong>{" "}
                <a
                  href="https://github.com/taufiq33/quran-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  github.com/taufiq33/quran-frontend
                </a>
              </li>
              <li>
                <strong>Desain Antar Muka:</strong> Original Design by{" "}
                <a
                  href="https://www.figma.com/@tanvirux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  Tanvir Ahassan
                </a>
              </li>
              <li>
                <strong>Sumber Figma:</strong>{" "}
                <a
                  href="https://www.figma.com/community/file/966921639679380402/quran-app-concept-free"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  Quran App Concept Free
                </a>
              </li>
              <li>
                <strong>Sumber API:</strong>
                <ul className="ml-5 list-disc mt-1 space-y-1">
                  <li>
                    Al-Qur'an:{" "}
                    <a
                      href="https://equran.id/apidev/v2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline"
                    >
                      equran.id/apidev/v2
                    </a>
                  </li>
                  <li>
                    Jadwal Sholat:{" "}
                    <a
                      href="https://documenter.getpostman.com/view/841292/2s9YsGittd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline"
                    >
                      API Muslim v2 by myQuran
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
