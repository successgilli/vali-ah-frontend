import { editorOutput } from 'fixtures/editor';
import characterCounter from './index';

describe('Character counter', () => {
  it('should return character number', () => {
    const response = characterCounter(editorOutput.blocks);

    expect(response).toEqual(112);
  });
});
