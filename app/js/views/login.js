window.Cily = window.Cily || {};
Cily.View = Cily.View || {};

(function($) {
	Cily.View.Login = Backbone.View.extend({

		template: Tpl.login,
		events: {
			'click .js-login': 'login',
		},

		initialize: function(options) 
		{
			// 
		},

		login: function(e)
		{
			var self = this;
			e.preventDefault();
			
			$.ajax({
				url: self.$('#server').val() + '/users/auth',
				type: 'POST',
				data: JSON.stringify({
					user: self.$('#username').val(),
					pw: self.$('#password').val()
				}),
				contentType: 'application/json'
			})
			.done(function(data) {
				if(data.status)
				{
					Cily.App.Data.User = {
						id: data.id,
						token: data.token
					};

					Cily.Config.API = self.$('#server').val() + '/';

					$.cookie('uid', data.id);
					$.cookie('token', data.token);

					// FIXME should be if user is ok with this
					$.cookie('username', self.$('#username').val());
					$.cookie('serveraddr', self.$('#server').val());
					
					Cily.App.Data.Projects.fetch({ beforeSend: _setHeaders, reset: true });

					self.close();
				}
			});
		},

		close: function()
		{
			this.undelegateEvents();
			this.stopListening();
			this.$('.login-container').remove();
		},

		render: function() 
		{
			var tplData = {
				username: $.cookie('username'),
				server: $.cookie('serveraddr')
			};

			this.$el.append(this.template(tplData));
			return this;
		}

	});
})(jQuery);