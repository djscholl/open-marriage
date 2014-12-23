var combo   = require('combohandler'),
    express = require('express'),
    exphbs  = require('express3-handlebars'),
    state   = require('express-state'),

    config     = require('./config'),
    helpers    = require('./lib/helpers'),
    middleware = require('./middleware'),
    routes     = require('./routes'),

    app = express();

// -- Configure ----------------------------------------------------------------

app.set('name', 'Serina-Dan Wedding');
app.set('env', config.env);
app.set('port', config.port);
app.set('views', config.dirs.views);
app.set('view engine', 'hbs');
app.set('state namespace', 'YUI.Env.LE');
app.enable('strict routing');

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname      : '.hbs',
    helpers      : helpers,
    layoutsDir   : config.dirs.layouts,
    partialsDir  : config.dirs.partials
}));

// -- Locals -------------------------------------------------------------------

app.expose(config.yui.config, 'window.YUI_config');

app.locals({
    title   : 'Serina & Dan',
    appTitle: 'S&D Wedding',

    version    : config.version,
    yui_version: config.yui.version,

    nav: [
       {id: 'wedding', url: '/wedding/', label: 'Wedding'},
       {id: 'wedding_party', url: '/wedding_party/', label: 'Wedding Party'},
       {id: 'logistics', url: '/logistics/', label: 'Logistics'},
       {id: 'registry', url: '/registry/', label: 'Registry'},
       {id: 'engagement', url: '/engagement/', label: 'Engagement Photos'}
       // {id: 'rsvp',      url: '/rsvp/',      label: 'RSVP'}
    ],

    subnav: {
        logistics: [
            {id: 'travel',  url: '/logistics/travel',   label: 'Travel'},
            {id: 'hotels',  url: '/logistics/hotels/',  label: 'Hotels'},
        ],
        wedding_party: [
            {id: 'bridesmaids',    url: '/wedding_party/bridesmaids/',  label: 'Bridesmaids'},
            {id: 'groomsmen',   url: '/wedding_party/groomsmen/', label: 'Groomsmen'}
        ]
    },

    yui_module: 'le-main',

    pictos : config.pictos,
    typekit: config.typekit,

    isDevelopment: config.isDevelopment,
    isProduction : config.isProduction,

    min: config.isProduction ? '-min' : ''
});

// -- Middleware ---------------------------------------------------------------

if (config.isDevelopment) {
    app.use(express.logger('tiny'));
}

app.use(express.compress());
app.use(express.favicon(config.dirs.pub + '/favicon.ico'));
app.use(express.cookieParser());
app.use(express.cookieSession(config.session));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.csrf());
app.use(middleware.csrfToken);
app.use(middleware.invitation);
app.use(middleware.pjax('bare'));
app.use(middleware.checkDate);
app.use(app.router);
app.use(middleware.slash());
app.use(express.static(config.dirs.pub));
app.use(middleware.notfound);

if (config.isDevelopment) {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack     : true
    }));
} else {
    app.use(middleware.error);
}

// -- Routes -------------------------------------------------------------------

app.get('/', routes.render('home'));

app.get('/wedding/', routes.render('wedding'));

app.get('/wedding_party/',            routes.render('wedding_party/bridesmaids'));
app.get('/wedding_party/bridesmaids', routes.render('wedding_party/bridesmaids'));
app.get('/wedding_party/groomsmen',   routes.render('wedding_party/groomsmen'));

app.get('/logistics/',         routes.render('logistics/travel'));
app.get('/logistics/travel',         routes.render('logistics/travel'));
app.get('/logistics/hotels',  routes.render('logistics/hotels'));

app.get('/registry/', routes.render('registry'));

app.get('/engagement/', routes.render('engagement'));

// app.get( '/rsvp/',                       routes.rsvp.pub, routes.rsvp.edit);
// app.post('/rsvp/',                       routes.rsvp.resend);
// app.get( '/rsvp/brunch/',                routes.rsvp.brunch);
// app.post('/rsvp/brunch/',                routes.rsvp.brunch);
// app.get( '/rsvp/brunch/:invitation_key', routes.rsvp.login);
// app.get( '/rsvp/:invitation_key',        routes.rsvp.login);

// app.all( '/invitations/:invitation/*',       middleware.auth.ensureInvitation);
// app.get( '/invitations/:invitation/',        routes.invitations.read);
// app.put( '/invitations/:invitation/',        routes.invitations.update);
// app.get( '/invitations/:invitation/guests',  routes.invitations.readGuests);
// app.post('/invitations/:invitation/confirm', routes.invitations.confirm);

// app.all('/guests/:guest/', middleware.auth.ensureGuest);
// app.get('/guests/:guest/', routes.guests.read);
// app.put('/guests/:guest/', routes.guests.update);

app.get('/combo/:version', [
    combo.combine({rootPath: config.dirs.pub}),
    combo.respond
]);

module.exports = app;
