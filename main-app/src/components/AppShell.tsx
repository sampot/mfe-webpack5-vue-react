import { Layout } from "antd";
import AppMenu from "./AppMenu";

const AppShell: React.FC<{ children: any }> = ({ children }) => {
  return (
    <Layout hasSider className="app-layout">
      <AppMenu />
      <Layout className="site-layout">{children}</Layout>
    </Layout>
  );
};

export default AppShell;
