import {
connect,
} from 'react-redux';

/* === import comonants === */
import Form from '../../components/Form';

/* === import Actions === */
import {
    saveNewTask,
  } from '../../redux/actions/task';

// === State (données) ===
// const mapStateToProps = null;

const mapStateToProps = null

// === Actions ===

// const mapDispatchToProps = {};

const mapDispatchToProps = (dispatch, ownProps) => ({
    saveNewTask: (payload) => {
        dispatch(saveNewTask(payload));
    },
});



// == Export
export default connect(
mapStateToProps,
mapDispatchToProps,
)(Form);
