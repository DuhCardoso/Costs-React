import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Projects.module.css";

import LinkButton from "../layout/LinkButton";
import Message from "../layout/Message";
import Container from "../layout/Container";
import Loading from "../layout/Loading";
import ProjectCard from "../project/ProjectCard";


export default function Projects(){
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
    let message = ""

    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        setTimeout(()=>{
            fetch("http://localhost:5000/projects", {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            .then(resp => resp.json())
            .then(data => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch(e => console.log(e))
        }, 300)
    }, [])

    return(
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Projects</h1>
                <LinkButton to="/newproject" text="Novo Projeto"/>
            </div>

            {message && (
                <Message msg={message} type='success' />
            )}


            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project)=> (
                        <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project?.category?.name}
                            key={project.id}
                        />
                    ))
                }
                {!removeLoading && <Loading/>}
                {removeLoading && Projects.legth === 0 && (
                    <p>Não há projetos</p>
                )}
            </Container>
        </div>
    )
}