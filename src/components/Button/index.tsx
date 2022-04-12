import React, {ButtonHTMLAttributes} from "react";
import { boolean } from "yup";
import { Container } from "./styles";

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};

const Button: React.FC<buttonProps> = ({children, loading , ...rest}) => {
    return(
        <Container {...rest}>
            {loading ? 'Carregando...' : children}
        </Container>
    )
};

export default Button;

