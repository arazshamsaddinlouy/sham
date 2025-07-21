const formatPersianNumber = (
  number: string | number | null | undefined
): string => {
  if (number === null || number === undefined) return "";

  // Convert number to string and add commas
  const withCommas = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Replace English digits with Persian digits
  return withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
};

export default formatPersianNumber;
