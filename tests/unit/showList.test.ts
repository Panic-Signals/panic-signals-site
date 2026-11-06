import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import ShowList from '../../src/components/ShowList.astro';

test('empty state when no upcoming shows', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(ShowList, { props: { shows: [] } });
  expect(html).toContain('data-empty-shows');
  expect(html).toContain('No shows announced yet.');
  expect(html).toMatch(/href="\/booking"/);
  expect(html).not.toContain('class="shows"');
});
