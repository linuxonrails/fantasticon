import htmlGen from '../html';
import { resolve } from 'path';

const mockOptions = {
  name: 'test-font',
  prefix: 'tf',
  tag: 'b',
  assets: { 'my-icon': null },
  templates: {
    html: resolve(__dirname, '../../../../templates/html.hbs')
  }
} as any;

jest.mock('../../../utils/css', () => ({
  renderUrlsAttribute: jest.fn(() => ['/fonts/bootstrap-icons.woff2' ])
}));

describe('`HTML` asset generator', () => {
  test('renders HTML correctly with prefix and tag name options', async () => {
    expect(await htmlGen.generate(mockOptions, Buffer.from(''))).toMatchSnapshot();
  });

  test('rendered HTML contains expected CSS path', async () => {
    expect(await htmlGen.generate(mockOptions, null)).toContain(
      '"test-font.css"'
    );
  });

  test('rendered HTML contains expected tag and class name', async () => {
    expect(await htmlGen.generate(mockOptions, null)).toContain(
      '<b class="tf tf-my-icon"></b>'
    );
  });

  test('rendered HTML contains expected title', async () => {
    expect(await htmlGen.generate(mockOptions, null)).toContain(
      `<h1>test-font</h1>`
    );
  });
});
