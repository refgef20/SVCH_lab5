import fs from "node:fs/promises";

export async function Search(prop, val) {
  const data = await fs.readFile("data/index.json");
  const products = JSON.parse(data);
  let resfind = [];
  try {
    for (let i = 0; i < products.length; i++) {
      const product = await fs.readFile(
        `data/products/${products[i].filepath}`,
      );
      const resProduct = JSON.parse(product);
      if (resProduct[prop] == val) {
        console.log(resProduct);
      }
    }
  } catch (error) {
    console.error("Ошибка поиска", error);
  }
}
