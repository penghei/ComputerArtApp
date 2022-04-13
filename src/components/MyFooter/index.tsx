import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './index.scss'


interface IProps extends RouteComponentProps {}

const index:React.FC<IProps> = (props) => {
    return(
        <div className='footer'>
           <p>xxxx识别系统</p>
        </div>
    )
}

export default withRouter(index);