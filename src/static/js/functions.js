/* Created by Jonathan Yuen
*   Yay for helper functions
*/
import {base} from './firebaseRef';
/*parseForm() takes an arrayA and a nested arrayB returns arrayA
* checks if arrayB has the type of element that is being searched for
**/
export var parseForm=(arr,arg)=>{
    console.log("parsing "+ arg[0][0] +" and "+arg[0][1]);
    switch(arg[0][0]){
        case "id":
            //pushes an object value
            arr.push(document.getElementById(arg[0][1]).value);
            break;
        case "classname":
            //pushes an array
            arr.push(document.getElementsByClassName(arg[0][1]));
            break;
        case "tag":
            //pushes an array
            arr.push(document.getElementsByTagName(arg[0][1]));
            break;
        default:
            alert("arg unrecognized");
            break;
    }
    arg= arg.slice(1);
    if(arg.length>0){
        arr=(parseForm(arr,arg));
    }
    return arr;
}

export var getValue=(propertyName)=>{
    return (item)=>{
        return item[propertyName];
    }
}

/**hasValues(val, array)
 * takes an array of Objects and returns an array of the values
 * of the Objects that have values
 */
export var hasValues =(val,arr)=>{
    if (arr[0].value !== ""){
        val.push(arr[0].value);
    }
    var remaining = arr.slice(1,arr.length);
    if (remaining.length >0){
        return hasValues(val,remaining);
    }
    else{
        return val;
    }
}

/*getSelectText(param)
* retrieves text from selector input
* */
export var getSelectText=(id)=>{
    let t = document.getElementById(id);
    if (t!=null && t.selectedIndex!==(null||undefined)){
        return t.options[t.selectedIndex].text;
    }
}
export var getUID=(user)=>{
    let name=user["first"]+ " "+ user["last"];
    name=name.toLowerCase().split(' ');
    let uid ="";
    for (let i =0; i<name.length-1;i++){
        uid+=name[i][0];
    }
    uid+=name[name.length-1];
    uid+=user["year"];
    return uid;
}
export var classMap={
    'COMPSCI':['121','122A','122B','122C'],
    'ECON':['2A','15A','15B','100B','100C','122A','140','115','158','25','17','20A','20B'],
    'BME':[],
    'IN4MATX':['43','101','113','115','121','122','131','132','133','141','143','151','161'],
    'I&C SCI':[],

};
export var classDB = ['COMPSCI 121', 'COMPSCI 122A', 'COMPSCI 122B', 'COMPSCI 122C',
    'ECON 2A', 'ECON 15A', 'ECON 15B', 'ECON 100B', 'ECON 100C', 'ECON 122A', 'ECON 140',
        'ECON 115', 'ECON 158', 'ECON 25','ECON 17', 'ECON 20A','ECON 20B',
    'BioSci 9B',
    'Earth SySci 5',
    'Soc 3A',
    'Math 2A','Math 2B','Math 2C', 'Math 2D', 'Math 4',
    'I&C SCI 46','I&C SCI 45C','I&C SCI 45J','I&C SCI 31', 'I&C SCI 32','I&C SCI 33','I&C SCI 6B',
    'IN4MATX 43','IN4MATX 101','IN4MATX 113','IN4MATX 115','IN4MATX 121','IN4MATX 122','IN4MATX 131',
        'IN4MATX 132', 'IN4MATX 133','IN4MATX 141','IN4MATX 143','IN4MATX 151','IN4MATX 161',
    'STATS 7','STATS 67','STATS 115','STATS 120A','STATS 120B',
    'Music 8',
    'Poli Sci 6B', 'Poli Sci 41A',
    'Education 107',


];
export var toDayte =()=>{
    let k= new Date();
    var day = k.getDate();
    var month = k.getMonth()+1; //January is 0!
    var year = k.getFullYear();
    if(day<10) {
        day='0'+day;
    }
    if(month<10) {
        month='0'+month;
    }
    k = month+'/'+day+'/'+year;
    return k;
}
export var testQuarter=(j)=>{
    let k = new Date();
    if (j>=4 && j<7){
        return "s"+k.getFullYear();
    }
    else if (j>=0&&j<4){
        return "w"+k.getFullYear();
    }
    else{
        return "f"+k.getFullYear();
    }
}
export var getQuarter=()=>{
    let k = new Date();
    let j=k.getMonth()+1;
    if (j>=4 && j<7){
        return "spring"+k.getFullYear();
    }
    else if (j>=0&&j<4){
        return "winter"+k.getFullYear();
    }
    else{
        return "fall"+k.getFullYear();
    }
}
// export parseAlumni=(memberList)=>{
//     let sortMembers={"uid":[],"undergrad":[]};
//     for (let i=0;i<memberList.length;i++){
//         let currentMember=memberList[i];
//         let j = (currentMember["first"]+" "+currentMember["last"]);
//         if (!currentMember["graduated"]){
//             sortMembers["uid"].push(getUID(currentMember));
//             sortMem["undergrad"].push(j);
//         }
//     }
// }

