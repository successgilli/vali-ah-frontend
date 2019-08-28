export default {
  fetchDemo: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve('Welcome to 1kbIdeas');
    }, 100);
  }),
};
