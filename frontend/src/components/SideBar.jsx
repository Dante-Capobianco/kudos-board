import { useEffect } from "react";
import {PageType} from "../utils/enums"

const SideBar = (props) => {
  useEffect(() => {
    props.setIsHomePageOpen(true);
    props.setModalToOpen("");
  }, []);

  return (
    <nav
      className="sidebar-container"
      style={{
        left: props.isSideBarOpen ? 0 : "-20vw",
        boxShadow: props.isSideBarOpen ? "20px 0px 40px black" : "",
      }}
    >
      <ul className="sidebar-options">
        <li
          className={`sidebar-option ${
            props.currentPage === PageType.ALL ? "current-page" : ""
          }`}
          onClick={() => props.setCurrentPage(PageType.ALL)}
        >
          {PageType.ALL}
        </li>
        <li
          className={`sidebar-option ${
            props.currentPage === PageType.RECENT ? "current-page" : ""
          }`}
          onClick={() => props.setCurrentPage(PageType.RECENT)}
        >
          {PageType.RECENT}
        </li>
        <li
          className={`sidebar-option ${
            props.currentPage === PageType.CELEBRATION ? "current-page" : ""
          }`}
          onClick={() => props.setCurrentPage(PageType.CELEBRATION)}
        >
          {PageType.CELEBRATION}
        </li>
        <li
          className={`sidebar-option ${
            props.currentPage === PageType.THANK_YOU ? "current-page" : ""
          }`}
          onClick={() => props.setCurrentPage(PageType.THANK_YOU)}
        >
          {PageType.THANK_YOU}
        </li>
        <li
          className={`sidebar-option ${
            props.currentPage === PageType.INSPIRATION ? "current-page" : ""
          }`}
          onClick={() => props.setCurrentPage(PageType.INSPIRATION)}
        >
          {PageType.INSPIRATION}
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
