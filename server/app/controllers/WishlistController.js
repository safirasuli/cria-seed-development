/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Wishlist = mongoose.model('Wishlist');

/**
 * create function
 * @param req
 * @param res
 */
exports.wishlistAanmaken = function (req, res) {
    var doc = new Wishlist(req.body);

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
exports.alleWishlists = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {}, sort = {'modificationDate': -1};

    Wishlist.find(conditions, fields)
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
exports.wishlistDetails = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam, volgnummer: req.params._volgnummer}, fields = {};

    Wishlist.findOne(conditions, fields)
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
 * delete function
 * @param req
 * @param res
 */
exports.wishlistVerwijderen = function (req, res) {
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
    Wishlist.remove(conditions, callback);
};
