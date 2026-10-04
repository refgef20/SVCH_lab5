import fs from "node:fs/promises";

export async function List() {
  const data = await fs.readFile("data/index.json");
  const resault = JSON.parse(data);
  console.table(resault);
}
