/**
 * Created by Yuicon on 2017/8/15.
 * https://github.com/Yuicon
 */
import React, { Component } from 'react';
import './User.css';
import {findUserEntriesAction, likeEntryAction} from '../../redux/action/entries';
import {connect} from "react-redux";
import Entry from "../../components/Entry/Entry";
import portrait from '../../assets/images/portrait.jpg';

@connect(
  (state) => {
    return ({
      entriesByUser: state.entries.get('entries'),
      error: state.entries.get('error'),
      last: state.entries.get('last'),
    });
  },
  {findUserEntriesAction, likeEntryAction}
)
export default class User extends Component {

  constructor(props) {
    super(props);
    this.username = this.props.match.params.username;
  }

  componentWillMount() {
    this.props.findUserEntriesAction(0, 10, this.username);
  }

  render() {
    return(
      <div className="user-main">
        <div className="user-info">
          <div className="user-img">
            <img src={portrait} alt="头像" className="user-portrait"/>
          </div>
          <div className="user-username">
            {this.username}
          </div>
        </div>
        <div className="user-entries">
          {
            this.props.entriesByUser.sort((a, b) => {
              if (a.createdAt < b.createdAt) { return 1; }
              if (a.createdAt > b.createdAt) { return -1; }
              if (a.createdAt=== b.createdAt) { return 0; }
              return 0;
            }).toList().map(entry => {
              return <Entry key={entry.id} entry={entry} onClick={this.props.likeEntryAction}/>;
            })
          }
        </div>
      </div>
    );
  }
}
