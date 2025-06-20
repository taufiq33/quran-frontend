import { useState } from "react";
import FolderIcon from "../assets/folder.svg";
import BookmarkIconPurple from "../assets/bookmark-icon-purple.svg";
import DotThreeIcon from "../assets/dot-three.svg";
import { Link } from "react-router-dom";

export default function BookmarkCollection({ data }) {
  const [collectionOpen, setCollectionOpen] = useState(false);

  function handleOpenCollection() {
    setCollectionOpen((prev) => !prev);
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
          className="bookmark-button-group flex justify-start items-center gap-2 w-9/10"
        >
          <img src={FolderIcon} alt="" />
          <div className="bookmark-detail flex flex-col text-stone-800 justify-start items-start">
            <span>{data.collectionName}</span>
            <span>{data.lists.length} items</span>
          </div>
        </button>
        <button className="bookmark-action-button">
          <img src={DotThreeIcon} alt="" />
        </button>
      </div>

      {collectionOpen &&
        data.lists.map((item) => (
          <div className="bookmark-collection-item p-4 text-xs" key={item.id}>
            <ul className="flex flex-col gap-1">
              <li className="flex justify-start items-center gap-2">
                <img src={BookmarkIconPurple} alt="" />
                <Link
                  to={`/surah/${item.surahNumber}/${item.ayah}`}
                  className="border-b-1 border-purple-300 text-stone-500"
                >
                  {item.surahName} - Ayat {item.ayah}
                </Link>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}
