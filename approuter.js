/**
 * API Channel
 */
'use strict';

var record = global.local_require('/api/record');
var appinfo = global.local_require('/api/appinfo');
var exports = module.exports = {};

module.exports = function(pub) {
	pub.use('/api/v1/record',record);
    pub.use('/api',appinfo);
};