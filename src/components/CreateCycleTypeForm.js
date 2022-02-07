 import {useEffect ,useCallback} from 'react'
import './style.css'
import Select from 'react-dropdown-select'
import {useDispatch,useSelector} from "react-redux";
import { useState} from 'react';
import { toast } from "react-toastify";
import {EditCycleListType,createvailableCycleType,ProductListCycleType,ProductListCycleTypebyID} from "../redux/thunks";


export const TermQualifier = () => {
  return <select name="cycleTypes">
        <option value="1">S&P500-Tyr-Floor-10</option>
        <option value="2">S&P500-Tyr-Buffer-10 </option>
    </select>
}


export const CreateCycleTypeForm = (props) => {

  const {editcycletype} =useSelector(state=>state.editcycletypeselection);
  const {productType} =useSelector(state=>state.selectproductType);
  const [ProductData, setProductData] = useState([]);
  const [SelectProductType, setSelectProductType] = useState('');
  const dispatch=useDispatch();
  const getProductData = useCallback(async() => {

      if(editcycletype){
        dispatch(ProductListCycleTypebyID(editcycletype.ProductFamilyId)).then((res) =>{
        
        //  setProductData(res.payload);
          setSelectProductType(res.payload[0].Product);
          dispatch({ type: 'productType', payload:editcycletype.ProductFamilyId})
          //  console.log(res.payload[0].Product);
          });
      }


        dispatch(ProductListCycleType()).then((res) =>{
         // console.log(res.payload);
          setProductData(res.payload);
          });
      
    
   
  }, [dispatch,editcycletype]);

  const SelectedProdductType=()=>{
    const  options = () =>
    ProductData.map(user =>
        
      (
        {
      label: user.Product+' '+user.Family,
      value: user.Product,
      id: user._id,
    }),
   
    );
  
    return <Select 
      placeholder={SelectProductType==='' ?"Select Product Type":SelectProductType} 
       value={SelectProductType}
        onChange={(value)=>{
          console.log(value[0])
          setSelectProductType(value[0].value)
          dispatch({ type: 'productType', payload: value[0].id})
        }}
         options={options()} width='200px'/>
    }
  const [formState, setFormState] = useState(
    {
      Description:"",
      Term:"",
      TermQualifier:"Years",
      Structure:"Floor",
      StructureRate:"",
      CapRateThreshold:"",
      Status:"Available",
      ReferenceCode:"",
      ProductFamilyId: productType? productType:1,
    }
  );
  console.log('new data here');
  console.log(formState)
  console.log(editcycletype);
  
  const clearformdata=()=>{
    setSelectProductType('');
    dispatch({ type: 'seteditcycle', payload: '' })
    setFormState({
      Description:"",
      Term:"",
      TermQualifier:"Years",
      Structure:"Floor",
      StructureRate:"",
      CapRateThreshold:"",
      Status:"Available",
      ReferenceCode:""
    });
    // dispatch({ type: 'hyperlink', payload: false})
    dispatch({ type: 'navigationtab', payload: 0});
  }


  useEffect(() => {
    getProductData()
   
    if(editcycletype){
      setSelectProductType(editcycletype.ProductFamilyId)
      setFormState({
        Description:editcycletype.Description,
        Term:editcycletype.Term,
        TermQualifier:editcycletype.TermQualifier,
        Structure:editcycletype.Structure,
        StructureRate:editcycletype.StructureRate,
        CapRateThreshold:editcycletype.CapRateThreshold,
        Status:editcycletype.Status,
        ReferenceCode:editcycletype.ReferenceCode,
        ProductFamilyId: editcycletype.ProductFamilyId,
      })
    }
      return ()=>{
        dispatch({ type: 'seteditcycle', payload: '' })
      }
   
  }, [editcycletype,getProductData,dispatch]);
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const cycleTypeObject = {
        Description:formState.Description,
        Term:formState.Term,
        TermQualifier:formState.TermQualifier,
        Structure:formState.Structure,
        StructureRate:formState.StructureRate,
        CapRateThreshold:formState.CapRateThreshold,
        Status:formState.Status,
        ReferenceCode:formState.ReferenceCode,
        ProductFamilyId:productType? productType:'',
        ProductFamilybyname:SelectProductType
    };

  console.log(cycleTypeObject) ;
   
    dispatch(createvailableCycleType(cycleTypeObject)).then((data) => {
      console.log(data)
      if (data.payload._id) {
        toast.success("Created Cycle Data Successfully!");
      }
    });
    setFormState({
      Description:"",
      Term:"",
      TermQualifier:"Years",
      Structure:"Floor",
      StructureRate:"",
      CapRateThreshold:"",
      Status:"Available",
      ReferenceCode:""
    });


  }

  const handleupdatedatacycletype=()=>{
      if(editcycletype){
        const cycleTypeObject = {
          _id:editcycletype?editcycletype._id:null,
          Description:formState.Description,
          Term:formState.Term,
          TermQualifier:formState.TermQualifier,
          Structure:formState.Structure,
          StructureRate:formState.StructureRate,
          CapRateThreshold:formState.CapRateThreshold,
          Status:formState.Status,
          ReferenceCode:formState.ReferenceCode,
          ProductFamilyId:productType? productType:'',
          ProductFamilybyname:SelectProductType
      };
        dispatch(EditCycleListType(cycleTypeObject)).then((data) => {
          clearformdata();
          dispatch({ type: 'seteditcycle', payload: '' })
          if (data.payload === "OK") {
            toast.success(
              "Updated Cycle Data Successfully! , Cycle Description : " +
              editcycletype.Description
            );
          }
        });
      }else{
        alert('form is empty')
      }
  }

 

  const handleChange = (event) => {
    //   // do your code here
     setFormState(
     {
        ...formState,
       [event.target.name]: event.target.value
     }
    )
  }

  return <div>
    <form > 
      <div className="flex-column">
    
       <div>  
         {
         props.edit==='true'?
           <>
           <button type="button" className="btn btn-success"  style={
            {backgroundColor:'#194ba88a',
              border:'1px solid black',
              borderRadius:'10px',
              fontSize: 15,
              width:'100px',
              height:'30px',color: 'white'}}
              onClick={handleupdatedatacycletype}
      name="btn" value="update"> Update </button>   &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
       
          </>
           :
           <>
            <button type="button" className="btn btn-success" style={
       {backgroundColor:'#194ba88a',
        border:'1px solid black',
        borderRadius:'10px',
        fontSize: 15,
        width:'150px',
        height:'30px',color: 'white'}} 
        onClick={handleSubmit}
        value="ädd"> +
         Cycle Type</button>  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
           </>
           
         }
         
     
      <button type="button" className="btn btn-success" style={
       {backgroundColor:'#194ba88a',
        border:'1px solid black',
        borderRadius:'10px',
        fontSize: 15,
        width:'100px',
        height:'30px',color: 'white'}}
        onClick={clearformdata}
        name="btn" value="clear"> Clear </button>    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
     
      <button type="button" className="btn btn-success" style={
       {backgroundColor:'#194ba88a',
        border:'1px solid black',
        borderRadius:'10px',
        fontSize: 15,
        width:'100px',
        height:'30px',color: 'white'}}
        onClick={()=>{
          window.location='/cycle-types'
        }}
        name="btn" value="back"> Back </button>  
        </div>
     </div>
      <br></br>
      <div>
          <label><b>Product Type </b>  </label>
          <SelectedProdductType/>
      </div>
      <br></br>
      <div className="d-flex flex-row">
      <div className="user flex-column">
          <label>Index Description  : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            type="text"
            name="Description"
            onChange={handleChange}
            value={formState.Description}
          />
        </div>

        <div className="user flex-column">
          <label>&nbsp;&nbsp;Term  : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
          <input
            type="number"
            name="Term"
            onChange={handleChange}
            value={formState.Term}
          />
        </div>
       
        <div className="user flex-column">
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Term Qualifier : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <select value={formState.TermQualifier} name="TermQualifier" onChange={handleChange}>
            <option value="Years">Years</option>
            <option value="Months">Months</option>
          </select>
        </div>
       
        <div className="user flex-column">
          <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Structure  : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
          <select value={formState.Structure} name="Structure" onChange={handleChange}>
            <option value="Floor">Floor</option>
            <option value="Buffer">Buffer</option>
          </select>
        </div>
      </div>  
<br></br>
<br></br>
      <div className="d-flex flex-row">
        <div className="user flex-column">
          <label>Floor/Buffer Rate : (%) &nbsp;&nbsp;&nbsp; </label>
          <input
            type="number"
            name="StructureRate"
            onChange={handleChange}
            value={formState.StructureRate}
          />
        </div>

        <div className="user flex-column">
          <label>&nbsp;&nbsp; CapRate Threshold  : (%) </label>
          <input
            type="decimal"
            name="CapRateThreshold"
            onChange={handleChange}
            value={formState.CapRateThreshold}
          />
        </div>
       
        <div className="user flex-column">
          <label>&nbsp;&nbsp;Status  :  &nbsp;&nbsp;&nbsp;</label>
          <select value={formState.Status} name="Status" onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
       
        <div className="user flex-column">
          <label>&nbsp;&nbsp;BizTraxCode/Reference Code : &nbsp;&nbsp;&nbsp; </label>
          <input
            type="text"
            name="ReferenceCode"
            onChange={handleChange}
            value={formState.ReferenceCode}
          />
        </div>
        <br/>
        
      </div>
      <br/>  
   
    </form>
  </div>
}