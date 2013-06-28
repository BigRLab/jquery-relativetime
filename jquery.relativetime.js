(function($) {
  /*
		Plugin: jQuery Relative time
		Author: Duncan O. (duncano.de) 
		28.06.2013
	*/
	$.fn.relativeTime = function(settings) {
		var options = $.extend({
			duration: 250,
			lengths: [
				60,
				60,
				24,
				7,
				4.35,
				12,
				10
			],
			lang: 'de',
			strings: {
				'de': {
					'before': 'vor',
					'in': 'in',
					'at': 'um',
					'now': 'Gerade eben',
					'next': 'naechsten',
					'yesterday': 'gestern',
					'periods': [
						['Sekunde', 'Sekunden', 'einer'],
						['Minute', 'Minuten', 'einer'],
						['Stunde', 'Stunden', 'einer'], 
						['Tag', 'Tagen', 'einem'], 
						['Woche', 'Wochen', 'einer'],
						['Monat', 'Monaten', 'einem'],
						['Jahr', 'Jahren', 'einem'],
						['Jahrzehnt', 'Jahrzehnten', 'einem']
					],
					'weekdays': [
						'Sonntag',
						'Montag',
						'Dienstag',
						'Mittwoch',
						'Donnerstag',
						'Freitag',
						'Samstag'
					]
				},
				'en': {
					'before': 'before',
					'in': 'in',
					'at': 'at',
					'now': 'right now',
					'next': 'next',
					'yesterday': 'yesterday',
					'periods': [
						['sec', 'secs', 'one'],
						['min', 'mins', 'one'],
						['hour', 'hours', 'one'],
						['day', 'days', 'one'],
						['week', 'weeks', 'one'],
						['month', 'months', 'one'],
						['year', 'years', 'one'],
						['decade', 'decades', 'one']
					],
					'weekdays': [
						'sunday',
						'monday',
						'tuesday',
						'wednesday',
						'thursday',
						'friday',
						'saturday'
					]
				}

			}
		}, settings);

		$(this).each(function() {
			$(this).text(
				_getRelativeTime($(this).data('relativetime'))
			);
		});

		function _getRelativeTime(timestamp) {
			var d = new Date(timestamp*1000);
			var t = Math.round(+new Date()/1000);
			var diff = ((t - timestamp) < 0 ? - (t - timestamp) : (t - timestamp));

			for(var i = 0; diff >= options.lengths[i] && i < 7; i++)
				diff = diff / options.lengths[i];

			diff = Math.round(diff);

			// now
			if(diff == 0) {
				return options.strings[options.lang].now;
			}

			// last week
			if(i == 3 && diff < 7) {
				return ((t - timestamp > 0) ? '' : options.strings[options.lang].next) + ' ' +
					(diff == 1 ? options.strings[options.lang].yesterday : options.strings[options.lang].weekdays[d.getDay()]) + ' ' +
					options.strings[options.lang].at + ' ' +
					d.getHours() + ':' + d.getMinutes();
			}

			return ((t - timestamp > 0) ? options.strings[options.lang].before : options.strings[options.lang].in) + ' ' + 
				(diff == 1 ? options.strings[options.lang].periods[i][2] : diff) + ' ' + 
				((diff != 1) ? options.strings[options.lang].periods[i][1] : options.strings[options.lang].periods[i][0]) + ' ' +
					(i > 3 ? ' ' : ' ');
		}

	};
})(jQuery);
