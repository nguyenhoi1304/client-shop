import React from "react";
import { Route, Routes } from "react-router-dom";
import MainHistory from "./component/MainHistory";
import DetailHistory from "./component/DetailHistory";

function History(props) {
  return (
    <Routes>
      <Route path="/" element={<MainHistory />} />

      <Route path="/:idHistory" element={<DetailHistory />} />
    </Routes>
  );
}

export default History;
