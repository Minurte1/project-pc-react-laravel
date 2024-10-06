import React from "react";
import ChildComponent from "./ChildComponent";
import AddComponents from "./AddComponents";

class MyComponent extends React.Component {

    componentDidUpdate = (prevProps, prevState) => {
        console.log(">>> run didupdate: ", 'prevState', prevState, ' current state: ', this.state)
    }

    componentDidMount = () => {
        console.log(">>> run components did mount")
    }
    /*
    JFX => return 1 block hay 1 div
    Nếu muốn nhiều hơn 1 div ta dùng <> div1 div2 </>
    */
    state = {
        arrJobs: [
            { id: "abcJob1", title: "Developer", salary: "500" },
            { id: "abcJob2", title: "Testers", salary: "400" },
            { id: "abcJob3", title: "Project managers", salary: "1000" }
        ]
    }

    addNewJob = (job) => {
        this.setState({
            arrJobs: [...this.state.arrJobs, job]
        })
        // let currenJob = this.state.arrJobs;
        // currenJob.push(job)
        // this.setState({
        //     arrJobs: currenJob
        // })
    }

    deleteAJob = (job) => {
        let currenJob = this.state.arrJobs;
        currenJob = currenJob.filter(item => item.id !== job.id)
        this.setState({
            arrJobs: currenJob
        })
    }

    render() {
        return (
            <>
                <AddComponents
                    addNewJob={this.addNewJob}
                />
                <ChildComponent
                    arrJobs={this.state.arrJobs}
                    deleteAJob={this.deleteAJob}
                />
            </>
        )
    }
}

export default MyComponent;