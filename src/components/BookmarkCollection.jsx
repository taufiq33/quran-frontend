import { useState, useContext, useRef } from "react";
import FolderIcon from "../assets/folder.svg";
import BookmarkIconPurple from "../assets/bookmark-icon-purple.svg";
import DotThreeIcon from "../assets/dot-three.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { appContext } from "../context/app-context";

export default function BookmarkCollection({ data }) {
  const [collectionOpen, setCollectionOpen] = useState(false);
  const newCollectionNameRef = useRef();
  const {
    showModal,
    closeModal,
    deleteAndSyncBookmark,
    renameCollectionAndSyncBookmark,
    deleteCollectionAndSyncBookmark,
  } = useContext(appContext);

  function handleOpenCollection() {
    setCollectionOpen((prev) => !prev);
  }

  function handleCollectionOptions() {
    showModal(
      <>
        <div className="p-4 block relative">
          <button
            onClick={closeModal}
            className="cursor-pointer absolute top-0 right-0 p-1 bg-red-700 rounded"
          >
            <FontAwesomeIcon className="text-lg text-white" icon={faClose} />
          </button>
          <h2 className="text-lg mb-2 font-bold">{data.collectionName}</h2>
          <p className="mb-2">
            Collection ini punya {data.lists.length} bookmark
          </p>

          <input
            type="text"
            defaultValue={data.collectionName}
            ref={newCollectionNameRef}
            className="w-full p-1 border rounded mb-4"
          />
          <div className="flex gap-2">
            {data.collectionId !== "default" && (
              <button
                type="submit"
                className="cursor-pointer px-4 font-bold py-2 bg-red-500 text-white rounded"
                onClick={() => {
                  confirm("Yakin ingin hapus collection ini?") &&
                    deleteCollectionAndSyncBookmark(data.collectionId);
                  closeModal();
                }}
              >
                Hapus Collection
              </button>
            )}

            <button
              type="submit"
              className="cursor-pointer px-4 font-bold py-2 bg-purple-500 text-white rounded"
              onClick={() => {
                renameCollectionAndSyncBookmark(
                  data.collectionId,
                  newCollectionNameRef.current.value
                );
                closeModal();
              }}
            >
              Ubah nama
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={`${
        collectionOpen && "bg-purple-50"
      } rounded border-1 my-2 flex flex-col items-cennter justify-center border-purple-200 p-1`}
    >
      <div className="bookmark-collection flex justify-between items-center p-2 pb-0 text-xs">
        <button
          onClick={handleOpenCollection}
          className="cursor-pointer bookmark-button-group flex justify-start items-center gap-2 w-9/10"
        >
          <img src={FolderIcon} alt="" />
          <div className="bookmark-detail flex flex-col text-stone-800 justify-start items-start">
            <span>{data.collectionName}</span>
            <span>{data.lists.length} items</span>
          </div>
        </button>
        <button
          onClick={handleCollectionOptions}
          className="cursor-pointer bookmark-action-button"
        >
          <img src={DotThreeIcon} alt="" />
        </button>
      </div>

      {collectionOpen &&
        data.lists.map((item) => (
          <div className="bookmark-collection-item p-4 text-xs" key={item.id}>
            <ul className="flex flex-col">
              <li className="flex items-center justify-between">
                <div className="flex justify-start items-center gap-2">
                  <img src={BookmarkIconPurple} alt="" />
                  <Link
                    to={`/surah/${item.surahNumber}/${item.ayah}`}
                    className="border-b-1 border-purple-300 text-stone-500"
                  >
                    {item.surahName} - Ayat {item.ayah}
                  </Link>
                </div>
                <div>
                  <button
                    onClick={() => {
                      return (
                        confirm("Yakin ingin hapus?") &&
                        deleteAndSyncBookmark(item.id, data.collectionId)
                      );
                    }}
                    className="cursor-pointer bg-red-500 text-xs text-white p-1 font-bold rounded-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}
