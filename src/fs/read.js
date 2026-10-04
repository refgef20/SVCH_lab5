import fs from "node:fs/promises";

export async function Read(id) {
  const data = await fs.readFile("data/index.json");
  const res = JSON.parse(data);
  const exist = res.find((prod) => prod.id == id);
  if (exist) {
    const data = await fs.readFile(`data/products/${exist.filepath}`);
    const res = JSON.parse(data);
    console.table(res);
  } else {
    console.log("Товара с таким id нет");
  }
}
