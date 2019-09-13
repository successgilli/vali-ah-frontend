/* eslint-disable import/no-mutable-exports */
/* istanbul ignore file */
import Editor from './editor';

export let editor = '';

const renderEditor = async () => {
  if (!editor) {
    editor = await Editor();
  }
};

export default renderEditor;
