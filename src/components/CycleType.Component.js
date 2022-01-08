import {React} from "react";
import "./style.css";
import "../App.css";
import Tabs from '../UIControls/Tabs';
import { CreateCycleTypeForm } from './CreateCycleTypeForm'
import { CycleTypeListDataTable } from './CycleTypeListDataTable.Component'

export const CycleType = (buttonVisible) => {
  return (
    <div>
      <Tabs> 
       <button label="CycleType List" onClick={()=>alert('ch')}> 

          <p className="user" ><b> CycleType List </b></p>
          <CycleTypeListDataTable search={'true'} ></CycleTypeListDataTable>
       </button> 
        <div label="Edit Cycle Type"  > 
          <p className="user"><b> Edit Cycle Type </b></p>
          <CreateCycleTypeForm></CreateCycleTypeForm>
          <CycleTypeListDataTable search={'false'}  ></CycleTypeListDataTable>
          {/* <CycleTypeEditListDatable></CycleTypeEditListDatable> */}
       </div> 
       <div label="Create Cycle Type"> 
          <p className="user"><b> Create Cycle Type </b></p>
        <CreateCycleTypeForm buttonVisible="true"></CreateCycleTypeForm>
        {/* <ListItemProductDataTableForCycleType></ListItemProductDataTableForCycleType> */}
       </div> 
     
     </Tabs> 
    </div>
  );
};

