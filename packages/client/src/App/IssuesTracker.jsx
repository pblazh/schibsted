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
      fetch: issuesModule.actions.fetch,
      append: issuesModule.actions.append,
      remove: issuesModule.actions.remove,
      closed: issuesModule.actions.closed,
      pending: issuesModule.actions.pending,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(IssuesTrackerWidget)
