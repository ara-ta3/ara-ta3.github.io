import { Table } from "flowbite-react";
import React from "react";

export default () => {
  return (
    <div>
      <Table>
        <Table.Head>
          <Table.HeadCell>参考</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <a
                className="hover:underline text-blue-600"
                href="https://www.env.go.jp/nature/dobutsu/aigo/2_data/pamph/petfood_guide_1808/pdf/6.pdf"
                target="_blank"
              >
                環境省 飼い主のためのペットフード・ガイドライン
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <a
                className="hover:underline text-blue-600"
                href="https://www.anicom-sompo.co.jp/nekonoshiori/8965.html#i-2"
                target="_blank"
              >
                猫にとって必要なカロリーとは？計算の仕方は？
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <a
                className="hover:underline text-blue-600"
                href="https://www.youtube.com/watch?v=i-R76COsVbU"
                target="_blank"
              >
                獣医さんが使う猫のご飯の量の計算方法～フードの裏だと多すぎ！？～
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <a
                className="hover:underline text-blue-600"
                href="https://www.axa-direct.co.jp/pet/pet_cat/consultation/content/08.html"
                target="_blank"
              >
                エサの適正量｜よくあるご相談｜猫のお悩み相談室｜アクサダイレクトのペット保険
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
