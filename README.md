jquery-relativetime
===================

converts unix timestamps to relative time.

How-To
===================
    <span data-timestamp="1372149751"></span>

    <script>
    $(document).ready(function() {
      $('[data-timestamp]').relativeTime();
    });
    </script>

Options
===================
    {
    	refresh: false, // or milliseconds
    	dataName: 'timestamp',
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
    }

Examples
===================

*English*
* next monday at 10:42
* tuesday at 10:42
* yesterday at 10:42
* before one month
* before 2 hours
* in 2 months

*German*
* nächsten Montag um 10:42
* Dienstag um 10:42
* gestern um 10:42
* vor einem Monat
* vor 2 Stunden
* in 2 Monaten
