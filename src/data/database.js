import firebase from 'firebase';

const members={'Name':'Jon,Max,Gary'};
var memInfo= {'Gary':{},'Jon':{},'Max':{} };
var classKey={'Writing 30': ['Writing','30'],
    'Informatics 43':['Informatics', '43'],
    'ICS 45C':['ICS', '45C'],
    'ICS 5': ['ICS','5'],
    'Film 85A':['Film','85A'],
    'Econ 20B':['Econ','20B'],
    'ICS 31':['ICS','31'],
    'Math 2A':['Math', '2A'],
    'ICS 45J':['ICS', '45J']
}
var mf16={
    'quarter':'fall',
    'year':'2016',
    'classes': ['Writing 30','Informatics 43','ICS 45C']
};
var gf16={
    'quarter':'fall',
    'year':'2016',
    'classes': ['CS 161','Informatics 122','ICS 45C','Math 2A']
};
var jf16={
    'quarter':'fall',
    'year':'2016',
    'classes': ['CS 161','Informatics 43','Econ 20B']
};
var temps={"mf16":mf16,"gf16":gf16,"jf16":jf16};
var maxwinter2016={}
var garyfall2014={}
var jonfall2013={}
var table=[];
/*eslint no-unused-vars: "off"*/
var config ={apikey: "AIzaSyDbA2-3W4c4a1Fdl9QPG_KHMJGIRSn_ORU",
    authDomain:"classexaminer.firebaseapp.com",
    databaseURL:"https://classexaminer.firebaseio.com",
    storageBucket:"classexaminer.appspot.com",
};
firebase.initializeApp(config);

    /*
    * componentWillMount(){
     this.firebaseRef = new Firebase("https://ReactFireTodoApp.firebaseio.com/items/");
     this.firebaseRef.on("child_added", function(dataSnapshot) {
     this.items.push(dataSnapshot.val());
     this.setState({
     items: this.items
     });
     }.bind(this));
     },
     componentWillUnmount() {
     this.firebaseRef.off();
     },
    *
    *
    *
    * */