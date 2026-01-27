sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'verifications.verificationui5',
            componentId: 'SerialDataList',
            contextPath: '/SerialData'
        },
        CustomPageDefinitions
    );
});