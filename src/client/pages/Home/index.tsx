import { connect } from "inferno-redux";
import { hydrateHead } from "../helpers";


const Home = (state) => {
  console.log(state.metaData)
  return <div>HOME PAGE {state?.metaData?.pageTitle}</div>;
};

Home.defaultHooks = {
  onComponentDidMount() {
    hydrateHead('GO_HOME')
  }
}

const mapStateToProps = state => {
  console.log(state)
  const { pageTitle, metaDescription, metaKeywords } = state;
  return state
}


export default connect(mapStateToProps)(Home);
