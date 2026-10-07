import { parentPort, workerData } from "node:worker_threads";

function doHeavyMath(iterations) {
  let total = 0;
  for (let i = 0; i < iterations; i++) {
    total += Math.sqrt(i);
  }
  return total;
}

const iterations = workerData?.iterations || 50_000_000;

const result = doHeavyMath(iterations);

parentPort.postMessage(result);
