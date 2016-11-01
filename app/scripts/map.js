(function () {
    // https://gist.github.com/padolsey/6008842
    var makeInterpolator = (function() {
        var rc = {'\n': '\\n', '\"': '\\\"', '\u2028': '\\u2028', '\u2029': '\\u2029'};
        return function makeInterpolator(str) {
            return new Function(
                'o',
                'return "' + (
                    str
                    .replace(/["\n\r\u2028\u2029]/g, function($0) {
                    return rc[$0];
                    })
                    .replace(/\{([\s\S]+?)\}/g, '" + o["$1"] + "')
                ) + '";'
                );
        };
    }());

    function getQuery (postalCode) {
        return [
            'query {',
                // customize the zip based on what the user is looking at
                'locations(brand:BOSS, zip:' + postalCode + ') {',
                    // all the fields we care about for our UI
                    'name street city state zip lat long distance',
                '}',
            '}',
        ].join('');
    }

    function request(postalCode) {
        if (finder.insertBefore) {
            const text = document.createElement('div');
            text.style = 'margin: 1em auto 3em;';
            // text.textContent = 'Searching in ' + postalCode + '...';
            finder.insertBefore(text, finder.firstChild);
        }

        var protocol = location.protocol !== 'file:' ? location.protocol : 'http:';
        fetch(protocol + '//stout-brand-finder.herokuapp.com/graphql?query=' + encodeURIComponent(getQuery(postalCode)))
            .then(function(resp) { return resp.json(); })
            .then(function (data) {
                draw(data.data.locations);
                return data;
            })

						.catch(function (err) {
                console.log(err);
                return err;
            });
    }

    const finder = document.getElementById('finder-box');
    const form = document.getElementById('search-form');
    const input = document.getElementById('zip-field');
    // form.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     request(input.value);
    // }, false);
		form.addEventListener('submit', function (event) {
        event.preventDefault();
        request(input.value);
			}, false);

    const tmpl = [
      '<div class="location-box">',
        '<div class="flav-headline">',
          '<h1>{name}</h1>',
          '<p class="sub-head">{street} {city} {state} {zip}</p>',
          '<a href="http://maps.google.com/?q={name} {street} {city} {zip}"><p>link to map</p></a>',
        '</div>',
      '</div>'
    ].join('');
    const template = makeInterpolator(tmpl);

    // const draw = (locations) => {
    //     if (locations.length === 0) {
    //         finder.innerHTML = '<div>Unfortunately our products are not available in this location</div>';
    //     } else {
    //         finder.innerHTML = locations.reduce((html, location) => html + template(location), '');
    //     }
    // };

		var draw = function draw(locations) {
    if (locations.length === 0) {
        finder.innerHTML = '<div>Unfortunately our products are not available in this location</div>';
    } else {
        finder.innerHTML = locations.reduce(function (html, location) {
            return html + template(location);
        }, '');
    }
};

    request(input.value );
})();
