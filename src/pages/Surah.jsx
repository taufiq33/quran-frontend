import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import { fetchSurah } from "../helper/data-fetcher-helper";
import LoadingIndicator from "../components/LoadingIndicator";
import SurahContent from "../components/SurahContent";

export default function Surah() {
  const { data: surahData } = useLoaderData();

  return (
    <Suspense fallback={<LoadingIndicator />}>
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
