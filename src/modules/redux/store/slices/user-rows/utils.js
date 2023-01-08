export const sortNumbers = (row) => [...row.numberValues].sort((a, b) => row.numbers[b].isCorrect - row.numbers[a].isCorrect);

export const correctCount = (numbers) => Object.values(numbers).filter((n) => n.isCorrect).length;

export const numbersNeedsSorting = (row, numberToCorrect) => row.numberValues.indexOf(numberToCorrect) > correctCount(row.numbers);