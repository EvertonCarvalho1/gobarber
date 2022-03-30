import React, {useCallback} from "react";
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../hooks/toast'
import { Container, Toast } from "./styles";

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

    const { removeToast } = useToast(); 
     
    return (
        <Container>
            {messages.map(message => {
                //sempre devemos utilizar o return no map
                //não podemos enviar um parâmetro dentro de uma função que esta no onchange por exemplo, se não codigo executa, devemos colocar a função dentro de uma arrow function e assim passar o parametro
                return (
                    <Toast
                        type={message.type}
                        key={message.id}
                        hasDescription={!!message.description}
                    >
                        <FiAlertCircle size={20} />
                        <div>
                            <strong>{message.title}</strong>
                            {message.description && <p>{message.description}</p>}
                        </div>

                        <button onClick={() => removeToast(message.id)} type="button">
                            <FiXCircle size={18} />
                        </button>
                    </Toast>)
            })}
        </Container>
    )
}

export default ToastContainer;

