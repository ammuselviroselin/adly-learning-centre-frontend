import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./style.css";
// import {useHistory} from 'react-router-dom'
// import moment from 'moment'
import MaterialTable from 'material-table'
// import { toast } from 'react-toastify';
// import { withThemeCreator } from "@mui/styles";

export const ListCycleComponentForIndicativeCapRate = (buttonVisible) => {
  // const [ setState] = useState();
  // const history = useHistory()
  const [user, setUser]= useState();
  /**
   * If you want to wait for retrieving the data from server, you can use async here.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
   */
  const getData = useCallback(async () => {
    
    const response = await axios.get(
      "http://localhost:4000/cycleList/"
    );
    const { data } = response;
    // setState(data);
    setUser(data);
    console.log(data); 
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    { title: "Cycle Name", field: "cycleName" ,
      render: rowData => <a href={'/create-cycle?' + rowData.cycleName}>{rowData.cycleName}</a>,  
      cellStyle : {
        fontSize : '14px',
      }, 
    },
    { title: "Status", field: "status",
    
    cellStyle : {
      fontSize : '14px'
    } 
  },
    { title: "Start Date", render: rowData=>{ const options = { year: "numeric", month: "long", day: "numeric" }
    //return new Date(rowData.startDate).toLocaleDateString(undefined, options)+'   '+new Date(rowData.startDate).toLocaleTimeString()} ,editable: 'never',
    return new Date(rowData.startDate).toLocaleDateString(undefined, options)} ,editable: 'never',
    cellStyle : {
      fontSize : '14px'
    }
   },
   { title: "Maturity Date", render: rowData=>{ const options = { year: "numeric", month: "long", day: "numeric" }
   //return new Date(rowData.maturityDate).toLocaleDateString(undefined, options)+'   '+new Date(rowData.maturityDate).toLocaleTimeString()},editable: 'never',
   return new Date(rowData.maturityDate).toLocaleDateString(undefined, options)},editable: 'never',
   cellStyle : {
     fontSize : '14px'
   }
  },
  { title: "Fund ID", field: "internalFundID",
  cellStyle : {
    fontSize : '14px'
  }
 },
  { title: "CUSIP", field: "cusip",
  cellStyle : {
    fontSize : '14px'
  }
 },
 { title: "FinalCapRate", field: "finalCapRate",
   cellStyle : {
     fontSize : '14px'
   }
  },
]
  
  return (
    <>
        <div class="user">  
        <br/> 
                  <MaterialTable
                                          title=""
                                          columns={columns}
                                          options={
                                            {
                                              search:false,
                                              selection: true,
                                              actionsColumnIndex: -1,
                                              showTitle: false,
                                              toolbar:false,
                                             rowStyle:{
                                                backgroundColor:'smokeWhite'

                                             },
                                             headerStyle:{
                                              backgroundColor:'#92b0e98a',
                                              fontSize:'14px',
                                              fontWeight:"bold",
                                              color : 'white'
                                             }
                                            }
                                          }
                                          data={ user  }
                                        />
        </div>
        </>
  );
};
