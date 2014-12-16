window.Cily = window.Cily || {};
Cily.View = Cily.View || {};

(function($) {
	Cily.View.Settings = Backbone.View.extend({

		events: {
			'click .js--save-settings': 'saveSettings',
			'click .js--generate-token': 'generateToken'
		},

		template: Tpl.settings.index,
		settings: {},
		model: null,

		initialize: function(options) 
		{
			this.model = new Cily.Model.Project({ id: options.projectId });
			this.listenTo(this.model, 'change', this.render);

			this.model.fetch({ beforeSend: _setHeaders, reset: true });
		},

		saveSettings: function()
		{
			var data = {};

			this.$('#settings')
			.find("[class*='settings--project-']")
			.each(function() {
				var key = $(this).attr('class').match(/settings--project-(.*)/)[1];
				data[key] = $(this).val();
			});

			this.model.set(data)
			.save(data, {
				beforeSend: _setHeaders
			});
		},

		generateToken: function()
		{
			// 
		},

		render: function() 
		{
			this.settings = this.model.toJSON();
			this.$el.html(this.template(this.settings));
			return this;
		}

	});
})(jQuery);