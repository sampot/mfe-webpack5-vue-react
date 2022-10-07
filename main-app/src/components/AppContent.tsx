import { Router } from "@vaadin/router";
import { useEffect, useRef } from "react";

import { routes } from "@/routes";
import { Layout, Row } from "antd";

const { Content } = Layout;

const AppContent = () => {
  const outletRef = useRef(null);
  const router: any = useRef(null);

  useEffect(() => {
    if (outletRef.current !== null && router.current === null) {
      router.current = new Router(outletRef.current);
      router.current.setRoutes(routes);
    }
  }, []);

  return (
    <Content style={{ background: "white", padding: 48 }}>
      <Row gutter={8} style={{ alignItems: "center" }}>
        <div id="outlet" ref={outletRef}></div>
      </Row>
    </Content>
  );
};

export default AppContent;
