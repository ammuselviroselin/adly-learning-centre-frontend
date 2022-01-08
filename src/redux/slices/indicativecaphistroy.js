export const initialState = {};
 const indicativecapratehistroy = (state=initialState, action) => {
  switch (action.type) {
    case 'setdata':
        console.log('indicativeCapRateHistory data'+JSON.stringify(action.payload));

   return { ...state,  initialState:action.payload };
 
    default: 
      return state;
  }
};
export default indicativecapratehistroy