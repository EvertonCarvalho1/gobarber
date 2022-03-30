import React from "react";
import { useTransition } from 'react-spring';

import Toast from "./Toast";
import { ToastMessage } from '../../hooks/toast';
import { Container } from "./styles";

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

    const messagesWithTransitions = useTransition(
        messages,
        message => message.id,
        {
          from: { right: '-120%', opacity: 0 },
          enter: { right: '0%', opacity: 1 },
          leave: { right: '-120%', opacity: 0 },
        },
      );
    return (
        <Container>
            {messagesWithTransitions.map(({item, key, props}) => {
                //sempre devemos utilizar o return no map
                //não podemos enviar um parâmetro dentro de uma função que esta no onchange por exemplo, se não codigo executa, devemos colocar a função dentro de uma arrow function e assim passar o parametro
                return (
                    <Toast
                        key={key}
                        message={item}
                        style={props}
                    />
                )
            })}
        </Container>
    )
}

export default ToastContainer;

