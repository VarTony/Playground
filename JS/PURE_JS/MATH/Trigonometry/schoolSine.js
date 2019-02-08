

//Demo version of sine;

const pi = 565.4866776462001 / 180;

const sin = (a, part = 180 / a) => {

	if(a > 90 || a < 0) return 'Аргумент должен быть в диапозоне от 0 до 90 градусов';
	return a === 0 ? 0 : pi / part;
}