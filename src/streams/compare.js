import fs from "node:fs/promises";
import filestream from "node:fs";

export async function Compare(params) {
  console.time("read");
  const data = await fs.readFile("data/big-products.txt");
  console.timeEnd("read");
  console.log(process.memoryUsage().rss / 1024 / 1024);
  console.time("Read");
  const stream = filestream.createReadStream("data/big-products.txt");
  stream.on("data", () => {});
  stream.on("end", (chunk) => {
    console.timeEnd("Read");
    console.log(process.memoryUsage().rss / 1024 / 1024);
  });
}
