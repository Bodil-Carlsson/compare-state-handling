function getAllNumbers({ min, max }) {
	const allNumbers = [];
	for (let i = min; i < max + 1; i++) {
		allNumbers.push(i);
	}
	return allNumbers;
}

function getRandomIndex(max) {
	return Math.floor(Math.random() * max);
}

function generateNumbers({ min = 1, max = 30, count = 10 } = {}) {
	const allNumbers = getAllNumbers({ min, max });
	const numbers = [];
	for (let i = 0; i < count; i++) {
		const randomIndex = getRandomIndex(allNumbers.length);
		const [randomNumber] = allNumbers.splice(randomIndex, 1);
		numbers.push(randomNumber);
	}
	return numbers;
}

module.exports = {
	generateNumbers
};

