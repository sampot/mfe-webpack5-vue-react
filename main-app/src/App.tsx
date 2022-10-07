import "./App.css";

import { Router } from "@vaadin/router";
import { Layout, Menu, Row, Col } from "antd";
import { useEffect, useRef } from "react";
import { routes } from "./routes";

const { Header, Sider, Content } = Layout;

const App = () => {
  const outletRef = useRef(null);
  const router: any = useRef(null);

  useEffect(() => {
    if (outletRef.current !== null && router.current === null) {
      router.current = new Router(outletRef.current);
      router.current.setRoutes(routes);
    }
  }, []);

  return (
    <Layout style={{ height: "100vh" }} hasSider>
      <Sider
        style={{
          background: "#050F33",
          overflow: "auto",
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            background: "black",
            margin: "auto",
            marginTop: 16,
            marginBottom: 32,
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          style={{
            background: "#050F33",
            color: "white",
            height: "calc(100vh - (55px + 130px + 16px + 32px)",
          }}
        >
          <Menu.Item key="1">
            <a href="/react-app-1">React App 1</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/react-app-2">React App 2</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="/vue-app-1">Vue App 1</a>
          </Menu.Item>
          <Menu.Item key="4">
            <a href="/vue-app-2">Vue App 2</a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <Row justify="space-between">
            <Col>Header</Col>
          </Row>
        </Header>
        <Content style={{ background: "white", padding: 48 }}>
          <Row gutter={8} style={{ alignItems: "center" }}>
            <div id="outlet" ref={outletRef}></div>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
