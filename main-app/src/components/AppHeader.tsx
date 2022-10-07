import { Avatar, Layout, Dropdown, Menu } from "antd";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const overlayContent = () => {
    return (
      <Menu className="app-header-popover" style={{ width: 180 }}>
        <Menu.Item key="update-password">Change Password</Menu.Item>
        <Menu.Item key="logout">Log out</Menu.Item>
      </Menu>
    );
  };

  return (
    <Header className="app-header">
      <div className="app-avatar">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0">Menu Item One</Menu.Item>
              <Menu.Item key="1">Menu Item Two</Menu.Item>
              <Menu.Item key="1">Menu Item Three</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <div
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            Open Dropdown
          </div>
        </Dropdown>
        <Avatar
          style={{ width: 40, height: 40 }}
          src="https://tva1.sinaimg.cn/large/008i3skNly1gqc704hpilj305k05kt92.jpg"
        />
        <span style={{ marginLeft: 5 }}>John Doe</span>
      </div>
    </Header>
  );
};

export default AppHeader;
