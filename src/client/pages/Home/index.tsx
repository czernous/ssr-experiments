import { connect } from "inferno-redux";
import { hydrateHead } from "../helpers";


const Home = (state, props) => {
  console.log(state, props)
  return (
    <>
      <div>HOME PAGE {state?.metaData?.pageTitle}</div>
      {/* simple demo of how to dispatch actions from components */}
      <button onClick={() => props.store.dispatch({type: 'GO_ABOUT'})}>GO ABOUT</button>
    </>
  );
};

Home.defaultHooks = {
  onComponentDidMount() {
    hydrateHead('GO_HOME')
  }
}

const mapStateToProps = (state) => state


const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);
