import React from 'react'

class Search extends React.Component {
    state = {
        username: ""
    };






    handlekeyDown = e => {
        const value = e.target.value;
        this.setState({
            username: value
        });
    };





    render() {
        const { username } = this.state;
        return (

           

            <div className="container py-5">

                <div className="col-md-4 offset-md-4">

                    <div className="input-group mb-3">
                        <input type="text" class="form-control "  onChange={this.handleUserNameChange} name="username" placeholder="Github username" aria-label="Github's username" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                        </div>

                    </div>
                </div>



            </div>
        );
    }
}


export default Search;
