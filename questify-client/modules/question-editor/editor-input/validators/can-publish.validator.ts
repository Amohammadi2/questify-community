export function canPublish(content: string) {
  const contentAvailable = content;
  const nOfWords = content.split(' ').length;
  const minLengthChecked = nOfWords >= 25;
  const allChecksPass: boolean = (contentAvailable && minLengthChecked) ? true : false;

  const getErrorMessage = () => {
    if (minLengthChecked) return;
    if (nOfWords > 0 && nOfWords < 5) 
      return 'خیلی کمه هنوز';
    else if (nOfWords >= 5 && nOfWords < 10)
      return 'بیشتر بنویس';
    else if (nOfWords >= 10 && nOfWords < 15)
      return 'یکم دیگه ادامه بده';
    else if (nOfWords >= 15 && nOfWords < 20)
      return 'فقط کمی مونده';
    else if (nOfWords >= 20 && nOfWords < 25)
      return 'فقط چند کلمه دیگه';
  }

  return {
    nOfWords,
    allChecksPass,
    errorMessage: getErrorMessage()
  }
}