import { connect } from "inferno-redux";
import { hydrateHead } from "../helpers";

const About = (state) => {
  return <div><h1>ABOUT PAGE</h1></div>;
};

About.defaultHooks = {
  onComponentDidMount() {
    hydrateHead('GO_ABOUT')
  }
}


const mapStateToProps = state => {
  console.log(state)
  const { pageTitle, metaDescription, metaKeywords } = state;
  return state
}


export default connect(mapStateToProps)(About);
