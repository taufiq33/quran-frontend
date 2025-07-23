import { useContext, useRef } from "react";
import FolderPlusIcon from "../assets/folder-plus.svg";
import SortIcon from "../assets/sort-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import BookmarkCollection from "../components/BookmarkCollection";

import { appContext } from "../context/app-context";

export default function BookmarkPage() {
  const { bookmark, showModal, closeModal, addNewCollectionAndSyncBookmark } =
    useContext(appContext);
  const inputRef = useRef();

  function handleAddNewCollection() {
    showModal(
      <>
        <div className="p-4 block relative">
          <button
            onClick={closeModal}
            className="cursor-pointer absolute top-0 right-0 p-1 bg-red-700 rounded"
          >
            <FontAwesomeIcon className="text-lg text-white" icon={faClose} />
          </button>
          <h2 className="text-lg mb-2 font-bold">Tambah Collections</h2>

          <input
            type="text"
            placeholder="Masukkan nama collection"
            className="w-full p-1 border rounded mb-4"
            ref={inputRef}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="cursor-pointer px-4 w-full font-bold py-2 bg-purple-500 text-white rounded"
              onClick={() => {
                closeModal(
                  addNewCollectionAndSyncBookmark(inputRef.current.value)
                );
              }}
            >
              Tambah
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="poppins-regular">
        <div className="bookmark-container p-2 md:p-4 lg:p-6">
          <div className="bookmark-button-group flex justify-between px-2 md:text-base text-sm pb-4">
            <div className="add-collection-container">
              <button
                onClick={handleAddNewCollection}
                className="cursor-pointer border-purple-300 border-1 rounded-md px-3 py-1 flex hover:shadow-xl justify-center gap-2 items-center transition duration-300 ease-in-out hover:bg-purple-100 hover:text-purple-800"
              >
                <img src={FolderPlusIcon} alt="" />
                <span className="text-purple-800">Add new collection</span>
              </button>
            </div>
            <button className="sort-button">
              <img src={SortIcon} alt="" />
            </button>
          </div>
          <div className="bookmark-list grid grid-cols-1 lg:grid-cols-2 lg:gap-4 items-start">
            {bookmark.map((item) => (
              <BookmarkCollection data={item} key={item.collectionId} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
