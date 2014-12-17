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
			var modelData = {};
			if(typeof options.projectId !== 'undefined')
				modelData = { id: options.projectId };

			this.model = new Cily.Model.Project(modelData);
			this.listenTo(this.model, 'change', this.render);
			// this.listenTo(this.model, 'sync', this.render);

			if(typeof options.projectId !== 'undefined')
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
			.save(null, {
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