# urouter
Usable Node Express-Router.

Example usage:
var Router = require('urouter'),

(Router(app, function($) {
	
	$.bridge(hh.createStash, function($) {
		
		// бридж, который кладет юзера в сессию
		$.bridge(user.bridge, function($) {
			
			$user.get('/sign_up').to(user.sign_up_form).setName('signUp');
			$user.post('/sign_up').to(user.sign_up);
			$user.get('/sign_in').to(user.sign_in_form).setName('signIn');
			$user.post('/sign_in').to(user.sign_in).setName('signOut');
			$user.get('/sign_out').to(user.sign_out);
			
			// бридж, который пропускает в закрытую зону
			$.bridge(user.bridgeAuthUser, function($) {
				$.get('/').to(user.index).setName('index');
				$.get('/charts').to(user.charts);
				$.get('/dashboard').to(user.dashboard).setName('dashboard');
				$.get('/notifies').to(notify.list);
				
				$.get('/users').to(user.list);
				$.post('/users/create').to(user.create);
				$.post('/user/edit').to(user.edit);
				$.get('/account').to(user.account)
				
				$.get('/profile').to(user.profile);
				$.post('/profile/edit').to(user.edit);
				
				$.get('/calender').to(user.calender);
				
				$.get('/tasks').to(task.list).setName('tasks');
			});
		});
	});
	
	$.get('*').to(function(req, res) {
		res.render('404', {layout: 'layouts/clean'});
	});
})();