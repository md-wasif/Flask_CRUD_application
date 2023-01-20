import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

const CreateUser = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessaage] = useState("")

    const validationSchema = yup.object().shape({
        first_name: yup.string().required('First name is required')
        .min(3, 'First name must be at least 3 characters'),
        last_name: yup.string().required('Last name is required')
        .min(3, 'Last name must be at least 3 characters'),
        email: yup.string().email('Invalid email').required('Email is required'),
        phone: yup.string().required('Phone is required')
        .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
        message:yup
        .string()
        .required('Message is required')
        .min(5, 'Messsage must be at least 5 character')
    })

    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {        
        // setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //  }, 400);
        setIsSubmitting(true)
        axios.post('http://localhost:5000/users', values)
            .then(res => {
                setIsSubmitting(false)
                resetForm({values: ''}) // reset form values
                setTimeout(() => {
                    if(res.data && res.status === 200){
                        alert("Successfully create new user..")
                    }
                }, 400)
                console.log(res)
            })
            .catch(err => {
                setIsSubmitting(false)
                if(err.response.data.error){
                    alert(err.response.data.error)
                    setSubmitting(false)
                }
                setErrorMessaage(err.message)
                console.log(err)
            })
    }

    return (
        <div>
            <h2>Create User</h2>
            <Formik
                initialValues={{ first_name: '', last_name: '', email: '', phone: '',  message:'' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div>
                        <Field type="text" name="first_name" placeholder="First Name" />
                            {errors.first_name && touched.first_name ? (
                            <div>{errors.first_name}</div>
                            ) : null}
                            </div>
                        <div>
                            <Field type="text" name="last_name" placeholder="Last Name" />
                            {errors.last_name && touched.last_name ? (
                            <div>{errors.last_name}</div>
                            ) : null}
                            </div>
                        <div>
                            <Field type="email" name="email" placeholder="Email Id" />
                            {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                            ) : null}
                            </div>
                        <div>
                            <Field type="phone" name="phone" placeholder="Phone Number" />
                            {errors.phone && touched.phone ? (
                            <div>{errors.phone}</div>
                            ) : null}
                            </div>
                            <Field type="text" name="message" placeholder="message"/>
                            {errors.message && touched.message ? (
                            <div>{errors.message}</div>
                            ) : null}
                        <div>
                            <button type="submit" value="submit" disabled={isSubmitting}>Add User</button>
                            </div>
                    </Form>
                    )}
            </Formik>
        </div>
    )
}

export default CreateUser;