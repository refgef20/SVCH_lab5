import { Delete } from "./src/fs/delete.js";
import { List } from "./src/fs/list.js";
import { Read } from "./src/fs/read.js";

const query = process.argv[2];
switch (query) {
  case "delete":
    if (!process.argv[3]) {
      console.log("Введите айди удаляемого товара");
    } else {
      Delete(process.argv[3]);
    }
    break;
  case "list":
    List();
    break;
  case "read":
    if (!process.argv[3]) {
      console.log("Введите айди читаемого товара");
    } else {
      Read(process.argv[3]);
    }
    break;
  default:
    console.log("Что-то пошло не так");
}
