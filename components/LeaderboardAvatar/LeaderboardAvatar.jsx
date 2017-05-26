import React, { Component } from 'react'
import './LeaderboardAvatar.scss'

// Constants
const VISIBLE_CHARACTERS = 3
const MOCK_PHOTO = 'https://acrobatusers.com/assets/images/template/author_generic.jpg'

class LeaderboardAvatar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      member: props.member,
    }
    this.handleError = this.handleError.bind(this)
  }

  handleError() {
    const { member } = this.state
    member.photoURL = MOCK_PHOTO
    this.setState({ member })
  }

  render() {
    const { domain, url } = this.props
    const { member } = this.state
    const targetURL = url ? url : `//${domain}/members/${member.handle}`
    return (
      <a href={targetURL} className={`leaderboard-avatar ${member.position || member.isSmr ? 'dark-gray' : 'light-gray'}`}>
        {member.photoURL ? <img src={member.photoURL} className="member-icon" onError={this.handleError} /> : member.handle.slice(0, VISIBLE_CHARACTERS)}
        <span className={member.position ? `placement placement-${member.position}` : 'hidden'}>
          {member.position}
        </span>
      </a>
    )
  }
}

LeaderboardAvatar.propTypes = {
  member: React.PropTypes.object,
  domain: React.PropTypes.string,
  url: React.PropTypes.string,
}

LeaderboardAvatar.defaultProps = {
  member: {},
  domain: process.env.domain,
  url: ''
}

export default LeaderboardAvatar
