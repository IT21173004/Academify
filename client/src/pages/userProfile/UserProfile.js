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
            <section>
                <div class="container py-5">
    
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
    
                    {role === "learner" && (
                        <div class="card mb-4">
                        <div class="card-body">
                            <p class="mb-4">
                            <span class="text-primary font-italic me-1">
                                Enrolled Courses
                            </span>{" "}
                            </p>
                        </div>
                        </div>
                    )}
                
                    </div>
                </div>
            </div>
            </section>
        )
    }else {
        return (
            <div>Error loading user profile.</div>
        ); 
    }
    
}

export default UserProfile;