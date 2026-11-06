import { describe, expect, test } from 'vitest';
import { todayIn, upcomingShows } from '../../src/lib/shows';

const NY = 'America/New_York';
// 03:00 UTC on Dec 13 is still the evening of Dec 12 in New York.
const now = new Date('2026-12-13T03:00:00Z');

describe('shows', () => {
  test('todayIn uses the site timezone', () => {
    expect(todayIn(NY, now)).toBe('2026-12-12');
  });

  test('keeps a show dated today', () => {
    expect(upcomingShows([{ date: '2026-12-12' }], NY, now)).toEqual([{ date: '2026-12-12' }]);
  });

  test("drops yesterday's show", () => {
    expect(upcomingShows([{ date: '2026-12-11' }], NY, now)).toEqual([]);
  });

  test('sorts ascending', () => {
    const result = upcomingShows([{ date: '2027-01-05' }, { date: '2026-12-20' }], NY, now);
    expect(result.map((s) => s.date)).toEqual(['2026-12-20', '2027-01-05']);
  });

  test('empty input returns empty array', () => {
    expect(upcomingShows([], NY, now)).toEqual([]);
  });
});
