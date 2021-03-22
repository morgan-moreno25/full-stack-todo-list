/**
 *
 * @param {String} str
 * @returns {String} The `str` argument with the first letter capitalized
 */
export default function capitalize(str) {
	const stringArray = str.split('');
	stringArray.splice(0, 1, stringArray[0].toUpperCase());
	return stringArray.join('');
}
