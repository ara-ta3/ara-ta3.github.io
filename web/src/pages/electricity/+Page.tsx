import React from "react";
import { Table } from "flowbite-react";

const dummyData = [
  { company: "A社", price: "--円" },
  { company: "B社", price: "--円" },
];

const ElectricityComparison: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-primary-500">
        電気代比較ツール(仮)
      </h1>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>会社</Table.HeadCell>
            <Table.HeadCell>料金例</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dummyData.map((row, idx) => (
              <Table.Row
                key={idx}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {row.company}
                </Table.Cell>
                <Table.Cell>{row.price}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </section>
  );
};

export default ElectricityComparison;
