import { connect } from 'inferno-redux';
import { hydrateHead } from '../helpers';

const About = () => {
    return (
        <div>
            <h1>ABOUT PAGE</h1>
        </div>
    );
};

About.defaultHooks = {
    onComponentDidMount() {
        hydrateHead('GO_ABOUT');
    },
};

const mapStateToProps = (state: never) => {
    return state;
};

export default connect(mapStateToProps)(About);
