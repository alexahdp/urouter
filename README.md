# urouter
Usable Node Express-Router.

Example usage:

    var Router = require('urouter'),

    (Router(app, function($) {
        // check session and put user into req if user authorized
        $.bridge(user.bridge, function($) {

            $.get('/sign_up').to(user.sign_up).setName('signUp');
            $.post('/sign_up').to(user.sign_up);
            $.get('/sign_in').to(user.sign_in).setName('signIn');

            // if user authorized do next
            $.bridge(user.bridgeAuthUser, function($) {

                $.get('/charts').to(user.charts);
                $.get('/dash').to(user.dash).setName('dash');
                $.get('/users').to(user.list);
            
                // all this routes begin with '/user'
                $.bridge('/user', function($) {
                    $.post('/create').to(user.create);
                    $.post('/edit').to(user.edit);
                });
            });
        });
    })();
