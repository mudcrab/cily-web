window.Cily = window.Cily || {};
Cily.View = Cily.View || {};

(function($) {
	Cily.View.Header = Backbone.View.extend({

		tagName: 'header',
		className: 'header cf',
		intervalId: 0,

		events: {
			'click .js-build a': 'buildProject',
			'click a': 'setActive',
			'click .js-go-back': 'goBack'
		},

		template: Tpl.header,

		links: {
			overview: '/projects/:pid',
			build: '/projects/:pid/build',
			tasks: '/projects/:pid/tasks',
			users: '/projects/:pid/users',
			settings: '/projects/:pid/settings'
		},

		initialize: function(options) 
		{
			var self = this;

			Cily.App.Data.Header = new Cily.Model.Header();
			self.toggleMenu('index', 'project');

			Cily.App.Data.Header.on('change:projectTitle', function(model, title) {
				self.$('.project-title').text(title);
			});

			Cily.App.Data.Header.on('change:projectId', function(model, id) {
				if(id)
				{
					self.setProjectLinks(id);
					self.toggleMenu('project', 'index');
				}
				else
				{
					self.$('.project-title').text('Projects');
					self.toggleMenu('index', 'project');
				}
			});
		},

		setProjectLinks: function(pid)
		{
			var self = this;
			if(Cily.App.Data.Header.hasChanged('projectId'))
			{
				this.$el.find('.project-menu .header--nav-item, .project-action').each(function() {
					var linkId = self.links[$(this).attr('class')
								.substring($(this).attr('class').match(/js-/).index)
								.replace('js-', '')];
					$(this)
					.find('a')
					.attr('href', linkId.replace(':pid', Cily.App.Data.Header.get('projectId')));
				});
			}
		},

		toggleMenu: function(to, from)
		{
			self.$('.' + to + '-menu').show();
			self.$('.' + from + '-menu').hide();
		},

		setActive: function(e)
		{
			var el = $(e.currentTarget) || e;

			el.parent().find('li.active').removeClass('active');
			el.find('li').addClass('active');
		},

		buildProject: function(e)
		{
			e.preventDefault();

			$.ajax({
				url: Cily.Config.API + 'projects/' + Cily.App.Data.Header.get('projectId') + '/' + Cily.App.Data.Header.get('projectToken') + '/build',
				type: 'GET',
				contentType: 'application/json',
				beforeSend: _setHeaders
			})
			.done(function(data) {
				console.log(data);
			});
		},

		goBack: function(e)
		{
			window.history.go(-1);
		},

		render: function() 
		{
			var self = this;

			this.$el.html(this.template);
			this.$el.insertBefore('.page-container');

			return this;
		}

	});
})(jQuery);