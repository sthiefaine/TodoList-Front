import {
connect,
} from 'react-redux';

/* === import comonants === */
import Tasks from '../../components/Tasks';

/* === import Actions === */
import {
    setNewCheckBoxValue,
    deleteTask,
  } from '../../redux/actions/task';

/* === State (données) ===
* - mapStateToProps retroune un objet de props pour le composant de présentation
* - mapStateToProps met à dispo 2 params
*  - state : le state du store (getState)
*  - ownProps : les props passées au container
* Pas de data à transmettre ? const mapStateToProps = null;
*/
// const mapStateToProps = null;

const mapStateToProps = (state) => ({
    todolistData: state.task.tasksData,
});

/* === Actions ===
* - mapDispatchToProps retroune un objet de props pour le composant de présentation
* - mapDispatchToProps met à dispo 2 params
*  - dispatch : la fonction du store pour dispatcher une action
*  - ownProps : les props passées au container
* Pas de disptach à transmettre ? const mapDispatchToProps = {};
*/
// const mapDispatchToProps = {};

const mapDispatchToProps = (dispatch, ownProps) => ({
    setNewCheckBoxValue: (payload) => {
        dispatch(setNewCheckBoxValue(payload));
    },
    deleteTask: (payload) => {
        dispatch(deleteTask(payload));
    },
});



// == Export
export default connect(
mapStateToProps,
mapDispatchToProps,
)(Tasks);
