"use client";

import { ComponentType, lazy, useEffect, useState } from "react";

export default function Index() {
  const [Component, setComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      //@ts-ignore
      const remoteComponent = lazy(() => import("remote/App"));
      setComponent(() => remoteComponent);
    }
  }, []);

  return <div>{Component && <Component />}</div>;
}
