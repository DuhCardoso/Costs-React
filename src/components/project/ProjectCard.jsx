import { Link } from "react-router-dom";

import styles from "./ProjectCard.module.css";

import {BsPencil, BsFillTranshFill, BsFillTrashFill} from "react-icons/bs";

export default function ProjectCard({id, name, budget, category, hanfelRemove}){
    return(
        <div className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.categoryText}>
                <span className={styles[category.toLowerCase()]}/> {category}
            </p>
            <div className={styles.projectCardActions}>
                <Link to="/">
                    <BsPencil/> Editar
                </Link>
                <button>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}