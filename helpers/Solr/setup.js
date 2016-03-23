var solr = require('solr-client'); // used to query solr server
var solrClient = solr.createClient({core: 'test'});

var blog = require('../../controllers/blog.js');
blog.setSolrClient(solrClient);

