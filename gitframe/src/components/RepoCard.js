import React from 'react';

const RepoCard  = ({repo}) =>(
   
<div className="card border-secondary mb-3 w-50  offset-md-3 " >
    <div className="card-body   text-secondary offset-md-4">
        <a href ={repo.html_url} target="_blank">
        <h3>{repo.name}</h3>
        
       
        <p>
          <strong>Stars:</strong> {repo.stargazers_count}
        </p>
        <p>
          <strong>Watchers:</strong> {repo.watchers_count}
          </p>
          <p><strong>Language : </strong>{repo.language}</p>
        </a>
    </div>
</div>
);

export default RepoCard