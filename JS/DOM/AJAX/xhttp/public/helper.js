
const helper = list => {
	const l = [];
	list.forEach((value, key) => l.push(`${key}=${value}`));
	return l.join('&');
}  //helper for Map sd;

