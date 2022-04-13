import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './index.scss'


interface IProps extends RouteComponentProps {}

const index:React.FC<IProps> = (props) => {
    return(
        <div className='footer'>
           <p style={{marginBottom:0}}>基于Resnet的植物病害识别系统</p>
           <p>@zhy项目小组</p>
        </div>
    )
}

export default withRouter(index);