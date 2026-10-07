import { Backup } from "./src/fs/backup.js";
import { Create } from "./src/fs/create.js";
import { Delete } from "./src/fs/delete.js";
import { List } from "./src/fs/list.js";
import { Read } from "./src/fs/read.js";
import { Rename } from "./src/fs/rename.js";
import { Search } from "./src/fs/search.js";
import { Update } from "./src/fs/update.js";
import readline from "node:readline/promises";
import { Generate } from "./src/streams/generate.js";
import { Trans } from "./src/streams/transform.js";
import { Compare } from "./src/streams/compare.js";
import { Read2 } from "./src/streams/read.js";
import { runSyncCalculation } from "./src/workers/calc.js";
import { runWorkerCalculation } from "./src/workers/calc.js";

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
  case "create":
    Create(
      process.argv[3],
      process.argv[4],
      process.argv[5],
      process.argv[6],
      process.argv[7],
      process.argv[8],
      process.argv[9],
    );
    break;
  case "update":
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      let id = process.argv[3];
      if (!id) {
        id = await rl.question("Введите ID товара для обновления: ");
      }

      if (!id || id.trim() === "") {
        console.log("Ошибка: ID не указан!");
        break;
      }

      console.log(`\n--- Редактирование товара #${id} ---`);
      console.log("(Нажмите Enter, чтобы оставить поле без изменений)\n");

      const newName = await rl.question("Новое название: ");
      const newPrice = await rl.question("Новая цена: ");
      const newdesc = await rl.question("Новое описание: ");
      const newcategory = await rl.question("Новая категория: ");
      const newrating = await rl.question("Новый рейтинг: ");
      const newphoto = await rl.question("Новое фото: ");

      const updates = {};
      if (newName.trim() !== "") {
        updates.name = newName.trim();
      }
      if (newPrice.trim() !== "") {
        updates.price = Number(newPrice.trim());
      }
      if (newdesc.trim() !== "") {
        updates.description = newdesc.trim();
      }

      if (newcategory.trim() !== "") {
        updates.category = newcategory.trim();
      }

      if (newrating.trim() !== "") {
        updates.rating = Number(newrating.trim());
      }

      if (newphoto.trim() !== "") {
        updates.photo = newphoto.trim();
      }

      if (Object.keys(updates).length === 0) {
        console.log("Вы ничего не ввели. Товар остался без изменений.");
      } else {
        await Update(id.trim(), updates);
        console.log("Обновление завершено успешно!");
      }
    } catch (error) {
      console.error("Произошла ошибка:", error.message);
    } finally {
      rl.close();
    }
    break;
  case "rename":
    const rl2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    try {
      let oldpath = process.argv[3];
      if (!oldpath) {
        oldpath = await rl2.question("Ввдите переименуемый файл: ");
      }
      const newName = await rl2.question("Введите новое имя файла: ");
      Rename(newName, oldpath);
      console.log("Переименовывание завершено успешно!");
    } catch (error) {
      console.error("Произошла ошибка:", error.message);
    } finally {
      rl2.close();
    }
    break;
  case "backup":
    Backup(process.argv[3], process.argv[4]);
    break;
  case "search":
    const rl3 = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const property = await rl3.question(
      "По какому параметру хотите найти товар:",
    );
    const value = await rl3.question("Введите значение: ");
    Search(property, value);
    rl3.close();
    break;
  case "gener":
    Generate();
    break;
  case "trans":
    Trans();
    break;
  case "compare":
    Compare();

    break;
  case "sync_calc":
    runSyncCalculation();
    break;

  case "calc-worker":
    runWorkerCalculation();
    break;
  default:
    console.log("Что-то пошло не так");
}
