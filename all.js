let reset = document.querySelector("#reset");
let play_loc = document.querySelectorAll(".play_loc");
let play_loc_all = document.querySelectorAll(".play_loc,.play_loc_none");
let true_loc = document.querySelectorAll(".true_loc");

alert("將貓貓拼好吧!");
/* 重置按紐 */
function change(){
    let num = [];
    for(let i=0;i<8;i++){
        let index = Math.floor((Math.random()*8)+1);
        if(num.indexOf(index)!=-1){
            i--;
        }else{
            num.push(index);
        }
    }
    play_loc.forEach((x,i)=>{
        x.style.backgroundImage=`url('./images/${num[i]}.jpg')`;
        x.innerText = num[i];
    });
}
change()
reset.addEventListener("click",change);
/* 陣列排位置 */
let local = [[0,0],[0,200],[0,400],[200,0],[200,200],[200,400],[400,0],[400,200],[400,400]];
function run(){
    true_loc.forEach((v,i)=>{
        v.style.top=local[i][0]+"px";
        v.style.left=local[i][1]+"px";
    })
}
run();
/* 位置更換 */
let cango = [[1,3],[0,2,4],[1,5],[0,4,6],[1,3,5,7],[2,4,8],[3,7],[4,6,8],[5,7]];
let cal = [];
let checksum = [];
let i = 0;
let left=[];
let right=[];
play_loc_all.forEach(v=>{
    v.addEventListener("click",e=>{
        let first_ch = e.target.parentElement.getAttribute("data-loc");
        let first_check = e.target.parentElement.getAttribute("data-check");
        let body_ch = e.target;
        body_ch.classList.add("active");
        cal.push(first_ch);
        checksum.push(first_check);
        i++;
        if(cal.length == 2){
            i = 0;
            check(cal[0],cal[1],checksum[0],checksum[1])
            cal=[];
            checksum=[];
            play_loc_all.forEach(v=>{
                v.classList.remove("active");
            });
        }
        play_loc.forEach((v,i)=>{
            left.push(v.innerText)
            right.push(parseInt(true_loc[i].getAttribute("data-loc"))+1)
        });
        if(left.join("")!=right.join("")){
            left=[];
            right=[];
        }else{
            play_loc.forEach(v=>{
                v.classList.add("active");
            })
            setTimeout(()=>{
                alert("恭喜貓咪");
                play_loc.forEach(v=>{
                    v.classList.remove("active");
                });
                change();
            },500);
        }
    });
});
/* 判斷是否可移動 */
function check(first,second,checksumf,checksums){
    if(cango[first].indexOf(parseInt(second))==-1){
        alert("不能偷吃步!");
    }else if(checksums!=8){
        alert("無法移動");
    }else{
        true_loc[checksums].setAttribute("data-loc",first);
        true_loc[checksumf].setAttribute("data-loc",second);
        [local[checksumf],local[checksums]] = [local[checksums],local[checksumf]];
        run();
    }
}