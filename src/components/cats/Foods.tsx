import React from "react";

import { DryFood, WetFood, FoodType } from "../../domains/cats/Food.ts";
import { Table } from "flowbite-react";
import FoodMaster from "../../domains/cats/FoodMaster.ts";

const DryFoodHeader: React.FC = () => {
  return (
    <Table.Head>
      <Table.HeadCell className="px-6 py-3">名称</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">kcal / 100g</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">糖質(概算)</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">たんぱく質</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">脂質</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">粗繊維</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">灰分</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">水分</Table.HeadCell>
    </Table.Head>
  );
};

const WetFoodHeader: React.FC = () => {
  return (
    <Table.Head>
      <Table.HeadCell className="px-6 py-3">名称</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">kcal/袋</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">糖質(概算)</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">たんぱく質</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">脂質</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">粗繊維</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">灰分</Table.HeadCell>
      <Table.HeadCell className="px-6 py-3">水分</Table.HeadCell>
    </Table.Head>
  );
};

const DryFoodTableBody: React.FC<{ foods: DryFood[] }> = (props) => {
  return (
    <Table.Body>
      {props.foods.map((f) => {
        return (
          <Table.Row key={f.id}>
            <Table.Cell className="px-6 py-4">
              <a
                className="hover:underline text-blue-600"
                href={f.url}
                target="_blank"
              >
                {`${f.brand} ${f.series}${f.target ? ` (${f.target})` : ""} - ${f.flavor}`}
              </a>
            </Table.Cell>
            <Table.Cell className="px-6 py-4">{f.kcalPer100}</Table.Cell>
            <Table.Cell className="px-6 py-4">
              {f.nutrition.carbohydrate}
            </Table.Cell>
            <Table.Cell className="px-6 py-4">{f.nutrition.protein}</Table.Cell>
            <Table.Cell className="px-6 py-4">{f.nutrition.fat}</Table.Cell>
            <Table.Cell className="px-6 py-4">{f.nutrition.fiber}</Table.Cell>
            <Table.Cell className="px-6 py-4">{f.nutrition.ash}</Table.Cell>
            <Table.Cell className="px-6 py-4">
              {f.nutrition.moisture}
            </Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};

const WetFoodTableBody: React.FC<{ foods: WetFood[] }> = (props) => {
  return (
    <Table.Body>
      {props.foods.map((f) => {
        return (
          <Table.Row key={f.id}>
            <Table.Cell className="px-6 py-4">
              <a
                className="hover:underline text-blue-600"
                href={f.url}
                target="_blank"
              >
                {`${f.brand} ${f.series}${f.target ? ` (${f.target})` : ""} - ${f.flavor}`}
              </a>
            </Table.Cell>
            <Table.Cell className="px-6 py-4">{f.kcalPerBag}</Table.Cell>
            <Table.Cell className="px-6 py-4">
              {f.nutrition.carbohydrate}
            </Table.Cell>
            <Table.Cell className="px-6 py-4">{f.nutrition.protein}</Table.Cell>
            <Table.Cell className="px-6 py-4">{f.nutrition.fat}</Table.Cell>
            <Table.Cell className="px-6 py-4">{f.nutrition.fiber}</Table.Cell>
            <Table.Cell className="px-6 py-4">{f.nutrition.ash}</Table.Cell>
            <Table.Cell className="px-6 py-4">
              {f.nutrition.moisture}
            </Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};

const FoodTable: React.FC = () => {
  const dryFoods = FoodMaster.filter((x) => x.type === FoodType.Dry);
  const wetFoods = FoodMaster.filter((x) => x.type === FoodType.Wet);
  return (
    <div>
      <h1 className="text-2xl font-bold my-4 ">対応しているフード</h1>
      <p className="text-sm text-gray-500">
        適宜追加していきますが、追加要望があれば
        <a
          className="hover:underline text-blue-600"
          href="https://forms.gle/Ub7AofzTy4WJeVZPA"
          target="_blank"
        >
          こちら
        </a>
        からリンクなどを送っていただけるとありがたいです。
      </p>

      <h2 className="text-1xl font-bold my-4 ">ドライフード</h2>
      <div className="overflow-x-auto w-full">
        <Table>
          <DryFoodHeader />
          <DryFoodTableBody foods={dryFoods} />
        </Table>
      </div>
      <h2 className="text-1xl font-bold my-4 ">ウェットフード</h2>
      <div className="overflow-x-auto w-full">
        <Table>
          <WetFoodHeader />
          <WetFoodTableBody foods={wetFoods} />
        </Table>
      </div>
    </div>
  );
};

export default FoodTable;
