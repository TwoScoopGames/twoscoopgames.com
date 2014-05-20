function eachRowArray(rowSize, context, options) {
	var ret = "";
	for (var i = 0; i < context.length; i += rowSize) {
		var amt = Math.min(context.length - i, rowSize);
		var row = context.slice(i, i + amt);
		ret += options.fn(row);
	}
	return ret;
}

function eachRowObject(rowSize, context, options) {
	var ret = "";
	var keys = Object.keys(context).filter(function(key) {
		return context.hasOwnProperty(key);
	});
	for (var i = 0; i < keys.length; i += rowSize) {
		var amt = Math.min(keys.length - i, rowSize);
		var row = keys.slice(i, i + amt).map(function(key) {
			return [key, context[key]];
		}).reduce(function(obj, val) {
			obj[val[0]] = val[1];
			return obj;
		}, {});
		ret += options.fn(row);
	}
	return ret;
}

module.exports = function(rowSize, context, options) {
	if (Array.isArray(context)) {
		return eachRowArray(rowSize, context, options);
	} else {
		return eachRowObject(rowSize, context, options);
	}
};
