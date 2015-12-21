/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Notificatie = mongoose.model('Notificatie');

/**
 * create function
 * @param req
 * @param res
 */
exports.notificatieAanmaken = function (req, res) {
    var doc = new Notificatie(req.body);

    doc.save(function (err) {
        var retObj = {
            meta: {
                "action": "create",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: doc,
            err: err
        };

        return res.send(retObj);
    });
};

/**
 * retrieve all function
 * @param req
 * @param res
 */
exports.alleNotificaties = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {}, sort = {'modificationDate': -1};

    Notificatie.find(conditions, fields)
        .sort(sort)
        .exec(function (err, doc) {

            var retObj = {
                meta: {
                    "action": "list",
                    'timestamp': new Date(),
                    filename: __filename
                },
                doc: doc, // array
                err: err
            };

            return res.send(retObj);
        });
};

/**
 * retrieve one function
 * @param req
 * @param res
 */
exports.notificatieDetails = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam, volgnummer: req.params._volgnummer}, fields = {};

    Notificatie.findOne(conditions, fields)
        .exec(function (err, doc) {
            var retObj = {
                meta: {
                    "action": "detail",
                    'timestamp': new Date(),
                    filename: __filename
                },
                doc: doc, // only the first document, not an array when using "findOne"
                err: err
            };
            return res.send(retObj);
        });
};

/**
 * update function
 * @param req
 * @param res
 */
exports.updateNotificatie = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam, volgnummer: req.params._volgnummer},
        update = {
            naam: req.body.naam,
            email: req.body.email,
            bericht: req.body.bericht
        },
        options = {multi: false},
        callback = function (err, doc) {
            var retObj = {
                meta: {
                    "action": "update",
                    'timestamp': new Date(),
                    filename: __filename,
                    'doc': doc,
                    'update': update
                },
                doc: update,
                err: err
            };

            return res.send(retObj);
        };

    Notificatie.findOneAndUpdate(conditions, update, options, callback);
};

/**
 * delete function
 * @param req
 * @param res
 */
exports.notificatieVerwijderen = function (req, res) {
    var conditions, callback, retObj;

    conditions = {gebruikersnaam: req.params._gebruikersnaam, volgnummer: req.params._volgnummer};

    callback = function (err, doc) {
        retObj = {
            meta: {
                "action": "delete",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: doc,
            err: err
        };
        return res.send(retObj);
    };
    Notificatie.remove(conditions, callback);
};
