import { NavLink } from "react-router-dom";
import clsx from "clsx";
import style from "./Navigation.module.css";

const makeLinkClass = ({ isActive }) => {
  return clsx(style.link, isActive && style.isActive);
};

export default function Navigation() {
  return (
    <div className={style.container}>
      <nav className={style.nav}>
        <NavLink to="/" className={makeLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={makeLinkClass}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
}
