window.Cily = window.Cily || {};
Cily.Model = Cily.Model || {};

(function($) {
	Cily.Model.Build = Backbone.Model.extend({

		defaults: {},

		initialize: function(options)
		{
			// 
		},

		parse: function(response)
		{
			return response.data || response;
		},

		url: function()
		{
			return Cily.Config.API + 'builds/' + this.id + '/' + this.project_id;
		}

	});

	Cily.Model.Builds = Backbone.Collection.extend({

		model: Cily.Model.Build,
		uid: null,

		initialize: function(options)
		{
			this.project_id = options.project_id;
		},

		parse: function(response)
		{
			return response.data;
		},

		url: function()
		{
			return Cily.Config.API + 'projects/' + this.project_id + '/builds';
		}

	});
})();
	