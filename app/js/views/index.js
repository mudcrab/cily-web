window.Cily = window.Cily || {};
Cily.View = Cily.View || {};

(function($) {
	Cily.View.Index = Backbone.View.extend({

		events: {},
		template: Tpl.main.index,

		initialize: function(options) 
		{
			var self = this;
			Cily.App.Data = Cily.App.Data || {};

			Cily.App.Data.Projects = new Cily.Model.Projects();

			this.listenTo(Cily.App.Data.Projects, 'reset', this.populateProjects);

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
					Cily.App.Data.User = {
						id: data.id,
						token: data.token
					};

					$.cookie('uid', data.id);
					$.cookie('token', data.token);

					Cily.App.Data.Projects.fetch({ beforeSend: _setHeaders, reset: true });
				}
			});
		},

		populateProjects: function()
		{
			var items = [];
			
			Cily.App.Data.Projects.each(function(project) {
				items.push(Tpl.overview.project(project.toJSON()));
			});

			this.$el.find('ul.overview-projects').html(items.join(''));
		},

		render: function() 
		{
			this.$el.html(this.template());
			return this;
		}

	});
})(jQuery);