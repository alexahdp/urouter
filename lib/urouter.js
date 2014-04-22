function Router(app, make) {
	
	var
	_routes     = [],
	_namedRoutes = {};
	
	/**
	 * Template-helpers
	 */
	function tmplHelper(req, res, next) {
		res.locals.urlFor = function(name) {
			return typeof _namedRoutes[name] !== 'undefined' ? _namedRoutes[name].path : null;
		}
		next();
	}
	
	var Route = function(bridges) {
		if (bridges == null) bridges = [];
		
		return {
			
			bridges: bridges,
			
			_addPath: function(path, method) {
				this.curRoute = {
					path   : path,
					method : method,
					bridges: this.bridges
				};
				_routes.push(this.curRoute);
			},
			
			get: function(path) {
				this._addPath(path, 'get');
				return this;
			},
			
			
			put: function(path) {
				this._addPath(path, 'put');
				return this;
			},
			
			
			delete: function(path) {
				this._addPath(path, 'delete');
				return this;
			},
			
			post: function(path) {
				this._addPath(path, 'post');
				return this;
			},
			
			setName: function(name) {
				this.curRoute.name = name;
				_namedRoutes[name] = this.curRoute;
				return this;
			},
			
			bridge: function(bridge, cb) {
				var r = new Route();
				if (this.bridges.length) r.bridges = r.bridges.concat(this.bridges);
				r.bridges = r.bridges.concat(bridge);
				cb(r);
			},
			
			to: function(cb) {
				this.curRoute.to = cb;
				return this;
			}
		};
	};
	
	make(new Route(tmplHelper));
	
	_routes.forEach(function(route) {
		app[route.method](route.path, route.bridges, route.to);
	});
};

module.exports = Router;
