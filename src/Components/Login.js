import axios from "axios";
import swal from '@sweetalert/with-react'
import {useNavigate, Link, Navigate} from "react-router-dom";


function Login (){

    const navigate = useNavigate();
    const handlerSubmit =e=>{
        e.preventDefault();
        const email = e.target.userMail.value;
        const password = e.target.password.value;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(regexEmail.test(email))
        if (email ==="" || password ===""){
            swal(
                <h2>Please enter your username and password</h2>
            )
            return;
        }
        if (email !=="" && !regexEmail.test(email)){
            swal(
                <h2>Please enter a valid email</h2>
            )
          
            return;
        }
        if(email!=="challenge@alkemy.org" || password!=="react"){
            swal(
                <h2>Login failed</h2>
            )
           
            return;
        }
        swal(
            <h2>Login success</h2>
        )
        
        axios.post("http://challenge-react.alkemy.org/",{email, password})
        .then(res=>{
            console.log(res.data);
            const tokenRecibido = res.data.token;
            sessionStorage.setItem("token", tokenRecibido);
            navigate(`/Listado`);
        })

    }

    let token = sessionStorage.getItem("token");
    return(
        <>
        {token && <Navigate to="/listado"/>}
        <h1>Log in to the website</h1>
        <form onSubmit={handlerSubmit}>
            <label>
                Email:<br/>
                <input type="text" placeholder="Mail" name="userMail"/><br/>
            </label>
            <label>
                Password:<br/>
                <input type="password" placeholder="Password" name="password"/><br/>
            </label>
            <button type="submit">Go!</button>
        </form>
        </>
    )
}

export default Login;