import fs from "node:fs";

export async function Generate() {
  const stream = fs.createWriteStream("data/big-products.txt");
  for (let i = 0; i <= 300000; i++) {
    stream.write(
      "Товар: Dyson Airwrap Multi-styler, Цена: 59900, Категория: Styling tools\n",
    );
  }
  stream.end();
  console.log("Большой файл успешно создан!");
}
