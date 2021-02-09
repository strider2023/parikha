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
const multer = require('multer');

const mongoose = require('mongoose');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

const Model = require('./models');

module.exports.init = (app, config) => {
    console.log("DB URL: " + process.env.DB_URL)
    mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/parikha', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to database.');
    });

    var store = new MongoDBStore({
        uri: process.env.DB_URL || 'mongodb://localhost:27017/parikha',
        collection: 'mySessions'
    });

    store.on('error', function (error) {
        console.log(error);
    });

    app.use(cookieParser());
    app.use(session({
        key: 'user_sid',
        secret: process.env.APPLICATION_KEY || 'N0tAn3SY0n3',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            secure: !true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/');
        },
    
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage: storage, filter: excelFilter });

    //Setup
    const env = process.env.NODE_ENV || "development";
    // const router = express.Router();
    let logType = "dev";
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = (env === "development");
    app.locals.rootPath = process.env.ROOT_PATH;

    // @ts-ignore
    const expressVueMiddleware = expressVue.init(Model.VueConfig);
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

    let controllers = glob.sync(config.root + "/routes/**/*.js");
    controllers.forEach(function (controller) {
        module.require(controller)(app, db, upload);
    });

    app.use(error404handler);
    app.use(genericErrorHandler);
};

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

function genericErrorHandler(error, req, res, next) {
    res.statusCode = 500;
    let data = {
        // debug: env === "development",
        errorCode: error.code,
        error: error.stack,
    };
    if (res.statusCode) {
        res.renderVue("error.vue", data);
    } else {
        next();
    }
}

function excelFilter(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(xls|xlsx|csv)$/)) {
        req.fileValidationError = 'Only excel files are allowed!';
        return cb(new Error('Only excel files are allowed!'), false);
    }
    cb(null, true);
};