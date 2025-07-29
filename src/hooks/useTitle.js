import { useEffect } from "react";

export default function useTitle(title) {
  useEffect(() => {
    const defaultTitle = "Al-Quran Digital";

    if (title) {
      document.title = `${defaultTitle} - ${title}`;
    }

    return () => (document.title = defaultTitle);
  }, [title]);
}
