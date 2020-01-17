sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"iconT/IconT/model/formatter"
], function (Controller, JSONModel, formatter) {
	"use strict";

	return Controller.extend("iconT.IconT.controller.RequestCreation", {

		formatter: formatter,
		onInit: function () {
			this.mockData();
			var oModel = new JSONModel();
			oModel.setData(this.oLocalData);
			this.getView().setModel(oModel);
			this.oTable = this.getView().byId("table");
			console.log(this.oTable);
		},
		onAfterRendering: function (oEvent) {
			console.log(this.oTable.getBinding("items"));
		},
	
		mockData: function () {
			this.oLocalData = {
				"Products": [{
					"title": "Ukraine (Consolidated)",
					"items": [{
						"code": "0123",
						"Case": "Pro",
						"BCP": 123,
						"BPP": 321,
						"Mov": 1234,
						"Number": "Yes",
						"country": "Uk"
					}, {
						"code": "0123",
						"Case": "Tra",
						"BCP": 123,
						"BPP": 321,
						"Mov": 1234,
						"Number": "Yes",
						"country": "Uk"
					}, {
						"code": "0123",
						"Case": "Mar",
						"BCP": 123,
						"BPP": 321,
						"Mov": 1234,
						"Number": "Yes",
						"country": "Uk"
					}]
				}, {
					"title": "Ukraine ",
					"items": [{
						"code": "0123",
						"Case": "Pro",
						"BCP": 123,
						"BPP": 321,
						"Mov": 1234,
						"Number": "Yes",
						"country": "Uk"
					}, {
						"code": "0123",
						"Case": "Tra",
						"BCP": 123,
						"BPP": 321,
						"Mov": 1234,
						"Number": "Yes",
						"country": "Uk"
					}, {
						"code": "0123",
						"Case": "Mar",
						"BCP": 123,
						"BPP": 321,
						"Mov": 1234,
						"Number": "Yes",
						"country": "Uk"
					}]
				}, {
					"title": "UK",
					"items": [{
						"code": "0123",
						"Case": "Pro",
						"BCP": 123,
						"BPP": 321,
						"Mov": 1234,
						"Number": "Yes",
						"country": "Uk"
					}, {
						"code": "0123",
						"Case": "Tra",
						"BCP": 123,
						"BPP": 321,
						"Mov": 1234,
						"Number": "Yes",
						"country": "Uk"
					}, {
						"code": "0123",
						"Case": "Mar",
						"BCP": 123,
						"BPP": 321,
						"Mov": 1234,
						"Number": "Yes",
						"country": "Uk"
					}]
				}]
			};
		}

	});

});