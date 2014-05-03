# urouter
Usable Node Express-Router.

Example usage:

    var Router = require('urouter'),

    (Router(app, function($) {
        // бридж, который кладет юзера в сессию
        $.bridge(user.bridge, function($) {

        	$.get('/sign_up').to(user.sign_up).setName('signUp');
			$.post('/sign_up').to(user.sign_up);
        	$.get('/sign_in').to(user.sign_in).setName('signIn');

        	// бридж, который пропускает в закрытую зону
        	$.bridge(user.bridgeAuthUser, function($) {

	            $.get('/charts').to(user.charts);
	            $.get('/dash').to(user.dash).setName('dash');
	            $.get('/users').to(user.list);
            
            	// все перечисленные роуты начинаются с /user
            	$.bridge('/user', function($) {
		            $.post('/create').to(user.create);
		            $.post('/edit').to(user.edit);
            	});
        	});
    	});
	})();
