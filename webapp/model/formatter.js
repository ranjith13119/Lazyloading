sap.ui.define([], function () {
	"use strict";
	return {
		getBCP: function (oValue) {
			var sBCPTotal = 0;
			for (var i = 0; i < oValue.length; i++) {
				sBCPTotal = sBCPTotal + oValue[i].BCP;
			}
			return sBCPTotal;
		},
		getBPP: function (oValue) {
			var sBPPTotal = 0;
			for (var i = 0; i < oValue.length; i++) {
				sBPPTotal = sBPPTotal + oValue[i].BPP;
			}
			return sBPPTotal;
		},
		getMov: function (oValue) {
			var sMovTotal = 0;
			for (var i = 0; i < oValue.length; i++) {
				sMovTotal = sMovTotal + oValue[i].Mov;
			}
			return sMovTotal;
		}
	};
});