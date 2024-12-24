import React from "react";

import { DryFoods, Food } from "../../domains/Cat.ts";
import { Table } from "flowbite-react";

const DryFoodTableBody: React.FC<{ feed: Food; der: number }> = (props) => {
  return (
    <Table.Row>
      <Table.Cell className="px-6 py-4">
        <a
          className="hover:underline text-blue-600"
          href={props.feed.url}
          target="_blank"
        >
          {props.feed.name}
        </a>
      </Table.Cell>
      <Table.Cell className="px-6 py-4">{props.feed.kcalPer100}</Table.Cell>
      <Table.Cell className="px-6 py-4">
        {Math.round((props.der / props.feed.kcalPer100) * 100)}
      </Table.Cell>
      <Table.Cell className="px-6 py-4">
        {props.feed.nutrition.carbohydrate}
      </Table.Cell>
      <Table.Cell className="px-6 py-4">
        {props.feed.nutrition.protein}
      </Table.Cell>
      <Table.Cell className="px-6 py-4">{props.feed.nutrition.fat}</Table.Cell>
      <Table.Cell className="px-6 py-4">
        {props.feed.nutrition.fiber}
      </Table.Cell>
      <Table.Cell className="px-6 py-4">{props.feed.nutrition.ash}</Table.Cell>
      <Table.Cell className="px-6 py-4">
        {props.feed.nutrition.moisture}
      </Table.Cell>
    </Table.Row>
  );
};

const DryFoodTable: React.FC<{ der: number }> = (props: { der: number }) => {
  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-2xl font-bold my-4 ">ドライフード</h1>
      <Table>
        <Table.Head>
          <Table.HeadCell className="px-6 py-3">名称</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">
            カロリー(kcal/100g)
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">必要グラム数</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">糖質(概算)</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">たんぱく質</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">脂質</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">粗繊維</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">灰分</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">水分</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {DryFoods.map((f) => (
            <DryFoodTableBody key={f.id} der={props.der} feed={f} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DryFoodTable;
