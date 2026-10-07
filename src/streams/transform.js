import { Stream, Transform } from "node:stream";
import { Read2 } from "./read.js";
import { Write } from "./write.js";
import { readFile } from "node:fs";

export async function Trans() {
  const stream = new Transform({
    transform(chunk, encoding, callback) {
      const res = chunk.toString().toUpperCase();
      callback(null, res);
    },
  });

  Read2().pipe(stream).pipe(Write());
}
