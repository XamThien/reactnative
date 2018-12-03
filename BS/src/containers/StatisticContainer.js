import { connect } from "react-redux";
import Statistic from "../screen/home/statistic/Statistic";
import {
    fetchUserProfile,
  } from "../actions/ProfileAction";


const mapStateToProps = (state) => {
    return {
        //userName: state.getProfilesReducers.userName,
        //image: state.getProfilesReducers.image
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        loadDataProfile:() => {
            dispatch(fetchUserProfile());
        }
        
    };
}
 const StatisticContainer =  connect(mapStateToProps, mapDispatchToProps)(Statistic);
export default StatisticContainer;
