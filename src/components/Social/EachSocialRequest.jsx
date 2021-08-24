import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import image from "../../social_css/images/resources/album5.jpg";
import image2 from "../../social_css/images/resources/author.jpg";
import { Link } from "react-router-dom";
import Gallery from "react-grid-gallery";

const EachSocialRequest = (props) => {
  console.log("EACH REQUESTS ---", props);
  const { data } = props;
  return (
    <div
      className="central-meta item"
      style={{ display: "inline-block", borderRadius: "17px" }}
    >
      <div className="user-post">
        <div className="friend-info">
          <div className="d-flex">
            <figure>
              <img
                src={data.users_permissions_user.avatar_url}
                alt=""
                width="50px"
                style={{ borderRadius: "50%" }}
              />
            </figure>
            <span className="friend-name">
              <div className="more">
                <div className="more-post-optns">
                  <i className="ti-more-alt"></i>
                  <ul>
                    <li>
                      <i className="fa fa-pencil-square-o"></i>Edit Post
                    </li>
                    <li>
                      <i className="fa fa-trash-o"></i>Delete Post
                    </li>
                    <li className="bad-report">
                      <i className="fa fa-flag"></i>Report Post
                    </li>
                    <li>
                      <i className="fa fa-address-card-o"></i>Boost This Post
                    </li>
                    <li>
                      <i className="fa fa-clock-o"></i>Schedule Post
                    </li>
                    <li>
                      <i className="fa fa-wpexplorer"></i>Select as featured
                    </li>
                    <li>
                      <i className="fa fa-bell-slash-o"></i>Turn off
                      Notifications
                    </li>
                  </ul>
                </div>
              </div>
              <ins>
                <Link
                  to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
                  title=""
                >
                  {data.users_permissions_user.first_name}{" "}
                  {data.users_permissions_user.last_name}
                </Link>
              </ins>
              <span> {moment(data.created_at).fromNow()}</span>
            </span>
          </div>
          <div className="post-meta">
            <Link
              to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
            >
              <div className="description mt-0">
                <p>
                  {data.body.length > 200 ? (
                    <>
                      {data.body.slice(0, 200)}...{" "}
                      <b className="text-theme">Read More</b>
                    </>
                  ) : (
                    data.body
                  )}
                </p>
              </div>
            </Link>
            <figure>
              <div class="img-bunch">
                <div class="row">
                  {data.image_url &&
                    data.image_url.map((val, i) => {
                      return (
                        <div
                          className="col-4"
                          style={{ maxWidth: "32.333333%", margin: '1.0px' }}
                        >
                          <div
                            className="card"
                            data-strip-group-options="loop: false"
                            data-strip-group="mygroup"
                            style={{
                              backgroundImage: `url(${val})`,
                              height: "160px",
                              width: "100%",
                              // backgroundPosition: 'center',
                              backgroundSize: "100% 100%",
                            }}
                          ></div>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* <ul class="like-dislike">
                <li>
                  <Link class="bg-purple" href="#" title="Save to Pin Post">
                    <i class="fa fa-thumb-tack"></i>
                  </Link>
                </li>
                <li>
                  <Link class="bg-blue" href="#" title="Like Post">
                    <i class="ti-thumb-up"></i>
                  </Link>
                </li>
                <li>
                  <Link class="bg-red" href="#" title="dislike Post">
                    <i class="ti-thumb-down"></i>
                  </Link>
                </li>
              </ul> */}
            </figure>

            {/* <ul className="like-dislike">
              <li>
                <Link href="#" title="Save to Pin Post">
                  <i className="fa fa-thumb-tack"></i>
                </Link>
              </li>
              <li>
                <Link href="#" title="Like Post">
                  <i className="ti-thumb-up"></i>
                </Link>
              </li>
              <li>
                <Link href="#" title="dislike Post">
                  <i className="ti-thumb-down"></i>
                </Link>
              </li>
            </ul> */}

            {/* <div className="we-video-info">
              <ul>
                <li>
                  <span className="views" title="views">
                    <i className="fa fa-eye"></i>
                    <ins>1.2k</ins>
                  </span>
                </li>
                <li>
                  <div className="likes heart" title="Like/Dislike">
                    ❤ <span>2K</span>
                  </div>
                </li>
                <li>
                  <span className="comment" title="Comments">
                    <i className="fa fa-commenting"></i>
                    <ins>52</ins>
                  </span>
                </li>

                <li>
                  <span>
                    <Link className="share-pst" href="#" title="Share">
                      <i className="fa fa-share-alt"></i>
                    </Link>
                    <ins>20</ins>
                  </span>
                </li>
              </ul>
              <div className="users-thumb-list">
                <Link
                  data-toggle="tooltip"
                  title=""
                  href="#"
                  data-original-title="Anderw"
                >
                  <img alt="" src="images/resources/userlist-1.jpg" />
                </Link>
                <Link
                  data-toggle="tooltip"
                  title=""
                  href="#"
                  data-original-title="frank"
                >
                  <img alt="" src="images/resources/userlist-2.jpg" />
                </Link>
                <Link
                  data-toggle="tooltip"
                  title=""
                  href="#"
                  data-original-title="Sara"
                >
                  <img alt="" src="images/resources/userlist-3.jpg" />
                </Link>
                <Link
                  data-toggle="tooltip"
                  title=""
                  href="#"
                  data-original-title="Amy"
                >
                  <img alt="" src="images/resources/userlist-4.jpg" />
                </Link>
                <Link
                  data-toggle="tooltip"
                  title=""
                  href="#"
                  data-original-title="Ema"
                >
                  <img alt="" src="images/resources/userlist-5.jpg" />
                </Link>
                <span>
                  <strong>You</strong>, <b>Sarah</b> and{" "}
                  <Link href="#" title="">
                    24+ more
                  </Link>{" "}
                  liked
                </span>
              </div>
            </div> */}
          </div>
          <div className="coment-area">
            <ul className="we-comet">
              <li>
                <div className="comet-avatar">
                  <img src="images/resources/nearly3.jpg" alt="" />
                </div>
                <div className="we-comment">
                  <h5>
                    <Link
                      to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
                      title=""
                    >
                      Jason borne
                    </Link>
                  </h5>
                  <p>
                    we are working for the dance and sing songs. this video is
                    very awesome for the youngster. please vote this video and
                    like our channel
                  </p>
                  <div className="inline-itms">
                    <span>1 year ago</span>
                    <Link className="we-reply" href="#" title="Reply">
                      <i className="fa fa-reply"></i>
                    </Link>
                    <Link href="#" title="">
                      <i className="fa fa-heart"></i>
                      <span>20</span>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="comet-avatar">
                  <img src="images/resources/comet-4.jpg" alt="" />
                </div>
                <div className="we-comment">
                  <h5>
                    <Link
                      to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
                      title=""
                    >
                      Sophia
                    </Link>
                  </h5>
                  <p>
                    we are working for the dance and sing songs. this video is
                    very awesome for the youngster.
                    <i className="em em-smiley"></i>
                  </p>
                  <div className="inline-itms">
                    <span>1 year ago</span>
                    <Link className="we-reply" href="#" title="Reply">
                      <i className="fa fa-reply"></i>
                    </Link>
                    <Link href="#" title="">
                      <i className="fa fa-heart"></i>
                      <span>20</span>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link href="#" title="" className="showmore underline">
                  more comments+
                </Link>
              </li>
              <li className="post-comment">
                <div className="comet-avatar">
                  <img src="images/resources/nearly1.jpg" alt="" />
                </div>
                <div className="post-comt-box">
                  <form method="post">
                    <textarea placeholder="Post your comment"></textarea>
                    <div className="add-smiles">
                      <div className="uploadimage">
                        <i className="fa fa-image"></i>
                        <label className="fileContainer">
                          <input type="file" />
                        </label>
                      </div>
                      <span
                        className="em em-expressionless"
                        title="add icon"
                      ></span>
                      <div className="smiles-bunch">
                        <i className="em em---1"></i>
                        <i className="em em-smiley"></i>
                        <i className="em em-anguished"></i>
                        <i className="em em-laughing"></i>
                        <i className="em em-angry"></i>
                        <i className="em em-astonished"></i>
                        <i className="em em-blush"></i>
                        <i className="em em-disappointed"></i>
                        <i className="em em-worried"></i>
                        <i className="em em-kissing_heart"></i>
                        <i className="em em-rage"></i>
                        <i className="em em-stuck_out_tongue"></i>
                      </div>
                    </div>

                    <button type="submit"></button>
                  </form>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EachSocialRequest);
