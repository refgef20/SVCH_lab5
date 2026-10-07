import fs from "node:fs/promises";

export async function Backup(source, destination) {
  try {
    await fs.cp(source, destination, { recursive: true });
    console.log("Копирование прошло успешно");
  } catch (error) {
    console.error("Ошибка копирования ", error);
  }
}
