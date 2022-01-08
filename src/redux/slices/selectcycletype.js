export const cycleType = '';
export const search='';
 const selectedcycletype = (state=cycleType, action) => {
  switch (action.type) {
    case 'setcycletype':
        console.log('selected cycle'+JSON.stringify(action.payload));

   return { ...state,  cycleType:action.payload };
   case 'setSearch':
    console.log('Search'+JSON.stringify(action.payload));

    return { search:action.payload };
 
    default: 
      return state;
  }
};
export default selectedcycletype