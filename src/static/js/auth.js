import {base} from './firebaseRef'

var handler=(error, user)=>{
    if (error){
        alert("Your Login credentials are incorrect. Please Try again");
        console.log("log in error");
    }
}
export function login(Authobject){
    console.log(Authobject["email"]);
    return base.authWithPassword(Authobject,handler );
}

export function logout(){
    return base.unauth()
}