import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { UserList } from './UserList'
import "./CreateCycle.css";
import { ViewIndicativeCapRateHistoryComponentDataTable } from "./IndicativeCapRateHistoryDatatableView.Component";
import { ViewCycleStatusComponentDataTable } from "./CycleStatusDatatableView.Component"
import { CreateIndicativeCapRateHistory } from "./IndicativeCapRateHistory.Component"
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import "./style.css";
import Select from 'react-dropdown-select'
import PropTypes from 'prop-types';

import {useDispatch,useSelector} from "react-redux";
import {createCycle} from "../redux/thunks"

function CreateCycle() {
  // catch the state data from history location
  // const history = useHistory();
  /**
   * If you want to wait for retrieving the data from server, you can use async here.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
   */
  // const getData = useCallback(async () => {
  //   const response = await axios.get(
  //     //"https://jsonplaceholder.typicode.com/users"
  //     "http://localhost:4000/users/"
  //   );

  // const { data } = response;
  //   setState(data);
  // }, []);
  
  // const handleChange = (event) => {
  //   // it makes you to handle your state in the parent component.
  //   // in the MacOS ctrl + cmd + space
  //   console.log("🔥", event.target.value);
  //   //setSelectValue(event.target.value);
  //   const key = event.target.name;
  //   setState({
  //     ...state,
  //     [key]: event.target.value
  //   });
  // };

  return (
    <div align="center">
      <div>
        <CreateCycleManagementForm></CreateCycleManagementForm>
      </div>
      <br></br>
      {/*<div  style={{marginTop:'10px',marginLeft:'5px'}}>
        <label for="userDetails">
          <b>User Details : &nbsp;</b>
        </label>
        <ListUserComponent
          data={state}
          value={ourSelectValue}
          onChange={handleChange}
  /> */}
         
     {/*}   <div>
      <Link to='/list-cycle-status-log'>Cycle Log Details </Link>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to='/users-details'>List of Users</Link>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>*/}
       {/* </div> */}
    </div>
  );
}

export default CreateCycle;

