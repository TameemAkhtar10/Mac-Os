import React from 'react'
import projectdata from '../../assets/github.json'
import MacWindow from './MacWindow'
import './github.scss';
const Github = ({windowname,setwindow}) => {
  return (
    <div>
      <MacWindow width='47vw'height='70vh'windowname = {windowname}  setwindow = {setwindow} >
        <div className="github">
          {projectdata.map((project, index) => (

            <div className="project" key={index}>
              <img src={project.image} alt={`${project.name} icon`} className="project-icon" />
              <div className="project-info">
                <h1 className="project-name">{project.title}</h1>
                <p className="project-description">{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span className="tag" key={tagIndex}>{tag}</span>
                  ))}
                </div>
                <div className="links">
                  <a href={project.repoLink} className="project-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                  <a href={project.demoLink} className="project-link" target="_blank" rel="noopener noreferrer">LiveDemo</a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </MacWindow>

    </div>
  )
}

export default Github
