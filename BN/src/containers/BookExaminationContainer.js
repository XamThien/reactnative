import { connect } from "react-redux";
import BookExamination from "../screen/home/bookexamination/BookExamination";
import {
    fetchUserProfile,
  } from "../actions/ScheduleAction";


const mapStateToProps = (state) => {
    return {
        userName: state.getProfilesReducers.userName,
        image: state.getProfilesReducers.image
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        loadDataProfile:() => {
            dispatch(fetchUserProfile());
        }
        
    };
}
 const BookExaminationContainer =  connect(mapStateToProps, mapDispatchToProps)(BookExamination);
export default BookExaminationContainer;
