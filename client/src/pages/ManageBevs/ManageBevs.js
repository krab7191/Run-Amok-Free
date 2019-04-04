import React from 'react';
import EditableDataTable from '../../components/EditableDataTable';

class ManageBevs extends React.Component {

    state = {

    };

    render() {
        return (
            <div className="main">
                <EditableDataTable type="bevs" />
            </div>
        )
    }
}

export default ManageBevs;