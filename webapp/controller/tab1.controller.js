
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";
	var _aTabKeys = ["tab22", "tab23"];
	return Controller.extend("iconT.IconT.controller.tab1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf iconT.IconT.view.tab1
		 */
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.getRoute("Tab22").attachMatched(this.onRoutePatternMatched, this);
		},
		onRoutePatternMatched: function (oEvent) {
			var oArgs, oQuery;
			oArgs = oEvent.getParameter("arguments");
			oQuery = oArgs["?query"];

			if (oQuery && _aTabKeys.indexOf(oQuery.tab1) > -1) {
				if (oQuery.tab1 === "tab23") {
					this.oRouter.getTargets().display("Sub" + oQuery.tab1);
				} else if (oQuery.tab1 === "tab22") {
					//this.oRouter.navTo("CSPDialog");
					this._getDialog();
					this._dialogOpen();

				}
			} else {
				this.getView().byId("idIconTab2Bar").setSelectedKey("tab21");
				this.oRouter.navTo("Tab22", true);
			}
		},
		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("fragment", "iconT.IconT.view.Fragment.Request", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		onCancel: function (oEvent) {
			this._getDialog().close();
			this.oRouter.navTo("Tab22", {
				query: {
					tab1: "tab21"
				}
			}, true);
		},
		_dialogOpen: function (oEvent) {
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
		onSubmit: function (oEvent) {
			this._getDialog().close();
			var country = sap.ui.core.Fragment.byId("fragment", "com1").getSelectedKey(),
				customer = sap.ui.core.Fragment.byId("fragment", "com2").getSelectedKey();
			this.oRouter.getTargets().display("Subtab22");

		},
		onTabSelect: function (oEvent) {

			this.oRouter.navTo("Tab22", {
				query: {
					tab1: oEvent.getParameter("selectedKey")
				}
			}, true);
		}

	});

});