import {useEffect, useState} from 'react'
import './style.css'
import {useSelector,useDispatch} from "react-redux";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import {EditIndicaptiveCapRateList,CreateIndicaptiveCapRateList} from "../redux/thunks";
export const IndicativeCapRateHistoryForm = ({onSubmit} , buttonVisible) => {

  const defaultData = {
    cycleID: "1",
    effectiveDate: moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a"),
    indicativeCapRate: '',
  };
  const dispatch = useDispatch();
  const [state, setState] = useState(defaultData);
  const {initialState} =useSelector(state=>state.indicativecapratehistroy);
  console.log(initialState);
  useEffect(() => {
    if(initialState){
      setState({
        effectiveDate:initialState.effectiveDate,
        indicativeCapRate:initialState.indicativeCapRate
      })
    }
   
  
  }, [initialState]);
 

const handleTextFieldChange=(event )=>{
  setState({...state,[event.target.name]:event.target.value})

}

  const updateindicaptivecaprate=()=>{
   
      if(initialState){
        const indicativeCapRateHistoryObject = {
          _id:initialState._id,
          cycleID: "1",
          effectiveDate: state.effectiveDate,
          indicativeCapRate: state.indicativeCapRate,
      };
        dispatch(EditIndicaptiveCapRateList(indicativeCapRateHistoryObject)).then((data) => {
          clearformdata();
          if (data.payload === "OK") {
            toast.success("Updated Cycle Data Successfully!");
          }
        });
      }else{
        alert('Form Is Empty');
      }
  }

const clearformdata=()=>{
  dispatch({ type: "setdata", payload: '' });
  setState({
    cycleID: "1",
    effectiveDate: moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a"),
    indicativeCapRate: ''
  });
}

const handleSubmit = () => {
  
    const indicativeCapRateHistoryObject = {
        cycleID: "1",
        effectiveDate: state.effectiveDate,
        indicativeCapRate: state.indicativeCapRate,
    };
    dispatch(CreateIndicaptiveCapRateList(indicativeCapRateHistoryObject)).then((data) => {
        console.log(data);
        toast.success("Indicative Cap Rate History Transaction submitted successfully!");
        setState({
          cycleID: "1",
          effectiveDate: moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a"),
          indicativeCapRate: ''
        });
    });
    // axios.post('http://localhost:4000/indicativeCapRateHistory/create', indicativeCapRateHistoryObject)
    // .then((res) => {
    //   console.log(res.data)
    // }).catch((error) => {
    //   console.log(error)
    // });
    // alert('Indicative Cap Rate History Transaction submitted successfully');
    
  }

  return <div>
    <form >
      <div className="d-flex flex-row">
        <div className="user flex-column">
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Effective Date  : &nbsp;&nbsp;&nbsp;</label>
          
          <input
            type="date"
            name="effectiveDate"
            size="15"
             onChange={handleTextFieldChange}
           value={moment(state.effectiveDate).format("YYYY-MM-DD")}
          />
        </div>
       
        <div className="user flex-column">
          <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Indicative Cap Rate : &nbsp;&nbsp;&nbsp;</label>
          <input
            type="text"
            name="indicativeCapRate"
            size="15"
            onChange={handleTextFieldChange}
             value={state.indicativeCapRate}
            />
        </div>
      
      </div>
      <div>
      <br></br>
                <div>
                  {
                   
                  !initialState?
                     <>
                  <button type="reset" className="btn btn-success" style={
                    {backgroundColor:'#194ba88a',
                      border:'1px solid black',
                      borderRadius:'10px',
                      fontSize: 15,
                      width:'250px',
                      height:'30px',color: 'white'}}
                      onClick={handleSubmit}
                      name="Add Indicative Cap Rate History" value="New"> + Indicative Cap Rate History </button> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                      </>
                      :null
                      
                  }
               
                {
                  initialState?
                  <>
                  <button type="submit" className="btn btn-success" style={
                    {backgroundColor:'#194ba88a',
                      border:'1px solid black',
                      borderRadius:'10px',
                      fontSize: 15,
                      width:'100px',
                      height:'30px',color: 'white'}} 
                      onClick={updateindicaptivecaprate}
                      name="save" value="save"> Update </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </>
                      :null
                }
               
                
                <input type="reset" className="btn btn-success" style={
                {backgroundColor:'#194ba88a',
                  border:'1px solid black',
                  borderRadius:'10px',
                  fontSize: 15,
                  width:'100px',
                  height:'30px',color: 'white'}}
                  onClick={clearformdata}
                  name="Clear" value="Clear"/>  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                
                <button type="button" className="btn btn-success" style={
                {backgroundColor:'#194ba88a',
                  border:'1px solid black',
                  borderRadius:'10px',
                  fontSize: 15,
                  width:'100px',
                  height:'30px',color: 'white'}}
                  onClick={()=>{
                    window.location='/create-indicativeCapHistory';
                  }}
                  name="btn" value="back"> Back </button>   
                </div>
         </div>
    </form>
  </div>
}