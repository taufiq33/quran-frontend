import { useEffect, useState, useContext } from "react";
import { appContext } from "../context/app-context";

import LoadingIndicator from "../components/LoadingIndicator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatGregorianDate, getHijriDate } from "../utils/dateUtils";
import { scrollToTop } from "../utils/scrollUtils";
import useTitle from "../hooks/useTitle";

export default function SholatPage() {
  const [requestData, setRequestData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { settings } = useContext(appContext);

  useTitle("Jadwal Sholat");

  function formatDateAPI(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function changeDate(days) {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.myquran.com/v2/sholat/jadwal/${
            settings.lokasi
          }/${formatDateAPI(selectedDate)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setRequestData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    scrollToTop();
  }, [settings.lokasi, selectedDate]);

  if (!requestData) return <LoadingIndicator />;
  return (
    <>
      <div className="poppins-regular sm:border-1 sm:border-purple-400/20 rounded-xl sm:shadow-xl sm:p-4 sm:gap-10 sm:mx-4 sm:mt-40 sm:flex sm:justify-center sm:items-center p-1">
        <div className="p-2 sm:w-3/4">
          <div className=" flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-700">
              {requestData.data.lokasi}
            </h2>
            <p className="text-gray-500">{requestData.data.daerah}</p>
            <p className="text-gray-800 mt-2">
              {formatGregorianDate(selectedDate)}
            </p>
            <p className="text-gray-800">{getHijriDate(selectedDate)}</p>
          </div>

          <div className="mt-4 gap-1 flex justify-evenly sm:justify-center sm:w-full items-center mx-auto sm:gap-2 sm:p-3">
            <button
              onClick={() => changeDate(-1)}
              className="cursor-pointer p-2 rounded-md bg-purple-100 hover:bg-purple-200 transition-colors"
            >
              &larr;
            </button>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd-MM-yyyy"
              className="max-w-40 rounded-md border-1 border-purple-300 p-2 text-center"
              calendarStartDay={1}
            />
            <button
              onClick={() => changeDate(1)}
              className="cursor-pointer p-2 rounded-md bg-purple-100 hover:bg-purple-200 transition-colors"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div className="p-4 mt-2 border-stone-50 border-1 bg-white rounded-xl shadow-md w-8/10 mx-auto flex flex-col gap-2 sm:w-full sm:p-1 sm:mt-0">
          {Object.entries(requestData.data.jadwal).map(([key, value]) => {
            if (["tanggal", "date"].includes(key)) return;
            return (
              <div
                key={key}
                className="flex justify-between p-2 backdrop-blur-xl bg-purple-50 rounded-xl"
              >
                <span className="text-stone-900">{key}</span>
                <span className="text-purple-600 font-bold">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
