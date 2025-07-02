import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import ShareIcon from "../assets/share-icon.svg";
import PlayAudioIcon from "../assets/play-audio-icon.svg";
import QuranMenuIcon from "../assets/quran-menu-icon.svg";
import BookmarkIconPurple from "../assets/bookmark-icon-purple.svg";
import { saveLastReadSurah } from "../helper/local-storage-helper";
import { useContext, useRef } from "react";
import { appContext } from "../context/app-context";
import Notification from "./Notification";

export default function AyahItem({ ayahData, onPlayAudio, playStatus }) {
  const { number } = useParams();
  const seletedCollectionIdRef = useRef();
  const {
    showModal,
    listSurah,
    saveAndSyncBookmark,
    bookmark,
    closeModal,
    replaceModalContent,
  } = useContext(appContext);
  const surahName = listSurah.find((item) => item.nomor == number).namaLatin;

  function handleClick() {
    onPlayAudio(ayahData.audio["05"], ayahData.nomorAyat);
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
            className="absolute top-0 right-0 p-1 bg-red-700 rounded"
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
              className="px-4 w-full font-bold py-2 bg-purple-500 text-white rounded"
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
    // const { error, message } = saveAndSyncBookmark(
    //   number,
    //   surahName,
    //   ayahData.nomorAyat
    // );
    // showModal(
    //   <Notification title={error ? "Gagal" : "Berhasil"} message={message} />,
    //   true
    // );
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
            <img
              className="scale-80 active"
              src={QuranMenuIcon}
              alt=""
              onClick={() => handleLastReadClick()}
            />
            <img src={ShareIcon} alt="" />
            {!playStatus && (
              <span>
                <img onClick={() => handleClick()} src={PlayAudioIcon} alt="" />
              </span>
            )}

            <img
              src={BookmarkIconPurple}
              alt=""
              onClick={handleBookmarkClick}
            />
          </div>
        </div>

        <div className="ayah-section flex flex-col gap-8">
          <div className="arabic-ayah arabic flex text-3xl text-right justify-end">
            <span>{ayahData.teksArab}</span>
          </div>

          <div className="translation-ayah italic text-sm text-stone-800">
            {ayahData.teksLatin}
          </div>

          <div className="translation-ayah text-sm text-stone-500">
            {ayahData.teksIndonesia}
          </div>
        </div>
      </div>
    </>
  );
}
