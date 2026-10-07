import fs from "node:fs/promises";

export async function Rename(filenameNew, oldName) {
  const data = await fs.readFile("data/index.json");
  const products = JSON.parse(data);
  const product = products.find((prod) => prod.filepath == `${oldName}.json`);
  if (!product) {
    console.log("Такого файла не существует");
  } else {
    product.filepath = `${filenameNew}.json`;
    await fs.rename(
      `data/products/${oldName}.json`,
      `data/products/${filenameNew}.json`,
    );
    const jsprod = JSON.stringify(products);
    await fs.writeFile("data/index.json", jsprod);
  }
}
