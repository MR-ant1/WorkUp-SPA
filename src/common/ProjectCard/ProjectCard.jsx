import "./ProjectCard.css"

// eslint-disable-next-line react/prop-types
export const ProjectCard = ({ id, projectTitle, projectDescription, createdAt, updatedAt, clickFunction }) => {

    return (
        <div className='projectCardDesign' onClick={clickFunction} key={id}>
            <div className="titleLatestDesign">{projectTitle}</div>
            <div className="descriptionLatestDesign">{projectDescription}</div>
            <div className="createdAtLatestDesign">{createdAt}</div>
            <div className="updatedAtLatestDesign">{updatedAt}</div>
        </div>
    )
}