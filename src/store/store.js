import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk'
import { uiReducer } from '../reducers/uiReducer';
import { noteReducer } from '../reducers/noteReducer';



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/**agrupa todos los reducers... despues de todo eso es la store */
const reducers = combineReducers({
    auth: authReducer,
    uid: uiReducer,
    notes: noteReducer,
    
})

/**crea la store y le paso la agrupacion de reducers de mi app 
 * para decirle a "react" que ahora tiene una store(fuente unica de la verda)
 * tengo q hacerlo desde el punto mas alto de mi app
*/
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);


