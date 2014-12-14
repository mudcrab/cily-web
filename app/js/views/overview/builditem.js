window.Cily = window.Cily || {};
Cily.View = Cily.View || {};

(function($) {
	Cily.View.BuildItem = Backbone.View.extend({

		tagName: 'li',
		className: 'item overview-project-builds--item',
		template: Tpl.overview.builditem,

		events: {},

		initialize: function(options) 
		{
			this.model = options.model || {};
			this.model.datetime = this.model.end_time || this.model.start_time;
			this.model.commit = this.model.commit || 'Failed';
		},

		render: function() 
		{
			this.$el.html(this.template(this.model));
			return this;
		}

	});
})(jQuery);