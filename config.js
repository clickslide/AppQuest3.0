module.exports = {
    mongo_url: 'mongodb://datadipity:4gFFr4nc0@candidate.37.mongolayer.com:10192,candidate.36.mongolayer.com:10192/datadipity-v1-master'
  , agencies: [
      /* Put agency_key names from  gtfs-data-exchange.com.
      Optionally, specify a download URL to use a dataset not from gtfs-data-exchange.com */
      //'http://datamine.mta.info/files/k38dkwh992dk/gtfs-l'
      //{agency_key:'mta-new-york-city-transit', url: 'http://datamine.mta.info/mta_esi.php?key=42a92f4ce13857688e611dcc66121124&feed_id=1'}
      //'http://datamine.mta.info/files/k38dkwh992dk/gtfs'
      //'mta-new-york-city-transit'
      {agency_key:'nyct_subway', url: 'http://web.mta.info/developers/data/nyct/subway/google_transit.zip'},
      {agency_key:'nyct_lirr', url: 'http://web.mta.info/developers/data/lirr/google_transit.zip'},
      {agency_key:'nyct_mnorth', url: 'http://web.mta.info/developers/data/mnr/google_transit.zip'}

    ]
}
