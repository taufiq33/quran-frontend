import { useContext } from "react";
import FolderPlusIcon from "../assets/folder-plus.svg";
import SortIcon from "../assets/sort-icon.svg";

import BookmarkCollection from "../components/BookmarkCollection";
import Form from "../components/Modal/Form";
import { appContext } from "../context/app-context";

export default function BookmarkPage() {
  const { bookmark, showModal, addNewCollectionAndSyncBookmark } =
    useContext(appContext);

  function handleAddNewCollection() {
    showModal(
      <Form
        heading="Tambah Collection"
        preText={"Masukkan nama collection"}
        inputObject={{
          placeholder: "nama collection",
          onSubmit: (name) => {
            addNewCollectionAndSyncBookmark(name);
          },
        }}
      />
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
