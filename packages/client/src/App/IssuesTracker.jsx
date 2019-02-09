import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { issues as issuesModule } from '../store/modules'
import IssuesTrackerWidget from '../widgets/IssuesTracker'

const mapStateToProps = state => ({
  issues: state.issues
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetch: issuesModule.actions.fetch
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(IssuesTrackerWidget)
