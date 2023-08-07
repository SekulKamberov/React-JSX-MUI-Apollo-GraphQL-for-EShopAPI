import React, { useState } from "react"

export default function(initialFieldValues, initialErrors) {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState(initialErrors)

    const handleInputChange = e => {
        const { name, value } = e.target  
        setValues({
            ...values, [name]: value
        }) 
    }

    const resetForm =() =>{
        setValues(initialFieldValues)   
        setErrors(initialErrors) 
    }

    return { 
        values,
        setValues,
        setErrors,
        handleInputChange,
        resetForm
    }
}
 