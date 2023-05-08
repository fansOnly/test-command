import core from '@actions/core'
import github from '@actions/github'
import { Octokit } from '@octokit/action'
import { createActionAuth } from '@octokit/auth-action'

const run = async () => {
    try {
        const { repo, runId: run_id } = github
        const jobName = core.getInput('job-name', { required: true })
        const auth = createActionAuth()
        const authentication = await auth()

        const octokit = new Octokit({
            auth: authentication.token
        })

        const { data } = await octokit.request(`/repos/${repo.owner}/${repo.repo}/actions/runs/${run_id}/jobs`)


        let target = ''
        let count = 0

        for (let job of data.jobs) {
            if (jobName === job.name) {
                console.log('=== id ===', job.id)
                count++
                target = job.id
            }
        }
        if (count === 1) {
            core.setOutput('jobId', JSON.stringify(target))
        } else {
            core.setOutput('jobId', JSON.stringify('notUniqueId'))
        }
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()