import "./UserForm.scss"
import "./ShoppingCart.scss"
import { TextInput, Button, CloseButton  } from '@mantine/core';
import {useRef} from "react";
import axios from "axios";
const UserForm = (props) => {

    const {
        setIsOpen
    } = props

    const onClose = () => setIsOpen(false)

    const formRef = useRef({
        name: "",
        email: "",
        phone: "",
        carModel: "",
        carYear: "",
    });

    const isFormValid = () => {
        return Object.values(formRef.current).every(value => value.trim().length > 0);
    };

    const addUserToDB = () => {
        if (isFormValid()) {
            axios.post('http://localhost:5050/new-user', {
                name: formRef.current.name,
                email: formRef.current.email,
                phone: formRef.current.phone,
                carModel: formRef.current.carModel,
                carYear: formRef.current.carYear,
                })
                    .then((response) => {
                    console.log(response.data);
                })
                    .catch((error) => {
                    console.error(error);
                });
            localStorage.setItem("userInfo", JSON.stringify(formRef.current));
            setIsOpen(false)
            }
        }

    return (
        <div>
            <div className="overlay" onClick={onClose}/>
            <div className="userFormContainer">
                <div className="closeButton" onClick={onClose}>
                    <CloseButton  variant="transparent"/>
                </div>
                <span>Анкета Користувача</span>
                <div className="userInput">
                    <TextInput
                        label="ПІБ"
                        placeholder="ПІБ"
                        onChange={(e) => (formRef.current.name = e.target.value)}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Email"
                        onChange={(e) => (formRef.current.email = e.target.value)}
                    />
                    <TextInput
                        label="Номер телефону"
                        placeholder="Номер телефону"
                        onChange={(e) => (formRef.current.phone = e.target.value)}
                    />
                    <TextInput
                        label="Модель автомобіля"
                        placeholder="Модель автомобіля"
                        onChange={(e) => (formRef.current.carModel = e.target.value)}
                    />
                    <TextInput
                        label="Рік випуску"
                        placeholder="Рік випуску"
                        onChange={(e) => (formRef.current.carYear = e.target.value)}
                    />
                </div>
                <Button variant="filled" color="teal" onClick={addUserToDB}>Надати дані</Button>
            </div>
        </div>
    )
}

export {UserForm}
