import { expect, test } from 'vitest';
import { youtubeId } from '../../src/lib/youtube';

test.each([
  ['https://www.youtube.com/watch?v=BENUyHwMlmg', 'BENUyHwMlmg'],
  ['https://youtube.com/watch?v=BENUyHwMlmg&t=42s', 'BENUyHwMlmg'],
  ['https://m.youtube.com/watch?v=BENUyHwMlmg', 'BENUyHwMlmg'],
  ['https://youtu.be/BENUyHwMlmg?si=abc', 'BENUyHwMlmg'],
  ['https://www.youtube.com/embed/BENUyHwMlmg', 'BENUyHwMlmg'],
  ['https://www.youtube.com/shorts/BENUyHwMlmg', 'BENUyHwMlmg'],
  ['https://vimeo.com/123', null],
  ['not a link', null],
  ['https://www.youtube.com/watch?v=short', null],
])('%s → %s', (link, id) => {
  expect(youtubeId(link)).toBe(id);
});
