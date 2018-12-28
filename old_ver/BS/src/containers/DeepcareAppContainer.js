import { connect } from "react-redux";
import DeepcareApp from "../DeepcareApp";


const mapStateToProps = (state) => {
    return {
        actionCallback: state.listenerVideocallReducers.actionCallback,
        newMessage: state.listenerVideocallReducers.newMessage,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        
    };
}
const DeepcareAppContainer =  connect(mapStateToProps, mapDispatchToProps)(DeepcareApp);
export default DeepcareAppContainer;
