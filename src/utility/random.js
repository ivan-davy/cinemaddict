/* Возвращает случайную целую величину из положительного диапазона [min, max]. \
Если такого числа не существует (в  т.ч. в силу некорректности переданных аргументов), \
функция возвращает null. Если min = max, возвращает это число. \
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

const getRandomInteger = (min, max) => {
  let result = null;
  if (min >= 0 && max >= 0 && min <= max) {
    result = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
  }
  return result;
};

/* Возвращает случайную величину с плавающей точкой из положительного диапазона [min, max). \
Если такого числа не существует (в силу некорректности переданных аргументов), \
функция возвращает null. Если min = max, возвращает это число. \
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

const getRandomFloat = (min, max) => {
  let result = null;
  if (min >= 0 && max >= 0 && min <= max) {
    result = Math.random() * (max - min) + min;
  }
  return result;
};

/* Функция getRandomItem по умолчанию возвращает случайное значение из переданного ей массива iterable. \
Если же указать опциональный параметр quantity, то функция вернет массив случайных элементов \
переданного массива iterable указанной длины. Если переданное значение number некорректно, функция вернет undefined */
const getRandomItem = (iterable) => iterable[getRandomInteger(0, iterable.length - 1)];

/* Функция getRandomSample возвращает массив-выборку случайных элементов переданного массива iterable \
указанного размера. С помощью параметра quantity можно указать необходимый размер выборки. \
canRepeat определяет возможность повторения элементов в выборке. Если canRepeat = false, но размер выборки \
больше длины передаваемого массива, то размер выборки уменьшается до его длины.
Если переданное значение quantity некорректно, функция вернет undefined */

const getRandomSampleItems = (iterable, sampleSize, canRepeat = false) => {
  if (sampleSize >= 1) {
    if (canRepeat) {
      const sample = [];
      for (let i = 0; i <= sampleSize - 1; i++) {
        sample[i] = iterable[getRandomInteger(0, iterable.length - 1)];
      }
      return sample;
    } else {
      if (sampleSize > iterable.length) {
        sampleSize = iterable.length;
      }
      const remainingSelection = iterable.slice(), sample = [];
      let rndIndex = null;
      for (let i = 0; i <= sampleSize - 1; i++) {
        rndIndex = getRandomInteger(0, remainingSelection.length - 1);
        sample[i] = remainingSelection[rndIndex];
        remainingSelection.splice(rndIndex, 1);
      }
      return sample;
    }
  }
};

export {getRandomInteger, getRandomFloat, getRandomItem, getRandomSampleItems};
