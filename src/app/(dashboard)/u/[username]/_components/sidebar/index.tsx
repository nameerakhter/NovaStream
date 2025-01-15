import React from "react";

import { Navigation } from "./navigation";
import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";

export function Sidebar() {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
}