import React from "react";

import { Foods, Food, DryFood, WetFood, FoodType } from "../../domains/Cat.ts";
import { Table } from "flowbite-react";

const DryFoodTableBody: React.FC<{ feed: DryFood | WetFood; der: number }> = (
  props
) => {
  const food = props.feed;
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
      <Table.Cell className="px-6 py-4">
        {food.type === FoodType.Dry ? food.kcalPer100 : food.kcalPerBag}
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
    <div>
      <h1 className="text-2xl font-bold my-4 ">ドライフード</h1>
      <Table>
        <Table.Head>
          <Table.HeadCell className="px-6 py-3">名称</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">
            kcal(/100g or /袋)
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">糖質(概算)</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">たんぱく質</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">脂質</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">粗繊維</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">灰分</Table.HeadCell>
          <Table.HeadCell className="px-6 py-3">水分</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {Foods.map((f) => (
            <DryFoodTableBody key={f.id} der={props.der} feed={f} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DryFoodTable;
