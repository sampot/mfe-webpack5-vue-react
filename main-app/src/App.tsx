import { Layout, Avatar, Menu } from "antd";

const { Header, Sider, Content } = Layout;

const App = () => (
  <Layout className="app-layout">
    <Sider>
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
        <Menu.Item key="1">Dashboard</Menu.Item>
        <Menu.Item key="2">Profiles</Menu.Item>
        <Menu.Item key="3">Agents</Menu.Item>
        <Menu.Item key="4">Settings</Menu.Item>
      </Menu>
    </Sider>
    <Header className="app-header">
      <div className="app-avatar">
        <Avatar
          style={{ width: 40, height: 40 }}
          src="https://tva1.sinaimg.cn/large/008i3skNly1gqc704hpilj305k05kt92.jpg"
        />
        <span style={{ marginLeft: 5 }}>Joe Doe</span>
      </div>
    </Header>

    <Content style={{ background: "white", padding: 48 }}>
      <div id="outlet"></div>
    </Content>
  </Layout>
);

export default App;
