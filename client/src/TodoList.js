import React,{Component} from 'react';

class TodoList extends Component{



  render(){
  return (
  <div id="content"> 
      <form onSubmit={(event) => {
          event.preventDefault()
          this.props.createTask(this.task.value)
        }}>
            <input id="newTask" ref={(input) => this.task = input} type="text" className="form-control" placeholder="Hey there..." required />
            <input type="submit" hidden={true}/>
      </form>
    
       <ul id="taskList" className="list-unstyled">
        { this.props.tasks.map((task,key) => {
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
       <ul id="compeletedTaskList" className="list-unstyled">

       </ul>
    </div>
  );
  }
}

export default TodoList;
