window.Cily = window.Cily || {};
Cily.View = Cily.View || {};

(function($) {
	Cily.View.Overview = Backbone.View.extend({

		events: {},
		template: Tpl.overview.index,
		project: null,

		initialize: function(options)
		{
			var self = this;

			if(typeof Cily.App.Data.Projects == 'undefined' || !Cily.App.Data.Projects.get(this.id))
				this.project = new Cily.Model.Project({ id: 1 });
			else
			{
				this.project = Cily.App.Data.Projects.get(this.id);
				this.render();
			}

			this.project.fetch({ beforeSend: _setHeaders, reset: true });
			this.listenTo(this.project, 'change', this.render);

			this.builds = new Cily.Model.Builds({ project_id: this.project.get('id') });
			this.listenTo(this.builds, 'reset', this.renderBuilds);
			this.builds.fetch({ beforeSend: _setHeaders, reset: true });

			Cily.App.Data.Header.set('projectId', this.project.get('id'));

			setInterval(function() {
				self.builds.fetch({ beforeSend: _setHeaders, reset: true });
			}, 5000);
		},

		renderBuilds: function(data)
		{
			var buildsList = this.$el.find('.overview-project-builds');
			buildsList.empty();
			
			data.each(function(build) {
				var bld = build.toJSON();
				bld.msg = bld.msg || 'Failed';

				if(bld.hash)
					bld.rev = bld.hash.substring(0, 6);

				buildsList.append(new Cily.View.BuildItem({ model: bld }).render().el);
			});
		},

		render: function(project)
		{
			$('.project-title').text(this.project.toJSON().name);
			this.$el.html(this.template( this.project.toJSON() ));
			return this;
		}

	});
})(jQuery);