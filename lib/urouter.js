function Router(app, make, errorHandler) {
	
	var
	_routes      = [],
	_namedRoutes = {},
	_errors      = [];
	
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
			prefixes: '',
			
			_addPath: function(path, method) {
				this.curRoute = {
					path   : path,
					method : method,
					bridges: this.bridges
				};
				
				if (this.prefixes != '') {
					this.curRoute.path = this.prefixes + this.curRoute.path;
				}
				
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
			
			bridge: function(p1, p2, p3) {
				var prefix;
				var bridge;
				var cb    ;
				
				if (p3){
					prefix = p1;
					bridge = p2;
					cb     = p3;
					
					if ( ! bridge) throw new Error('Bridge is null');
				}else{
					if (typeof p1 == 'string'){
						prefix = p1;
					}else{
						bridge = p1;
						if ( ! bridge) throw new Error('Bridge is null');
					};
					cb = p2;
				};
				
				var r = new Route();
				if (this.bridges.length) r.bridges = r.bridges.concat(this.bridges);
				
				r.prefixes = prefix ? this.prefixes + prefix : this.prefixes;
				if ( bridge ) r.bridges.push(bridge);
				
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
		try {
			if( ! route.to) {
				_errors.push(new Error('Not exist handler(to) for path: ' + route.path));
				return true;
			}
			app[route.method](route.path, route.bridges, route.to);
		} catch(err) {
			_errors.push(err);
		}
	});

	/**
	 * If exist errors, run handler
	 */
	if (_errors.length > 0) errorHandler(_errors);
};

module.exports = Router;
