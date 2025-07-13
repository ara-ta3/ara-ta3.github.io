import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

interface BreadcrumbWithSchemaProps {
  pathname: string;
}

const BreadcrumbWithSchema: React.FC<BreadcrumbWithSchemaProps> = ({
  pathname,
}) => {
  const breadcrumbs = useBreadcrumbs(pathname);

  if (breadcrumbs.length === 0) return null;

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <BreadcrumbSchema items={breadcrumbs} />
    </>
  );
};

export default BreadcrumbWithSchema;
