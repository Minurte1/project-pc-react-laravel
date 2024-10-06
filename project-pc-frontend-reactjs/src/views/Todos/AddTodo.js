import React from "react";
import { ToastContainer, toast } from 'react-toastify';


class AddTodo extends React.Component {

    state = {
        title: ''
    }

    handleOnChaneTitle = (even) => {
        this.setState({
            title: even.target.value
        })
    }

    handleAddTodo = () => {
        if (!this.state.title) {
            toast.error(`Không thể thêm item rỗng`)
            return;
        }
        let todo = {
            id: Math.floor(Math.random() * 10000),
            title: this.state.title
        }
        this.props.addNewTodo(todo)
    }

    render() {
        let { title } = this.state;
        return (
            <>
                <div className="add-todo">
                    <input type="text"
                        value={title}
                        onChange={(even) => this.handleOnChaneTitle(even)}
                    />
                    <button type="button" className="add"
                        onClick={() => this.handleAddTodo()}>Add</button>
                </div>
            </>
        )
    }
}

export default AddTodo;