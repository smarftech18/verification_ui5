sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"verifications/verificationui5/test/integration/pages/SerialDataList",
	"verifications/verificationui5/test/integration/pages/SerialDataObjectPage"
], function (JourneyRunner, SerialDataList, SerialDataObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('verifications/verificationui5') + '/test/flp.html#app-preview',
        pages: {
			onTheSerialDataList: SerialDataList,
			onTheSerialDataObjectPage: SerialDataObjectPage
        },
        async: true
    });

    return runner;
});

