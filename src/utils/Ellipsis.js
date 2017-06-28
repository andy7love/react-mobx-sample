export default (() => {
	let append = (text, limit) => {
		if(text.length <= limit)
			return text;

		return text.substr(0, limit) + '...';
	};

	let prepend = (text, limit) => {
		if(text.length <= limit)
			return text;

		return '...' + text.substr(-limit, limit);
	};

	return {
		prepend: prepend,
		append: append
	}
})();
