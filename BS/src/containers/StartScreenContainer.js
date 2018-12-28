import { connect } from "react-redux";
import StartScreen from "../screen/startScreen/StartScreen";


const mapStateToProps = (state) => {
    return {
       
    }
};


const mapDispatchToProps = (dispatch) => {
    return {    
       
        
    };
}
 const StartScreenContainer =  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(StartScreen);
export default StartScreenContainer;
