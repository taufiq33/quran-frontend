import Homepage from "./pages/Homepage";
import ListSurahPage from "./pages/ListSurahPage";
import Surah from "./pages/Surah";
import BookmarkPage from "./pages/BookmarkPage";

function App() {
  return (
    <main className="mb-20">
      <Homepage />
      <ListSurahPage />
      <Surah />
      <BookmarkPage />
    </main>
  );
}

export default App;
