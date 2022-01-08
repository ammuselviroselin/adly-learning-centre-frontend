// import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./style.css";
// import {useHistory} from 'react-router-dom'
// import moment from 'moment'
import MaterialTable from "material-table";
import { toast } from "react-toastify";
// import { withThemeCreator } from "@mui/styles";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { fetchCycleList, editCycle, deleteCycle } from "../redux/thunks";
// import querystring from 'querystring'

export const ListCycleComponent = (buttonVisible) => {
  // const [ setState] = useState();
  // const history = useHistory()
  // const [user, setUser, state]= useState();
  // As redux provides freezed object whose value can't be modifed
  // so creating a new deep copy object so that we can paas it to material datatable
  // material data table doesn't works with freezed object
  const { cycleList } = JSON.parse(
    JSON.stringify(useSelector((state) => state.cycleSlice))
  );
  const [cycleData, setCycleData] = useState([]);

  // From redux useSelctor same as the name given in store

  const dispatch = useDispatch(); /// hook provided by the react-redux

  // const history = useHistory()

  /**
   * If you want to wait for retrieving the data from server, you can use async here.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
   */
  const getData = useCallback(async () => {
    dispatch(fetchCycleList()).then((data) => {
      //setCycleData(cycleList.map(ele=>ele))
    }); // it will dispatch and call the api
    /*
    const response = await axios.get(
      "http://localhost:4000/cycleList/"
    );
    const { data } = response;
    // setState(data);
    setUser(data);
    console.log(data); 
    */
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [cycleData, getData]);

  // const handleClick = (cycle) => {
  //   console.log('🚀',cycle)
  //   // option1: pass the cycle Data to /create-cycle route
  //   // you can only use this data inside of your create cycle component

  //   // ADHOC
  //   // format your cycle data here
  //   /**
  //    *
  //    * ⭐️ -> {
  //    *    minDepositAmount: {
  //    *       decimal: 1.23 // what is children key
  //    *    }
  //    *    maxDepositAmount: {
  //    *        decimal: 1.23 // what is children key
  //    *    }
  //    * }
  //    *
  //    * -> formatting! ->
  //    *
  //    * {
  //    *    minDepositAmount: 1.23 // bring the value to parent key
  //    *    maxDepositAmount: 400
  //    * }
  //    */
  //   //console.log("⭐️", history.location.state);
  //   console.log('before formatting',cycle)
  //   cycle = {
  //     finalCapRate: state.cycle.finalCapRate.$number,
  //     startDate: moment.format(cycle.startDate,'mm/dd/yyyy'),
  //     ...cycle
  //   }
  //   console.log('after formatting',cycle)

  //   history.push('/create-cycle', {
  //       cycle:cycle,
  //   })

  // }

  const columns = [
    {
      title: "Cycle Name",
      field: "cycleName",
      render: (rowData) => (
        <a
          href={`/create-cycle?cycleName=${rowData.cycleName}&id=${rowData._id}`}
        >
          {rowData.cycleName}
        </a>
      ),

      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "Status",
      field: "status",

      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "Start Date",
      render: (rowData) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        //return new Date(rowData.startDate).toLocaleDateString(undefined, options)+'   '+new Date(rowData.startDate).toLocaleTimeString()} ,editable: 'never',
        return new Date(rowData.startDate).toLocaleDateString(
          undefined,
          options
        );
      },
      editable: "never",
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "Maturity Date",
      render: (rowData) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        //return new Date(rowData.maturityDate).toLocaleDateString(undefined, options)+'   '+new Date(rowData.maturityDate).toLocaleTimeString()},editable: 'never',
        return new Date(rowData.maturityDate).toLocaleDateString(
          undefined,
          options
        );
      },
      editable: "never",
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "Fund ID",
      field: "internalFundID",
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "CUSIP",
      field: "cusip",
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "FinalCapRate",
      field: "finalCapRate",
      cellStyle: {
        fontSize: "14px",
      },
    },
  ];

  return (
    <>
      <br></br>
      <p className="user">
        <b>Cycle Management List</b>
      </p>
      <div class="user">
        <br />
        <MaterialTable
          title=""
          columns={columns}
          actions={
            [
              /*

                                            {
                                              icon: 'publish',
                                              tooltip: 'publish',
                                              onClick: (event, rowData) => 
                                              new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                  rowData.status = "Published";
                                                  axios.put('http://localhost:4000/cycleList/update/'+rowData._id,rowData)
                                                  .then(res=>{
                                                    if(res.status===200){
                                                    toast.success("Published Cycle Data Successfully!, Cycle Name : " + rowData.cycleName);
                                                    }
                                                  });
                                                  
                                                  resolve();
                                                }, 1000)
                                              })
                                            },{
                                              icon: 'cancel',
                                              tooltip: 'cancel',
                                              onClick: (event, rowData) => 
                                              new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                  rowData.status = "Cancelled";
                                                  axios.put('http://localhost:4000/cycleList/update/'+rowData._id,rowData)
                                                  .then(res=>{
                                                    if(res.status===200){
                                                    toast.success("Cancelled Cycle Data Successfully!, Cycle Name : " + rowData.cycleName);
                                                    }
                                                  });
                                                  
                                                  resolve();
                                                }, 1000)
                                              })
                                            }
                                            */
            ]
          }
          newoptions={
            [
              /*
                                            {
                                              icon: 'cancel',
                                              tooltip: 'cancel',
                                              onClick: (event, rowData) => 
                                              new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                  rowData.status = "Cancelled";
                                                  axios.put('http://localhost:4000/cycleList/update/'+rowData._id,rowData)
                                                  .then(res=>{
                                                    if(res.status===200){
                                                    toast.success("Cancelled Cycle Data Successfully! , Cycle Name : " + rowData.cycleName);
                                                    }
                                                  });
                                                  
                                                  resolve();
                                                }, 1000)
                                              })
                                            }
                                            */
            ]
          }
          options={{
            search: true,
            actionsColumnIndex: -1,
            rowStyle: {
              backgroundColor: "smokeWhite",
            },
            headerStyle: {
              backgroundColor: "#92b0e98a",
              fontSize: "14px",
              fontWeight: "bold",
              color: "white",
            },
          }}
          editable={{
            onRowUpdate: (newData, oldData) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  dispatch(editCycle(newData)).then((data) => {
                    if (data.payload === "OK") {
                      toast.success(
                        "Updated Cycle Data Successfully! , Cycle Name : " +
                          newData.cycleName
                      );
                    }
                    setCycleData(JSON.parse(JSON.stringify([])));
                  });

                  resolve();
                }, 2000);
              });
            },

            onRowDelete: (oldData) => {
              return new Promise((resolve, reject) => {
                return dispatch(deleteCycle(oldData._id)).then((data) => {
                  setCycleData(JSON.parse(JSON.stringify([])));
                  // setDeleteFlag(!deleteFlag);
                  //setData([...cycleList]);
                  resolve();
                });
              });
            },
          }}
          data={cycleList}
        />
      </div>
    </>
  );
};

ListCycleComponent.propTypes = {
  buttonVisible: PropTypes.any,
};
