import fs from "node:fs/promises";

export async function Create(
  id,
  name,
  price,
  description,
  category,
  rating,
  photo,
) {
  const data = await fs.readFile("data/index.json");
  const res = JSON.parse(data);
  const find = res.find((prod) => prod.id == id);
  if (find) {
    console.log("Необходимо ввести уникальный идентификатор");
  } else {
    const newprodind = {
      id: id,
      name: name,
      filepath: `${id}.json`,
    };
    const newprod = {
      id: id,
      name: name,
      price: price,
      description: description,
      category: category,
      rating: rating,
      photo: photo,
    };
    res.push(newprodind);
    const jsres = JSON.stringify(res);
    const jsprod = JSON.stringify(newprod);
    await fs.writeFile("data/index.json", jsres);
    await fs.writeFile(`data/products/${id}.json`, jsprod);
    console.log("Товар создан");
  }
}
