sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/TablePersoController',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
], function (Controller, TablePersoController, Filter, FilterOperator, FilterType) {
	"use strict";

	return Controller.extend("iconT.IconT.controller.Subtab2.tab21", {

		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.attachRoutePatternMatched(this.onRoutePatternMatched, this);

			//init and getting the Variants from the /UI2/INTEROP 
		//	this.initiateVariantMang();
		},
		onRoutePatternMatched: function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			var oQuery = oArgs["?query"];
			if (oQuery && oQuery.tab1 === "tab21") {
				//	this.getView().getModel().refresh();
				var oBinding = this.byId("idProductsTable").getBinding("items");
				oBinding.refresh();
			}
		},
		onCPSReqItemPress: function (oEvent) {
			this.oRouter.navTo("CPSSubmit");
		},
		onSearch: function (oEvent) {
			var oView = this.getView(),
				sValue = oEvent.getParameter("selectedItem").getKey();
			sValue = (sValue == "All") ? "" : sValue;
			var oFilter = new Filter("ProductID", FilterOperator.Contains, sValue);
			var t = this.getView().byId("idProductsTable").getBinding("items").oCombinedFilter;
			oView.byId("idProductsTable").getBinding("items").filter(oFilter, FilterType.Application);
		},
		initiateVariantMang: function (oEvent) {

			if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService) {

				var oComponent = sap.ui.core.Component.getOwnerComponentFor(this.getView());
				this.oPersonalizationService = sap.ushell.Container.getService("Personalization");
				var oPersId = {
					container: "TablePersonalisation", //any
					item: "DemoTableUI" //any- 
				};
				// define scope 
				var oScope = {
					keyCategory: this.oPersonalizationService.constants.keyCategory.FIXED_KEY,
					writeFrequency: this.oPersonalizationService.constants.writeFrequency.LOW,
					clientStorageAllowed: true
				};
				// Get a Personalizer
				var oPersonalizer = this.oPersonalizationService.getPersonalizer(oPersId, oScope, oComponent);
				this.oPersonalizationService.getContainer("TablePersonalisation", oScope, oComponent)
					.fail(function () {})
					.done(function (oContainer) {
						this.oContainer = oContainer;
						this.oVariantSetAdapter = new sap.ushell.services.Personalization.VariantSetAdapter(this.oContainer);
						// get variant set which is stored in backend
						this.oVariantSet = this.oVariantSetAdapter.getVariantSet("DemoTableUISet");
						if (!this.oVariantSet) { //if not in backend, then create one
							this.oVariantSet = this.oVariantSetAdapter.addVariantSet("DemoTableUISet");
						}
						// array to store the existing variants
						var Variants = [];
						// now get the existing variants from the backend to show as list
						for (var key in this.oVariantSet.getVariantNamesAndKeys()) {
							if (this.oVariantSet.getVariantNamesAndKeys().hasOwnProperty(key)) {
								var oVariantItemObject = {};
								oVariantItemObject.Key = this.oVariantSet.getVariantNamesAndKeys()[key];
								oVariantItemObject.Name = key;
								Variants.push(oVariantItemObject);
							}
						}
						// create JSON model and attach to the variant management UI control
						this.oVariantModel = new sap.ui.model.json.JSONModel();
						this.oVariantModel.oData.Variants = Variants;
						this.getView().byId("Variants").setModel(this.oVariantModel, "variant");
						//To Set the Default Key
						this.getView().byId("Variants").setInitialSelectionKey(this.oVariantSet.getCurrentVariantKey());
						this.getView().byId("Variants").fireSelect({
							"key": this.oVariantSet.getCurrentVariantKey()
						});
					}.bind(this));
				// create table persco controller
				this.oTablepersoService = new TablePersoController({
					table: this.getView().byId("idProductsTable"),
					persoService: oPersonalizer
				}).activate();
			}
		},

		// Trigger after pressing the Setting Icon
		onPersoButtonPressed: function (oEvent) {
			this.oTablepersoService.openDialog({
				ok: "this.onPerscoDonePressed.bind(this)"
			});
			this.oTablepersoService.getTablePersoDialog().attachConfirm(this, this.onPerscoDonePressed.bind(this));
		},
		onPerscoDonePressed: function (oEvent) {
			this.oTablepersoService.savePersonalizations();
		},

		onSaveAs: function (oEvent) {
			// get variant parameters:
			var VariantParam = oEvent.getParameters();
			// get columns data: 
			var aColumnsData = [];
			this.getView().byId("idProductsTable").getColumns().forEach(function (oColumn, index) {
				var aColumn = {};
				aColumn.text = oColumn.getAggregation("header").getProperty("text");
				aColumn.id = oColumn.getId();
				aColumn.order = oColumn.getOrder();
				aColumn.visible = oColumn.getVisible();
				aColumnsData.push(aColumn);
			});
			var aFilter = this.getView().byId("idProductsTable").getBinding("items").oCombinedFilter ? this.getView().byId("idProductsTable").getBinding(
				"items").oCombinedFilter : {};
			if (!VariantParam.overwrite) {
				this.oVariant = this.oVariantSet.addVariant(VariantParam.name);
			}
			if (this.oVariant) {
				this.oVariant.setItemValue("ColumnsVal", JSON.stringify(aColumnsData));
				this.oVariant.setItemValue("FilterValue", JSON.stringify(aFilter));
				if (VariantParam.def === true) {
					this.oVariantSet.setCurrentVariantKey(this.oVariant.getVariantKey());
				}
				this.oContainer.save().done(function () {
					console.log("Variants Saved");
				});
			}
		},

		onSelect: function (oEvent) {
			var selectedKey = oEvent.getParameters().key;
			for (var i = 0; i < oEvent.getSource().getVariantItems().length; i++) {
				if (oEvent.getSource().getVariantItems()[i].getProperty("key") === selectedKey) {
					var selectedVariant = oEvent.getSource().getVariantItems()[i].getProperty("text");
					break;
				}
			}
			this._setSelectedVariantToTable(selectedVariant);
		},

		_setSelectedVariantToTable: function (oSelectedVariant) {
			var aFilterObjects = [];
			if (oSelectedVariant) {
				var sVariant = this.oVariantSet.getVariant(this.oVariantSet.getVariantKeyByName(oSelectedVariant));
				var aColumns = JSON.parse(sVariant.getItemValue("ColumnsVal"));
				//	var aFilterObject = JSON.parse(sVariant.getItemValue("FilterValue"));  // Need To change(For my User Case)
				//	aFilterObject ? aFilterObjects.push(aFilterObject) : null;  // Need to Change (For my User Case)
				// Hide all columns first
				this.getView().byId("idProductsTable").getColumns().forEach(function (oColumn) {
					oColumn.setVisible(false);
				});
				// re-arrange columns according to the saved variant

				aColumns.forEach(function (aColumn) {
					var aTableColumn = $.grep(this.getView().byId("idProductsTable").getColumns(), function (el, id) {
						return el.getAggregation("header").getProperty("text") === aColumn.text;
					});
					if (aTableColumn.length > 0) {
						aTableColumn[0].setVisible(aColumn.visible);
						this.getView().byId("idProductsTable").removeColumn(aTableColumn[0]);
						this.getView().byId("idProductsTable").insertColumn(aTableColumn[0], aColumn.order);
					}
				}.bind(this));
			}
			// null means the standard variant is selected or the variant which is not available, then show all columns
			else {
				this.getView().byId("idProductsTable").getColumns().forEach(function (oColumn) {
					oColumn.setVisible(true);
				});
			}
			//	var oFilter;

			// Need to Change the Filter once the table is Filtered by multiple value and Need to set the Value to the FilterItem
			//	for (var i = 0; i < aFilterObjects.length; i++) {
			//		oFilter = new Filter(aFilterObjects[i].sPath, aFilterObjects[i].sOperator, aFilterObjects[i].oValue1);
			//	}
			//	this.getView().byId("idProductsTable").getBinding("items").filter(oFilter, FilterType.Application);
			if (this.oTablepersoService) {
				this.oTablepersoService.getPersoService().setPersData(aColumns);
				this.oTablepersoService.refresh();
			}

		},
		onManage: function (oEvent) {
			var aParameters = oEvent.getParameters();
			// rename variants
			if (aParameters.renamed.length > 0) {
				aParameters.renamed.forEach(function (aRenamed) {
					var sVariant = this.oVariantSet.getVariant(aRenamed.key),
						sItemValue = sVariant.getItemValue("ColumnsVal");
					// delete the variant 
					this.oVariantSet.delVariant(aRenamed.key);
					// after delete, add a new variant
					var oNewVariant = this.oVariantSet.addVariant(aRenamed.name);
					oNewVariant.setItemValue("ColumnsVal", sItemValue);
				}.bind(this));
			}
			// default variant change
			if (aParameters.def !== "*standard*") {
				this.oVariantSet.setCurrentVariantKey(aParameters.def);
			} else {
				this.oVariantSet.setCurrentVariantKey(null);
			}
			// Delete variants
			if (aParameters.deleted.length > 0) {
				aParameters.deleted.forEach(function (aDelete) {
					this.oVariantSet.delVariant(aDelete);
				}.bind(this));
			}
			//  Save the Variant Container
			this.oContainer.save().done(function () {

			});
		},

	});

}); 