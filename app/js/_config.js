window.Cily = window.Cily || {
	Config: {
		API: 'http://localhost:3000/'
	},
};

var _setHeaders = function(xhr)
{
	xhr.setRequestHeader('X-Cily-UID', $.cookie('uid'));
	xhr.setRequestHeader('X-Cily-Token', $.cookie('token'));
};