
// Наименьшее общее кратное;


const parser => (strNumbers) => strNumbers.split(',');

const addNumbers => (numbers = '7,5,4') => parser(numbers); 

const numbers = addNumbers();

const lcm1 = (arg = [7,5,4]) => arg.reduce((num, pon) => pon * num, 1);


const checkLcm = (lcm, nums) => {
	const result = nums.reduce((res, num) => {
		res = lcm % num === 0
		?res + 1
		:res;

		return res;
	}, 0);

	return nums.length === result;
}

const lcm2 = (nums = [7,5,4]) => {
	let lcm = Math.min(...nums);
	while(true) {
		if(checkLcm(lcm, nums)) return lcm;
	}		
};