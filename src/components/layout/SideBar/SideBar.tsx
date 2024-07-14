import styles from "./style.module.css";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "@assets/logo 1.png";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const { Link } = styles;

function SideBar() {
  const [isActive, setActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <div className="position-relative ">
      <section
        className="sidebar min-vh-100 position-fixed   overflow-hidden"
        style={{ backgroundColor: "#002B6A" }}
      >
        <div className="logo text-center mt-5">
          <img src={Logo} alt="" />
        </div>
        <Navbar className="mt-5">
          <Nav className="navLink ms-md-3 mx-4 d-flex flex-column ">
            <Nav.Link
              as={NavLink}
              to="/"
              onClick={() => {
                setActive("/");
              }}
            >
              <div
                className={
                  isActive == "/"
                    ? `${Link} d-flex align-items-center gap-2 py-3  `
                    : " text-white  d-flex align-items-center gap-2 py-3 "
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  id="chart"
                >
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    stroke={isActive == "/" ? "#002B6A" : "white"}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    transform="translate(2 2)"
                  >
                    <line x1="5.371" x2="5.371" y1="8.202" y2="15.062"></line>
                    <line x1="10.038" x2="10.038" y1="4.919" y2="15.062"></line>
                    <line
                      x1="14.629"
                      x2="14.629"
                      y1="11.827"
                      y2="15.062"
                    ></line>
                    <path d="M14.6857143,0 L5.31428571,0 C2.04761905,0 0,2.31208373 0,5.58515699 L0,14.414843 C0,17.6879163 2.03809524,20 5.31428571,20 L14.6857143,20 C17.9619048,20 20,17.6879163 20,14.414843 L20,5.58515699 C20,2.31208373 17.9619048,0 14.6857143,0 Z"></path>
                  </g>
                </svg>
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    color: isActive == "/" ? "#002B6A" : "white",
                  }}
                >
                  Dashboard
                </span>
              </div>
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/customers"
              onClick={() => {
                setActive("customers");
              }}
            >
              <div
                className={
                  isActive == "/customers"
                    ? `${Link} d-flex align-items-center gap-2 py-3`
                    : " text-white  d-flex align-items-center gap-2 py-3 "
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  width="28"
                  height="28"
                  id="users"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <circle
                    cx="88"
                    cy="108"
                    r="52"
                    fill="none"
                    stroke={isActive== "/customers" ? "#002B6A" : "white"}
                    stroke-miterlimit="10"
                    stroke-width="16"
                  ></circle>
                  <path
                    fill="none"
                    stroke={isActive == "/customers" ? "#002B6A" : "white"}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                    d="M155.41251 57.937A52.00595 52.00595 0 1 1 169.52209 160M15.99613 197.39669a88.01736 88.01736 0 0 1 144.00452-.00549M169.52209 160a87.89491 87.89491 0 0 1 72.00032 37.3912"
                  ></path>
                </svg>
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    color: isActive == "/customers" ? "#002B6A" : "white",
                  }}
                >
                  Customers
                </span>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar>
      </section>
    </div>
  );
}

export default SideBar;
