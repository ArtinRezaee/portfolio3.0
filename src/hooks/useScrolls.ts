type ScrollResult = {
  executeScroll: (id: string) => void;
};

export const useScroll = (): ScrollResult => {
  const executeScroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return {
    executeScroll,
  };
};
