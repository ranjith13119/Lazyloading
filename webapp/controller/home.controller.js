sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";
	var _aTabKeys = ["tab4", "tab2", "tab3"];
	return Controller.extend("iconT.IconT.controller.home", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf iconT.IconT.view.home
		 */
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.getRoute("Home").attachMatched(this.onRouteMatched, this);
		},

		onRouteMatched: function (oEvent) {
			var oArgs, oQuery;
			oArgs = oEvent.getParameter("arguments");
			oQuery = oArgs["?query"];
			if (oQuery && _aTabKeys.indexOf(oQuery.tab) > -1) {
				if (oQuery.tab === "tab4" || oQuery.tab === "tab2" || oQuery.tab === "tab3") {
					this.oRouter.getTargets().display("Fiori" + oQuery.tab);
				}
			} else {
				// the default query param should be visible at all time
				this.oRouter.navTo("Home", true);
			}
		},
		onTabSelect: function (oEvent) {
			if (oEvent.getParameter("selectedKey") === "tab2") {
				this.getView().getModel("init_data").setProperty("selectedTab", "tab21");
			}
			this.oRouter.navTo("Home", {
				query: {
					tab: oEvent.getParameter("selectedKey")
				}
			}, true);
		},
		onExit: function () {
			this.oRouter.deattachRoutePatternMatched(this.onRouteMatched, this);
		}

	});

});