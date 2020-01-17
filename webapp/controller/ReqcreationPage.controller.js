sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("iconT.IconT.controller.ReqcreationPage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf iconT.IconT.view.ReqcreationPage
		 */
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.mockData();
			var oModel = new JSONModel();
			oModel.setData(this.oLocalData);
			this.getView().setModel(oModel);
			
		},

		onSubmitpress: function (oEvent) {
			this.oRouter.navTo("Tab22", {
				query: {
					tab1: "tab21",
				}
			}, true);
		},
		mockData: function () {
			this.oLocalData = {
				"Country1": [{
					"code": "0123",
					"Case": "Pro",
					"BCP": "123",
					"BPP": "321",
					"Mov": "1234",
					"Number": "Yes"
				}, {
					"code": "0123",
					"Case": "Pro",
					"BCP": "123",
					"BPP": "321",
					"Mov": "1234",
					"Number": "Yes"
				}, {
					"code": "0123",
					"Case": "Pro",
					"BCP": "123",
					"BPP": "321",
					"Mov": "1234",
					"Number": "Yes"
				}],
				"Country2": [{
					"code": "0123",
					"Case": "Pro",
					"BCP": "123",
					"BPP": "321",
					"Mov": "1234",
					"Number": "Yes"
				}, {
					"code": "0123",
					"Case": "Pro",
					"BCP": "123",
					"BPP": "321",
					"Mov": "1234",
					"Number": "Yes"
				}, {
					"code": "0123",
					"Case": "Pro",
					"BCP": "123",
					"BPP": "321",
					"Mov": "1234",
					"Number": "Yes"
				}],
				"Country3": [{
					"code": "0123",
					"Case": "Pro",
					"BCP": "123",
					"BPP": "321",
					"Mov": "1234",
					"Number": "Yes"
				}, {
					"code": "0123",
					"Case": "Pro",
					"BCP": "123",
					"BPP": "321",
					"Mov": "1234",
					"Number": "Yes"
				}, {
					"code": "0123",
					"Case": "Pro",
					"BCP": "123",
					"BPP": "321",
					"Mov": "1234",
					"Number": "Yes"
				}]
			};
		}

	});

});