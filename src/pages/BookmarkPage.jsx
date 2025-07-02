import { useContext, useRef } from "react";
import FolderPlusIcon from "../assets/folder-plus.svg";
import SideMenuIcon from "../assets/side-menu-icon.svg";
import SearchIcon from "../assets/search-line.svg";
import SortIcon from "../assets/sort-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import BottomNavbar from "../components/BottomNavbar";
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
            className="absolute top-0 right-0 p-1 bg-red-700 rounded"
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
              className="px-4 w-full font-bold py-2 bg-purple-500 text-white rounded"
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
        <div className="header sticky top-0 z-100 bg-stone-50 shadow flex justify-between items-center gap-6 mb-4 px-4 py-2">
          <div className="flex gap-6">
            <img src={SideMenuIcon} alt="" className="" />
            <h1 className="text-purple-500 grayscale-50 font-bold text-lg ">
              Bookmarks
            </h1>
          </div>
          <img src={SearchIcon} alt="" className="" />
        </div>
        <div className="bookmark-container p-2">
          <div className="bookmark-button-group flex justify-between px-2 text-sm pb-4">
            <div className="add-collection-container">
              <button
                onClick={handleAddNewCollection}
                className="flex justify-center gap-2 items-center"
              >
                <img src={FolderPlusIcon} alt="" />
                <span className="text-purple-800">Add new collection</span>
              </button>
            </div>
            <button className="sort-button">
              <img src={SortIcon} alt="" />
            </button>
          </div>
          <div className="bookmark-list">
            {bookmark.map((item) => (
              <BookmarkCollection data={item} key={item.collectionId} />
            ))}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}