// var addAttributeToDB=()=>{
    //fetch
    // fbase.fetch('users', {
    //     context: this, asArray: true,
    // }).then(data=>
    // {
    //     this.setState({ttemp:data});
    // }).catch(error=>{
    //     console.log("RosterView:constructor: fetch error");
    // });
    //update
    // for (let ll=0;ll<this.state.ttemp.length;ll++) {
    //     console.log(this.state.ttemp[ll].key);
    //     fbase.update(`users/`+this.state.ttemp[ll].key, {
    //         data: {graduated:false},
    //         then(err){
    //             if (!err) {
    //                 console.log("NO ERROR!!");
    //             }
    //             else{
    //                 console.log(err);
    //             }
    //         }
    //     });
    // }
// }
export var merge = (a,c,map)=>{
    let answer =[];
    while(a.length >0 && c.length>0){
        if (map[a[0][1]]>= map[c[0][1]]){
            answer.push(a[0]);
            a=a.slice(1);
        }
        else{
            answer.push(c[0]);
            c=c.slice(1);
        }
    }
    while (a.length>0){
        answer.push(a[0]);
        a=a.slice(1);
    }
    while(c.length>0){
        answer.push(c[0]);
        c=c.slice(1);
    }
    return answer;

};
export var sortMembers = (a,map)=>{
    if (a.length<=1){
        return a;
    }
    let left =[];
    let right =[];
    let middle =Math.floor(a.length/2);
    left = a.slice(0,middle);
    right=a.slice(middle);
    left=sortMembers(left,map);
    right=sortMembers(right,map);
    return merge(left,right,map);
};

export var getClassFormKey=(v)=>{
    console.log(v);
    let k=v.split(' ');
    v="";
    let i =0;
    while(k[i]!=='') {
        v+=k[i]+" ";
        i++;
    }
    return(v.substr(0,v.length-1));
};
export var formDataBase=()=>{
    let arr =[];
    let keys=Object.keys(classMap);
    for(let index=0;index<keys.length;index++){
        let j = classMap[keys[index]];
        j.map((val)=>{
            arr.push(keys[index]+" "+val);
        });
    }
    return arr;
};
export var formValidation=()=>{
    let y = false;
    let u = false;
    let user = getSelectText("selectUser");
    let quarter = getSelectText("inputCQuarter");
    let userID = document.getElementById("inputID").value;
    let year = document.getElementById("inputCYear").value;
    if (year!==""){
        let intYear=parseInt(year,10);
        console.log(intYear);
        if (intYear<=2013|| intYear>=2020){
            y= false;
        }
        else{
            y=true;
        }
    }
    else{
        y= false;
    }
    if (user ===''&& userID===''){
        u=false;
    }
    else if (user !=='' && userID ===''){
        u=true;
    }
    else if (user ==='' && userID !==''){
        u=true;
    }
    else if (user !=='' && userID!==''){
        u=true;
    }
    // alert("u "+ u);
    // alert("y "+ y);
    // alert("quarter "+ quarter!=="");

    return (u && y && quarter !=="");
};
export var selectUID=(name)=>{
    let t="";
    name=name.toLowerCase();
    name=name.split(' ');
    for (let i =0; i<name.length-1;i++){
        if (name[i]==='-'){
            break;
        }
        // console.log("|"+name[i]+'|');
        if (i+1<name.length && name[i+1]!=='-'){
            t+=name[i][0];
        }
        else if (i+1<name.length && name[i+1]==='-'){
            t+=name[i];
        }
    }
    t+=name[name.length-1];
    return t;

};
export var formExtraction=()=>{
    // if (formValidation()){
        let user = getSelectText("selectUser");
        let quarter = getSelectText("inputCQuarter");
        let userID = document.getElementById("inputID").value;
        let year = document.getElementById("inputCYear").value;
        let info={};
        if (userID!==""){
            info["user"]=userID;
        }
        else if (user!==""){
            info["user"]=selectUID(user);
        }
        info['quarter']=quarter.toLowerCase()+year.toLowerCase();
        console.log(info);
        return info;
    // }
    // else{
    //     return null;
    // }
};
export var pushToDB=(endpoint,item)=>{
    // console.log("ClassesForm add "+ this.count);
    let varibable=base.update(endpoint,{
        data:item,
        then(err){
            if (!err){
            }
            else{
                console.log(err);
            }
        }
    });
    return varibable;
};
export var fetchFromDB=(endpoint,context)=>{
    // console.log("ClassesForm add "+ this.count);
    base.fetch(endpoint, {
        context: context,
        asArray: true, then(data){
            let t = context.state.list;
            t.concat(data);
            context.setState({list:t});
           },
        onFailure(err){
            console.log(err);
        }
    });
    return context;
};