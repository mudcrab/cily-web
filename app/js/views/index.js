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

			if($.cookie('uid') === '' || typeof $.cookie('uid') === 'undefined' 
				|| $.cookie('token') === '' || typeof $.cookie('token') === 'undefined')
			{
				var loginView = new Cily.View.Login({
					el: 'body'
				});

				loginView.render();
			}
			else
			{
				Cily.App.Data.Projects.fetch({ beforeSend: _setHeaders, reset: true });
			}
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