# urouter

Usable Node Express-Router.


Example usage:


(function($){

	var $stash = $.bridge(hh.createStash);
	
	(function($) {
		
		// бридж, который кладет юзера в сессию
		var $user = $.bridge(user.bridge);
		
		// бридж, который пропускает в закрытую зону
		var $auth_user = $user.bridge(user.bridgeAuthUser);
		
		(function ($) {
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
		})($auth_user);
		
		
		$user.get('/sign_up').to(user.sign_up_form);
		$user.post('/sign_up').to(user.sign_up);
		$user.get('/sign_in').to(user.sign_in_form);
		$user.post('/sign_in').to(user.sign_in);
		$user.get('/sign_out').to(user.sign_out);
		
	})($stash);
	
	$.get('*').to(function(req, res) {
		res.render('404', {layout: 'layouts/clean'});
	});
	
	$.make(app);
})(Router());
