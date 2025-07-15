import SideMenuIcon from "./../assets/side-menu-icon.svg";
import SearchIcon from "./../assets/search-line.svg";

export default function Header({
  title,
  additionalMargin = true,
  searchButton = false,
  searchFnCallback = () => {},
}) {
  return (
    <>
      <div className="header fixed right-0 left-0 top-0 z-100 bg-stone-50 shadow flex justify-between items-center gap-6 mb-4 p-4 md:px-12 border-b-stone-100 border-b-1">
        <div className="flex gap-6">
          <img src={SideMenuIcon} alt="" className="" />
          <h1 className="text-purple-500 grayscale-50 font-bold text-lg ">
            {title}
          </h1>
        </div>
        {searchButton && (
          <img
            src={SearchIcon}
            onClick={searchFnCallback || null}
            alt=""
            className=""
          />
        )}
      </div>
      {additionalMargin && <div className="mt-20"></div>}
    </>
  );
}
