import {useNavigate} from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'

import styles from './NewProject.module.css'

export default function NewProject(){
    const history = useNavigate()

    function createPost(project){
        // Intialize const and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects",{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                // Redirect
                history('/projects', {state: {message: 'Projeto criado com sucesso!'}})
            })
            .catch(e => console.log(e))
    }

    return (
        <div className={styles.newProjectContainer}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicioner os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto '/>
        </div>
    )
}