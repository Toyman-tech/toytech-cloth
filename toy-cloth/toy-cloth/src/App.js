import React from 'react';
import { connect } from 'react-redux';
import {  Routes,  Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ShopPage from './pages/shop/shop.components.jsx';
import HomePage from "./pages/homepage/homepage.component.jsx";
import  { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component.jsx';
import {  onSnapshot } from 'firebase/firestore';
import { setCurrentUser } from './redux/user/user.action.js';

 class App extends React.Component {
 
 
  unsubscribeFromAuth = null;

  componentDidMount(){
    
    const {setCurrentUser}= this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth=>  {
      if (userAuth){
         const userRef = await createUserProfileDocument(userAuth);
         

       onSnapshot(userRef, (doc)=> {
        setCurrentUser({
          currentUser : {
            id : doc.id,
            ...doc
              
          }
        }
        // ()=> {
        //  // console.log(this.state); 
        // }
        )
        
       // console.log(this.state);
       // console.log( 'value:', doc);
      });
        


        //  userRef.onSnapshot((snapShot)=> {
        //    console.log("value:", snapShot.data());
        //  })
        
      } 
        setCurrentUser(userAuth);
    });
    
  }
  
   componentWillUnmount(){ this.unsubscribeFromAuth();}
  
  render() {
    return( 
      <div>
     <Header/>
       <Routes>
          <Route 
           path='/'  element={<HomePage/>} />
          <Route  path='/shop'  element ={<ShopPage/>} />
          <Route exact  path='/signin'  element={this.props.currentUser ? <Navigate to='/'/> : <SignInAndSignUpPage/>}></Route>
          
        </Routes> 
    
    </div>
    )  
  };
}

 const mapStateToProps = ({user}) => {
  return {
    currentUser : user.currentUser
  }
 }

 const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => {
      dispatch(setCurrentUser(user))
    }
  }
 }

export default connect(mapStateToProps, mapDispatchToProps)(App)

//"terminal.integrated.automationProfile.linux": {},