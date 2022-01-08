import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./style.css";
import MaterialTable from 'material-table'
// import { toast } from 'react-toastify';
// import { withWidth } from "@material-ui/core";

export const ViewIndicativeCapRateHistoryComponentDataTable = (buttonVisible) => {
  const [, setState] = useState();
  const [user, setUser]= useState();
  /**
   * If you want to wait for retrieving the data from server, you can use async here.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
   */
  const getData = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:4000/indicativeCapRateHistory/"
    );
    const { data } = response;
    setState(data);
    setUser(data);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

 const columns = [

    { title: "Id", field: "cycleID", 
      cellStyle : {
        fontSize : '14px',
        width: '3px',
        maxWidth: '3px',
        whiteSpace: 'nowrap'
      }, 
      headerStyle: {
        width:'3px',
        maxWidth:'3px',
        whiteSpace: 'nowrap'
      }
    },
    { title: "Effective Date", field: "effectiveDate", render: rowData=>{ const options = { year: "numeric", month: "long", day: "numeric" }
    //return new Date(rowData.startDate).toLocaleDateString(undefined, options)+'   '+new Date(rowData.startDate).toLocaleTimeString()} ,editable: 'never',
    return new Date(rowData.effectiveDate).toLocaleDateString(undefined, options)} ,editable: 'never',
    cellStyle : {
      fontSize : '14px',
      width: '30px',
      maxWidth: '30px',
      whiteSpace: 'nowrap'
    },
    headerStyle: {
      width:'30px',
      maxWidth: '30px',
      whiteSpace: 'nowrap'
    }
   },
  { title: "Indicative CapRate", field: "indicativeCapRate",
    cellStyle : {
    fontSize : '14px',
    width:'25px',
    maxWidth: '25px',
    whiteSpace: 'nowrap'
  },
      headerStyle: {
      width:'25px',
      maxWidth: '25px',
      whiteSpace: 'nowrap'
    }
 },
  ]

  return (
    <div class="user">  
    <br/> 
    <MaterialTable
                                          columns={columns}
                                          //maxWidth = "70%"
                                         // width ="70%"
                                          options={
                                            {
                                              search:false,
                                              showTitle: false,
                                              toolbar:false,
                                              actionsColumnIndex: -1,
                                              pageSize:3,
                                              pageSizeOptions:[3,9,9],
                                             rowStyle:{
                                                backgroundColor:'smokeWhite',
                                             },
                                             headerStyle:{
                                              backgroundColor:'#92b0e98a',
                                              fontSize:'14px',
                                              fontWeight:"bold",
                                              color : 'white'
                                             },
                                             tableLayout: "fixed"
                                            }
                                          }
                                          data={ user  }
                                        />
              </div>
   
  );
};