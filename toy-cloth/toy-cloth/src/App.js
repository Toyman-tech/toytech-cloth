import React from 'react';

import {  Routes,  Route, BrowserRouter } from 'react-router-dom';
import ShopPage from './pages/shop/shop.components.jsx';
import HomePage from "./pages/homepage/homepage.component.jsx";
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component.jsx';
import {  onSnapshot } from 'firebase/firestore';


 class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }  
  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth=>  {
      if (userAuth){
         const userRef = await createUserProfileDocument(userAuth);
         
       onSnapshot(userRef, (doc)=> {
        this.setState({
          currentUser : {
            id : doc.id,
            ...doc
              
          }
        }, ()=> {
         // console.log(this.state); 
        })
        
        console.log(this.state);
       // console.log( 'value:', doc);
      });
        


        //  userRef.onSnapshot((snapShot)=> {
        //    console.log("value:", snapShot.data());
        //  })
        
      } 
      this.setState({currentUser: userAuth});
    });
    
  }
  
   componentWillUnmount(){ this.unsubscribeFromAuth();}
  
  
  render() {
    return( 
    <BrowserRouter>
     <Header currentUser={this.state.currentUser}/>
       <Routes>
          <Route 
           path='/'  element={<HomePage/>} />
          <Route  path='/shop'  element ={<ShopPage/>} />
          <Route  path='signin'  element ={<SignInAndSignUpPage/>} />
          
        </Routes> 
    </BrowserRouter>
    )  
  };
}

export default App;
//"terminal.integrated.automationProfile.linux": {},