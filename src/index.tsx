import { root } from "@lynx-js/react";

import { MemoryRouter, Route, Routes } from "react-router";
import { App } from "./App.js";

root.render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </MemoryRouter>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
