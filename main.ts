// Fortune Cookie Funnies for Engineers (Node 22, standard library only):
// writes a single fortune cookie message for a software engineer to
// /output/entry.txt.
//
// Design: a fortune-cookie declarative with the twist drawn from the
// engineer's world — an old bug coming back, now promoted and blamed on
// its author. The funniest word sits at the end. Original, single line,
// English, well under the 120-character cap.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'A bug you wrote in 2021 will come back tomorrow — promoted, documented, and blamed on you.';

// The sealed scorer only accepts MIN_ENTRY_CHARS–MAX_ENTRY_CHARS UTF-8
// characters, not only whitespace: fail loudly here instead of writing an
// entry the judge would never see.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 120;

if (
  LINE.length < MIN_ENTRY_CHARS ||
  LINE.length > MAX_ENTRY_CHARS ||
  LINE.trim().length === 0
) {
  throw new Error(
    `entry line must be ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${LINE.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
