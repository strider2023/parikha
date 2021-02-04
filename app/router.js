//@ts-check
const express = require("express");
const glob = require("glob");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const compress = require("compression");
// const methodOverride = require("method-override");
// const helmet = require("helmet");
const validator = require("express-validator");
const expressVue = require("express-vue");
const path = require("path");

const mongoose = require('mongoose');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

/**
 *
 * @param {object} app
 * @param {object} config
 */
module.exports.init = (app, config) => {
    mongoose.connect('mongodb://localhost:27017/parikha', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    var store = new MongoDBStore({
        uri: 'mongodb://localhost:27017/parikha',
        collection: 'mySessions'
    });

    // Catch errors
    store.on('error', function (error) {
        console.log(error);
    });

    app.use(cookieParser());
    app.use(session({
        key: 'user_sid',
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            secure: !true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));

    //Setup
    const env = process.env.NODE_ENV || "development";
    // const router = express.Router();
    let logType = "dev";
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = (env === "development");
    app.locals.rootPath = process.env.ROOT_PATH;

    //ExpressVue Setup
    const vueOptions = {
        rootPath: path.join(__dirname, "routes"),
        head: {
            title: "Parīkṣā",
            metas: [{
                    name: "viewport",
                    content: "width=device-width,initial-scale=1"
                },
                {
                    charset: "utf-8"
                }
            ],
            styles: [{
                    style: "assets/rendered/style.css"
                },
                {
                    src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
                    rel: "stylesheet",
                    integrity: "sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1",
                    crossorigin: "anonymous"
                }, {
                    src: "/assets/external/notiflix-2.6.0.min.css",
                    rel: "stylesheet"
                }
            ],
            scripts: [{
                src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",
                integrity: "sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW",
                crossorigin: "anonymous"
            }, {
                src: "https://unpkg.com/axios/dist/axios.min.js",
            }, {
                src: "/assets/external/notiflix-2.6.0.min.js",
            }, {
                src: "/assets/external/notiflix-aio-2.6.0.min.js",
            }]
        },
    };

    // @ts-ignore
    const expressVueMiddleware = expressVue.init(vueOptions);
    app.use(expressVueMiddleware);

    //Security
    // app.use(helmet());
    // app.disable("x-powered-by");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(validator());

    app.use(compress());

    app.use(app.locals.rootPath, express.static(config.root));


    if (env === "production") {
        app.set("trust proxy", 1);
        logType = "combined";
    }

    if (env === "development") {
        app.use(logger(logType));
    }

    // app.use(methodOverride());
    // app.use((req, res, next) => {
    //     if (req.cookies.user_sid && !req.session.user) {
    //         res.clearCookie('user_sid');        
    //     }
    //     next();
    // });

    // app.use("/", router);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to database.');
    });

    let controllers = glob.sync(config.root + "/routes/**/*.js");
    controllers.forEach(function (controller) {
        module.require(controller)(app, db);
    });

    /**
     * Generic 404 handler
     * @param {object} req
     * @param {object} res
     */
    function error404handler(req, res) {
        const data = {
            title: "Error 404",
        };
        req.vueOptions = {
            head: {
                title: "Error 404",
            },
        };
        res.statusCode = 404;
        res.renderVue("error.vue", data, req.vueOptions);
    }

    app.use(error404handler);

    /**
     * Generic Error handling route
     * @param {object} error
     * @param {object} req
     * @param {object} res
     * @param {Function} next
     */
    function genericErrorHandler(error, req, res, next) {
        res.statusCode = 500;
        let data = {
            debug: env === "development",
            errorCode: error.code,
            error: error.stack,
        };
        if (res.statusCode) {
            res.renderVue("error.vue", data);
        } else {
            next();
        }
    }
    app.use(genericErrorHandler);

};