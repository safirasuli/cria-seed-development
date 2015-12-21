/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    AlgemeneGegevens = mongoose.model('AlgemeneGegevens');

/**
 * create function
 * @param req
 * @param res
 */
exports.algGegevensAanmaken = function (req, res) {
    var doc = new AlgemeneGegevens(req.body);

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
 * retrieve one function
 * @param req
 * @param res
 */
exports.algGegevensDetails = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {};

    AlgemeneGegevens.findOne(conditions, fields)
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
exports.updateAlgGegevens = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam},
        update = {
            voornaam: req.body.voornaam,
            achternaam: req.body.achternaam,
            woonplaats: req.body.woonplaats,
            postcode: req.body.postcode,
            adres: req.body.adres,
            huisnummer: req.body.huisnummer,
            telefoon: req.body.telefoon,
            email: req.body.email
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

    AlgemeneGegevens.findOneAndUpdate(conditions, update, options, callback);
};