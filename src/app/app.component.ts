import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { IntentPredictService } from './intent-predict.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message: string = "";
  botOutput: string = "";
  userMessage: string = "";
  currentIntent: string = "";
  @ViewChild("chatbox1", { read: ElementRef }) private chatbox1: ElementRef;

  constructor(
    private renderer: Renderer2,
    private intentPred: IntentPredictService
  ) {}
  fontSizePx = 16;

  onSend() {
    if (this.message.trim() == "") {
      this.message = "";
    } else {
      const div1: HTMLDivElement = this.renderer.createElement("div");
      div1.className = "userMessage";
      div1.innerHTML = this.message.trim();
      this.renderer.appendChild(this.chatbox1.nativeElement, div1);     

      //alert("before");
      this.intentPred.getPrediction(this.message).subscribe(data1 => {
        //console.log("RESPONSE >>>>>>>>>>>>> "+ data1.name); 
        this.renderer.appendChild(this.chatbox1.nativeElement, this.renderContent(data1.name));  
      });      
       
      
      this.message = "";
    }
  }

  triggerFunction(event) {
        if(event.key == "Enter"){
          this.onSend();
        }
  }

  renderContent(intent: string): HTMLDivElement{
    const div2: HTMLDivElement = this.renderer.createElement("div");    
    const bttn: HTMLButtonElement = this.renderer.createElement("button");
    //bttn.onclick = this.alerter;
    bttn.innerHTML = "Follow Here";
    bttn.className = "chatButton";
    
    div2.className = "botMessage";  
    var linkReq: boolean = false;
    var response: string ;


    //Business Logic
    if(intent == "General_Greetings"){
      response = "Hello!! How can I help you?"
    }else{
      response = intent;   
      this.currentIntent = intent;   
      bttn.onclick = function () {
         document.getElementById("displayPage").innerHTML = "Activate Card here" ;
      }
      linkReq = true;
    }

    
    div2.innerHTML = response;

    if(linkReq){
      div2.innerHTML += "<br><br>To do the same...<br>";          
      div2.appendChild(bttn);
    }
    return div2;
  }
}
