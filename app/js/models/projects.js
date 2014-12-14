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
			return Cily.Config.API + 'projects/' + this.id;
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
			return Cily.Config.API + 'users/' + Cily.App.Data.User.id + '/projects';
		}

	});
})();
	