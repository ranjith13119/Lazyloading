sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("iconT.IconT.controller.Subtab2.tab22", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf iconT.IconT.view.tab22
		 */
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.attachRoutePatternMatched(this.onRoutePatternMatched, this);
			var oModeldata = {
				"Files": [{
					"text": "file1.txt"
				}, {
					"text": "file2.txt"
				}]
			};
			this.oModel = new JSONModel();
			this.oModel.setData(oModeldata);
			this.getView().setModel(this.oModel, "FileModel");
			var that = this;
			that.getModel = this.getOwnerComponent().getModel();
			this.getOwnerComponent().getModel().metadataLoaded().then(function (oEvent) {
				if (that.getModel.getServiceMetadata() && that.getModel.getServiceMetadata().dataServices.schema[0].entityType) {
					var entityType = that.getModel.getServiceMetadata().dataServices.schema[0].entityType;
					entityType.map(function (e) {
						if (e.name === "Product") {
							e.extensions.push({
								name: "semantics",
								value: "aggregate",
								namespace: "http://www.sap.com/Protocols/SAPData"
							});
							e.property.map(function (p) {
								if (p.type === "Edm.String") {
									p.extensions.push({
										name: "aggregation-role",
										value: "dimension",
										namespace: "http://www.sap.com/Protocols/SAPData"
									});
								} else {
									p.extensions.push({
										name: "aggregation-role",
										value: "measure",
										namespace: "http://www.sap.com/Protocols/SAPData"
									});
								}
							});
						}
					});
				}
			});
			var oSmartTable = this.getView().byId("smartTable"); //Get Hold of smart table
			var oAnalyticalTable = oSmartTable.getTable(); //Analytical Table embedded into SmartTable
			oAnalyticalTable.setSelectionMode("Single");
			//oAnalyticalTable.setSumOnTop(true);
			oAnalyticalTable.setEnableGrouping(true);
			oAnalyticalTable.setGroupBy("Category");
		},
		onSubmitpress: function (oEvent) {
			this.oRouter.navTo("Tab22", {
				query: {
					tab1: "tab21"
				}
			}, true);
		},
		onRoutePatternMatched: function (oEvent) {
				//	var oArgs = oEvent.getParameter("arguments");
				//	var oQuery = oArgs["?query"];
				//	if (oQuery && oQuery.tab1 === "tab22") alert("adsf")
			}
			/*	onInit: function () {
				//	this._getDialog();
				//	this.getOwnerComponent().getRouter().getRoute("CSPDialog").attachPatternMatched(this._oRoutePatternMatched, this);
				},
				_getDialog: function () {
					if (!this._oDialog) {
						this._oDialog = sap.ui.xmlfragment("fragment", "iconT.IconT.view.Fragment.Request", this);
						this.getView().addDependent(this._oDialog);
					}
					return this._oDialog;
				},
				_oRoutePatternMatched: function (oEvent) {
					if (this._getDialog()) {
						if (this._getDialog().isOpen()) {
							this._getDialog().close();
						} else {
							this._getDialog().open();
						}
					} else {
						this._getDialog();
					}
				},
				onCancel: function (oEvent) {
					this._getDialog().close();
					this.getOwnerComponent().getRouter().navTo("Tab22", {
						query: {
							tab1: "tab21",
						}
					}, true);
				},
				onSubmit: function (oEvent) {
					var country = sap.ui.core.Fragment.byId("fragment", "com1").getSelectedKey(),
						customer = sap.ui.core.Fragment.byId("fragment", "com2").getSelectedKey();
					this.getOwnerComponent().getRouter().navTo("ReqcreationPage", {
						country: country,
						customer: customer
					});
				}*/
	});

});