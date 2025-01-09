import { Blockquote, List, Table } from "flowbite-react";
import React from "react";

export default () => {
  return (
    <div>
      <Table>
        <Table.Head>
          <Table.HeadCell>参考</Table.HeadCell>
          <Table.HeadCell>参考内容</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
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
            <Table.Cell>
              <h3 className="text-base font-bold py-2">RERの式について</h3>
              <Blockquote className="text-xs">
                <p>
                  安静にしているときに必要なエネルギー量は、次の簡易式を利用して体重から計算することができます。
                </p>
                <p>
                  安静時のエネルギー要求量(RER)(キロカロリー) = 体重(kg)×30+70
                </p>
              </Blockquote>
              <h3 className="text-base font-bold py-2">DERの式について</h3>
              <Blockquote className="text-xs">
                <p>
                  日々の生活に必要なエネルギー量は、成長段階や活動量に応じ、係数をかけて計算することができます。
                </p>
                <p>1日当たりのエネルギー要求量(DER)(キロカロリー)=RER×係数</p>
              </Blockquote>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <a
                className="hover:underline text-blue-600"
                href="https://www.anicom-sompo.co.jp/nekonoshiori/8965.html#i-2"
                target="_blank"
              >
                アニコム猫との暮らし大百科
                猫にとって必要なカロリーとは？計算の仕方は？
              </a>
            </Table.Cell>
            <Table.Cell>
              <h3 className="text-base font-bold py-2">RERの式について</h3>
              <Blockquote className="text-xs">
                <p>安静時エネルギー要求量（RER）とは？</p>
                <p>
                  安静時エネルギー要求量（resting energy
                  requirement:RER）とは、動物が適温の環境で安静にしているときに必要とするエネルギー量です。RERは次の計算式で求められます。
                </p>
                <p>RER(kcal) = 70 × (体重(kg)) ^ 0.75</p>
                <p>
                  ※電卓で計算する場合、　体重（kg） × 　体重（kg） ×
                  　体重（kg）を計算した後、
                  √（ルート）を２回押し、その値に70をかけると求めることができます。
                </p>
                <p>
                  あるいは簡易的に RER（kcal）＝ 体重（kg）× 30 + 70
                  で計算することもできます。多少数値は変わってきますが、大きな問題はありません。
                </p>
              </Blockquote>
              <h3 className="text-base font-bold py-2">DERの式について</h3>
              <Blockquote className="text-xs">
                <p>1日当たりのエネルギー要求量（DER）の求め方</p>
                <p>
                  1日当たりのエネルギー要求量（DER）は、同じ体重であっても、ライフステージ、避妊去勢の有無、体型、活動量などによってそれぞれ変わってきます。安静時エネルギー要求量（RER）に、それぞれの生理状態を考慮した係数をかけることで、1日当たりのエネルギー要求量（DER）を求めることができます。
                </p>
                <p>
                  1日当たりのエネルギー要求量（DER）＝
                  安静時エネルギー要求量（RER）× 係数
                </p>
              </Blockquote>
              <h3 className="text-base font-bold py-2">
                DERの式の係数について
              </h3>
              <Blockquote className="text-xs">
                <List unstyled>
                  <List.Item>成長期の猫（生後1歳まで） RER×2.5</List.Item>
                  <List.Item>未避妊・未去勢猫 RER×1.4～1.6</List.Item>
                  <List.Item>避妊・去勢済み猫 RER×1.2～1.4 </List.Item>
                  <List.Item>活動的な成猫 RER×1.6</List.Item>
                  <List.Item>非活動的・肥満傾向の猫 RER×1.0</List.Item>
                  <List.Item>減量が必要な猫 RER×0.8</List.Item>
                  <List.Item>増量が必要な猫 RER×1.2～1.4</List.Item>
                  <List.Item>妊娠中の母猫（繁殖時） RER×1.6</List.Item>
                  <List.Item>妊娠中の母猫（分娩時） RER×2.0</List.Item>
                  <List.Item>授乳中の母猫 RER×2.0～6.0</List.Item>
                  <List.Item>高齢猫（７～１１歳） RER×1.1～1.4</List.Item>
                  <List.Item>超高齢猫 RER×1.1～1.6</List.Item>
                  <List.Item>安静状態、重篤な猫 RER×1.0</List.Item>
                </List>
              </Blockquote>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <a
                className="hover:underline text-blue-600"
                href="https://www.youtube.com/watch?v=i-R76COsVbU"
                target="_blank"
              >
                YouTube
                獣医さんが使う猫のご飯の量の計算方法～フードの裏だと多すぎ！？～
              </a>
            </Table.Cell>
            <Table.Cell>
              <h3 className="text-base font-bold py-2">ご飯の量の決め方</h3>
              <Blockquote className="text-xs">
                <p>ご飯の量 = 体重^(3/4)×70×係数</p>
              </Blockquote>
              <h3 className="text-base font-bold py-2">係数について</h3>
              <Blockquote className="text-xs">
                <p>避妊去勢済みの成猫ちゃんは1.2</p>
                <p>避妊去勢していない成猫ちゃんは1.4</p>
                <p>高齢猫ちゃんは1.1</p>
                <p>成長期だと4ヶ月は3 4~6ヶ月は2.5 7~12ヶ月は2</p>
                <p>病気の時とかは1</p>
                <p>妊娠中は2</p>
                <p>搾乳中は2~6</p>
              </Blockquote>
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
            <Table.Cell>
              <h3 className="text-base font-bold py-2">
                安静時エネルギー要求量＝RERについて
              </h3>
              <Blockquote className="text-xs">
                <p>
                  まず、猫が何もせずにじっとしているだけで消費するエネルギー量を計算します。これを安静時エネルギー要求量＝RERといいます。
                </p>
                <p>
                  計算式はRER=70×（体重kg）^0.75です。
                  電卓で、体重×体重×体重を計算したら√（ルート）ボタンを２回押し、出た値に70を掛けることで導けます。
                </p>
                <p>
                  例えば、3kgの体重であれば、3×3×3＝27、27に√（ルート）ボタンを2回押し、70を掛けた数値（小数点切捨て）「159カロリー」が、じっとしているだけで消費するエネルギー量（RER）となります。
                </p>
              </Blockquote>
              <h3 className="text-base font-bold py-2">
                1日に必要なカロリーについて
              </h3>
              <Blockquote className="text-xs">
                <p>
                  このRERを元に必要な1日のカロリーを計算します。避妊しているのであれば、「RER×1.2」、避妊していないのであれば「RER×1.4」が1日に必要なカロリーになります。
                </p>
                <p>
                  ちなみに、生後4か月齢くらいまでの子猫や妊娠中の猫ではより多くのカロリーを必要とするため、RERにかける値は大きくなります。
                </p>
                <p>
                  このように、猫のライフステージにあわせて必要な給餌量（カロリー）を計算することができますが、面倒な計算をしなくても、フードの袋等に体重と年齢（月齢）にあわせた給餌量が書かれていますので、それを参考にするといいでしょう。すぐに食べきってしまうからと言って、追加で与えるとカロリーの取りすぎになってしまうのでやめましょう。
                </p>
              </Blockquote>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
