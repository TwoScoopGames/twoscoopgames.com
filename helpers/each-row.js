module.exports = function(rowSize, context, options) {
	var ret = "";
	for (var i = 0; i < context.length; i += rowSize) {
		var amt = Math.min(context.length - i, rowSize);
		var row = context.slice(i, i + amt);
		ret += options.fn(row);
	}
	return ret;
};