function CreateCycleManagementForm(props) {
  // This is used for dispatching the action like an api call
 
  const {cycleType}=useSelector(state=>state.selectedcycletype); 
  const {productType}=useSelector(state=>state.selectproductType); 
  const dispatch=useDispatch();
  const [selectedCycle, setSelectedCycle] = useState('');
  const [SelectProductType, setSelectProductType] = useState('');
  const [Cycledata, setCycledata] = useState([]);
  const [ProductData, setProductData] = useState([]);
  const {cycleList}=useSelector(state=>state.cycleSlice);  // From redux useSelctor same as the name given in store

  // if you have a initialData use this one,
  //  const [initaildata, setInitaildata] = useState({});
const defaultData = {
  productTypes: cycleType,
  availableCycleTypes: productType,
  finalCapRate: 1,
  status: "PrePublished",
  statusDate: "",
  internalFundID: 1,
  cycleName:"",
  cusip: "",
  marketingName: "",
  startDate: moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a"),
  maturityDate: moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a"),
};
console.log('defalut'+defaultData.availableCycleTypes,defaultData.productTypes)
const [state, setState] = useState(defaultData);
console.log(cycleList);
// console.log('cycel'+selectedCycle,'product'+SelectProductType)
  useEffect(() => {
   const queryParams = new URLSearchParams(window.location.search);
   const _id = queryParams.get('id');
   const cycleName = queryParams.get('cycleName');
   console.log(cycleName,_id);
   if(_id){
     axios.get('http://localhost:4000/cycleList/getsinglecycle/'+_id).then((response) => {
         console.log( response.data);
         setState(response.data);
         setSelectedCycle(response.data.availableCycleTypes);
         setSelectProductType(response.data.productTypes);
     }).catch((error) => {console.log(error)});
   }
}, [SelectProductType]);
  // otherwise, use the default data
  // object shcema should be same, they have to have same keys.
  const getProductData = useCallback(async() => {
    const res = await axios.get("http://localhost:4000/product/")
    const data = res.data
    setProductData(data);
  }, []);

  const getCycleTypes = useCallback(async() => {    
    const res = await axios.get("http://localhost:4000/availableCycleTypes/")
    console.log(  res.data);
    setCycledata( res.data);
  }, []);

  useEffect(() => {
    getProductData();
    console.log("🔥", getProductData());
    getCycleTypes();
    console.log("🔥🔥", getCycleTypes());
  }, [getProductData, getCycleTypes]);

  const butttonState = {
    button: 1
  };
  // ... -> Spread Operator.
  // copy the Object
  // const [state, setState] = useState(
  //   initaildata ? { ...defaultData, ...initaildata } : defaultData
  // );
 
//get cycle type functions to get dynamic options value
  const SelectCycletype=()=>{
    const  options = () =>
    Cycledata.map(user => ({
      label: user.Description,
      value: user.Description
    }));

    return <Select 
   
    placeholder={selectedCycle==='' ?"Select Cycle Type":selectedCycle}
      value={selectedCycle}
       onChange={(value)=>{
      setSelectedCycle(value[0].value)
      dispatch({ type: 'setcycletype', payload: value[0].value})
    }}
     options={options()} />

  }

  const SelectedProdductType=()=>{
  const  options = () =>
  ProductData.map(user => ({
    label: user.Product,
    value: user.Product
  }));

  return <Select 
    placeholder={SelectProductType==='' ?"Select Product Type":SelectProductType} 
     value={SelectProductType}
      onChange={(value)=>{
        setSelectProductType(value[0].value)
        dispatch({ type: 'productType', payload: value[0].value})
      }}
       options={options()} />
  }
  
/*const   handleChangeProduct=(event)=>{
  setState({...state,availableCycleTypes:event.value});
}
const handleChangeCycleTypes = (event) => {
   
  setState({...state,cycleTypes:event.value});
  console.log('Selected value '+event.target.value);

  //const key = event.target.name;
/*
  setState({
    ...state,
    [key]: event.target.value,
  });
  */
/*};*/

const handleTextFieldChange=(event )=>{
  setState({...state,[event.target.name]:event.target.value})

}

const userDetails = () => {
    <div><UserList></UserList></div>;
};

const IndicativeCapRateHistoryDetails = () => {
    return (
      
          <div>
            <CreateIndicativeCapRateHistory></CreateIndicativeCapRateHistory>
          </div>
    );
};

const handleSubmit = (event) => {
    console.log(state.productTypes)
    // we have to submit all the values
    //onSubmit(state)
    if (butttonState.button === 1)
    { //back button
      <userDetails></userDetails>

    } else if (butttonState.button === 3)
    {
      event.preventDefault();
    } else if (butttonState.button === 4)
    {
      event.preventDefault();
      <IndicativeCapRateHistoryDetails></IndicativeCapRateHistoryDetails>
    }  
    else {
      event.preventDefault();  
     
      alert(
        `Start Date = ${state.startDate} Maturity Date = ${state.maturityDate} Final Cap Rate = ${state.finalCapRate} Product = ${productType} AvailableCycle Types = ${cycleType} Status = ${state.status}`
      );
      const cycleObject = {
      productTypes:productType,
      availableCycleTypes:cycleType,
      startDate: state.startDate,
      maturityDate: state.maturityDate,
      finalCapRate: state.finalCapRate,
      status: state.status,
      statusDate: state.statusDate,
      internalFundID: state.internalFundID,
      cusip: state.cusip,
      cycleName: state.cycleName,
    };
    console.log(cycleObject);
  // calling dispatch and dispatching the createCycle action
  dispatch(createCycle(cycleObject)).then(data=>{

  setState({
    productTypes: 1,
    availableCycleTypes: 1,
    finalCapRate: 1,
    cycleName:"",
    status: "PrePublished",
    statusDate: "",
    internalFundID: 1,
    cusip: "",
    startDate: moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a"),
    maturityDate: moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a"),
  });
  alert("Created SuccessFully")
  })
 }
};

  return (
    <div className="container"  style={{marginTop:'10px'}}>
      <form onSubmit={handleSubmit}>
        {/*<style>
          a:link {color:green; background-color:transparent; text-decoration:none}
          a:visited {color:pink; background-color:transparent; text-decoration:none}
          a:hover {color:red; background-color:transparent; text-decoration:underline}
          a:active {color:yellow; background-color:transparent; text-decoration:underline}
      </style>*/}
      <div>
          <br></br>
            <button
              type="submit"
              className="btn btn-success btn-block"
              style={{
                backgroundColor: "#194ba88a",
                border: "1px solid black",
                borderRadius: "10px",
                fontSize: "14px",
                width: "90px",
                height: "30px",
                color: "white",
              }}
              name="äddCycle"
              value="äddCycle1"
              onClick={event =>  window.location.href='/create-cycle'}>
              + Cycle
            </button>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-success btn-block"
              style={{
                backgroundColor: "#194ba88a",
                border: "1px solid black",
                borderRadius: "10px",
                fontSize: "14px",
                width: "120px",
                height: "30px",
                color: "white",
                icon: 'cancel',
              }}
              name="äddIndicativeCapRate"
              value="äddIndicativeCapRate1"
              onClick={event =>  window.location.href='/create-indicativeCapHistory-cycle'}>
              + Indicative Cap Rate
            </button>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="btn btn-success btn-block"
              style={{
                backgroundColor: "#194ba88a",
                border: "1px solid black",
                borderRadius: "10px",
                fontSize: "14px",
                width: "80px",
                height: "30px",
                color: "white",
              }}
              name="save"
              value="save1"
              onClick={() => (butttonState.button = 2)}
            >
              Update
            </button>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="btn btn-success btn-block"
              style={{
                backgroundColor: "#194ba88a",
                border: "1px solid black",
                borderRadius: "10px",
                fontSize: "14px",
                width: "80px",
                height: "30px",
                color: "white",
              }}
              name="reset"
              value="reset1"
              onClick={event =>  window.location.href='/create-cycle'}
            >
              Clear
            </button>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type ="submit"
              className="btn btn-success btn-block"
              style={{
                backgroundColor: "#194ba88a",
                border: "1px solid black",
                borderRadius: "10px",
                fontSize: "14px",
                width: "80px",
                height: "30px",
                color: "white",
              }}
              name="back"
              value="back1"
              onClick={event =>  window.location.href='/available-cycle-types'}>
            Back
            </button>
          <br></br>
        </div>
        <br></br>
        <div className="user">
            <table border="0" width="100%" >
              <tr>
               <td width="20%"></td>
                <td width="20%">
                <label for="availableCycleType">
                Cycle Types : &nbsp;  
                </label>
                {/* <Select options={optionsCycleTypes}
                 onChange={handleChange}/> */}
                 <br/>
                <SelectCycletype/>
                </td>
                <td width="40%">
                <label for="productCycleType">
                 Product : &nbsp;
                </label>  
                <SelectedProdductType/>
               
                </td>
                <td width="40%"></td>
              </tr>
             </table> 
        </div>
        <br></br>
        <div className={"flex-fill"}> <b>Cycle Attributes</b></div>
         <div className={"user flex-fill"} align="center">
            <label> &nbsp;&nbsp;&nbsp;  Cycle Name : &nbsp; </label>
            <input
              type="text"
              name="cycleName"
              value={state.cycleName}
              onChange={handleTextFieldChange}
              size ="70"
            />
          </div>
        <br></br>        
        <div className={"user flex-fill"}>
          <div>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Date:&nbsp;</label>
            <input
              type="date"
              name="startDate"
              value={moment(state.startDate).format("YYYY-MM-DD")}
              onChange={handleTextFieldChange}
              size ="15"
            />
             <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status : &nbsp;</label>
            <input
              type="text"
              name="status"
              disabled="true"
              value={state.status}
              onChange={handleTextFieldChange}
              size ="15"
            />
           </div>
          </div>
          <br></br>
          <div  className={"user flex-fill"}>
          <div>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;Maturity Date : &nbsp;</label>
            
            <input
              type="date"
              name="maturityDate"
              value={ moment(state.maturityDate).format("YYYY-MM-DD")}
              onChange={handleTextFieldChange}
              size ="15"
            />
           <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fund Id : &nbsp; </label>
            <input
              type="text"
              name="internalFundID"
              value={state.internalFundID}
              onChange={handleTextFieldChange}
              size ="15"
            />
          </div>
          </div>
          <br></br>
            <div className={"user flex-fill"}>
            <div>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Final Cap Rate: &nbsp; </label>
            <input
              type="number"
              name="finalCapRate"
              value={state.finalCapRate}
              onChange={handleTextFieldChange}
              size ="15"
            />
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CUSIP : &nbsp;</label>
            <input
              type="text"
              name="cusip"
              value={state.cusip}
              onChange={handleTextFieldChange}
              size ="15"
            />
          </div>
          </div>
        <br></br>
        <div>
        <table width = "75%">
          <tr>
            <td width= "40%">  
            <div align="center">
            <b> Indicative Cap Rate History </b>
            <ViewIndicativeCapRateHistoryComponentDataTable></ViewIndicativeCapRateHistoryComponentDataTable>
            </div>
          </td>
          <td width="3%"> </td>
          <td width="42%">
          <div align="center">
          <b>Cycle Status </b>
          <ViewCycleStatusComponentDataTable></ViewCycleStatusComponentDataTable>
          </div>
          </td>
           </tr>
          </table>
          {/*<ListIndicativeCapRateHistoryComponent buttonVisible="false"></ListIndicativeCapRateHistoryComponent>*/}
         {/* <div>
            <CycleListDatatableComponent></CycleListDatatableComponent>
            <CycleStatusList buttonVisible="false"> </CycleStatusList>
         </div>*/}
      </div> 
      </form>
    </div>
  );
}
CreateCycleManagementForm.propTypes={
  initialData:PropTypes.any
}