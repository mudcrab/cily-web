window.Cily = window.Cily || {};
window.Cily.App = window.Cily.App || {};
window.Cily.App.Data = window.Cily.App.Data || {};
window.Cily.Views = window.Cily.Views || {};

(function() {
	'use strict';

	var Router = Backbone.Router.extend({
		
		initialize: function()
		{
			Cily.Events = new Events();
			this.header = this.header || new Cily.View.Header();
			this.header.render();
		},

		routes:
		{
			'': 'index',
			'projects': 'index',
			'projects/:id': 'overview',
			'projects/:id/tasks': 'tasks',
			'projects/:id/users': 'users',
			'projects/:id/settings': 'settings',
			'projects/:id/build': 'build'
		},

		index: function()
		{
			Cily.Views.Index = new Cily.View.Index({
				el: '.page-container'
			});

			Cily.Views.Index.render();
		},

		overview: function(id)
		{
			Cily.App.Data.Header.set('projectId', id);
			Cily.Views.Overview = new Cily.View.Overview({
				id: id,
				el: '.page-container'
			});
			// Overview.render();
		},

		tasks: function(id)
		{
			Cily.App.Data.Header.set('projectId', id);
			Cily.Views.Tasks = Cily.Views.Tasks || new Cily.View.Tasks({
				projectId: id,
				el: '.page-container'
			});
		},

		users: function(id)
		{
			Cily.App.Data.Header.set('projectId', id);
			console.log('users');
		},

		settings: function(id)
		{
			Cily.App.Data.Header.set('projectId', id);

			Cily.Views.Settings = Cily.Views.Settings || new Cily.View.Settings({
				projectId: id,
				el: '.page-container'
			});

			Cily.Views.Settings.render();
		},

		build: function()
		{
			console.log('build');
		}

	});

	Cily.Router = new Router();
	Backbone.history.start({ pushState: true, root: '/' });

	$(document).on('click', "a[href^='/']", function(e) {
		e.preventDefault()

		if(typeof $(this).data('notrigger') === 'undefined')
			Cily.Router.navigate($(this).attr('href'), { trigger: true });
	})
})();