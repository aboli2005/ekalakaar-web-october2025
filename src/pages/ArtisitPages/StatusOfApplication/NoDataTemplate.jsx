import "./noDataTemplate.css"
import ApplicationButton from "./ApplicationButton";
import { Link } from "react-router-dom";

function NoDataTemplate({image , para , patronAppli = false}){
    return (
        <div className="noData_container">
        <img src={image} alt=""  />
        {
          !patronAppli &&  
        <p className="oops_text">Oops!</p>
        }
        {
          !patronAppli && 
        <p className="noData_para">
{para}
        </p>
        }
        {
          !patronAppli && 
          <Link style={{textDecoration:"none"}} to={"/Artist_Opportunities"}>
              <ApplicationButton text={"View More Events"} />
           </Link>
        }
      </div>
    )
}

export default NoDataTemplate;