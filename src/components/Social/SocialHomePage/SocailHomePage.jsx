import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Global from "../../../Global";
import EachSocialRequest from "../EachSocialRequest";
import Sticky from "react-sticky-el";
import { PropertyCardSM } from "../../PropertyCard/PropertyCardSM";
import { Link } from 'react-router-dom';
import Btn from '../../Btn/Btn';
import { getUser, logout } from '../../../redux/strapi_actions/auth.actions';

export default (props) => {
  const auth = useSelector(state => state.auth);
  const view = useSelector(state => state.view);
  const dispatch = useDispatch()
  const { user } = auth.user;
  const [state, setState] = useState({
    properties: [],
    list: [],
  });

  useEffect(() => {
    if (auth.user) {
      dispatch(getUser())
    }
  }, []);

  useEffect(() => {
    if (state.properties.length === 0) {
      axios(
        process.env.REACT_APP_API_URL +
        `/properties/recent/${Global.isMobile ? "4" : "6"}`
      )
        .then((res) => {
          setState({ ...state, properties: res.data });
        })
        .catch((err) => { });
    }
  }, [state]);
  useEffect(() => {
    if (state.list.length === 0) {
      axios(
        process.env.REACT_APP_API_URL +
        `/property-requests/?is_searching=${!view.personal_info.looking_for}&_limit=25&_start=0&_sort=created_at:DESC`
      )
        .then((res) => {
          setState({ ...state, list: res.data });
        })
        .catch((err) => { });
    }
  }, [state]);
  return (
    <section className="mt-0 pt-0">
      <div className="gap2 gray-bg">
        <div className="container">
          <div className="row">
            <div className="">
              <div className="row merged20" id="page-contents">
                {
                  Global.isMobile ? null : <div className="col-lg-3 desktop-only">
                    <Sticky stickyStyle={{ marginTop: "80px" }}>
                      <aside className="sidebar static left">
                        <div className="widget">
                          <h4 className="widget-title">Your page</h4>
                          <div className="your-page">
                            <figure>
                              <a href="#" title="">
                                <img src={user.avatar_url} alt="" />
                              </a>
                            </figure>
                            <div className="page-meta">
                              <Link to={`/user/${user.username}`} title="">
                                {user.first_name} {user.last_name}
                              </Link>
                              <span>
                                @{user.username}
                              </span>
                              {/* <span>
                              <i className="ti-comment"></i>
                              <a href="insight.html" title="">
                                Messages <em>9</em>
                              </a>
                            </span>
                            <span>
                              <i className="ti-bell"></i>
                              <a href="insight.html" title="">
                                Notifications <em>2</em>
                              </a>
                            </span> */}
                            </div>
                            {/* <ul className="page-publishes">
                            <li>
                              <span>
                                <i className="ti-pencil-alt"></i>Publish
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="ti-camera"></i>Photo
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="ti-video-camera"></i>Live
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="fa fa-user-plus"></i>Invite
                              </span>
                            </li>
                          </ul> */}
                            <div className="page-likes">
                              {/* <div className="tab-content">
                              <div
                                className="tab-pane active fade show"
                                id="link1"
                              >
                                <span>
                                  <i className="ti-heart"></i>884
                                </span>
                                <a href="#" title="weekly-likes">
                                  35 new likes this week
                                </a>
                                <div className="users-thumb-list">
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Anderw"
                                  >
                                    <img
                                      src="images/resources/userlist-1.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="frank"
                                  >
                                    <img
                                      src="images/resources/userlist-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Sara"
                                  >
                                    <img
                                      src="images/resources/userlist-3.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Amy"
                                  >
                                    <img
                                      src="images/resources/userlist-4.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Ema"
                                  >
                                    <img
                                      src="images/resources/userlist-5.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Sophie"
                                  >
                                    <img
                                      src="images/resources/userlist-6.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Maria"
                                  >
                                    <img
                                      src="images/resources/userlist-7.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                              <div className="tab-pane fade" id="link2">
                                <span>
                                  <i className="fa fa-eye"></i>440
                                </span>
                                <a href="#" title="weekly-likes">
                                  440 new views this week
                                </a>
                                <div className="users-thumb-list">
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Anderw"
                                  >
                                    <img
                                      src="images/resources/userlist-1.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="frank"
                                  >
                                    <img
                                      src="images/resources/userlist-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Sara"
                                  >
                                    <img
                                      src="images/resources/userlist-3.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Amy"
                                  >
                                    <img
                                      src="images/resources/userlist-4.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Ema"
                                  >
                                    <img
                                      src="images/resources/userlist-5.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Sophie"
                                  >
                                    <img
                                      src="images/resources/userlist-6.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Maria"
                                  >
                                    <img
                                      src="images/resources/userlist-7.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                            </div> */}

                             <Link to={`/user/${user.username}`}>
                                <div className="nav nav-tabs likes-btn d-flex justify-content-center">
                                  <Btn className='btn-sm' text="View Profile" onClick={() => { }} />
                                </div>
                             </Link>
                            </div>
                          </div>
                        </div>
                      </aside>
                    </Sticky>
                  </div>
                }
                <div className="col-lg-5">
                  {state.list.map((val, i) => {
                    return <EachSocialRequest key={i} data={val} />;
                  })}
                </div>
                {
                  Global.isMobile ? null : <div className="col-lg-4 desktop-only">
                    <Sticky stickyStyle={{ marginTop: "80px" }}>
                      {state.properties.map((val, i) => {
                        return <PropertyCardSM val={val} key={i} />;
                      })}
                    </Sticky>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


