import { useLocation } from "react-router-dom"

import styles from "./Projects.module.css"

import LinkButton from "../layout/LinkButton"
import Message from "../layout/Message";
import Container from "../layout/Container"



export default function Projects(){
    const location = useLocation()
    let message = ""

    if(location.state){
        message = location.state.message
    }

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
                <p>Projetos...</p>
                <h2>asda</h2>
            </Container>
        </div>
    )
}