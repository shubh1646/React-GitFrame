import React from 'react'


const UserCARD = ({ user }) => {
   
    const date = user.created_at.substring(0,4);
    
    return (
        <div className="card w-50 offset-md-3 text-white bg-dark mb-3 ">
      <div className="card-body">
        <div className="d-flex">
          <img className="img-round user-image mr-5" src={user.avatar_url} />
          <div>
            <h1>{user.name}</h1>
            <p className="mb-0 font-italic">{user.company}</p>
            <p className="mb-0">{user.bio}</p>
            <p className="mb-0"> User Since : {date}</p>
          </div>
        </div> 
      </div>
    </div>
    )
    
    
    
    
    
    
    
    
    
}

export default UserCARD