import React from "react";
import { ToastMessage } from '../../hooks/toast'
import { Container } from "./styles";
import Toast from "./Toast";

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    return (
        <Container>
            {messages.map(message => {
                //sempre devemos utilizar o return no map
                //não podemos enviar um parâmetro dentro de uma função que esta no onchange por exemplo, se não codigo executa, devemos colocar a função dentro de uma arrow function e assim passar o parametro
                return (
                    <Toast
                        key={message.id}
                        message={message}
                    />
                )
            })}
        </Container>
    )
}

export default ToastContainer;

