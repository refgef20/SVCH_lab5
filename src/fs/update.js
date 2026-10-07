import fs from "node:fs/promises";

export async function Update(id, updates) {
  const data = await fs.readFile("data/index.json");
  const resdata = JSON.parse(data);
  const firesdata = resdata.find((prod) => prod.id == id);
  if (!firesdata) {
    console.log("Данный товар не существует");
  } else {
    if (updates.name) {
      firesdata.name = updates.name;
      const query = JSON.stringify(resdata);
      await fs.writeFile("data/index.json", query);
    }
    const prodfile = await fs.readFile(`data/products/${firesdata.filepath}`);
    const resprodfile = JSON.parse(prodfile);
    const newprod = { ...resprodfile, ...updates };
    const jsnprod = JSON.stringify(newprod);
    await fs.writeFile(`data/products/${firesdata.filepath}`, jsnprod);
  }
}
