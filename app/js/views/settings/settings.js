window.Cily = window.Cily || {};
Cily.View = Cily.View || {};

(function($) {
	Cily.View.Settings = Backbone.View.extend({

		events: {},
		template: Tpl.settings.index,
		settings: {},
		model: null,

		initialize: function(options) 
		{
			this.model = new Cily.Model.Project({ id: options.projectId });
			this.listenTo(this.model, 'change', this.render);

			this.model.fetch({ beforeSend: _setHeaders, reset: true });
		},

		render: function() 
		{
			this.settings = this.model.toJSON();
			this.$el.html(this.template(this.settings));
			return this;
		}

	});
})(jQuery);