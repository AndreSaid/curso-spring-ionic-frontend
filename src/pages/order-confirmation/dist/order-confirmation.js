"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrderConfirmationPage = void 0;
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var OrderConfirmationPage = /** @class */ (function () {
    function OrderConfirmationPage(navCtrl, navParams, cartService, clienteService, pedidoService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cartService = cartService;
        this.clienteService = clienteService;
        this.pedidoService = pedidoService;
        this.pedido = this.navParams.get('pedido');
    }
    OrderConfirmationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.cartItems = this.cartService.getCart().items;
        this.clienteService.findById(this.pedido.cliente.id)
            .subscribe(function (response) {
            _this.cliente = response;
            _this.endereco = _this.findEndereco(_this.pedido.enderecoDeEntrega.id, response['enderecos']);
        }, function (error) {
            _this.navCtrl.setRoot('HomePage');
        });
    };
    OrderConfirmationPage.prototype.findEndereco = function (id, list) {
        var position = list.findIndex(function (x) { return x.id == id; });
        return list[position];
    };
    OrderConfirmationPage.prototype.total = function () {
        return this.cartService.total();
    };
    OrderConfirmationPage.prototype.back = function () {
        this.navCtrl.setRoot('CartPage');
    };
    OrderConfirmationPage.prototype.checkout = function () {
        var _this = this;
        this.pedidoService.insert(this.pedido)
            .subscribe(function (response) {
            _this.cartService.createOrClearCart();
            console.log(response.headers.get('location'));
        }, function (error) {
            if (error.status == 403) {
                _this.navCtrl.setRoot('HomePage');
            }
        });
    };
    OrderConfirmationPage = __decorate([
        ionic_angular_1.IonicPage(),
        core_1.Component({
            selector: 'page-order-confirmation',
            templateUrl: 'order-confirmation.html'
        })
    ], OrderConfirmationPage);
    return OrderConfirmationPage;
}());
exports.OrderConfirmationPage = OrderConfirmationPage;
