const GenFileName = (title) => {
  return `${title}_${new Date()
    .toISOString()
    .slice(-24)
    .replace(/\D/g, '')
    .slice(0, 14)}`;
};

export default GenFileName;
