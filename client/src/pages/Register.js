import {Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from "axios"

const Register = () => {

    const initialValues = {
        username:"",
        password:""
    }

    const validationSchema = Yup.object().shape({
        username:Yup.string().min(2).max(30).required(),
        password:Yup.string().min(3).max(20).required()
    })

    const onSubmit=(data)=>{
        axios.post('http://localhost:3001/auth',data).then(()=>{
            window.location.pathname = "/login"
        })
    }
    return ( 
        <div>
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            >
                <Form className="formContainer">

                    <label>Username</label>
                    <ErrorMessage name="username" component="span"/>
                    <Field id="inputCreatePost" name="username" placeholder="Username" />

                    <label>Password</label>
                    <ErrorMessage name="password" component="span"/>
                    <Field id="inputCreatePost" name="password" placeholder="Password" type="password" />


                    <button type="submit">Register</button>
                </Form>

            </Formik>
        </div>
     );
}
 
export default Register;