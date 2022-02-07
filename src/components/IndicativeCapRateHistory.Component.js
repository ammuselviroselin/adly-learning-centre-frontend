// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
import "../App.css";
// import {useHistory} from 'react-router-dom'
// import { ProductList, CycleTypes } from '../UIControls/index'
import {IndicativeCapRateHistoryForm} from './IndicativeCapRateHistoryForm'
import {ListCycleComponentForIndicativeCapRate} from './CycleListForIndicativeCapRate.Component'
import { ListIndicativeCapRateHistoryComponentDataTable } from "./IndicativeCapRateHistoryListDataTable.Component"

import Tabs from '../UIControls/Tabs';

export const CreateIndicativeCapRateHistory = () => {

 
  return (
     <div>
      <Tabs style={{
                      color: "black",
                      backgroundColor: '#white',
                    }}> 

      <div label="List Indicative Cap Rate"> 
          <p className="user"><b> List Indicative Cap Rate </b></p>
        <ListIndicativeCapRateHistoryComponentDataTable search={'true'}></ListIndicativeCapRateHistoryComponentDataTable>
       </div>               
   
       <div label="Edit Indicative Cap Rate"> 
          <br></br> <br></br> <br></br>
          <IndicativeCapRateHistoryForm buttonVisible="true"></IndicativeCapRateHistoryForm>
          <p className="user"><b> Edit Indicative Cap Rate </b></p>

          <ListIndicativeCapRateHistoryComponentDataTable search={'false'}></ListIndicativeCapRateHistoryComponentDataTable>
       </div> 

      <div label="Create Indicative CapRate"> 
      <p className="user"><b> Create Indicative Cap Rate History </b></p>
       <IndicativeCapRateHistoryForm buttonVisible="true"></IndicativeCapRateHistoryForm>
        <p className="user"><b> Cycle Data</b></p>
        <ListCycleComponentForIndicativeCapRate></ListCycleComponentForIndicativeCapRate>
       </div>             
       </Tabs>
      </div>
  );
};

export const ListItemIndicativeCapRateHistory = ({ indicativeCapRateHistory, onClick }) => {
    // pass onClick callback into your button element
    return (
    <div className={"d-flex flex-row list-item"}>
        <div className={"user flex-fill"}>{indicativeCapRateHistory.effectiveDate}</div>
        <div className={"user flex-fill"}>{indicativeCapRateHistory.indicativeCapRate}</div>
   </div> 
  );
};
  

