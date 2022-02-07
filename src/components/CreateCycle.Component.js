import { useState, useCallback, useEffect } from "react";
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
import { toast } from "react-toastify";
import {useDispatch,useSelector} from "react-redux";
import {
  createCycle,
  ProductListCycleType,
  CycleTypesDropDownList,
  FetchSingleCycleFromCycleList,
  AvailableCycleTypebyID,
  ProductListCycleTypebyID,
  editCycle
} from "../redux/thunks"

function CreateCycle() {
 

  return (
    <div align="center">
      <div>
        <CreateCycleManagementForm></CreateCycleManagementForm>
      </div>
      <br></br>
   
    </div>
  );
}

export default CreateCycle;

function CreateCycleManagementForm(props) {
  // This is used for dispatching the action like an api call
 
 // const {cycleType}=useSelector(state=>state.selectedcycletype); 
  // const {productType}=useSelector(state=>state.selectproductType); 
  const {setcyclestatus} =useSelector(state=>state.selectedcycletype);
  const [isedit, setIsedit] = useState(false);
  const [ComboCycleId, setComboCycleId] = useState('');
  const [ComboProductId, setComboProductId] = useState('');
  console.log(setcyclestatus);
  const dispatch=useDispatch();
  const [selectedCycle, setSelectedCycle] = useState('');
  const [SelectProductType, setSelectProductType] = useState('');
  const [Cycledata, setCycledata] = useState([]);
  const [ProductData, setProductData] = useState([]);
  const {cycleList}=useSelector(state=>state.cycleSlice);  // From redux useSelctor same as the name given in store
  const [CycleId, setCycleId] = useState('')
  // if you have a initialData use this one,

const defaultData = {
  productTypes: ComboProductId,
  availableCycleTypes: ComboCycleId,
  finalCapRate: 1,
  status: "613f09778c62eb3b9c8079b2",
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
   setCycleId(_id);
   
   const cycleName = queryParams.get('cycleName');
   console.log(cycleName,_id);
   if(_id){
    setIsedit(true);
    dispatch(FetchSingleCycleFromCycleList(_id)).then((res) =>{
           console.log(res);
           setState(res.payload);
          
          // setSelectProductType(res.payload.productTypes);
        //  dispatch({ type: 'cycleidfromcyclelist', payload: res.payload._id })
          dispatch({ type: 'cyclestatusid', payload: res.payload.status });

          dispatch(AvailableCycleTypebyID(res.payload.availableCycleTypes)).then((res)=>{
            console.log(res);
            setSelectedCycle(res.payload.Description);
          });
          dispatch(ProductListCycleTypebyID(res.payload.productTypes)).then((res)=>{
            console.log(res);
            setSelectProductType(res.payload[0].Product);
          });
         
      });
     
   }
   return ()=>{
     dispatch({ type: 'cyclestatusid', payload: '' })
     dispatch({ type: 'navigationtab', payload: 0})
   }
}, [SelectProductType,dispatch]);

  const getProductData = useCallback(async() => {
  
    dispatch(ProductListCycleType()).then((res) =>{
      console.log(res.payload);
      setProductData(res.payload);
      });
  }, [dispatch]);

  const getCycleTypes = useCallback(async() => {    
   
    dispatch(CycleTypesDropDownList()).then((res) =>{
      console.log(res.payload);
      setCycledata(res.payload);
      });
  }, [dispatch]);

  useEffect(() => {
    getProductData();
    getCycleTypes();
       
  }, [getProductData, getCycleTypes]);

  const butttonState = {
    button: 1
  };
 
 
