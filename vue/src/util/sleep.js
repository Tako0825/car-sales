let timer = null;

export const sleep = (duration = 300) => {
  return new Promise((resolve) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      resolve();
    }, duration);
  });
};
