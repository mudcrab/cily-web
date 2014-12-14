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
			build: '/projects/:pid/build',
			overview: '/projects/:pid',
			tasks: '/projects/:pid/tasks',
			users: '/projects/:pid/users',
			settings: '/projects/:pid/settings'
		},

		initialize: function(options) 
		{
			var self = this;

			Cily.App.Data.Header = new Cily.Model.Header();
			this.listenTo(Cily.App.Data.Header, 'change', this.setLinks);
		},

		setLinks: function(pid)
		{
			var self = this;
			if(Cily.App.Data.Header.hasChanged('projectId'))
			{
				this.$el.find('.menu-list li').each(function() {
					$(this).parent()
					.attr('href', self.links[$(this).text().toLowerCase()].replace(':pid', Cily.App.Data.Header.get('projectId')));
				});
			}
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