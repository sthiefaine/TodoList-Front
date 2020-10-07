import {
connect,
} from 'react-redux';

/* === import comonants === */
import Title from '../../components/Title';

/* === State (données) ===
* - mapStateToProps retroune un objet de props pour le composant de présentation
* - mapStateToProps met à dispo 2 params
*  - state : le state du store (getState)
*  - ownProps : les props passées au container
* Pas de data à transmettre ? const mapStateToProps = null;
*/
// const mapStateToProps = null;


const mapStateToProps = (state) => {
    const getTasksUnchecked = state.task.tasksData.filter(item => item.done === false);
    return({
        counterValue: getTasksUnchecked.length,
    });
}

/* === Actions ===
* - mapDispatchToProps retroune un objet de props pour le composant de présentation
* - mapDispatchToProps met à dispo 2 params
*  - dispatch : la fonction du store pour dispatcher une action
*  - ownProps : les props passées au container
* Pas de disptach à transmettre ? const mapDispatchToProps = {};
*/
const mapDispatchToProps = {};


// == Export
export default connect(
mapStateToProps,
mapDispatchToProps,
)(Title);
