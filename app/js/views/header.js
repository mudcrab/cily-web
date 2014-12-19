window.Cily = window.Cily || {};
Cily.View = Cily.View || {};

(function($) {
	Cily.View.Header = Backbone.View.extend({

		tagName: 'header',
		className: 'grid header',
		intervalId: 0,

		events: {
			'click .build': 'buildProject'
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
			// this.listenTo(Cily.App.Data.Header, 'change', this.setProjectLinks);

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
				this.$el.find('.project-menu li').each(function() {
					$(this).parent()
					.attr('href', self.links[$(this).text().toLowerCase()].replace(':pid', Cily.App.Data.Header.get('projectId')));
				});
			}
		},

		toggleMenu: function(to, from)
		{
			self.$('.' + to + '-menu').show();
			self.$('.' + from + '-menu').hide();
		},

		buildProject: function(e)
		{
			e.preventDefault();
			
			$.ajax({
				url: 'http://localhost:3000/projects/' + Cily.App.Data.Header.get('projectId') + '/123456/build',
				type: 'GET',
				contentType: 'application/json',
				beforeSend: _setHeaders
			})
			.done(function(data) {
				console.log(data);
			});
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