;var UrlQuery = (function() {
	var _deserializeKey = function(query, key, val) {
		var temp = key.split(']').join('').split('[');
		
		if (temp.length > 1)
		{
			var parent;
			var tmpkey = key;
			var obj = query;
			
			do {
				parent = obj;
				tmpkey = temp.shift();
				
				if (typeof parent[tmpkey] !== 'object')
				{
					obj = {};
					
					if (tmpkey === '')
					{
						tmpkey = 0;
						
						while (typeof parent[tmpkey] !== 'undefined')
						{
							tmpkey ++;
						}
					}
					
					parent[tmpkey] = obj;
				}
				else
				{
					obj = parent[tmpkey];
				}
			}
			while (temp.length > 0);
			
			parent[tmpkey] = val;
		}
		else
		{
			query[key] = val;
		}
		
		return query;
	};
	
	var parseQuery = function(queryString) {
		var query = {};
		var temp = queryString.split('&');
		
		$A(temp).each(function(el) {
			var temp = el.split('=');
			var key = temp.shift();
			var val = temp.join('=');
			
			_deserializeKey(query, key, val);
		});
		
		return query;
	};
	
	var objectToQueryString = function(obj)
	{
		if (typeof obj === 'string')
		{
			return obj;
		}
		
		return _toQueryString(obj);
	};
	
	var _toQueryPair = function(key, value)
	{
		if (typeof value == 'undefined') 
		{
			return null;
		}
		
		return key + '=' + encodeURIComponent(value);
	};
	
	var _toQueryString = function(obj, prefix) {
		var prefix = prefix || '';
		
		if (typeof obj == 'object' || typeof obj == 'array')
		{
			var keys = Object.keys(obj), values;
			var results = [], result;
			
			if (keys.length == 0)
			{
				return null;
			}
			
			angular.forEach(keys, function(key) {
				values = obj[key];
				key = encodeURIComponent(key);
				
				result = _toQueryString(values, prefix === '' ? key: prefix + '[' + key + ']');
				if (result != null)
				{
					results.push(result);
				}
			});
			
			if (results.length > 0)
			{
				return results.join('&');
			}
			
			return null;
		}
		
		return _toQueryPair(prefix, obj);
	};
	
	return {
		parseQuery: parseQuery,
		objectToQueryString: objectToQueryString
	}
})();