import  React, { Component } from  'react';

import  InterestratesService  from  './InterestratesService';
import axios from 'axios';
const API_URL = 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?filter=record_date:eq:';

const  interestratesService  =  new  InterestratesService();

class  InterestratesList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            interestrates: [],
            nextPageURL:  '',
            rateDate: null,
            rateVaule: '',
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        interestratesService.getInterestrates().then(function (result) {
            console.log(result)
            self.setState({ interestrates:  result.data, nextPageURL:  result.nextlink})
        });
    }

    handleDelete(e,pk){
        var  self  =  this;
        interestratesService.deleteInterestrate({pk :  pk}).then(()=>{
            var  newArr  =  self.state.interestrates.filter(function(obj) {
                return  obj.pk  !==  pk;
            });
            self.setState({interestrates:  newArr})
        });
    }

    nextPage(){
        var  self  =  this;
        interestratesService.getInterestratesByURL(this.state.nextPageURL).then((result) => {
            self.setState({ interestrates:  result.data, nextPageURL:  result.nextlink})
        });
    }

    onChangeDate(event) {
        this.setState({rateDate: event.target.value});
        let theDate = new Date(event.target.value)
        let lastDayOfMonth = new Date(theDate.getFullYear(), theDate.getMonth()+1, 0);
        
        let theYear = theDate.getFullYear();
        let theMonth = theDate.getMonth()+1;
        if(theMonth<10)theMonth = "0"+ theMonth;
        let theDay = lastDayOfMonth.getDate();
        console.log(event.target.value)
        console.log(theDay, theMonth, theYear)
        
        let date = theYear + "-" + theMonth + "-" + theDay
        axios.get(API_URL + date).then(response => {
            console.log(response.data);
            if(response.data.data.length>0){
                this.setState({rateVaule: "Interest rate on "+this.state.rateDate +" is "+ response.data.data[0].avg_interest_rate_amt})

                interestratesService.createInterestrate({'rate_date':event.target.value, 'rate_value': response.data.data[0].avg_interest_rate_amt})
            }else {
                this.setState({rateVaule: "There is no interest rate on "+this.state.rateDate +"."})
            }
        });
    }

    render() {

        return (
        <div  className="interestrates--list">
            <div className='main'>
                <input type='date' onChange={event => this.onChangeDate(event)}/>
                <span className="main">{this.state.rateVaule}</span>
            </div>
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Interest value</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.interestrates.map( c  =>
                    <tr  key={c.pk}>
                        <td>{c.pk}  </td>
                        <td>{c.rate_date}</td>
                        <td>{c.rate_value}</td>
                    </tr>
                    )}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
    }
}
export  default  InterestratesList;