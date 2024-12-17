import React from "react";

import Header from "../components/Header";
import { HourlyPieChart } from "../components/Schedule";

const Schedules: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <HourlyPieChart />
      </main>
    </>
  );
};

export default Schedules;