//get cycle type functions to get dynamic options value
  const SelectCycletype=()=>{
    const  options = () =>
    Cycledata.map(user => ({
      label: user.Description,
      value: user.Description,
      id: user._id
    }));

    return <Select 
   
    placeholder={selectedCycle==='' ?"Select Cycle Type":selectedCycle}
      value={selectedCycle}
       onChange={(value)=>{
         console.log(value);
      setSelectedCycle(value[0].value)
      setComboCycleId(value[0].id)
     // dispatch({ type: 'setcycletype', payload: value[0].id})
    }}
     options={options()} />

  }

  const SelectedProdductType=()=>{
  const  options = () =>
  ProductData.map(user => ({
    label: user.Product,
    value: user.Product,
    id: user._id
  }));

  return <Select 
    placeholder={SelectProductType==='' ?"Select Product Type":SelectProductType} 
     value={SelectProductType}
      onChange={(value)=>{
        setSelectProductType(value[0].value)
        setComboProductId(value[0].id)
        // dispatch({ type: 'productType', payload: value[0].id})
      }}
       options={options()} />
  }
  


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

const createnewCycle =(event)=>{

  event.preventDefault();  
     
  alert(
    `Start Date = ${state.startDate} Maturity Date = ${state.maturityDate} Final Cap Rate = ${state.finalCapRate} Product = ${ComboProductId} AvailableCycle Types = ${ComboCycleId} Status = ${state.status}`
  );
  const cycleObject = {
  productTypes:ComboProductId,
  availableCycleTypes:ComboCycleId,
  startDate: state.startDate,
  maturityDate: state.maturityDate,
  finalCapRate: state.finalCapRate,
  status:state.status,
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
status: "613f09778c62eb3b9c8079b2",
statusDate: "",
internalFundID: 1,
cusip: "",
startDate: moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a"),
maturityDate: moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a"),
});
alert("Created SuccessFully")
})

}

const updatecycle=(event) => {

  event.preventDefault();  
  const updatecycle = {
    _id:CycleId,
    productTypes:ComboProductId,
    availableCycleTypes:ComboCycleId,
    startDate: state.startDate,
    maturityDate: state.maturityDate,
    finalCapRate: state.finalCapRate,
    status:state.status,
    statusDate: state.statusDate,
    internalFundID: state.internalFundID,
    cusip: state.cusip,
    cycleName: state.cycleName,
  };
  console.log(updatecycle);
  dispatch(editCycle(updatecycle)).then((data) => {
    if (data.payload === "OK") {
      toast.success(
        "Updated Cycle Data Successfully!"
      );
    }
  });
}
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
     
 }
};

  return (
    <div className="container"  style={{marginTop:'10px'}}>
      <form onSubmit={handleSubmit}>

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
            {isedit?
              <>
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="btn btn-success btn-block"
              style={{
                backgroundColor: "#194ba88a",
                border: "1px solid black",
                borderRadius: "10px",
                fontSize: "14px",
                width: "150px",
                height: "30px",
                color: "white",
              }}
              name="save"
              value="save1"
              onClick={updatecycle}
            >
              Update Cycle
            </button>
              </>
              :
              <>
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="btn btn-success btn-block"
              style={{
                backgroundColor: "#194ba88a",
                border: "1px solid black",
                borderRadius: "10px",
                fontSize: "14px",
                width: "150px",
                height: "30px",
                color: "white",
              }}
              name="save"
              value="save1"
              onClick={createnewCycle}
            >
              Create Cycle
            </button>
              </>
            }
            
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
              value={state.status==='613f09778c62eb3b9c8079b2'?'PrePublished':'Published'}
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
        <table width = "100%">
          <tr>
            <td width= "50%">  
            <div align="center">
            <b> Indicative Cap Rate History </b>
            <ViewIndicativeCapRateHistoryComponentDataTable id={CycleId}></ViewIndicativeCapRateHistoryComponentDataTable>
            </div>
          </td>
          <td width="1%"> </td>
          <td width="50%">
          <div align="center">
          <b>Cycle Status </b>
          <ViewCycleStatusComponentDataTable  ></ViewCycleStatusComponentDataTable>
          </div>
          </td>
           </tr>
          </table>
  
      </div> 
      </form>
    </div>
  );
}
CreateCycleManagementForm.propTypes={
  initialData:PropTypes.any
}