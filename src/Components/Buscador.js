import swal from '@sweetalert/with-react'
import {useNavigate, Link, Navigate} from "react-router-dom";

function Buscador (){
    const navigate = useNavigate();
const submitHandler = e=>{
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    
    if (keyword.length===0)
    {
    swal(<h2>Please enter a keyword</h2>)
    }
    else if (keyword.length<4){
        swal(<h2>Please enter a keyword with more than 3 characters</h2>)
    }
    else{
        e.currentTarget.keyword.value = "";
        navigate(`/resultados?word=${keyword}`);

    }
}

    return (
        <form onSubmit={submitHandler}>
            <label>
                <br/>
                <input type="text" placeholder="search here" name="keyword"/><br/>
            </label>
            <button type="submit">Search</button>
        </form>
    )
}

export default Buscador;