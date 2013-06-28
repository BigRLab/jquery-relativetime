/*
 * jquery.relativetime.js v 1.0.0 Beta
 * Author: Duncan Overbruck
 * duncano.de
 * Copyright (c) 2013 Duncan Overbruck.
 * Dual licensed under the MIT and GPL licenses
 */
(function($) {
	$.fn.relativeTime = function(settings) {
		var options = $.extend({
			refresh: false, // or milliseconds
			past: {
				second: ['gerade eben'],
				minute: ['vor einer Minute', 'vor {{value}} Minuten'],
				hour: ['vor etwa einer Stunde', 'vor {{value}} Stunden'],
				day: ['gestern um {{date:"H:i"}}', '{{date:"l"}} um {{date:"H:i"}}'],
				week: ['vor etwa einer Woche um {{date:"H:i"}}', 'vor {{value}} Wochen um {{date:"H:i"}}'],
				month: ['vor etwa einem Monat um {{date:"H:i"}}', 'vor {{value}} Monaten um {{date:"H:i"}}'],
				year: ['vor etwa einem Jahr um {{date:"H:i"}}', 'vor {{value}} Jahren um {{date:"H:i"}}'],
				decade: ['vor etwa einem Jahrzehnt um {{date:"H:i"}}', 'vor {{value}} Jahren um {{date:"H:i"}}'],
				unknown: ['{{date}}']
			},
			future: {
				second: ['jetzt gleich'],
				minute: ['in einer Minute', 'in {{value}} Minuten'],
				hour: ['in etwa einer Stunde', 'in {{value}} Stunden'],
				day: ['morgen um {{date:"H:i"}}', 'naechsten {{date:"l"}} um {{date:"H:i"}}'],
				week: ['in etwa einer Woche um {{date:"H:i"}}', 'in {{value}} Wochen um {{date:"H:i"}}'],
				month: ['in etwa einem Monat um {{date:"H:i"}}', 'in etwa zwei Monaten um {{date:"H:i"}}', 'in {{value}} Monaten um {{date:"H:i"}}'],
				year: ['in etwa einem Jahr um {{date:"H:i"}}', 'in {{value}} Jahren um {{date:"H:i"}}'],
				decade: ['in etwa einem Jahrzehnt um {{date:"H:i"}}', 'in {{value}} Jahren um {{date:"H:i"}}'],
				unknown: ['{{date}}']
			},
			days: [
				'Sonntag',
				'Montag',
				'Dienstag',
				'Mittwoch',
				'Donnerstag',
				'Freitag',
				'Samstag'
			]
		}, settings),
		periods = [
			'second',
			'minute',
			'hour',
			'day',
			'week',
			'month',
			'year',
			'decade',
			'unknown'
		],
		lengths = [
			60,
			60,
			24,
			7,
			4.35,
			12,
			10
		],
		objs = $(this);

		// if auto refresh set Interval
		if(options.refresh)
			setInterval(_refresh, options.refresh)

		// first time init
		_refresh();

		function _refresh() {
			objs.each(function() {
				$(this).text(
					_getRelativeTime($(this).data('relativetime'))
				);
			});
		}

		function _getString(period, value, date, future) {
			var strings = options[future ? 'future' : 'past'][periods[period]];
			var string = strings[(strings.length >= value) ? value - 1 : strings.length - 1];
			return string.replace(/\{\{value\}\}/gi, value)
						.replace(/\{\{date:"(.*?)"\}\}/gi, function(match) {
							return _dateFormat(date, match.match(/\{\{date:"(.*?)"\}\}/i)[1]);
						});
		}

		function _dateFormat(date, format) {
			format = format.replace(/H/, (date.getHours() < 10 ? '0' : '') + date.getHours()); 
			format = format.replace(/i/, (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()); 
			format = format.replace(/l/, options.days[date.getDay()]); 
			format = format.replace(/d/, (date.getDate() < 10 ? '0' : '') + date.getDate()); 
			format = format.replace(/m/, (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1));
			format = format.replace(/Y/, date.getFullYear());
			return format;
		}

		function _getRelativeTime(timestamp) {
			var d = new Date(timestamp*1000);
			var t = Math.round(+new Date()/1000);
			var diff = ((t - timestamp) < 0 ? - (t - timestamp) : (t - timestamp));

			for(var i = 0; diff >= lengths[i] && i < 7; i++)
				diff = diff / lengths[i];

			diff = Math.round(diff);

			return _getString(i, diff, d, ((t - timestamp) < 0));
		}

	};
})(jQuery);
