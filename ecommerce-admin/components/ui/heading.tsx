interface HeadingProps {
    title: string;
    titleDescription: string;
}

export const Heading: React.FC<HeadingProps> = ({
    title,
    titleDescription
}) =>{
    return(
        <div>
            <h2 className="text-3xl font-bold tracking-tight">
                {title}
            </h2>
            <p className="text-sm text-muted-foreground">
                {titleDescription}
            </p>
        </div>
    )
}