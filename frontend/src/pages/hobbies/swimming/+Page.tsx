import React from "react";
import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";
import SwimmingRecordBook from "@/components/hobbies/SwimmingRecordBook";

const SwimmingPage: React.FC = () => (
  <>
    <BreadcrumbWithSchema pathname="/hobbies/swimming/" />
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-primary-900">水泳の記録</h1>
      <p className="mt-2 text-primary-500">
        泳いだ日と距離を記録して、月ごと・年ごとの積み重ねを振り返ります
      </p>
    </div>
    <SwimmingRecordBook />
  </>
);

export default SwimmingPage;
