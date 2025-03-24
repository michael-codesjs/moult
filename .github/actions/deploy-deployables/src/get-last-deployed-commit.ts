import { getInput } from '@actions/core'
import { getOctokit } from '@actions/github'

export const getLastDeployedCommit = async () => {
  const octokit = getOctokit(getInput('github_token'))
  const [owner, repo] = process.env.GITHUB_REPOSITORY!.split('/')

  const workflow_id = 'deploy-deployables.yml'
  const branch = process.env.GITHUB_REF!.replace('refs/heads/', '')

  const workflowRuns = await octokit.rest.actions.listWorkflowRuns({
    owner,
    repo,
    workflow_id,
    branch,
    status: 'success',
    event: 'push',
  })

  const lastSuccessfulWorkflowRunCommit =
    workflowRuns.data.workflow_runs.length > 0
      ? workflowRuns.data.workflow_runs[0].head_commit?.id
      : ''

  return lastSuccessfulWorkflowRunCommit
}
