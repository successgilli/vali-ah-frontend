import { convertedBlock, editorOutput } from 'fixtures/editor';
import blockToHtmlConverter from './index';

describe('blockToHtmlConverter', () => {
  it('should convert blocks', () => {
    const response = blockToHtmlConverter(editorOutput.blocks);

    expect(response).toMatch(convertedBlock);
  });
});
