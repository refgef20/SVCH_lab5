import { Worker } from "node:worker_threads";

const ITERATIONS = 50_000_000;

function doHeavyMath(iterations) {
  let total = 0;
  for (let i = 0; i < iterations; i++) {
    total += Math.sqrt(i);
  }
  return total;
}

export function runSyncCalculation() {
  console.log("\n[Вариант А] Старт расчета в ГЛАВНОМ потоке ");

  const pulse = setInterval(() => {
    console.log("  [Пульс]: Главный поток жив и отвечает!");
  }, 400);

  console.time("Время (Главный поток)");

  const result = doHeavyMath(ITERATIONS);

  console.timeEnd("Время (Главный поток)");
  clearInterval(pulse);

  console.log("Результат вычислений:", Math.round(result));
  console.log("пока шел расчет, консоль замерла (пульс не тикал)!\n");
}

export function runWorkerCalculation() {
  console.log("\n Старт расчета в ОТДЕЛЬНОМ ПОТОКЕ (Worker) ");

  const pulse = setInterval(() => {
    console.log("  [Пульс]: Главный поток жив и свободно отвечает!");
  }, 400);

  console.time("Время (Worker Thread)");

  const worker = new Worker("./src/workers/worker.js", {
    workerData: { iterations: ITERATIONS },
  });

  worker.on("message", (result) => {
    console.timeEnd("Время (Worker Thread)");
    clearInterval(pulse);

    console.log("Результат вычислений:", Math.round(result));
    console.log(
      " воркер считал в фоне, а главный поток ни на секунду не завис!\n",
    );
  });

  worker.on("error", (err) => {
    clearInterval(pulse);
    console.error("Ошибка воркера:", err);
  });
}
