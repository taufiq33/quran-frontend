import { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

export default function SettingLokasi() {
  // This component is for setting the city location for prayer times.
  const [listKota, setListKota] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedKota, setSelectedKota] = useState("");

  useEffect(() => {
    async function getListKota() {
      const request = await fetch(
        "https://api.myquran.com/v2/sholat/kota/semua"
      );
      const response = await request.json();
      if (!request.ok) {
        console.error("Error fetching city list:", response);
      }

      setListKota(response.data);
    }

    getListKota();
  }, []);

  const listKotaSorted = keyword
    ? listKota.filter((item) =>
        item.lokasi
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .toLowerCase()
          .includes(keyword.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase())
      )
    : listKota;

  if (listKota.length === 0) return <LoadingIndicator />;

  return (
    <>
      <div className="section-tampilan bg-white p-4 border-transparent shadow-md m-2 rounded-xl">
        <h2 className="text-lg font-bold mb-2">Lokasi Kota Anda Sekarang</h2>
        <p className="text-sm mb-1 text-stone-800 italic">
          {selectedKota ? (
            <span>
              {" "}
              Lokasi Kota Anda sekarang adalah <b>{selectedKota}</b>
            </span>
          ) : (
            <span>Anda belum memilih lokasi kota.</span>
          )}
        </p>
      </div>

      <div className="section-tampilan mt-4 bg-white p-2 border-transparent shadow-md m-2 rounded-xl">
        <h2 className="text-lg font-bold mb-1">Rubah Lokasi Kota</h2>
        <p className="text-sm mb-1 text-stone-800 italic">
          Silahkan set lokasi kota Anda disini, untuk menampilkan Jadwal Sholat
          yg sesuai.
        </p>
        <div className="section-body my-2 flex flex-col gap-4">
          <input
            type="search"
            name="kota"
            id="kota"
            onChange={(e) => setKeyword(e.target.value)}
            className="border border-stone-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ketikkan nama kota Anda"
          />
          <div className="listkota">
            {listKotaSorted.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-1 hover:bg-stone-200 "
              >
                <div className="flex justify-start items-center gap-1">
                  <input
                    name="kota"
                    id={item.id}
                    type="radio"
                    value={item.lokasi}
                    onChange={() => setSelectedKota(item.lokasi)}
                  />
                  <label htmlFor={item.id} className="text-sm ml-2">
                    {item.lokasi}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
