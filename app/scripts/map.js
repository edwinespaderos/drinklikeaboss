function getQuery (postalCode) {
  return [
    'query {',
      // customize the zip based on what the user is looking at
      'locations(brand:GREAT_AMERICA, zip:' + postalCode + ') {',
        // all the fields we care about for our UI
        'name street city state zip lat long distance',
      '}',
    '}',
  ].join('');
}

function request(postalCode) {
  var protocol = location.protocol !== 'file:' ? location.protocol : 'http:';
  fetch(protocol + '//stout-brand-finder.herokuapp.com/graphql?query=' + encodeURIComponent(getQuery(postalCode)))
    .then(function(resp) { return resp.json(); })
    .then(function (data) {
      setup(data.data.locations);
      return data;
    })
    .then(function (data) { return exports[MAIN](data); })
    .catch(function (err) {
      console.log(err);
      return err;
    });
}

var DEFAULT_LAT_LONG = [35.8278, -78.6421]; // Raleigh, NC
var MAIN = '_buildThatMap'; // main func. called when google maps js loads
var SETUP = 'setupFinder'; // setup func. called when location data loads

var mapManager, isReady = false;

function setup(locations) {
  if (!isReady || typeof google === 'undefined') return setTimeout(function() { setup(locations); }, 10);

  if (!mapManager) {
    mapManager = new MapManager(locations);
    mapManager.template(MapManager.INFO_WINDOW, function(data) {
      return [
        /*jshint ignore:start*/
        '<article class="info-window">',
          '<h3 class="info-store">', data.name, '</h3>',
          '<span class="info-address">', data.street, '</span>',
          '<span class="info-city">', data.city, '</span>, ',
          '<span class="info-state">', data.state, '</span> ',
          '<span class="info-zip">', data.zip, '</span>',
        '</article>'
        /*jshint ignore:end*/
      ].join('');
    });

    mapManager.template(MapManager.LOCATIONS_LIST, function(data) {
      return data.map(function(loc) {
        return [
          /*jshint ignore:start*/
          '<div class="location" data-id="', loc._id , '">',
            '<h3 class="location-store">', loc.name, '</h3>',
            '<span class="location-address">', loc.address, '</span>',
            '<span class="location-city">', loc.city, '</span>, ',
            '<span class="location-state">', loc.state, '</span> ',
            '<span class="location-zip">', loc.zip, '</span>',
          '</div>',
          /*jshint ignore:end*/
        ].join('');
      }).join('');
    });
  }

  mapManager.draw();
  mapManager.setLocations(locations);
}

request($('#filter-locations').value);
