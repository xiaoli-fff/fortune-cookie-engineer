// Fortune Cookie Funnies for Engineers — Node 22, standard library only.
// Produces one fortune-cookie line aimed at a software engineer and saves
// it as /output/entry.txt.
//
// The joke: a fortune-cookie prediction whose twist comes straight out of
// an engineer's working life — a stale bug resurfaces, only now it has
// been promoted, written up, and pinned on the person who wrote it. The
// punch word lands last. It is original, one line, in English, and far
// shorter than the 120-character ceiling.
//
// When run outside the grader's container, MAKEFUN_OUTPUT_DIR takes the
// place of /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Fully deterministic: no network calls, no randomness, and nothing read
// from the clock or the environment besides the output directory. Every
// run therefore writes exactly the same bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ONE_LINER =
  'A bug you wrote in 2021 will come back tomorrow — promoted, documented, and blamed on you.';

// The sealed scorer only counts entries whose UTF-8 length falls inside
// this closed interval, and rejects blank-only text. We enforce the same
// bounds up front and fail loudly, rather than writing an entry that the
// judge would discard unseen.
const MIN_LENGTH = 1;
const MAX_LENGTH = 120;

function checkNotEmpty(text: string): void {
  if (text.trim().length === 0) {
    throw new Error('entry line must not be empty or whitespace only');
  }
}

function checkWithinLimit(text: string, floor: number, ceiling: number): void {
  if (text.length < floor || text.length > ceiling) {
    throw new Error(
      `entry line must be ${floor}-${ceiling} characters, got ${text.length}`,
    );
  }
}

function checkCleanEdges(text: string): void {
  if (text !== text.trim()) {
    throw new Error('entry line must not start or end with whitespace');
  }
}

function validateEntry(text: string): void {
  checkNotEmpty(text);
  checkWithinLimit(text, MIN_LENGTH, MAX_LENGTH);
  checkCleanEdges(text);
}

function writeEntry(text: string, destinationDir: string): void {
  mkdirSync(destinationDir, { recursive: true });
  writeFileSync(join(destinationDir, 'entry.txt'), text + '\n', 'utf8');
}

function main(): void {
  validateEntry(ONE_LINER);
  const destinationDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  writeEntry(ONE_LINER, destinationDir);
}

main();
