window.Cily = window.Cily || {};
Cily.View = Cily.View || {};

(function($) {
	Cily.View.Index = Backbone.View.extend({

		events: {},
		template: Tpl.main.index,
		projects: {},

		initialize: function(options) 
		{
			var self = this;

			this.projects = new Cily.Model.Projects();

			this.listenTo(this.projects, 'reset', this.populateProjects);

			$.ajax({
				url: 'http://localhost:3000/users/auth',
				type: 'POST',
				data: JSON.stringify({
					user: 'jevgeni@pitfire.eu',
					pw: 'asdf1234'
				}),
				contentType: 'application/json'
			})
			.done(function(data) {
				if(data.status)
				{
					Cily.Config.AuthData = {
						id: data.id,
						token: data.token
					};
					self.projects.fetch({ beforeSend: _setHeaders, reset: true });
				}
			});
		},

		populateProjects: function()
		{
			var items = [];
			this.projects.each(function(project) {
				items.push(Tpl.overview.project(project.toJSON()));
			});

			this.$el.find('ul.overview-projects').html(items.join(''));
		},

		render: function() 
		{
			this.$el.html(this.template())
			return this;
		}

	});
})(jQuery);