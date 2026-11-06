import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { assertShowDates, showDateError } from '../../src/lib/showDates';

const show = (date: string) => `---\ndate: ${date}\ncity: X\nvenue: Y\n---\n\nnotes\n`;

describe('showDateError (checks the date exactly as typed)', () => {
  test.each(['2026-12-12', "'2026-12-12'", '"2027-01-05"'])('accepts %s', (d) => {
    expect(showDateError('a.md', show(d))).toBeNull();
  });

  test.each(['2026-02-30', '2026-13-01', '12/12/2026', '2026-12-12T23:30:00-05:00', "'2026-02-30'"])(
    'rejects %s and names the file',
    (d) => {
      expect(showDateError('bad-show.md', show(d))).toMatch(/bad-show\.md.*YYYY-MM-DD/);
    },
  );

  test('rejects a missing date', () => {
    expect(showDateError('x.md', '---\ncity: X\nvenue: Y\n---\n')).toMatch(/x\.md/);
  });
});

describe('assertShowDates', () => {
  test('throws for an impossible unquoted date in a shows folder', () => {
    const dir = mkdtempSync(join(tmpdir(), 'shows-'));
    writeFileSync(join(dir, 'ok.md'), show('2026-12-12'));
    writeFileSync(join(dir, 'bad.md'), show('2026-02-30'));
    writeFileSync(join(dir, 'README.md'), '# not a show');
    expect(() => assertShowDates(dir)).toThrow(/bad\.md/);
  });

  test('passes for the real shows folder', () => {
    expect(() => assertShowDates()).not.toThrow();
  });
});
