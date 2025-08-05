import { Suspense, useEffect, useContext } from "react";
import { useLoaderData, Await, useParams } from "react-router-dom";

import { appContext } from "../context/app-context";

import { fetchSurah } from "../helper/data-fetcher-helper";
import LoadingIndicator from "../components/LoadingIndicator";
import SurahContent from "../components/SurahContent";

import { saveLastReadSurah } from "../helper/local-storage-helper";

export default function Surah() {
  const { data: surahData } = useLoaderData();
  const { number } = useParams();
  const { settings } = useContext(appContext);

  useEffect(() => {
    if (settings.autoLastReadOnVisitedSurah) {
      saveLastReadSurah(number, 1);
    }
  }, [number, settings.autoLastReadOnVisitedSurah]);

  return (
    <Suspense fallback={<LoadingIndicator />} key={number}>
      <Await resolve={surahData}>
        {(loadedSurahData) => {
          return <SurahContent loadedSurahData={loadedSurahData} />;
        }}
      </Await>
    </Suspense>
  );
}

export async function loader({ params }) {
  return {
    data: fetchSurah(params.number),
  };
}
