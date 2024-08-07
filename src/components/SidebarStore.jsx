import React, { useContext, createContext, useState, memo, useMemo, useEffect } from "react";
import { FaCaretUp } from "react-icons/fa";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

const SidebarStore = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  const contextValue = useMemo(() => ({ expanded }), [expanded]);

  return (
    <aside className={`sticky top-0 h-screen z-20 ${expanded ? 'expanded' : ''}`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="px-4 py-2 flex justify-between items-center">
          <img
            src="https://cdn.icon-icons.com/icons2/2699/PNG/512/reactjs_logo_icon_170805.png"
            alt="logo react"
            className={`overflow-hidden transition-all duration-300 ${expanded ? "w-44" : "w-0"}`}
          />
          <ToggleSidebarButton expanded={expanded} setExpanded={setExpanded} />
        </div>

        <SidebarContext.Provider value={contextValue}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <UserSection expanded={expanded} />
      </nav>
    </aside>
  );
};

const ToggleSidebarButton = memo(({ expanded, setExpanded }) => {
  return (
    <button onClick={() => setExpanded((curr) => !curr)} className="p-2">
      {expanded ? <GoSidebarCollapse size={25} /> : <GoSidebarExpand size={25} />}
    </button>
  );
});

const UserSection = memo(({ expanded }) => {
  return (
    <div className="border-t flex p-3">
      <img
        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
        alt=""
        className="w-10 h-10 rounded-md"
      />
      <div className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${expanded ? "w-52 ml-3" : "w-0"}`}>
        <div className="leading-4">
          <h4 className="font-semibold">John Doe</h4>
          <span className="text-xs text-gray-600">johndoe@gmail.com</span>
        </div>
        <FaCaretUp size={20} />
      </div>
    </div>
  );
});

const SidebarItem = memo(({ icon, text, active, alert, link }) => {
  const { expanded } = useContext(SidebarContext);
  const [animateClass, setAnimateClass] = useState('');

  useEffect(() => {
    setAnimateClass(expanded ? 'swipe-in' : 'swipe-out');
  }, [expanded]);

  return (
    <Link to={link}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all duration-300 ${expanded ? "w-52 ml-3" : "w-0"} ${animateClass}`}
        >
          {text}
        </span>
        {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 group-hover:visible group-hover:opacity-100 z-30`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
});

export { SidebarStore as default, SidebarItem };
