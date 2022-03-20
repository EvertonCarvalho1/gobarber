import React, {ButtonHTMLAttributes} from "react";
import { Container } from "./styles";

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<buttonProps> = (props) => {
    return(
        <Container>
            <button {...props}></button>
        </Container>
    )
};

export default Button;

