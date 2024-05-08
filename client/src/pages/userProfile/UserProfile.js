import  React, {useState, useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateModal from "../../components/auth/authModal/UpdateModal";
import { userViewProfile } from "../../actions/authActions/authActions";

const UserProfile = ({history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const user_Login = useSelector((state) => state.user_Login);
	const { userInfo } = user_Login;

    const dispatch = useDispatch();

    useEffect(() => {
        const {data} = dispatch (userViewProfile)
        if(userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setRole(userInfo.role);
        }

        console.log(data)
    }, [userInfo]);

	

    if(userInfo) {
        
        return(
            <section style={{backgroundColor: "#eee"}}>
                <div class="container py-5">
    
                <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb" class="bg-body-tertiary rounded-3 p-3 mb-4">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">User Profile</li>
                    </ol>
                    </nav>
                </div>
                </div>
    
                <div class="row">
    
                <div class="col-lg-4 d-flex align-items-stretch" >
                    <div class="card mb-4  w-100">
                    <div class="card-body text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                        class="rounded-circle img-fluid" style={{width: "150px"}}/>
                        <h5 class="my-3">{name}</h5> 
                        <p class="text-muted mb-1">{role}</p>
                        <p class="text-muted mb-4">{email}</p>
                        <UpdateModal/> 
                    </div>
                    </div>
                </div>
    
                <div class="col-lg-8">
    
                    <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                        <div class="col-sm-3">
                            <p class="mb-0">Full Name</p>
                        </div>
                        <div class="col-sm-9">
                            <p class="text-muted mb-0">{name}</p>
                        </div>
                        </div>
                        <hr/>
                        <div class="row">
                        <div class="col-sm-3">
                            <p class="mb-0">Email</p>
                        </div>
                        <div class="col-sm-9">
                            <p class="text-muted mb-0">{email}</p>
                        </div>
                        </div>
                        <hr/>
                        <div class="row">
                        <div class="col-sm-3">
                            <p class="mb-0">Phone</p>
                        </div>
                        <div class="col-sm-9">
                            <p class="text-muted mb-0"></p>
                        </div>
                        </div>
                        <hr/>
                        <div class="row">
                        <div class="col-sm-3">
                            <p class="mb-0">Mobile</p>
                        </div>
                        <div class="col-sm-9">
                            <p class="text-muted mb-0"></p>
                        </div>
                        </div>
                        <hr/>
                        <div class="row">
                        <div class="col-sm-3">
                            <p class="mb-0">Address</p>
                        </div>
                        <div class="col-sm-9">
                            <p class="text-muted mb-0"></p>
                        </div>
                        </div>
                    </div>
                    </div>
    
                    <div class="card mb-4">
                    <div class="card-body">
                    <p class="mb-4"><span class="text-primary font-italic me-1">Enrolled Courses</span> </p>
                            {/* <p class="mb-1" style={{fontSize: ".77rem"}}>Web Design</p>
                            <div class="progress rounded" style={{height: "5px"}}>
                            <div class="progress-bar" role="progressbar" style={{width: "66%"}} aria-valuenow="80"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mt-4 mb-1" style={{fontSize: ".77rem"}}>Website Markup</p>
                            <div class="progress rounded" style={{height: "5px"}}>
                            <div class="progress-bar" role="progressbar" style={{width: "66%"}} aria-valuenow="72"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mt-4 mb-1" style={{fontSize: ".77rem"}}>One Page</p>
                            <div class="progress rounded" style={{height: "5px"}}>
                            <div class="progress-bar" role="progressbar" style={{width: "66%"}} aria-valuenow="89"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mt-4 mb-1" style={{fontSize: ".77rem"}}>Mobile Template</p>
                            <div class="progress rounded" style={{height: "5px"}}>
                            <div class="progress-bar" role="progressbar" style={{width: "66%"}} aria-valuenow="55"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mt-4 mb-1" style={{fontSize: ".77rem"}}>Backend API</p>
                            <div class="progress rounded mb-2" style={{height: "5px"}}>
                            <div class="progress-bar" role="progressbar" style={{width: "66%"}} aria-valuenow="66"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div> */}
                    </div>
                    </div>
    
                    </div>
                </div>
            </div>
            </section>
        )
    }else {
        return (
            console.log("v:", userInfo)
        ); // or a loading indicator
    }
    
}

export default UserProfile;