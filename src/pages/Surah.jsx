import { Suspense } from "react";
import { useLoaderData, Await, useParams } from "react-router-dom";

import { fetchSurah } from "../helper/data-fetcher-helper";
import LoadingIndicator from "../components/LoadingIndicator";
import SurahContent from "../components/SurahContent";

export default function Surah() {
  const { data: surahData } = useLoaderData();
  const { number } = useParams();

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
