/* Created by Jonathan Yuen
*
*   Yay for helper functions
*/

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
    var remaining= arg.slice(1,arg.length);
    if(remaining.length>0){
        return parseForm(arr,remaining);
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
    if (t!=null){
        return t.options[t.selectedIndex].text;
    }
}
export var getUID=(user)=>{
    let uid="";
    user=user.toLowerCase().split(' ');
    uid+=user[0][0];
    uid+=user[1];
    uid+=user[4];
    return uid;
}
export var classDB = ['Comp Sci 121', 'Comp Sci 122A', 'Comp Sci 122B', 'Comp Sci 122C',
    'Econ 2A',
    'Math 2A','Math 2B','Math 2C', 'Math 2D',
    'ICS 46','ICS 45C','ICS 45J','ICS 31', 'ICS 32','ICS 33',
    'Informatics 43','Informatics 101','Informatics 113','Informatics 115','Informatics 121','Informatics 122','Informatics 131',
        'Informatics 132', 'Informatics 133','Informatics 141','Informatics 143','Informatics 151','Informatics 161',
    'Stats 7','Stats 67','Stats 115','Stats 120A','Stats 120B',
    ''

];