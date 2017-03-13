import React from 'react';
import ReactDOM from 'react-dom';
import RosterForm,{RosterEdit} from './components/RosterView';
import AttendanceForm from './components/AttendanceForm';
import * as a from './static/js/functions';


describe('selectUIDtest',()=>{
    it('should be jyuen2013'+a.selectUID("Jonathan Yuen - Fall 2013"),()=>{
        console.log(a.selectUID("Jonathan Yuen - Fall 2013"));
    });
    it('should be rdlmata2013'+ a.selectUID("Ryan de La mata - Winter 2013"),()=>{
        console.log(a.selectUID("Ryan de La mata - Winter 2013"));

    });

});
describe('push to database',()=>{
    let j ={};
    let d={};
    j['agaytan2016']={"s2017":['ICS 51', 'ICS 45C','Film and Media 85C','STATS 67']};
    d['jyuen2013']={"s2017":['I&C SCI', 'I&C SCI 31','I&C SCI 45C']};

    it('should be true, it is '+a.pushToDB("SClasses",d),()=>{

    });
    it('should be true, it is '+ a.pushToDB("SClasses",j),()=>{

    });

});
describe('fetch from database',()=>{
    let j ={};
    let d={};

    it('should be true, it is ',()=>{
        a.fetchFromDB("Schedule");
    });
    it('should be true, it is ',()=>{
        a.fetchFromDB("users");
    });

});
// it('should have 6 pages',() =>{
//     let s=[["Jonathan Yuen","jyuen2003"],["Brandon Haas","bhaas2013"],["Kevin Shah","kshah2014"],["Paul Pham","ppham2014"],["Calvin Chau","cchau2014"],["Daniel Xu","dxu2014"]];
//     let s2={"jyuen2003":1,"bhaas2013":5,"kshah2014":2,"cchau2014":0,"dxu2014":3,"ppham2014":0};
//     let answer = ['bhaas2013','dxu2014','kshah2014','jyuen2003','cchau2014','ppham2014'];
//
//     let t =[];
//     console.log(a.sortMembers(s,s2));
//     // console.log(currentWeek.length);
//     // return (answer==s);
//
// });