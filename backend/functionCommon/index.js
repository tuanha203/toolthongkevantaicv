function convertToDateString(date) {
  date = new Date(date);
  return (
    date.getDate().toString().padStart(2, '0') +
    '/' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '/' +
    date.getFullYear().toString().padStart(2, '0')
  );
}

module.exports = {
  convertToDateString,
};
