import React,{Component} from 'react';
import Web3 from 'web3'
import './App.css';
import {TODO_LIST_ADDRESS, TODO_LIST_ABI} from './config'
import TodoList from './TodoList'
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
      this.setState({loading: false})
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
    this.createTask = this.createTask.bind(this)
  }
  createTask(content){
    this.setState({ loading : true})
    this.state.todoList.methods.createTask(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    
  }

  render(){
  return (
  <div>
    <div className = "container-fluid">
      <div className="row">
        <main role="main" className="col-lg-12 d-flex justify-content-center">
          {this.state.loading 
            ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div> 
            : <TodoList tasks={this.state.tasks} createTask={this.createTask}/> 
          }
        </main>
      </div>
    </div>
    </div>
  );
  }
}

export default App;
