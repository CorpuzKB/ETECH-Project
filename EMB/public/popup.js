document.querySelector(".hopen-popup").addEventListener("click", function(){
    document.querySelector(".main").style.filter = 'blur(5px)';
    setTimeout(()=> {
        document.querySelector(".hpopup").style.display = "block";
    }
      ,300);
});

document.querySelector(".hpopup .hclose-btn").addEventListener("click",function(){
    document.querySelector(".main").style.filter = '';
    setTimeout(()=> {
        document.querySelector(".hpopup").style.display = "none";
    }
      ,300);
});

document.querySelector(".topen-popup").addEventListener("click", function(){
    document.querySelector(".main").style.filter = 'blur(5px)';
    setTimeout(()=> {
        document.querySelector(".tpopup").style.display = "block";
    }
      ,300);
});

document.querySelector(".tpopup .tclose-btn").addEventListener("click",function(){
    setTimeout(()=> {
        document.querySelector(".tpopup").style.display = "none";
    }
      ,300);
    document.querySelector(".main").style.filter = '';
});

document.querySelector(".wopen-popup").addEventListener("click", function(){
    document.querySelector(".main").style.filter = 'blur(5px)';
    setTimeout(()=> {
        document.querySelector(".wpopup").style.display = "block";
    }
      ,300);
});

document.querySelector(".wpopup .wclose-btn").addEventListener("click",function(){
    setTimeout(()=> {
        document.querySelector(".wpopup").style.display = "none";
    }
      ,300);
    document.querySelector(".main").style.filter = '';
});