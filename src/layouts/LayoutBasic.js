//import { useState, useEffect } from "react";

import { Layout } from "antd";

import MenuTop from "../components/MenuTop";

import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { children, setLocation } = props;
  //const [menuCollapsed, setMenuCollapsed] = useState(false);

  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Layout className="layout-basic">
        <Header className="layout-basic__header">
          <MenuTop setLocation={setLocation} />
        </Header>
        <Content className="layout-basic__content">{children}</Content>
        <Footer className="layout-basic__footer">
          <span className="layout-basic__footer-web">Mi meteo web.</span>
          <span className="layout-basic__footer-license">
            Esta web no recopila ningún dato y todo su contenido es de dominio
            publico
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
}
