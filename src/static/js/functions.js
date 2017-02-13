export var parseForm=(arr,arg)=>{
    alert(arg[0][0],arg[0][1]);
    switch(arg[0][0]){

        case "id":
            arr.push(document.getElementById(arg[0][1]).value);
            break;
        case "classname":
            arr.push(document.getElementsByClassName(arg[0][1]));
            break;
        case "tag":
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
export var getSelectText=(id)=>{
    let t = document.getElementById(id);
    if (t!=null){
        return t.options[t.selectedIndex].text;
    }
}