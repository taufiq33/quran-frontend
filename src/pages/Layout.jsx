import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import BottomNavbar from "../components/BottomNavbar";

const title = [
  { route: "/sholat", title: "Jadwal Sholat" },
  { route: "/surah", title: null },
  { route: "/bookmark", title: "Bookmark" },
  { route: "/settings", title: "Pengaturan", additionalMargin: false },
];

export default function Layout() {
  const location = useLocation();
  const route = location.pathname;
  const header = title.find((item) => item.route === route) || null;

  return (
    <div className="poppins-reguler">
      {header && (
        <Header
          title={header.title}
          additionalMargin={header?.additionalMargin}
        />
      )}
      <Outlet />
      {route !== "/" && <BottomNavbar />}
    </div>
  );
}
