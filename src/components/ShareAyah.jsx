import { useState } from "react";
import Confirmation from "./Modal/Confirmation";
import { share } from "../utils/shareUtils";

export default function ShareAyah({ ayahObject }) {
  const [includeTransliteration, setIncludeTransliteration] = useState(false);
  return (
    <Confirmation
      heading="Bagikan Ayat"
      preText=""
      confirmationObject={{
        element: (
          <div className="flex items-center gap-2 max-w-lg">
            <input
              type="checkbox"
              id="transliterationCheckbox"
              className="cursor-pointer"
              defaultChecked={includeTransliteration}
              onChange={(e) => {
                setIncludeTransliteration(e.target.checked);
              }}
            />
            <label htmlFor="transliterationCheckbox">
              sertakan transliterasi
            </label>
          </div>
        ),
        confirmText: "Bagikan",
        cancelText: "Batal",
      }}
      onConfirm={() => {
        share(ayahObject, includeTransliteration);
      }}
    />
  );
}
