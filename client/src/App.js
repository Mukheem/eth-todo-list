import React,{Component} from 'react';
import Web3 from 'web3'
import './App.css';
import {TODO_LIST_ADDRESS, TODO_LIST_ABI} from './config'

class App extends Component{

  componentWillMount(){
    this.loadBlockchainData()
  }

  async loadBlockchainData(){
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0])
    this.setState({ account: accounts[0]})
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    this.setState({todoList})
    console.log("TodoList: ",todoList)
    var taskCount = await todoList.methods.taskCount().call()
    taskCount = taskCount.toNumber() 
    this.setState({ taskCount })
    console.log(taskCount)

    for (var i=1; i<= taskCount; i++){
      var duffa = await todoList.methods.tasks(i).call()
      this.setState({
        tasks: [...this.state.tasks, duffa]
      })
    }
    console.log("Tasks are here",this.state.tasks)
  }

  constructor(props){
    super(props)
    this.state = {
      account: '',
      taskCount: 0,
      tasks: [],
      loading:true
    }
  }

  render(){
  return (
  
    <div className = "container">
       <ul id="taskList" className="list-unstyled">
        { this.state.tasks.map((task,key) => {
          return(
              <div className="taskTemplate" className="checkbox" key={key}>
                <label>
                  <input type="checkbox" />
                  <span className="content">{task.description}</span>
                </label>
              </div>
        )
        })}
       </ul>
    </div>
  );
  }
}

export default App;
