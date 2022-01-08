import { useCallback, useEffect, useState } from "react";
import "./style.css";
import MaterialTable from "material-table";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  CycleTypeList,
  EditCycleListType,
  CycleTypeListDelete,
} from "../redux/thunks";

export const CycleTypeListDataTable = (props) => {
  const [, setUser] = useState();
  // const [ProductData, setProductData] = useState([]);
  // const [SelectProductType, setSelectProductType] = useState('');
  const { cycletype } = JSON.parse(
    JSON.stringify(useSelector((state) => state.cycleTypeSlice))
  );
  

  console.log(cycletype);
  console.log(props.search);
  const [cycleData, setCycleData] = useState([]);
  const dispatch = useDispatch();

  // const getProductData = useCallback(async() => {
  //   const res = await axios.get("http://localhost:4000/product/")
  //   const data = res.data
  //   setProductData(data);
  // }, []);
  const getcycletype = useCallback(
    async (data) => {
      dispatch(CycleTypeList()).then((data) => {
        setUser(data.data);
      });
      
    },
    [dispatch]
  );
  useEffect(() => {
    getcycletype();
  }, [cycleData, getcycletype]);

  // const SelectedProdductType=()=>{
  //   const  options = () =>
  //   ProductData.map(user => ({
  //     label: user.Product,
  //     value: user.Product
  //   }));
  
  //   return <Select 
  //     placeholder={SelectProductType==='' ?"Select Product Type":SelectProductType} 
  //      value={SelectProductType}
  //       onChange={(value)=>{
  //         setSelectProductType(value[0].value)
  //         dispatch({ type: 'productType', payload: value[0].value})
  //       }}
  //        options={options()} />
  //   }

  const columns = [
    props.search==='false'?  { title: "Select",render: rowData=>{ 
 
      return  <input onClick={()=>{
       // alert(rowData._id)
        dispatch({ type: 'seteditcycle', payload: rowData })
  
      }} type="radio" value="Male" name="gender" />
    }}
    :{},
    // radio button added
    {
      title: "Index Description",
      field: "Description",
      render: (rowData) => (
        <a
          href={`/cycle-types?cycleTypeDescription=${rowData.Description}&id=${rowData._id}`}
          onClick={()=>{
            // alert(rowData._id)
             dispatch({ type: 'seteditcycle', payload: rowData })
       
           }}
        >
          {rowData.Description}
        </a>
      ),
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "Term ",
      field: "Term",

      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "Structure",
      field: "Structure",
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "Floor/Buffer Rate",
      field: "StructureRate",
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "CapRate Threshold",
      field: "CapRateThreshold",
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "Status",
      field: "Status",
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "ProductId",
      field: 'ProductFamilyId',
      cellStyle: {
        fontSize: "14px",
      },
      editable: 'never'
    },
    {
      title: "RefCode",
      field: "ReferenceCode",
      cellStyle: {
        fontSize: "14px",
      },
    },
  ];

  return (
    <div class="user">
      <br />
      <MaterialTable
        title=""
        columns={columns}
        actions={[
          {
            icon: "cancel",
            tooltip: "cancel",
            onClick: (event, rowData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  rowData.Status = "Cancelled";
                  // axios.put(
                  //     "http://localhost:4000/availableCycleTypes/update/" +
                  //       rowData._id,
                  //     rowData
                  //   )
                  //   .then((res) => {
                  //     if (res.status === 200) {
                  //       toast.success(
                  //         "Cancelled Cycle Types Successfully! , Cycle Type Description : " +
                  //           rowData.Description
                  //       );
                  //     }
                  //   });
                  dispatch(EditCycleListType(rowData)).then((data) => {
                    setCycleData(JSON.parse(JSON.stringify([])));
                    if (data.payload === "OK") {
                      toast.success(
                        "Updated Cycle Data Successfully! , Cycle Description : " +
                        rowData.Description
                      );
                    }
                  });

                  resolve();
                }, 1000);
              }),
          },
        ]}
        options={{
          search:props.search==='false'?false:true,
          actionsColumnIndex: -1,
          pageSize:7,
          pageSizeOptions:[7,49,49],
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
          // onRowUpdate: (newData, oldData) =>
          // new Promise((resolve, reject) => {
          //   setTimeout(() => {
          //     const dataUpdate = [...user];
          //   const index = oldData.tableData.id;

          //     dataUpdate[index] = newData;
          //     setUser(dataUpdate);

          //     user[user.indexOf(oldData)] = newData;

          //     axios.put('http://localhost:4000/availableCycleTypes/update/'+newData._id,newData)
          //     .then(res=>{
          //       if(res.status===200){
          //       toast.success('Updated Cycle Types Successfully');
          //       }
          //     });

          //     resolve();
          //   }, 1000)
          // }),
          onRowUpdate: (newData, oldData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                dispatch(EditCycleListType(newData)).then((data) => {
                  console.log(data);
                  setCycleData(JSON.parse(JSON.stringify([])));
                  if (data.payload === "OK") {
                    toast.success(
                      "Updated Cycle Data Successfully! , Cycle Description : " +
                        newData.Description
                    );
                  }
                });

                resolve();
              }, 2000);
            });
          },
          //     onRowDelete:  (newData, oldData) =>
          //     new Promise(resolve => {
          //         setTimeout(() => {
          //         //   user[user.indexOf(oldData)] = newData;
          //         //   const dataDelete = [...user];

          //         //   var elementPos = dataDelete.map(function(x) {return x._id; }).indexOf(newData._id);

          //         //   dataDelete.splice(elementPos, 1);
          //         //   setUser([...dataDelete]);

          //             axios.delete(`http://localhost:4000/cycleList/delete/${newData._id}`)
          //             .then(res=>{
          //               if(res.status===200){

          //                 toast.success('Deleted Cycle Successfully');
          //               }
          //             }).catch(err=>console.log(err));
          //            resolve();
          //     }, 1000);
          // }),

          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
              return dispatch(CycleTypeListDelete(oldData._id)).then((data) => {
                setCycleData(JSON.parse(JSON.stringify([])));
                if (data.payload === "OK") {
                  toast.success(
                    "Deleted Cycle Data Successfully! , Cycle Description : " +
                      oldData.Description
                  );
                }
                resolve();
              });
            });
          },
        }}
        data={cycletype}
      />
    </div>
  );
};
