export function canPublish(title: string, content: string) {
  const contentAvailable = title && content;
  const nOfWords = content.split(' ').length;
  const minLengthChecked = nOfWords >= 50;
  const allChecksPass = contentAvailable && minLengthChecked;

  const getErrorMessage = () => {
    if (minLengthChecked) return;
    if (nOfWords > 0 && nOfWords < 15) 
      return 'خیلی کمه هنوز';
    else if (nOfWords >= 15 && nOfWords < 30)
      return 'بیشتر بنویس';
    else if (nOfWords >= 30 && nOfWords < 40)
      return 'یکم دیگه ادامه بده';
    else if (nOfWords >= 40 && nOfWords < 45)
      return 'فقط کمی مونده';
    else if (nOfWords >= 45 && nOfWords < 50)
      return 'فقط چند کلمه دیگه';
  }

  return {
    contentAvailable,
    nOfWords,
    minLengthChecked,
    allChecksPass,
    errorMessage: getErrorMessage()
  }
}