import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/domain/cart.service';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;

  parcelas: number[] = [1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  formGroup: FormGroup;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cartService: CartService) {

    this.pedido = this.navParams.get('pedido');

    console.log(this.pedido);

    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    });
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.setRoot('OrderConfirmationPage', { pedido: this.pedido });
  }

  total(): number {
    return this.cartService.total();
  }




  valorParcelas(n){
  //   let i = this.parcelas[n]
  // // var n = n
  // //        for (i = 1; i <= 12; i++){
  // //          console.log(i + " Parcelas de "+  (this.total() / i ).toFixed(2)+ "R$")
  // //       }
        return (this.total()/this.parcelas[n - 1]).toFixed(2);
      }


}