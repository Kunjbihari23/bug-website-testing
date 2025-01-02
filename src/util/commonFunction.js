import { notifications } from '@mantine/notifications';

export const paramsToQueryString = (params) => {
  if (params) {
    let queryString = '?';
    Object.keys(params).map((value) => {
      return (queryString += value + '=' + params[value] + '&');
    });
    queryString = queryString.slice(0, -1);
    return queryString;
  }
  return '';
};

export const formatPhoneNumber = (phoneNumber) => {
  // Remove non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Check if the phone number has the correct length after cleaning
  if (cleaned.length > 10 && cleaned.startsWith('91')) {
    // Remove the country code if it starts with '91'
    return cleaned.slice(2);
  }

  return cleaned;
};

export const apiError = (err, message = 'Something went wrong') => {
  console.log('🚀 ~ apiError ~ err:', err);
  if (err?.response?.data?.message) {
    notifications.show({
      title: err?.response?.data?.message,
    });
  } else {
    notifications.show({
      title: message,
    });
  }
  return false;
};
// define file type
export const renderFileType = (file) => {
  const fileExtension = FileExtension(file);

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff'];
  const videoExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mov', 'flv'];

  if (imageExtensions.includes(fileExtension)) {
    return 'typeImage';
  } else if (videoExtensions.includes(fileExtension)) {
    return 'typeVideo';
  } else {
    return 'Unsupported file format';
  }
};

export const FileExtension = (file) => {
  const fileExtension = file.split('.').pop().toLowerCase();
  return fileExtension;
};

// property title url
export const dynamicTitleUrl = (title) => {
  const formetedTitle = title.trim().toLowerCase().replace(/\s+/g, '-');
  return formetedTitle;
};

export function formatCurrency(value) {
  if (typeof value === 'string' && value.toLowerCase() === 'price on request') {
    return value;
  }
  let number = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;

  if (isNaN(number)) {
    return value;
  }

  const absNumber = Math.abs(number);
  let formattedValue;

  if (absNumber >= 1e7) {
    formattedValue = (number / 1e7).toFixed(2) + ' Cr';
  } else if (absNumber >= 1e5) {
    formattedValue = (number / 1e5).toFixed(2) + ' Lac';
  } else if (absNumber >= 1e3) {
    formattedValue = (number / 1e3).toFixed(2) + ' K';
  } else {
    formattedValue = number;
  }
  return typeof value === 'string' ? value.replace(/[0-9.,-]+/, formattedValue) : formattedValue;
}

export function numberToWords(num) {
  const belowTwenty = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertToWords(n) {
    if (n < 20) return belowTwenty[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + belowTwenty[n % 10] : '');
    if (n < 1000)
      return belowTwenty[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertToWords(n % 100) : '');
    if (n < 100000)
      return (
        convertToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convertToWords(n % 1000) : '')
      );
    if (n < 10000000)
      return (
        convertToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + convertToWords(n % 100000) : '')
      );
    return (
      convertToWords(Math.floor(n / 10000000)) +
      ' Crore' +
      (n % 10000000 !== 0 ? ' ' + convertToWords(n % 10000000) : '')
    );
  }

  return num === 0 ? 'Zero' : convertToWords(num);
}
