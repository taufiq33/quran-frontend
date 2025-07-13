import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ShareIcon from "../assets/share-icon.svg";
import PlayAudioIcon from "../assets/play-audio-icon.svg";
import QuranMenuIcon from "../assets/quran-menu-icon.svg";
import BookmarkIconPurple from "../assets/bookmark-icon-purple.svg";
import { saveLastReadSurah } from "../helper/local-storage-helper";
import { useContext, useRef } from "react";
import { appContext } from "../context/app-context";
import Notification from "./Notification";
import Ayah from "./Ayah";

export default function AyahItem({ ayahData, onPlayAudio, playStatus }) {
  const { number } = useParams();
  const seletedCollectionIdRef = useRef();
  const [showTooltips, setShowTooltips] = useState(false);
  const {
    showModal,
    listSurah,
    saveAndSyncBookmark,
    bookmark,
    closeModal,
    replaceModalContent,
    settings,
  } = useContext(appContext);
  const surahName = listSurah.find((item) => item.nomor == number).namaLatin;

  useEffect(() => {
    if (ayahData.nomorAyat === 1) {
      // Delay 1 detik sebelum muncul tooltip
      const showTimeout = setTimeout(() => {
        setShowTooltips(true);

        // Auto close setelah 10 detik
        const hideTimeout = setTimeout(() => {
          setShowTooltips(false);
        }, 10000);

        return () => clearTimeout(hideTimeout);
      }, 1000);

      return () => clearTimeout(showTimeout);
    }
  }, [ayahData.nomorAyat]);

  function handleClick() {
    onPlayAudio(ayahData.audio[settings.qori], ayahData.nomorAyat);
  }

  function handleLastReadClick() {
    saveLastReadSurah(number, ayahData.nomorAyat);
    showModal(
      <Notification
        title="Berhasil"
        message={`${surahName} ayat ${ayahData.nomorAyat} berhasil ditandai sebagai 'terakhir dibaca'`}
      />,
      true
    );
  }

  function handleBookmarkClick() {
    showModal(
      <>
        <div className="p-4 block relative">
          <button
            onClick={closeModal}
            className="cursor-pointer absolute top-0 right-0 p-1 bg-red-700 rounded"
          >
            <FontAwesomeIcon className="text-lg text-white" icon={faClose} />
          </button>
          <h2 className="text-lg mb-2 font-bold">Simpan bookmark</h2>
          <p className="mb-2">
            {surahName} ayat {ayahData.nomorAyat} <br /> Silahkan pilih
            collection..
          </p>

          <select
            name=""
            id=""
            ref={seletedCollectionIdRef}
            className="border-1 border-stone-500 font-bold bg-white rounded-lg my-4"
          >
            {bookmark.map((collection) => (
              <option
                key={collection.collectionId}
                value={collection.collectionId}
              >
                {collection.collectionName}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="cursor-pointer px-4 w-full font-bold py-2 bg-purple-500 text-white rounded"
              onClick={() => {
                const { error, message } = saveAndSyncBookmark(
                  number,
                  surahName,
                  ayahData.nomorAyat,
                  seletedCollectionIdRef.current.value
                );
                console.log(error, message);
                closeModal(() => {
                  replaceModalContent(
                    <Notification
                      title={error ? "Gagal" : "Berhasil"}
                      message={message}
                    />,
                    true
                  );
                });
              }}
            >
              Simpan
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`ayah-item border-b-1 border-stone-300 mx-2 mt-4 p-2 flex flex-col gap-4 ${
          playStatus &&
          " border-3 rounded-xl shadow-2xl border-purple-900 p-3 bg-purple-50"
        }`}
        id={`${ayahData.nomorAyat}`}
      >
        <div className="container-button-group bg-stone-100 flex items-center justify-between py-1 px-3 rounded-lg">
          <div className="ayah-marker text-xs border-0 p-4 rounded-full w-6 h-6 bg-purple-900 opacity-80 text-white flex justify-center items-center">
            <span>{ayahData.nomorAyat}</span>
          </div>
          <div className="button-group flex p-2 justify-center items-center gap-6">
            {/* Last Read Button - Tooltip di atas dengan panah bawah */}
            <div className="relative">
              <img
                className="cursor-pointer scale-80 active"
                src={QuranMenuIcon}
                alt=""
                onClick={handleLastReadClick}
              />
              {showTooltips && (
                <div className="relative">
                  <div
                    className="absolute -top-20 -left-8 bg-purple-600 text-white text-[10px] 
                    px-2 py-1 rounded w-24 text-center"
                  >
                    Tandai terakhir dibaca
                    <div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 
                      w-2 h-2 bg-purple-600 rotate-45"
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Share Button - Tooltip di bawah dengan panah atas */}
            <div className="relative">
              <img src={ShareIcon} alt="" className="cursor-pointer " />
              {showTooltips && (
                <div className="relative">
                  <div
                    className="absolute top-1 -left-6 bg-purple-600 text-white text-[10px] 
                    px-2 py-1 rounded w-16 text-center"
                  >
                    Bagikan
                    <div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 
                      w-2 h-2 bg-purple-600 rotate-45"
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Play Button - Tooltip di atas dengan panah bawah */}
            {!playStatus && (
              <div className="relative">
                <img
                  onClick={handleClick}
                  src={PlayAudioIcon}
                  alt=""
                  className="cursor-pointer "
                />
                {showTooltips && (
                  <div
                    className="absolute -top-11 -left-6 bg-purple-600 text-white text-[10px] 
                    px-2 py-1 rounded w-16 text-center
                    "
                  >
                    Putar audio
                    <div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 
                      w-2 h-2 bg-purple-600 rotate-45"
                    ></div>
                  </div>
                )}
              </div>
            )}

            {/* Bookmark Button - Tooltip di bawah dengan panah atas */}
            <div className="relative">
              <img
                src={BookmarkIconPurple}
                alt=""
                onClick={handleBookmarkClick}
                className="cursor-pointer "
              />
              {showTooltips && (
                <div
                  className="absolute top-7 -left-4 bg-purple-600 text-white text-[10px] 
                  px-2 py-1 rounded w-16 text-center
                  "
                >
                  Bookmark
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 
                      w-2 h-2 bg-purple-600 rotate-45"
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Ayah
          ayah={ayahData}
          arabicFontSize={settings.interfaceSetting.arabicFontSize}
          showTranslation={settings.interfaceSetting.showTranslation}
          showTransliteration={settings.interfaceSetting.showTransliteration}
        />
      </div>
    </>
  );
}
