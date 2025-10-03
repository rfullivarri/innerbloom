import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/bbdd", label: "Database" },
  { to: "/missions", label: "Missions" },
  { to: "/rewards", label: "Rewards" }
];

export const DesktopNavigation = () => (
  <nav>
    {links.map((link) => (
      <NavLink key={link.to} to={link.to} className={({ isActive }) => `tab-link${isActive ? " active" : ""}`}>
        {link.label}
      </NavLink>
    ))}
  </nav>
);

export const MobileNavigation = () => (
  <nav className="bottom-nav">
    {links.map((link) => (
      <NavLink key={link.to} to={link.to} className={({ isActive }) => `tab-link${isActive ? " active" : ""}`}>
        {link.label}
      </NavLink>
    ))}
  </nav>
);
