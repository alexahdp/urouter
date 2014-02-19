var
	_routes     = [],
	_namedRoutes = {};

function Router() {
	
	/**
	 * Template-helpers
	 */
	function tmplHelper(req, res, next) {
		res.locals.urlFor = function(name) {
			return typeof _namedRoutes[name] !== 'undefined' ? _namedRoutes[name].path : null;
		}
		next();
	}
	
	function Route() {
		this.bridges = [tmplHelper];
	}
	
	Route.prototype._addPath = function(path, method) {
		this.curRoute = {
			path   : path,
			method : method,
			bridges: this.bridges
		};
		_routes.push(this.curRoute);
	};
	
	Route.prototype.get = function(path) {
		this._addPath(path, 'get');
		return this;
	};
	
	Route.prototype.post = function(path) {
		this._addPath(path, 'post');
		return this;
	};
	
	Route.prototype.route = function(path) {
		this._addPath(path, 'route');
		return this;
	};
	
	Route.prototype.setName = function(name) {
		this.curRoute.name = name;
		_namedRoutes[name] = this.curRoute;
		return this;
	};
	
	Route.prototype.bridge = function(cb) {
		var r = new Route();
		if (this.bridges.length) r.bridges = r.bridges.concat(this.bridges);
		r.bridges = r.bridges.concat(cb);
		return r;
	};
	
	Route.prototype.to = function(cb) {
		this.curRoute.to = cb;
		return this;
	};
	
	Route.prototype.make = function(app) {
		_routes.forEach(function(route) {
			app[route.method](route.path, route.bridges, route.to);
		});
		return _routes;
	}
	
	return new Route();
};

module.exports = Router;
