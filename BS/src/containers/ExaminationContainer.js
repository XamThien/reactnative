import {connect} from "react-redux";
import Examination from "../screen/home/examination/Examination";
import {
    fetchUserProfile,
} from "../actions/ProfileAction";


const mapStateToProps = (state) => {
    return {
       
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onFetchUserProfile: () => {
            dispatch(fetchUserProfile());
        },
    };
}
const ExaminationContainer = connect(mapStateToProps, mapDispatchToProps)(Examination);
export default ExaminationContainer;
