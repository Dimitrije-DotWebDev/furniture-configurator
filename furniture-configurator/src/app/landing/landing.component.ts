import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit{
  
  ngOnInit(){
    (document as any).querySelector(".swipe-icon").addEventListener("click", ()=>{
        (document as any).querySelector("#banner").setAttribute("class", "scrolled-banner");
        setTimeout(()=>{
          (document as any).querySelector("#banner").style.display = "none";
        },2000)
    },false)
  }
}
