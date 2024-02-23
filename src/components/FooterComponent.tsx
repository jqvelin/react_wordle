import { FC } from "react";

interface FooterComponentProps {
    children: React.ReactNode
}

const FooterComponent: FC<FooterComponentProps> = ({children}) => {
    return (
        <footer>
            {children}
        </footer>
    );
};

export default FooterComponent;