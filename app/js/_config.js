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

window.Handlebars.registerHelper('select', function( value, options ){
	var $el = $('<select />').html( options.fn(this) );
	$el.find('[value=' + value + ']').attr({'selected':'selected'});
	return $el.html();
});