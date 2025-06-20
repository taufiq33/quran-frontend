import { useContext } from "react";
import FolderPlusIcon from "../assets/folder-plus.svg";
import SideMenuIcon from "../assets/side-menu-icon.svg";
import SearchIcon from "../assets/search-line.svg";
import SortIcon from "../assets/sort-icon.svg";

import BottomNavbar from "../components/BottomNavbar";
import BookmarkCollection from "../components/BookmarkCollection";

import { appContext } from "../context/app-context";

export default function BookmarkPage() {
  const { bookmark } = useContext(appContext);
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
              <button className="flex justify-center gap-2 items-center">
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
