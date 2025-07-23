import { useState, useContext } from "react";
import FolderIcon from "../assets/folder.svg";
import BookmarkIconPurple from "../assets/bookmark-icon-purple.svg";
import DotThreeIcon from "../assets/dot-three.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { appContext } from "../context/app-context";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Form from "./Modal/Form";
import Confirmation from "./Modal/Confirmation";

export default function BookmarkCollection({ data }) {
  const [collectionOpen, setCollectionOpen] = useState(false);
  const {
    showModal,
    replaceModalContent,
    deleteAndSyncBookmark,
    renameCollectionAndSyncBookmark,
    deleteCollectionAndSyncBookmark,
  } = useContext(appContext);

  function handleOpenCollection() {
    setCollectionOpen((prev) => !prev);
  }

  function handleDeleteBookmark(bookmarkId, collectionId) {
    showModal(
      <Confirmation
        heading="Hapus bookmark"
        confirmationObject={{
          element: <p>Yakin ingin hapus bookmark ini?</p>,
          confirmText: "Hapus",
          cancelText: "Batal",
        }}
        onConfirm={() => deleteAndSyncBookmark(bookmarkId, collectionId)}
      />
    );
  }

  function handleCollectionOptions() {
    const additionalButton = [
      {
        label: "Hapus Collection",
        className: "bg-red-500 text-white",
        onClick: () => {
          replaceModalContent(
            <Confirmation
              heading="Hapus collection"
              confirmationObject={{
                element: (
                  <p>
                    Yakin ingin hapus collection{" "}
                    <strong>"{data.collectionName}"</strong> ini?
                  </p>
                ),
                confirmText: "Hapus",
                cancelText: "Batal",
              }}
              onConfirm={() =>
                deleteCollectionAndSyncBookmark(data.collectionId)
              }
            />
          );
        },
      },
    ];
    showModal(
      <Form
        heading={data.collectionName}
        preText={`Collection ini punya ${data.lists.length} bookmark`}
        inputObject={{
          placeholder: "Rubah nama",
          onSubmit: (newName) =>
            renameCollectionAndSyncBookmark(data.collectionId, newName),
          defaultValue: data.collectionName,
        }}
        additionalButton={additionalButton}
      />
    );
  }

  return (
    <div
      className={`${
        collectionOpen && "border-l-purple-500 border-l-4"
      } rounded border-1 my-2 flex flex-col justify-start border-purple-200 p-1 lg:p-3 hover:shadow-lg transition duration-300 ease-in-out`}
    >
      <div className="bookmark-collection flex justify-between items-center p-2 pb-0 text-xs md:text-base ">
        <button
          onClick={handleOpenCollection}
          className="cursor-pointer bookmark-button-group flex justify-start items-center gap-2 w-9/10"
        >
          <img src={FolderIcon} alt="" />
          <div className="bookmark-detail flex flex-col text-stone-800 justify-start items-start">
            <span className="font-bold text-purple-900">
              {data.collectionName}
            </span>
            <span className="md:text-xs">{data.lists.length} items</span>
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
          <div
            className="bookmark-collection-item my-1 font-bold p-1 ml-6 bg-stone-50  text-xs md:text-sm hover:border-l-2 hover:border-purple-500 transition duration-300 ease-in-out"
            key={item.id}
          >
            <ul className="flex flex-col">
              <li className="flex items-center justify-between ">
                <div className="flex justify-start items-center gap-2">
                  <img src={BookmarkIconPurple} alt="" />
                  <Link
                    to={`/surah/${item.surahNumber}/${item.ayah}`}
                    className=" text-purple-600 hover:text-purple-800"
                  >
                    {item.surahName} - Ayat {item.ayah}
                  </Link>
                </div>
                <div>
                  <button
                    onClick={() =>
                      handleDeleteBookmark(item.id, data.collectionId)
                    }
                    className="cursor-pointer broder-1 border-stone-400 hover:bg-red-500 text-xs text-red-400 hover:text-white p-1 font-bold rounded-sm md:scale-80"
                  >
                    <FontAwesomeIcon className="text-xs" icon={faTrash} />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}
