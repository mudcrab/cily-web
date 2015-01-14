window.Cily = window.Cily || {};
Cily.View = Cily.View || {};

(function($) {
	Cily.View.Tasks = Backbone.View.extend({

		template: Tpl.tasks.index,
		events: {},

		initialize: function(options) 
		{
			this.projectId = this.projectId || null;
		},

		render: function() 
		{
			this.$el.html(this.template())
			return this;
		}

	});
})(jQuery);