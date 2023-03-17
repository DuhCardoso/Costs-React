import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Project.module.css";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";

export default function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  
  useEffect(() => {
    setTimeout(()=>{
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => setProject(data))
        .catch((e) => console.log(e));
    }, 300)
  }, [id]);

  function editPost(project){
    // budget validation
    if(project.budget < project.cost){
      // message
      setMessage("O orçamento não pode ser maior que o custo do projeto!")
      setType("error")
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)
        // mensagem
        setMessage("Projeto atualzado!")
        setType("success")
      })
      .catch((e) => console.log(e));
  }

  function toggleProjectForm(){
    setShowProjectForm(!showProjectForm)
  }

  return (<>
    {project.name ? ( 
      <div className={styles.projectDetails}>
        <Container customClass="column" >
          {message && <Message type={type} msg={message}/>}
          <div className={styles.detailsContainer} >
            <h1>Projeto: {project.name}</h1>
            <button onClick={toggleProjectForm} className={styles.btn}>
              {showProjectForm ? "Fechar" : "Editar Projeto"}
            </button>
            {showProjectForm ? (
                <div className={styles.projectInfo}>
                  <ProjectForm 
                    handleSubmit={editPost} 
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              ):(
                <div className={styles.projectInfo}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Tortal Orçamento:</span> {project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> {project.cost}
                  </p>
                </div>
              )
            }
          </div>
        </Container>
      </div>
    ) : (
      <Loading/>
    )}
  </>);
}
