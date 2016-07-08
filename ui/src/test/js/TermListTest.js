/*
Copyright 2011 Museum of Moving Image

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jqUnit, jQuery, cspace, fluid, start, stop, ok, expect*/
"use strict";

cspace.test = cspace.test || {};

var termListTester = function ($) {
    
    var container = ".termList";
    
    var bareTermListTest = new jqUnit.TestCase("TermList Tests");
    
    var termListTest = cspace.tests.testEnvironment({
        testCase: bareTermListTest
    });
    
    var setupTermList = function (callback, options) {
        options = fluid.merge(null, options || {}, {
            listeners: {
                ready: function (termListImpl) {
                    callback(termList, termListImpl);
                    start();
                }
            }
        });
        var termList = cspace.termList(container, options);
        return termList;
    };
    
    termListTest.asyncTest("Init and render", function () {
        setupTermList(function (termList, termListImpl) {
            jqUnit.assertValue("Term list was created", termList);
            jqUnit.assertValue("Term list impl was created", termListImpl);
        });
    });
    
    termListTest.asyncTest("Options Propagation", function () {
        var elPath = "test";
        setupTermList(function (termList, termListImpl) {
            jqUnit.assertEquals("Size of optionlist", 4, termListImpl.options.optionlist.length);
            jqUnit.assertEquals("Size of optionnames", 4, termListImpl.options.optionnames.length);
            jqUnit.assertEquals("Size of optionlist", termList.optionlist.length, termListImpl.options.optionlist.length);
            jqUnit.assertEquals("Size of optionnames", termList.optionnames.length, termListImpl.options.optionnames.length);
            jqUnit.assertEquals("El Path should be", elPath, termListImpl.options.elPath);
            jqUnit.assertEquals("Root should be", "", termListImpl.options.root);
            jqUnit.assertFalse("Inactive should be enabled", $("option", termListImpl.locate("termList")).eq(0).is(":disabled"));
            jqUnit.assertFalse("Inactive should be enabled", $("option", termListImpl.locate("termList")).eq(1).is(":disabled"));
            jqUnit.assertTrue("Inactive should be disabled", $("option", termListImpl.locate("termList")).eq(2).is(":disabled"));
            jqUnit.assertFalse("Inactive should be enabled", $("option", termListImpl.locate("termList")).eq(3).is(":disabled"));
        }, {
            elPath: elPath
        });
    });
    
    termListTest.asyncTest("Autobinding", function () {
        var elPath = "test";
        setupTermList(function (termList, termListImpl) {
            jqUnit.assertNoValue("Current selection", termListImpl.model[elPath]);
            jqUnit.assertNoValue("Current selection", termList.model[elPath]);
            termListImpl.locate("termList").val(termListImpl.options.optionlist[1]).change();
            jqUnit.assertValue("Current selection", termListImpl.model[elPath]);
            jqUnit.assertValue("Current selection", termList.model[elPath]);
        }, {
            elPath: elPath
        });
    });
    
    termListTest.asyncTest("Container test", function () {
        var elPath = "test";
        setupTermList(function (termList, termListImpl) {
            var container = termListImpl.container;
            jqUnit.assertEquals("the container of termlist is a div ", "DIV", container[0].tagName);
            jqUnit.assertNotEquals("and its ID should not be main ", "main", container[0].id);
            container = termListImpl.container.parent();
            jqUnit.assertEquals("the parent container of termlist is a div as well ", "DIV", container[0].tagName);
            jqUnit.assertEquals("and its ID should be main ", "main", container[0].id);
        }, {
            elPath: elPath
        });
    });
};

(function () {
    termListTester(jQuery);
}());