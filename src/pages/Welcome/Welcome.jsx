
import { useSelector } from 'react-redux';
import { userData } from '../../app/Slices/userSlice';
import { ProjectCard } from '../../common/ProjectCard/ProjectCard';
import { GetProjects } from '../../services/api.calls';
import './Welcome.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {

    const navigate = useNavigate();

    const reduxUser = useSelector(userData)
    
    useEffect(() => {
        if (!reduxUser?.tokenData?.token) {
            navigate('/')
        }
    }, [reduxUser?.tokenData?.token])

    // // const dispatch = useDispatch();

    // const reduxUser = useSelector(userData)

    const [loadedData, setLoadedData] = useState(false)

    const [projects, setProjects] = useState([])

    // const manageDetail = (latest) => {
    //     dispatch(updateDetail({ detail: latest }));
    //     navigate("/latestDetail");
    // };


    useEffect(() => {
        const projectsFeed = async () => {
            try {
                const fetched = await GetProjects()

                setProjects(fetched.data)
                
                if (fetched.success === true) {
                    setLoadedData(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (loadedData === false) {
            projectsFeed()
        }
    }, [projects])


    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(10);

    const lastNewIndex = currentPage * newsPerPage;
    const firstNewIndex = lastNewIndex - newsPerPage;
    const currentProjects = projects.slice(firstNewIndex, lastNewIndex);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(projects.length / newsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (

        <div className="welcomeDesign">
            <div className='viewTitleDesign'>¡BIENVENIDO A WORK UP!</div>
            {loadedData === true ? (
                        <div className="cardsHomeDesign">
                            {currentProjects.map(
                                project => {
                                    return (
                                        <div className='cardDivDesign' key={project.id}>
                                            <ProjectCard
                                                projectTitle={project?.projectTitle?.length > 20 ? project.projectTitle.substring(0, 20) : project?.projectTitle}
                                                projectDescription={project?.projectDescription.length > 20 ? project?.projectDescription.substring(0, 20) + "..." : project?.projectDescription}
                                                // clickFunction={() => manageDetail(latest)}
                                            />
                                        </div>
                                    )
                                })}
                        </div>
                    ) : (
                        <div className="homeLoadingDesign">CARGANDO</div>
                    )}

        <ul className="paginateContainer">
                {pageNumbers.map((number) => (
                    <div key={number} className="pageContainer">
                        <a
                            onClick={() => paginate(number)}
                            href="#"
                            className="pageDesign"
                        >
                            {number}
                        </a>
                    </div>
                ))}
            </ul>
        </div>
    )
}