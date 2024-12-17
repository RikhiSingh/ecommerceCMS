interface ContainerProps{
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <div className="mx-auto max-w-[90rem]">
            {children}
        </div>
     );
}
 
export default Container;