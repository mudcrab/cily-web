window.Cily = window.Cily || {};
Cily.Model = Cily.Model || {};

(function($) {
	Cily.Model.Project = Backbone.Model.extend({

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
			if(typeof this.id !== 'undefined')
				return Cily.Config.API + 'projects/' + this.id;
			else
				return Cily.Config.API + 'projects';
		}

	});

	Cily.Model.Projects = Backbone.Collection.extend({

		model: Cily.Model.Project,
		uid: null,

		initialize: function(options)
		{

		},

		parse: function(response)
		{
			return response.data;
		},

		url: function()
		{
			return Cily.Config.API + 'users/projects';
		}

	});
})();
	