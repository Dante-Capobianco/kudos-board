import { useEffect } from "react";

const SideBar = (props) => {
  useEffect(() => {
    props.setIsHomePageOpen(true);
  }, [])

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
            props.currentPage === props.all ? "current-page" : ""
          }`}
          onClick={() => props.setCurrentPage(props.all)}
        >
          {props.all}
        </li>
        <li
          className={`sidebar-option ${
            props.currentPage === props.recent ? "current-page" : ""
          }`}
          onClick={() => props.setCurrentPage(props.recent)}
        >
          {props.recent}
        </li>
        <li
          className={`sidebar-option ${
            props.currentPage === props.celebration ? "current-page" : ""
          }`}
          onClick={() => props.setCurrentPage(props.celebration)}
        >
          {props.celebration}
        </li>
        <li
          className={`sidebar-option ${
            props.currentPage === props.thankYou ? "current-page" : ""
          }`}
          onClick={() => props.setCurrentPage(props.thankYou)}
        >
          {props.thankYou}
        </li>
        <li
          className={`sidebar-option ${
            props.currentPage === props.inspiration ? "current-page" : ""
          }`}
          onClick={() => props.setCurrentPage(props.inspiration)}
        >
          {props.inspiration}
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
