var solr = require('solr-client'); // used to query solr server
var solrClient = solr.createClient({core: 'test'});

var export_solrClient = require('../exporters/export_solrClient.js');
export_solrClient.setSolrClient(solrClient);


