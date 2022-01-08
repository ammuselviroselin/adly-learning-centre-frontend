
import { useCallback, useEffect, useState } from "react";
import "./style.css";
import MaterialTable from "material-table";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  IndicaptiveCapRateList,
  EditIndicaptiveCapRateList,
  IndicaptiveCapRateListDelete,
} from "../redux/thunks";
export const ListIndicativeCapRateHistoryComponentDataTable = (props) => {
  const [user, setUser] = useState();
  const [IndicaptiveList, setIndicaptiveList] = useState([]);
  const dispatch = useDispatch();
  const { indicaptivelist } = JSON.parse(
    JSON.stringify(useSelector((state) => state.indicaptiveCapRateSlice))
  );
  console.log(indicaptivelist);
  const getcycletype = useCallback(
    async (data) => {
      dispatch(IndicaptiveCapRateList()).then((data) => {
        console.log(data.payload);
      });
    },
    [dispatch]
  );


  useEffect(() => {
    getcycletype();
  }, [IndicaptiveList,getcycletype]);

  const columns = [
    props.search === "false"
      ? {
          title: "Select",
          render: (rowData) => {
            return (
              <input
                onClick={() => {
                  console.log(rowData._id);
                  dispatch({ type: "setdata", payload: rowData });
                }}
                type="radio"
                value="Male"
                name="gender"
              />
            );
          },
        }
      : {},
    {
      title: "Cycle ID",
      field: "cycleID",
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "Effective Date",
      field: "effectiveDate",
      render: (rowData) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        //return new Date(rowData.startDate).toLocaleDateString(undefined, options)+'   '+new Date(rowData.startDate).toLocaleTimeString()} ,editable: 'never',
        return new Date(rowData.effectiveDate).toLocaleDateString(
          undefined,
          options
        );
      },
      cellStyle: {
        fontSize: "14px",
      },
    },
    {
      title: "Indicative CapRate",
      field: "indicativeCapRate",
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
        options={{
          search: props.search === "false" ? false : true,
          actionsColumnIndex: -1,
          pageSize: 3,
          pageSizeOptions: [3, 9, 9],
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
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setUser([...user, newData]);

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                dispatch(EditIndicaptiveCapRateList(newData)).then((data) => {
                  setIndicaptiveList(JSON.parse(JSON.stringify([])));
                  if (data.payload === "OK") {
                    toast.success("Updated Cycle Data Successfully!");
                  }
                });
                //   const dataUpdate = [...indicaptivelist];
                // const index = oldData.tableData.id;

                //   dataUpdate[index] = newData;
                //   setUser(dataUpdate);

                //   indicaptivelist[indicaptivelist.indexOf(oldData)] = newData;

                // axios.put('http://localhost:4000/indicativeCapRateHistory/update/'+newData._id,newData)
                // .then(res=>{
                //   if(res.status===200){
                //   toast.success('Updated Indicative Cap Rate Successfully');
                //   }
                // });

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                return dispatch(IndicaptiveCapRateListDelete(oldData._id)).then(
                  (data) => {
                    console.log(data);
                    setIndicaptiveList(JSON.parse(JSON.stringify([])));
                    if (data.payload === "OK") {
                      toast.success(
                        "Deleted Cycle Data Successfully! , Cycle Description : " +
                          oldData.Description
                      );
                    }
                    resolve();
                  }
                );
              }, 1000);
            });
          },
          //     onRowDelete:  (newData, oldData) =>
          //     new Promise(resolve => {
          //         setTimeout(() => {
          //           // indicaptivelist[indicaptivelist.indexOf(oldData)] = newData;
          //           // const dataDelete = [...indicaptivelist];

          //           // var elementPos = dataDelete.map(function(x) {return x._id; }).indexOf(newData._id);

          //           // dataDelete.splice(elementPos, 1);
          //           // setUser([...dataDelete]);

          //             axios.delete(`http://localhost:4000/indicativeCapRateHistory/delete/${newData._id}`)
          //             .then(res=>{
          //               if(res.status===200){

          //                 toast.success('Deleted Indicative Cap Rate Successfully');
          //               }
          //             }).catch(err=>console.log(err));
          //             resolve();

          //     }, 1000);
          // }),
        }}
        data={indicaptivelist}
      />
    </div>
  );
};
