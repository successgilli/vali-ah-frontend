/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

export const decodeString = (string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = string;
  return txt.value;
};

const counter = (block) => {
  if (block?.data?.text) {
    const decoded = decodeString(block.data.text);
    const stripped = decoded.replace(/\<[^\>]*\>/g, '');
    const number = stripped.length;
    return number;
  }
};

function characterCounter(block) {
  let count = 0;

  block.map((obj) => {
    switch (obj.type) {
    case 'paragraph':
      count += counter(obj);
      break;
    case 'image':
      count += 0;
      break;
    case 'header':
      count += counter(obj);
      break;
    default:
      return count;
    }
  });
  return count;
}

export default characterCounter;
