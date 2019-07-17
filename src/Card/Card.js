import React,{Component} from 'react';
import './Card.css';

class Card extends Component{
    constructor(props){
        super(props);
        this.state={
            username:props.username,
            name:'',
            avatar_url:'',
            company:'',
            location:'',
            public_repos:'0',
            followers:'0',
            gists:'0',
            error:null,
            isLoading:true
        };
    }
    componentDidMount(){
        const url="https://api.github.com/users/" + this.state.username;
        fetch(url)
        .then(results=>{
            if(results.ok) return results.json();
            else throw new Error('User not found');
        })
        .then(data=>{
            this.setState({
                name:data.name,
                avatar_url:data.avatar_url,
                company:data.company,
                location:data.location,
                public_repos:data.public_repos,
                gists:data.public_gists,
                followers:data.followers,
                isLoading:false
            });
        })
        .catch(error=>{
            this.setState({error,isLoading:false},()=>
            console.log(error)
            );
        });
    }
    render() {
        const { error, isLoading } = this.state;
    
        if (error) {
          return (
            <p style={{fontSize: "8vh",
                fontWeight: "300",
                margin: "25vh auto",
                color: "red"
              }}>{error.message}
            </p>
          );
        }
        if (isLoading) return null;
    
        return (
          <div classname="card-container">
            <img src={this.state.avatar_url} className="img-custom" circle />
            <div className="card-body">
              <h3>{this.state.name}</h3>
              <h4>
                <a href={"https://github.com/" + this.state.username}>
                  @{this.state.username}
                </a>
              </h4>
              <p>{this.state.company}</p>
              <p>{this.state.location}</p>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>REPOS</th>
                    <th>GISTS</th>
                    <th>FOLLOWERS</th>
                  </tr>
                </thead>
                
                <tbody>
                  <tr>
                    <td>{this.state.public_repos}</td>
                    <td>{this.state.gists}</td>
                    <td>{this.state.followers}</td>
                  </tr>
                </tbody>
              </table>
            
          </div>
        );
      }
}

export default Card;