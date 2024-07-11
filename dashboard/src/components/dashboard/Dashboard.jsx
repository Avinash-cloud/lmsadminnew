import React, {useState} from 'react'
import './dashboard.css'

import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { FaCubes } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CiStreamOn } from "react-icons/ci";
import DashboradHome from '../dashborad_home/DashboradHome';
import Orders from '../orders/Orders';
import Courses from '../courses/Courses';
import Modules from '../modules/Modules';
import Teachers from '../teachers/Teachers';
import Reviews from '../reviews/Reviews';
import Quizes from '../quizes/Quizes';
import ModulesData from '../modulesdata/ModulesData';
import Webinar from '../webinar/Webinar';
import { FaBlog } from "react-icons/fa";
import Blogs from '../blogs/Blog';


const Dashboard = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

  return (
    // <div className='dashboard-container'>
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <section className="dashboard">
        <div class="dashboard_wrapper">
            {/* <div class="col-md-2 mb-3 sidebar"> */}
                <div className="sidebar-toggler" onClick={toggleSidebar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            <div class={`col-md-2 mb-3 sidebar ${sidebarOpen ? 'open' : ''}`}>
                <ul class="nav nav-pills flex-column" id="experienceTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="dashborad-home-tab" data-toggle="tab" href="#dashboard_home" role="tab" aria-controls="home" aria-selected="true">
                            <span><FaHome /></span> Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="courses-tab" data-toggle="tab" href="#courses" role="tab" aria-controls="courses" aria-selected="false">
                        <span><BiSolidCategoryAlt /></span> Categories</a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" id="modules-tab" data-toggle="tab" href="#modules" role="tab" aria-controls="modules" aria-selected="false">
                        <span><FaCubes /></span> Courses</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" id="Module-data-tab" data-toggle="tab" href="#Module-data" role="tab" aria-controls="Module-data" aria-selected="false">
                        <span><FaGraduationCap /></span> Module</a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" id="orders-tab" data-toggle="tab" href="#orders" role="tab" aria-controls="orders" aria-selected="false">
                        <span><FaShoppingCart /></span> Orders</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="teachers-tab" data-toggle="tab" href="#teachers" role="tab" aria-controls="teachers" aria-selected="false">
                        <span><IoPersonSharp /></span> Teachers</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">
                        <span><MdMessage /></span> Reviews</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="webinar-tab" data-toggle="tab" href="#webinar" role="tab" aria-controls="webinar" aria-selected="false">
                        <span><CiStreamOn /></span> Webinar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="quizes-tab" data-toggle="tab" href="#quizes" role="tab" aria-controls="quizes" aria-selected="false">
                        <span><FaLightbulb /></span> Quizes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="blogs-tab" data-toggle="tab" href="#blogs" role="tab" aria-controls="blogs" aria-selected="false">
                        <span><FaBlog /></span> Blogs</a>
                    </li>
                    
                </ul>
            </div>
            {/* <!-- /.col-md-4 --> */}
            <div class="col-md-10">
                <div class="tab-content" id="experienceTabContent">

                    <div class="tab-pane fade show active text-left text-light" id="dashboard_home" role="tabpanel" aria-labelledby="dashborad-home-tab">
                        <DashboradHome />
                    </div>

                    <div class="tab-pane fade text-left text-light" id="courses" role="tabpanel" aria-labelledby="courses-tab">
                        <Courses />
                    </div>

                    <div class="tab-pane fade text-left text-light" id="modules" role="tabpanel" aria-labelledby="modules-tab">
                        <Modules />
                    </div>

                    <div class="tab-pane fade text-left text-light" id="Module-data" role="tabpanel" aria-labelledby="Module-data-tab">
                        <ModulesData />
                    </div>

                    <div class="tab-pane fade text-left text-light" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                        <Orders />
                    </div>

                    <div class="tab-pane fade text-left text-light" id="teachers" role="tabpanel" aria-labelledby="teachers-tab">
                        <Teachers />
                    </div>
                    <div class="tab-pane fade text-left text-light" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                        <Reviews />
                    </div>

                    <div class="tab-pane fade text-left text-light" id="webinar" role="tabpanel" aria-labelledby="webinar-tab">
                        <Webinar/>
                    </div>

                    <div class="tab-pane fade text-left text-light" id="quizes" role="tabpanel" aria-labelledby="quizes-tab">
                        <Quizes/>
                    </div>

                    <div class="tab-pane fade text-left text-light" id="blogs" role="tabpanel" aria-labelledby="blogs-tab">
                        <Blogs/>
                    </div>

                </div>
                {/* <!--tab content end--> */}
            </div>
            {/* <!-- col-md-8 end --> */}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
