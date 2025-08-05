import { useState } from "react";

export default function Tab({ structure }) {
  const [tabActive, setTabActive] = useState(0);

  function handleTabClick(tab) {
    setTabActive(tab);
  }

  return (
    <div className="poppins-reguler">
      <div className="tab-parent flex flex-col gap-1">
        <div className="tab-header fixed right-0 left-0 top-15 bg-stone-50 z-10 flex border-1 border-gray-300 items-center justify-around">
          {structure.map((item, index) => (
            <div
              className={`text-center w-1/4 py-2 cursor-pointer ${
                index === tabActive &&
                "text-purple-600 font-bold border-b-2 border-purple-700"
              }`}
              key={index}
              onClick={() => handleTabClick(index)}
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className="tab-body bg-stone-50 mt-26">
          {structure[tabActive].body}
        </div>
      </div>
    </div>
  );
}
