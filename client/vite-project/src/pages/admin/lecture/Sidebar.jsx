import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const navLinks = [
    {
      name: "Dashboard",
      to: "dashboard",
      icon: <ChartNoAxesColumn size={20} />,
    },
    {
      name: "Courses",
      to: "course",
      icon: <SquareLibrary size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:block w-[250px] sm:w-[280px] border-r border-transparent bg-gradient-to-b from-emerald-800 via-emerald-900 to-gray-900 dark:from-gray-900 dark:via-gray-950 dark:to-black p-6 sticky top-0 h-screen shadow-md">
        <div className="mt-20 space-y-2">
          {navLinks.map(({ name, to, icon }) => {
            const isActive = location.pathname.includes(to);
            return (
              <Link
                key={name}
                to={to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-600/90 text-white shadow-inner"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
              >
                <span className={`shrink-0 ${isActive ? "text-white" : "text-blue-300"}`}>
                  {icon}
                </span>
                <span>{name}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 lg:p-12 xl:p-16 bg-[#f9fafb] dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;
