import Controller from "sap/ui/core/mvc/Controller";
import Event from "sap/ui/base/Event";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Context from "sap/ui/model/odata/v4/Context";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";

export default class SerialEditSectionController extends Controller {
  
  public onInit(): void {
    console.log("SerialEditSectionController loaded");
    const oView = this.getView();
    if (!oView) {
      return;
    }

    // 編集用 ViewModel
    const oViewModel = new JSONModel({
      newSerialNo: ""
    });
    oView.setModel(oViewModel, "viewModel");

    // ⭐ ObjectPage の Context バインドを監視
    oView.attachModelContextChange(this.onContextBound, this);
  }

  /**
   * ObjectPage に Context がバインドされたタイミングで呼ばれる
   */
  private onContextBound(): void {
    const oView = this.getView();
    if (!oView) {
      return;
    }

    const oContext = oView.getBindingContext() as Context;
    if (!oContext) {
      return;
    }
      // 👇 ここでログ
  console.log("BindingContext:", oContext);
  console.log("SerialNo:", oContext.getProperty("serialNo"));

    const oViewModel = oView.getModel("viewModel") as JSONModel;

    // OData（SerialData）から SerialNo を取得
    const sSerialNo = oContext.getProperty("SerialNo");

    if (sSerialNo) {
      oViewModel.setProperty("/newSerialNo", sSerialNo);
    }
  }

  /**
   * 保存ボタン押下
   */
  public async onSaveSerial(oEvent: Event): Promise<void> {
    try {
      const oView = this.getView();
      if (!oView) {
        return;
      }

      const oModel = oView.getModel() as ODataModel;
      const oContext = oView.getBindingContext() as Context;

      if (!oContext) {
        MessageToast.show("コンテキストが取得できません");
        return;
      }

      const oViewModel = oView.getModel("viewModel") as JSONModel;
      const sNewSerialNo = oViewModel.getProperty("/newSerialNo");

      if (!sNewSerialNo) {
        MessageToast.show("新しいシリアル番号を入力してください");
        return;
      }

      const oAction = oModel.bindContext(
        "SerialService.saveSerialNo(...)",
        oContext
      );

      oAction.setParameter("newSerialNo", sNewSerialNo);
      await oAction.execute();

      MessageToast.show("保存しました");

    } catch (e) {
      console.error(e);
      MessageToast.show("保存に失敗しました");
    }
  }
}
