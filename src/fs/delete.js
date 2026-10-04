import fs from "node:fs/promises";
export async function Delete(id) {
  // const id = process.argv[3];
  const data = await fs.readFile("data/index.json");
  const res = JSON.parse(data);
  const exist = res.find((prod) => prod.id == id);
  if (exist) {
    const newRes = res.filter((prod) => prod.id != id);
    await fs.unlink(`data/products/${exist.filepath}`);
    const dataInd = JSON.stringify(newRes);
    await fs.writeFile("data/index.json", dataInd);
    console.log("Удаление прошло успешно");
  } else {
    console.log("Такого айди не существет");
  }
}
