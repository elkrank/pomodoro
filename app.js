let count_id = 0;

        document.getElementById("add").addEventListener("click", addTodo);
      
       
    
        function addTodo()
        { 
            //variable
            
            let todo_list = document.getElementById("list_todo");
            let todo = document.createElement('li');
            let todo_label=document.createElement('span');
            let todo_check = document.createElement("input");
            let todo_time = document.createElement("span");
            let todo_delete_button = document.createElement("button");
            let tache = document.getElementById('tache').innerHTML.value;
            
            //type

            todo_check.type ="checkbox";

            //value

            todo_label.innerText = document.getElementById("todo").value;
            todo_time.innerText = document.getElementById("nb_pomo").value ;
            todo_delete_button.innerText = "Delete";
            //function
            todo_delete_button.onclick = delete_todo;
            todo_label.onclick = show_todo;
        
            //class
            todo_label.className = "label col-sm-4"
            todo.className ="list-group-item row d-flex justify-content-around ";
            todo_check.className="todo_check col-sm-2";
            todo_time.className="todo_time col-sm-4";
            todo_delete_button.className = "delete_button col-sm-2";

            //appendChild

            todo_list.appendChild(todo);
            todo.appendChild(todo_label);
            todo.appendChild(todo_time);
            todo.appendChild(todo_check);
            todo.appendChild(todo_delete_button);
            //generation id todo

            todo.id= count_id;
            todo_delete_button.id= "delete_"+ count_id;
            count_id ++;
        }

        function delete_todo()
        {
         this.parentNode.parentNode.removeChild(this.parentNode);
        }

       function show_todo()
       {
         
          document.getElementById('tache').innerText = this.innerText  ;
          document.getElementById('duree').innerText=this.nextSibling.innerHTML ;
          if ( this.parentNode.className=="list-group-item row d-flex justify-content-around active"){
            this.parentNode.className="list-group-item row d-flex justify-content-around";
          }
         else{ this.parentNode.className="list-group-item row d-flex justify-content-around active";}
         
         
       }
//
//
//          POMODORO // /// /// ////
//
//
       function get_pomodoro()
       {
          let nb_pomodoro = document.getElementById('duree').innerText;
          return Number(nb_pomodoro);
       }

       function cycle_pomodoro()
       {
         let periode_travail = 1500000; // 25 minute en ms
         let petite_pause = 5000//300000; // 5 minute en ms 
         let longue_pause = 5000//1200000;// 20 minute en ms
         let nb_pomodoro = Number(document.getElementById('duree').innerText);
         let cycle_complet = [ periode_travail,petite_pause,periode_travail,petite_pause,periode_travail,petite_pause,periode_travail,longue_pause ];
         let cycle_Temp = [];
         let cycle_final =[];

         //for (let i = 1 ; i = nb_pomodoro; i++ )
         //{
           console.log(nb_pomodoro);
           if(nb_pomodoro % 4 == 0 )
           {
              let nb_cycle_complet = nb_pomodoro / 4;
                for (let y = 1; y <= nb_cycle_complet; y++ )
                {
                   Array.prototype.push.apply(cycle_Temp, cycle_complet);
                  console.log(y);
                }
           }
           if(nb_pomodoro % 4 != 0)
           {
             if (nb_pomodoro <= 4)
             {
               for(let ii = 1; ii <= nb_pomodoro; ii++)
               {
                 console.log('ii : '+ii);
                 cycle_Temp.push(periode_travail,petite_pause);
               }
             }
             if(nb_pomodoro > 4 )
             {
               for (let yy = 1; yy <= nb_pomodoro; yy++)
               {
                 console.log('yy : '+yy);
                 if(yy % 4 == 0)
                 {
                    cycle_Temp.push(periode_travail,longue_pause);
                 }
                 else
                 {
                   cycle_Temp.push(periode_travail,petite_pause);
                 }
               }
             } 
           }
         console.log({cycle_Temp});
         return cycle_Temp
       }
       
function chrono()
  {
  
   
    let array_cycle_pomodoro = cycle_pomodoro();
    let i = 0;
    

  function traitement_chrono(i)
    {
     
      let temps_retirer = 0;
      let temps_total  = array_cycle_pomodoro[i]/1000;
      let temps_restant = temps_total - temps_retirer;
    
     let sauvegarde_pause=0;
     ///////////////////////////////////////////////////gestion de la pause//////////////////////////
     let button_pause= document.getElementById('pause');
     button_pause.addEventListener('click',function(){
      let sauvegarde_temps_restant = temps_restant*1000;
      let sg_pause = true;
      if(button_pause.innerHTML == 'Stop')
      {
       
        
        array_cycle_pomodoro.splice([i],1,sauvegarde_temps_restant);
        console.log(array_cycle_pomodoro.splice([i],1,sauvegarde_temps_restant));
        clearInterval(mytimer);
        console.log('array pause : '+array_cycle_pomodoro);
        console.log('sauvergarde pause : '+sauvegarde_temps_restant);
        button_pause.innerHTML= 'Reprendre';
      }
      else if (button_pause.innerHTML=='Reprendre')
      {
        
        console.log('array reprendre : '+array_cycle_pomodoro);
        button_pause.innerHTML='Stop';
        console.log('sauvegarde reprendre:  '+sauvegarde_temps_restant);
        console.log(traitement_chrono(i));
       traitement_chrono(i);
      }
   });
    
   ////////////////////////////////////////////////////////////////////////////
      let mytimer = setInterval(()=>
      {
        
        if(i<array_cycle_pomodoro.length)
            {          
              console.log(i);
              temps_restant = temps_total - temps_retirer
              console.log('temps restant=>' + temps_restant +'type'+typeof(temps_restant));
              document.getElementById('temps').innerText = en_minute(temps_restant);
              temps_retirer++ ;
           
            }
            
            
        if(temps_restant == 0)
          {
              console.log('NOUVELLE SEQUENCE');
              clearInterval(mytimer) ;
              i++;
              traitement_chrono(i);
              console.log(i);
             
              }
              
      },1000); 
      
    }
    
    
  traitement_chrono(i);
  console.log(traitement_chrono(i));
 
 
  }
    


function en_minute(sec){
  let minute ;
  if(sec>=60)
  {
    minute = Math.floor(sec/60) +'minute'+sec%60 ;
  }
  else
  {
    minute = sec%60;
  }
   return minute;
}




       
