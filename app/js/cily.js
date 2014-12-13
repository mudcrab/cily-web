window.Cily = window.Cily || {};
window.Cily.App = window.Cily.App || {};

(function() {
	'use strict';

	var Router = Backbone.Router.extend({
		
		initialize: function()
		{
			Cily.Events = new Events();
		},

		routes:
		{
			'': 'index',
			'projects': 'index',
			'projects/:id': 'overview',
			'tasks': 'tasks',
			'users': 'users',
			'settings': 'settings',
			'build': 'build'
		},

		index: function()
		{
			var Index = new Cily.View.Index({
				el: '.page-container'
			});

			Index.render();
		},

		overview: function(id)
		{
			var Overview = new Cily.View.Overview({
				id: id,
				el: '.page-container'
			});
			Overview.render();
		},

		tasks: function()
		{
			console.log('tasks');
		},

		users: function()
		{
			console.log('users');
		},

		settings: function()
		{
			console.log('settings');
		},

		build: function()
		{
			console.log('build');
		}

	});

	Cily.Router = new Router();
	Backbone.history.start({ pushState: true });
})();