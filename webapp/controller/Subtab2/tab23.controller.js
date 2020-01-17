sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("iconT.IconT.controller.Subtab2.tab23", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf iconT.IconT.view.tab23
		 */
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.attachRoutePatternMatched(this.onRoutePatternMatched, this);
		},
		onUpdate: function () {
			alert("Update Press");
		},
		onRoutePatternMatched: function (oEvent) {
				var oArgs = oEvent.getParameter("arguments");
				var oQuery = oArgs["?query"];
				if (oQuery && oQuery.tab1 === "tab23") alert("adsf")
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf iconT.IconT.view.tab23
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf iconT.IconT.view.tab23
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf iconT.IconT.view.tab23
		 */
		//	onExit: function() {
		//
		//	}

	});

});