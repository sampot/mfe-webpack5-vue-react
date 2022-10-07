import React, { useState, useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";

import { loadRemoteModule } from "../lib/remote-modules";

const WcBox = ({
  elementName,
  remoteName,
  ...props
}: {
  elementName: string;
  remoteName: string;
}) => {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("load remote module");
    loadRemoteModule(remoteName)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setFailed(true);
        console.log(err);
      });
  }, [remoteName]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (failed) {
    return <div>Error in loading. </div>;
  }

  return (
    <ErrorBoundary>
      <div>{React.createElement(elementName, props)}</div>
    </ErrorBoundary>
  );
};

class WebComponentWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const remoteName = this.getAttribute("remoteName") || "";
    const elementName = this.getAttribute("elementName") || "";

    loadRemoteModule(remoteName)
      .then(() => {
        const mountPoint = document.createElement(elementName);
        this.attachShadow({ mode: "open" }).appendChild(mountPoint);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
customElements.define("wc-box", WebComponentWrapper);

export default WcBox;
