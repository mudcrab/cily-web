window.Cily = window.Cily || {
	Config: {
		API: 'http://localhost:3000/'
	},
};

var _setHeaders = function(xhr)
{
	xhr.setRequestHeader('X-Cily-UID', Cily.Config.AuthData.id);
	xhr.setRequestHeader('X-Cily-Token', Cily.Config.AuthData.token);
};