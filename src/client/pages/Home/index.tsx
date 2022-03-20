import { connect } from 'inferno-redux';
import { IPageMetaData } from '../../../interfaces/page-metadata';
import { hydrateHead } from '../helpers';

const Home = (
    state: Record<string, never>,
    props: { store: { dispatch: (arg0: { type: string }) => void } }
): JSX.Element => {
    console.log(state, props);
    const metaData = state?.metaData as IPageMetaData;
    return (
        <>
            <div>HOME PAGE {metaData?.pageTitle}</div>
            {/* simple demo of how to dispatch actions from components */}
            <button onClick={() => props.store.dispatch({ type: 'GO_ABOUT' })}>
                GO ABOUT
            </button>
        </>
    );
};

Home.defaultHooks = {
    onComponentDidMount() {
        hydrateHead('GO_HOME');
    },
};

const mapStateToProps = (state: never) => state;

const mapDispatchToProps = (dispatch: never) => {
    return {
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
