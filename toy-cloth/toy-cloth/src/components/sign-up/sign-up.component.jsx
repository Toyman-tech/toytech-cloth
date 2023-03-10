import React from "react";
import './sign-up.styles.scss'

import FormInput from "../form-input/form-input.component";
 
import CustomButton from "../custom-button/custom-button.component";
import { createUserWithEmailAndPassword } from "firebase/auth";



import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";


class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            displayName : '',
            email: '',
            password : '',
            confirmPassword : ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword }=this.state;
        if (password !== confirmPassword){
           alert( "passwords don't match ");
           return;
        }
        try{
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
         
        await   createUserProfileDocument(user, {displayName}); 
        this.setState ( {
            displayName : '',
            email: '',
            password : '',
            confirmPassword : ''
        });
        } catch(error)
        { console.error(error);
        }
    };

    handleChange = event =>{
        const {name, value} = event.target;
        
        this.setState({[name]: value});
    }

    render() {
        return(
            <div className="Sign-up">
                <h2 className="tittles">
                    i do not have a account
                </h2>
                <span>sign up with your email and password</span>
                <form className="sign-up" onSubmit={this.handleSubmit}>
                  <FormInput 
                  type='text'
                  name='displayName'
                  value={this.state.displayName}
                  onChange ={this.handleChange}
                  label='Display Name'
                  required />
                     <FormInput 
                  type='email'
                  name='email'
                  value={this.state.email}
                  onChange ={this.handleChange}
                  label='Email'
                  required />
                     <FormInput 
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange ={this.handleChange}
                  label='password'
                  required />
                     <FormInput 
                  type='password'
                  name='confirmPassword'
                  value={this.state.confirmPassword}
                  onChange ={this.handleChange}
                  label='Confirm Password'
                  required />
                  <CustomButton type= 'submit'> SIGN UP </CustomButton>
                </form>
            </div>
        )
    }
};
export default SignUp;