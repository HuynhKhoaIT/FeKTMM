import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SidebarAdmin.module.scss";
import Image from "../../../components/Images";
import { SignOutIcon } from "../../../components/Icons";
import { SidebarAdminNav } from "./SidebarAdminNav";
import * as profileAdminService from "../../../services/profileAdminService";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
function SidebarAdmin() {
  const token = localStorage.getItem("token"); // Lấy token từ Local Storage
  const [user, setUser] = useState([]);
  console.log("user", user);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await profileAdminService.getUser(token);
      setUser(result);
    };
    fetchApi();
  }, [token]);

  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate("/admin/login");
  };
  return (
    <div
      className={cx(
        " d-flex flex-column justify-content-between",
        "sidebar-wrapper"
      )}
    >
      <div>
        <div
          className={cx(
            "d-flex align-items-center justify-content-center",
            "profil"
          )}
        >
          <div className={cx("logo")}>
            <Image
              src="https://shopfront-cdn.tekoapis.com/static/phongvu/logo-full.svg"
              alt="logo"
            />
          </div>
        </div>
        <div className={cx("nav")}>
          <ul className={cx("nav-list")}>
            {SidebarAdminNav.map((val, key) => {
              return (
                <li
                  key={key}
                  className={cx("nav-item")}
                  id={window.location.pathname === val.to ? cx("active") : ""}
                  onClick={() => {
                    window.location.pathname = val.to;
                  }}
                >
                  <span>
                    {val.icon !== null ? val.icon : null}
                    <span> </span>
                    <span className={cx("nav-item__link")}>
                      {val.title === "NAME" ? user?._fname : val.title}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className={cx(
          "d-flex align-items-center justify-content-center text-bg-primary",
          "sign-out"
        )}
        onClick={handleSignOut}
      >
        <SignOutIcon />
      </div>
    </div>
  );
}

export default SidebarAdmin;
