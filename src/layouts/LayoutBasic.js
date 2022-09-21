//import { useState, useEffect } from "react";

import { Layout } from "antd";

import MenuTop from "../components/MenuTop";

import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { children } = props;
  //const [menuCollapsed, setMenuCollapsed] = useState(false);

  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Layout className="layout-basic">
        <Header className="layout-basic__header">
          <MenuTop />
        </Header>
        <Content className="layout-basic__content">{children}</Content>
        <Footer className="layout-basic__footer">Jose Antonio</Footer>
      </Layout>
    </Layout>
  );
}
