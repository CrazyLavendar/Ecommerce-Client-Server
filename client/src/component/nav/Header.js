import { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux"; // redux hooks
import { useHistory } from "react-router-dom"; // can help redirecting without mentioning in switch

const { SubMenu, Item } = Menu; // Menu.submenu , Menu.Item // This is called destructuring

const Header = () => {
  const [current, setCurrent] = useState("home"); // current state is home
  let dispatch = useDispatch();
  let { user } = useSelector((state) => {
    //
    return { ...state };
  });
  let history = useHistory();
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
    //
  };

  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {/* current state is activated by keys */}
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              {" "}
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item>
              {" "}
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};
export default Header;
