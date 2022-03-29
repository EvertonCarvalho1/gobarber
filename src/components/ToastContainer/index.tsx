import React from "react";
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastMessage } from '../../hooks/toast'
import { Container, Toast } from "./styles";

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    return (
        <Container>
            {messages.map(message => {
                //sempre devemos utilizar o return no map
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

                        <button type="button">
                            <FiXCircle size={18} />
                        </button>
                    </Toast>)
            })}

            <Toast type="info" hasDescription={false}>
                <FiAlertCircle size={20} />
                <div>
                    <strong>Aconteceu um erro</strong>
                    <p>Não foi possivel fazer login</p>
                </div>

                <button type="button">
                    <FiXCircle size={18} />
                </button>
            </Toast>
        </Container>
    )
}

export default ToastContainer;

