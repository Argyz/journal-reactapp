import React, { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  //para cuando se produzca algun login o logout... se dispara este efecto
  useEffect(()=>{

    firebase.auth().onAuthStateChanged(async(user)=>{
      
      //user tiene algo?...si es si... pregunta por uid
      if (user?.uid) {
        dispatch(login(user.uid,user.displayName));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));

      }else{
        setIsLoggedIn(false);
      }
      setChecking(false);

    })
  },[dispatch,setChecking,setIsLoggedIn]);

  //se ejecuta una vez que tenga la autenticacion de firebase
  if (checking) {
    return(
      <h1>Wait...</h1>
    )
  }
  return (
    <BrowserRouter>
      <div>
        <Switch>

         {/*  Rutas protegidas */}

         <PublicRoute 
         path='/auth'
         isAuthenticated={isLoggedIn}
         component={AuthRouter}/>

         <PrivateRoute 
         exact
         path='/'
         isAuthenticated={isLoggedIn}
         component={JournalScreen}/>

          
          {/* Una forma de hacerlo 
          <Route path='/auth'>
            <AuthRouter />
          </Route> */}

          {/* Segunda Forma de hacerlo
          <Route exact path='/' component={JournalScreen} /> */}

          <Redirect to='/auth/login' />

        </Switch>
      </div>
    </BrowserRouter>
  )
}
