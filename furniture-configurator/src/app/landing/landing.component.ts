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
          (document as any).querySelector("html").classList.remove("overflowYHidden");
          (document as any).querySelector("body").classList.remove("overflowYHidden");
        },2000)
    },false)
    document.body.addEventListener("mousewheel", (event)=>{
      (document as any).querySelector("#banner").setAttribute("class", "scrolled-banner");
        setTimeout(()=>{
          (document as any).querySelector("#banner").style.display = "none";
          (document as any).querySelector("html").classList.remove("overflowYHidden");
          (document as any).querySelector("body").classList.remove("overflowYHidden");
        },2000)
  });
  }
}
