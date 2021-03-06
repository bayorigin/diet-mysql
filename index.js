/* 
(The MIT License)
Copyright (c) 2014 Halász Ádám <mail@adamhalasz.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


// =========================================================
//  Dependencies
// =========================================================

   var mysql = module.exports.class = require('mysql')

// =========================================================
//  Exports
// =========================================================

	module.exports.connect = function(options){
		var options = options || {}
		var app = options.app;
		var namespace = options.namespace || 'mysql'
		
		app.header(function DietMySQLHeader($){
			var connection = mysql.createConnection({
				  host     : options.host 	  || 'localhost',
				  user     : options.user	  || 'root',
				  password : options.password || '',
				  database : options.database || 'test'
			})
			
			connection.connect(function(error) {
				if(error){
					throw new Error(error)
				} else {
					$[namespace] = connection;
					$.return()
				}
			})
		})
		
		app.footer(function($){
			if($[namespace] && $[namespace].end) $[namespace].end()
			$.return()
		})
	}
