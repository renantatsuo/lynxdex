import { root } from "@lynx-js/react";

import { MemoryRouter, Route, Routes } from "react-router";
import { Home } from "~/screens/Home";
import { Pokemon } from "~/screens/Pokemon";
import "./styles.scss";

root.render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Pokemon />} />
    </Routes>
  </MemoryRouter>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
